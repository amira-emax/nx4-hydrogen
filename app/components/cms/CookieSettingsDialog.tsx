import {useState, useEffect} from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '~/components/ui/dialog';
import {Button} from '~/components/ui/button';
import {Switch} from '~/components/ui/switch';
import {Link} from 'react-router';

const COOKIE_CONSENT_KEY = 'cookie_consent';
const COOKIE_PREFERENCES_KEY = 'cookie_preferences';

interface CookiePreferences {
  necessary: boolean; // Always true, can't be disabled
  functional: boolean;
  performance: boolean;
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  functional: true,
  performance: true,
};

interface CookieSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CookieSettingsDialog({
  open,
  onOpenChange,
}: CookieSettingsDialogProps) {
  const [preferences, setPreferences] =
    useState<CookiePreferences>(defaultPreferences);

  // Load saved preferences on mount
  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setPreferences({...defaultPreferences, ...parsed, necessary: true});
        }
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences));
    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      preferences.functional && preferences.performance ? 'all' : 'necessary',
    );
    onOpenChange(false);
  };

  const handleAcceptAll = () => {
    const allEnabled: CookiePreferences = {
      necessary: true,
      functional: true,
      performance: true,
    };
    setPreferences(allEnabled);
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(allEnabled));
    localStorage.setItem(COOKIE_CONSENT_KEY, 'all');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-body-regular tracking-[1.5px] text-center">
            Cookie Settings
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          {/* Overview */}
          <div className="flex flex-col gap-2">
            <p className="text-body-regular text-black/60">
              NX4.world uses cookies, some are necessary for the operation of
              the website and some are designed to improve your experience. For
              more information,{' '}
              <Link
                to="/policies"
                className="underline underline-offset-4 hover:text-black transition-colors"
              >
                click here
              </Link>
              .
            </p>
          </div>

          {/* Necessary Cookies - Always On */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-black/10">
            <div className="flex flex-col gap-1">
              <p className="text-body-regular font-medium text-black">
                Necessary Cookies
              </p>
              <p className="text-body-regular text-black/60">
                Are essential to move around NX4.world and use its core
                functionality and enhanced features. Without these cookies,
                services you have asked for cannot be provided.
              </p>
            </div>
            <Switch
              checked={preferences.necessary}
              disabled
              className="shrink-0"
            />
          </div>

          {/* Functional Cookies */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-black/10">
            <div className="flex flex-col gap-1">
              <p className="text-body-regular font-medium text-black">
                Functional Cookies
              </p>
              <p className="text-body-regular text-black/60">
                Allow NX4.world to remember choices you make to give you better
                functionality and personal features.
              </p>
            </div>
            <Switch
              checked={preferences.functional}
              onCheckedChange={() => handleToggle('functional')}
              className="shrink-0"
            />
          </div>

          {/* Performance Cookies */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-body-regular font-medium text-black">
                Performance Cookies
              </p>
              <p className="text-body-regular text-black/60">
                Help improve the performance of NX4.world by collecting and
                reporting information about how you use the website.
              </p>
            </div>
            <Switch
              checked={preferences.performance}
              onCheckedChange={() => handleToggle('performance')}
              className="shrink-0"
            />
          </div>
        </div>

        <DialogFooter className="flex-row gap-3">
          <Button variant="ghost" onClick={handleSave}>
            Save preferences
          </Button>
          <Button variant="box" onClick={handleAcceptAll}>
            Accept all
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
