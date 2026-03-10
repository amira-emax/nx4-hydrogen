import {X} from 'lucide-react';
import {Button} from '../ui/button';
import {Suspense, useEffect, useRef} from 'react';
import {Await} from 'react-router';
import type {GlobalBannerCmsQuery} from 'types/storefrontapi.generated';
import {useCooldown} from '~/lib/hooks/useCooldown';

// Unique key for this component in localStorage
const STORAGE_KEY = 'promo_banner';
// Cooldown period in minutes (10 minutes)
const COOLDOWN_MINUTES = 10;

interface BannerProps {
  globalBannerPromise: Promise<GlobalBannerCmsQuery | null>;
}

export function Banner({globalBannerPromise}: BannerProps) {
  // Use the cooldown hook to manage visibility with localStorage persistence
  const [isVisible, setIsVisible] = useCooldown(STORAGE_KEY, COOLDOWN_MINUTES);
  const bannerRef = useRef<HTMLDivElement>(null);

  // Set the global banner height CSS variable so other components can use it
  useEffect(() => {
    if (isVisible && bannerRef.current) {
      const height = bannerRef.current.offsetHeight;
      document.documentElement.style.setProperty(
        '--global-banner-height',
        `${height}px`,
      );
    }

    return () => {
      document.documentElement.style.setProperty(
        '--global-banner-height',
        '0px',
      );
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Suspense>
      <Await resolve={globalBannerPromise}>
        {(data) =>
          data?.globalBanner?.display?.value === 'true' && (
            <div
              ref={bannerRef}
              className="sticky top-0 z-10 flex overflow-hidden bg-accent py-3"
            >
              <BannerContent
                content={data?.globalBanner?.content?.value || ''}
                className="animate-marquee"
              />
              <BannerContent
                content={data?.globalBanner?.content?.value || ''}
                className="animate-marquee"
                aria-hidden
              />
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-linear-to-r from-transparent to-accent" />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-0 top-1/2 z-20 -translate-y-1/2"
                onClick={() => setIsVisible(false)}
              >
                <X />
              </Button>
            </div>
          )
        }
      </Await>
    </Suspense>
  );
}

function BannerContent({
  content,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {content: string}) {
  return (
    <div
      className={`flex min-w-full shrink-0 items-center justify-around gap-24 px-12 ${
        className || ''
      }`}
      {...props}
    >
      {Array(4)
        .fill(content)
        .map((msg, i) => (
          <div key={i} className="flex items-center gap-24">
            <span className="text-caption shrink-0">{msg}</span>
          </div>
        ))}
    </div>
  );
}
