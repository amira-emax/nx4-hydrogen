import {X} from 'lucide-react';
import {Button} from '~/components/ui/button';
import {Link} from 'react-router';
import {useCooldown} from '~/lib/hooks/useCooldown';
import {useEffect, useState} from 'react';

// Key for localStorage - shared with CookieSettingsDialog
const COOKIE_CONSENT_KEY = 'cookie_consent';
const COOKIE_PREFERENCES_KEY = 'cookie_preferences';
const COOLDOWN_KEY = 'cookie_banner_usage';
const COOLDOWN_MINUTES = 0; // Show every time (managed by consent key instead)
const INITIAL_DELAY = 1000;

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  performance: boolean;
}

export function CookieBanner() {
  const [isVisible, setIsVisible] = useCooldown(
    COOLDOWN_KEY,
    COOLDOWN_MINUTES,
    INITIAL_DELAY,
  );

  const [hasConsented, setHasConsented] = useState(false);

  // Check for existing consent preventing display regardless of cooldown
  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent) {
      setHasConsented(true);
      setIsVisible(false); // Also update cooldown state for consistency
    }
  }, [setIsVisible]);

  const handleDismiss = (value: 'necessary' | 'all') => {
    // Set the consent key
    localStorage.setItem(COOKIE_CONSENT_KEY, value);

    // Set the preferences based on choice
    const preferences: CookiePreferences =
      value === 'all'
        ? {necessary: true, functional: true, performance: true}
        : {necessary: true, functional: false, performance: false};

    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences));

    setHasConsented(true);
    setIsVisible(false);
  };

  if (hasConsented || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] bg-white">
      {/* Container */}
      <div className="w-full px-4 py-8 md:p-8 relative">
        {/* Desktop Layout - Grid */}
        <div className="hidden md:flex flex-col gap-10">
          <div className="grid grid-cols-4 gap-6">
            {/* Column 1 - Overview */}
            <div className="flex flex-col gap-2">
              <p className="font-body text-black">Our use of cookies</p>
              <p className="font-body text-black/60">
                NX4.world uses cookies, some are necessary for the operation of
                the website and some are designed to improve your experience.
                For more information,{' '}
                <Link
                  to="/policies"
                  className="underline underline-offset-4 hover:text-black transition-colors"
                >
                  click here
                </Link>
                .
              </p>
            </div>

            {/* Column 2 - Necessary */}
            <div className="flex flex-col gap-2">
              <p className="font-body text-black">Necessary Cookies</p>
              <p className="font-body text-black/60">
                Are essential to move around NX4.world and use its core
                functionality and enhanced features. Without these cookies,
                services you have asked for cannot be provided
              </p>
            </div>

            {/* Column 3 - Functional */}
            <div className="flex flex-col gap-2">
              <p className="font-body text-black">Functional Cookies</p>
              <p className="font-body text-black/60">
                Allow NX4.world to remember choices you make to give you better
                functionality and personal features.
              </p>
            </div>

            {/* Column 4 - Performance */}
            <div className="flex flex-col gap-2">
              <p className="font-body text-black">Performance Cookies</p>
              <p className="font-body text-black/60">
                Help improve the performance of NX4.world by collecting and
                reporting information about how you use the website.
              </p>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => handleDismiss('necessary')}>
              Reject
            </Button>
            <Button variant="box" onClick={() => handleDismiss('all')}>
              Accept
            </Button>
          </div>
        </div>

        {/* Mobile Layout - Stacked */}
        <div className="md:hidden flex flex-col gap-8">
          <div className="flex flex-col gap-8">
            {/* Section 1 - Overview */}
            <div className="flex flex-col gap-2">
              <p className="font-body text-black text-left">
                Our use of cookies
              </p>
              <p className="font-body text-black/60 text-left">
                NX4.world uses cookies, some are necessary for the operation of
                the website and some are designed to improve your experience.
                For more information,{' '}
                <Link
                  to="/policies"
                  className="underline underline-offset-4 hover:text-black transition-colors"
                >
                  click here
                </Link>
                .
              </p>
            </div>

            {/* Section 2 - Necessary */}
            <div className="flex flex-col gap-2">
              <p className="font-body text-black text-left">
                Necessary cookies
              </p>
              <p className="font-body text-black/60 text-left">
                Are essential to move around NX4.world and use its core
                functionality and enhanced features. Without these cookies,
                services you have asked for cannot be provided
              </p>
            </div>

            {/* Section 3 - Functional */}
            <div className="flex flex-col gap-2">
              <p className="font-body text-black text-left">
                Functional Cookies
              </p>
              <p className="font-body text-black/60 text-left">
                Allow NX4.world to remember choices you make to give you better
                functionality and personal features.
              </p>
            </div>

            {/* Section 4 - Performance */}
            <div className="flex flex-col gap-2">
              <p className="font-body text-black text-left">
                Performance Cookies
              </p>
              <p className="font-body text-black/60 text-left">
                Help improve the performance of NX4.world by collecting and
                reporting information about how you use the website.
              </p>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex flex-col gap-3 w-full">
            <Button
              variant="box"
              className="w-full h-[44px] rounded-none border-black text-caption"
              onClick={() => handleDismiss('necessary')}
            >
              Reject
            </Button>
            <Button
              className="w-full h-[44px] rounded-none bg-black text-white hover:bg-black/90 text-caption"
              onClick={() => handleDismiss('all')}
            >
              Accept
            </Button>
          </div>
        </div>

        {/* Close Button (Absolute) */}
        <button
          onClick={() => handleDismiss('necessary')}
          className="absolute top-4 right-4 text-black hover:text-black/60 transition-colors"
          aria-label="Close cookie banner"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
