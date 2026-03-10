import {Image} from '@shopify/hydrogen';
import {X, CheckCircle, AlertCircle, Loader2, ChevronRight} from 'lucide-react';
import {Await, Link, useFetcher} from 'react-router';
import {Suspense, useState, useEffect} from 'react';
import {useCooldown} from '~/lib/hooks/useCooldown';
import type {GlobalNewsletterPopupCmsQuery} from 'types/storefrontapi.generated';
import {AnimatePresence, motion} from 'motion/react';
import {cn} from '~/lib/utils';

// Unique key for this component in localStorage
const STORAGE_KEY = 'newsletter_popup';
// Cooldown period in minutes (10 minutes)
const COOLDOWN_MINUTES = 0;
// Initial delay before showing popup (2 seconds)
const INITIAL_DELAY = 2000;
// Additional delay before rendering (25 seconds)
const ADDITIONAL_DELAY_MS = 0;

function NewsletterPopup({
  globalNewsletterPopupPromise,
}: {
  globalNewsletterPopupPromise: Promise<GlobalNewsletterPopupCmsQuery | null>;
}) {
  // Use the cooldown hook to manage visibility
  const [isVisible, setIsVisible] = useCooldown(
    STORAGE_KEY,
    COOLDOWN_MINUTES,
    INITIAL_DELAY,
  );

  // Additional state for the 25-second delay
  const [showAfterDelay, setShowAfterDelay] = useState(false);

  // Use fetcher for form submission
  const fetcher = useFetcher();

  // Helper functions to determine state
  const isLoading =
    fetcher.state === 'submitting' || fetcher.state === 'loading';
  const isSuccess = fetcher.state === 'idle' && fetcher.data?.success;
  const isError = fetcher.state === 'idle' && fetcher.data?.error;
  const errorMessage = isError ? fetcher.data.error : '';

  // Effect to handle the additional 25-second delay
  useEffect(() => {
    // Only start the timer if the component is visible from cooldown
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowAfterDelay(true);
      }, ADDITIONAL_DELAY_MS);

      // Clean up the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <Suspense>
      <Await resolve={globalNewsletterPopupPromise}>
        {(data) =>
          data?.globalNewsletterPopup?.display?.value === 'true' && (
            <AnimatePresence>
              {isVisible && showAfterDelay && (
                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                  {/* Overlay for mobile */}
                  <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    className="block md:hidden fixed inset-0 bg-black/40 pointer-events-auto"
                    onClick={() => setIsVisible(false)}
                  />

                  {/* Popup Container */}
                  <motion.div
                    initial={{
                      x: 'var(--x-from)',
                      y: 'var(--y-from)',
                    }}
                    animate={{x: 0, y: 0}}
                    exit={{
                      x: 'var(--x-from)',
                      y: 'var(--y-from)',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 131,
                      damping: 12,
                      mass: 1,
                    }}
                    className={cn(
                      '[--x-from:0px] [--y-from:100%] md:[--x-from:400px] md:[--y-from:0px]',
                      'pointer-events-auto w-full md:w-[310px] h-fit fixed bottom-0 left-0 right-0 md:inset-auto md:bottom-8 md:right-8 bg-white flex flex-col shadow-2xl',
                    )}
                  >
                    {/* Close Button */}
                    <button
                      onClick={() => setIsVisible(false)}
                      className="absolute top-3 right-3 z-10 w-6 h-6 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                      aria-label="Close newsletter popup"
                    >
                      <X size={18} strokeWidth={1.5} />
                    </button>

                    {/* Image Section */}
                    <div className="relative w-full h-[188px] shrink-0">
                      <Image
                        data={
                          data?.globalNewsletterPopup?.image?.reference
                            ?.image ?? undefined
                        }
                        sizes="310px"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col gap-2 px-4 pt-3 pb-[80px] md:pb-6">
                      {/* Text Block */}
                      <div className="flex flex-col gap-6">
                        {/* Description */}
                        <p className="text-black">
                          {data?.globalNewsletterPopup?.description?.value}
                        </p>

                        {/* Form */}
                        <fetcher.Form
                          method="POST"
                          action="/newsletter/subscribe"
                          className="flex flex-col gap-6"
                        >
                          {isSuccess ? (
                            <div className="flex items-center justify-center gap-2 py-3 bg-green-50 text-green-700">
                              <CheckCircle size={14} />
                              <span className="text-detail">
                                Thank you for subscribing!
                              </span>
                            </div>
                          ) : (
                            <div className="relative">
                              <input
                                name="email"
                                type="email"
                                placeholder="Your Email"
                                required
                                disabled={isLoading}
                                className="w-full h-[44px] border-b border-black/20 bg-transparent text-body-regular text-black placeholder:text-black/40 focus:outline-none focus:border-black pr-8 transition-colors"
                              />
                              <button
                                type="submit"
                                disabled={isSuccess || isLoading}
                                className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-black/60 hover:text-black transition-colors disabled:opacity-50"
                                aria-label="Submit email"
                              >
                                {isLoading ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <ChevronRight size={18} strokeWidth={1.5} />
                                )}
                              </button>
                            </div>
                          )}

                          {isError && (
                            <div className="flex items-center gap-2 text-red-600">
                              <AlertCircle size={12} />
                              <span className="text-detail">
                                {errorMessage ||
                                  'Subscription failed. Please try again.'}
                              </span>
                            </div>
                          )}
                        </fetcher.Form>
                      </div>

                      {/* Caption */}
                      <div className="text-detail">
                        {data?.globalNewsletterPopup?.caption?.value
                          ?.split(/(\[[^\]]+\]\([^)]+\))/g)
                          .map((part, index) => {
                            const match = part.match(
                              /^\[([^\]]+)\]\(([^)]+)\)$/,
                            );
                            if (match) {
                              const [_, text, url] = match;
                              const isExternal =
                                url.startsWith('http') || url.startsWith('www');

                              if (isExternal) {
                                return (
                                  <a
                                    key={index}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:opacity-80 transition-opacity"
                                  >
                                    {text}
                                  </a>
                                );
                              }

                              return (
                                <Link
                                  key={index}
                                  to={url}
                                  className="underline hover:opacity-80 transition-opacity"
                                >
                                  {text}
                                </Link>
                              );
                            }
                            return part;
                          })}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          )
        }
      </Await>
    </Suspense>
  );
}

export default NewsletterPopup;
