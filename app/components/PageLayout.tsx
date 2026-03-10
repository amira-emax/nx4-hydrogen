import {X} from 'lucide-react';
import {AnimatePresence} from 'motion/react';
import {Suspense, useEffect, useRef, useState} from 'react';
import {Await, Link, useLocation} from 'react-router';
import type {CartApiQueryFragment, HeaderQuery} from 'storefrontapi.generated';
import type {
  FooterMenuCmsQuery,
  GlobalBannerCmsQuery,
  GlobalDesktopHeaderCmsQuery,
  GlobalNewsletterPopupCmsQuery,
  MobileMenuCmsQuery,
} from 'types/storefrontapi.generated';
import {CartMain} from '~/components/CartMain';
import {Footer} from '~/components/Footer';
import {Header} from '~/components/Header';
import {SheetProvider, useSheet} from '~/components/SheetContext';
import {Sheet, SheetContent} from '~/components/ui/sheet';
import {CookieBanner} from './cms/CookieBanner';
import NewsletterPopup from './cms/NewsletterPopup';
import {SocialMediaGroup} from './SocialMediaGroup';

interface PageLayoutProps {
  cart: Promise<CartApiQueryFragment | null>;
  mobileMenu: Promise<MobileMenuCmsQuery | null>;
  footer: Promise<FooterMenuCmsQuery | null>;
  header: HeaderQuery;
  globalDesktopHeader: GlobalDesktopHeaderCmsQuery;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  globalBanner: Promise<GlobalBannerCmsQuery | null>;
  globalNewsletterPopup: Promise<GlobalNewsletterPopupCmsQuery | null>;
  children?: React.ReactNode;
}

export function PageLayout({
  cart,
  children = null,
  mobileMenu,
  footer,
  header,
  globalDesktopHeader,
  isLoggedIn,
  publicStoreDomain,
  globalBanner,
  globalNewsletterPopup,
}: PageLayoutProps) {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [isContentVisible, setIsContentVisible] = useState(true);

  const [isMobile, setIsMobile] = useState(false);

  const location = useLocation();
  const isSolidHeader =
    location.pathname.startsWith('/products/') ||
    location.pathname.startsWith('/stories') ||
    location.pathname.startsWith('/policies') ||
    location.pathname.startsWith('/account') ||
    location.pathname.startsWith('/policy') ||
    location.pathname === '/contact-us' ||
    (location.pathname === '/collections/all' && isMobile);

  // Measure Footer & Window & Viewport
  useEffect(() => {
    const calculate = () => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
      setWindowHeight(window.innerHeight);
      setIsMobile(window.innerWidth < 768);
    };

    calculate();

    if (footerRef.current) {
      const resizeObserver = new ResizeObserver(calculate);
      resizeObserver.observe(footerRef.current);
      return () => {
        resizeObserver.disconnect();
        window.removeEventListener('resize', calculate);
      };
    }

    window.addEventListener('resize', calculate);

    return () => {
      window.removeEventListener('resize', calculate);
    };
  }, []);

  // Monitor Content Visibility (for Tall Footer switch)
  useEffect(() => {
    if (!contentRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsContentVisible(entry.isIntersecting);
      },
      {
        root: null, // viewport
        threshold: 0, // trigger as soon as even 1px is visible vs not
      },
    );

    observer.observe(contentRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const isTall = footerHeight > windowHeight;
  // If footer is tall, we switch to static when content is fully scrolled off (not visible).
  // If footer is short, we keep fixed bottom specific logic regardless (always "reveal").
  const showStatic = isTall && !isContentVisible;

  // Class for Footer:
  // Short -> "Fixed Bottom"
  // Tall + Visible Content -> "Fixed Top" (Reveal effect from top)
  // Tall + Hidden Content -> "Relative" (Normal scroll)
  let footerClass = 'relative z-0'; // fallback
  if (showStatic) {
    footerClass = 'relative z-0';
  } else if (isTall) {
    footerClass = 'fixed top-0 z-0';
  } else {
    // Short footer default: Reveal from bottom
    footerClass = 'fixed bottom-0 z-0';
  }

  return (
    <SheetProvider>
      <LayoutContent
        cart={cart}
        mobileMenu={mobileMenu}
        header={header}
        footer={footer}
        publicStoreDomain={publicStoreDomain}
        isLoggedIn={isLoggedIn}
      />
      <main className="relative">
        <div ref={contentRef} className="bg-background min-h-dvh relative z-10">
          {header && (
            <Header
              header={header}
              globalDesktopHeader={globalDesktopHeader}
              cart={cart}
              isLoggedIn={isLoggedIn}
              publicStoreDomain={publicStoreDomain}
              globalBanner={globalBanner}
              forceSolidBackground={isSolidHeader}
            />
          )}
          {children}
        </div>
        <div
          className="pointer-events-none"
          style={{height: showStatic ? 0 : footerHeight}}
        />
        <Footer
          footerRef={footerRef}
          className={footerClass}
          footer={footer}
          header={header}
          publicStoreDomain={publicStoreDomain}
        />
        <CookieBanner />
      </main>
      <NewsletterPopup globalNewsletterPopupPromise={globalNewsletterPopup} />
    </SheetProvider>
  );
}

function LayoutContent({
  cart,
  mobileMenu,
  header,
  footer,
  publicStoreDomain,
  isLoggedIn,
}: {
  cart: PageLayoutProps['cart'];
  mobileMenu: PageLayoutProps['mobileMenu'];
  header: PageLayoutProps['header'];
  footer: PageLayoutProps['footer'];
  publicStoreDomain: string;
  isLoggedIn: Promise<boolean>;
}) {
  const {type, close} = useSheet();

  const isExpanded = type !== 'closed';

  return (
    <Sheet open={isExpanded} onOpenChange={(open) => !open && close()}>
      <AnimatePresence>
        {isExpanded && (
          <SheetContent
            side={type === 'mobile' ? 'left' : 'right'}
            className="w-full sm:w-[500px] p-0"
          >
            {type === 'cart' && <CartSheet cart={cart} />}
            {type === 'mobile' && (
              <MobileMenuSheet
                mobileMenu={mobileMenu}
                publicStoreDomain={publicStoreDomain}
              />
            )}
          </SheetContent>
        )}
      </AnimatePresence>
    </Sheet>
  );
}

function CartSheet({cart}: {cart: PageLayoutProps['cart']}) {
  return (
    <div className="flex flex-col h-full">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </div>
  );
}

function MobileMenuSheet({
  publicStoreDomain,
  mobileMenu,
}: {
  mobileMenu: PageLayoutProps['mobileMenu'];
  publicStoreDomain: string;
}) {
  const {close} = useSheet();

  return (
    <div className="h-full flex flex-col bg-white">
      <header className="bg-black text-[#f7e6ca] flex items-center justify-between px-4 py-3 shrink-0 h-[42px] box-content">
        <div className="flex-1 flex justify-end">
          <button
            onClick={close}
            className="text-white hover:opacity-80 p-1 flex items-center justify-center"
            aria-label="Close menu"
          >
            <X className="w-4 h-4 text-accent" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col overflow-y-auto">
        <Suspense fallback={<div className="p-6">Loading...</div>}>
          <Await resolve={mobileMenu}>
            {(mobileMenu) => {
              const items =
                mobileMenu?.mobileMenu?.items?.references?.nodes || [];
              const firstSecondaryIndex = items.findIndex(
                (item: any) => item.border?.value !== 'true',
              );
              return (
                <nav className="flex flex-col w-full">
                  {items.map((item: any, index: number) => {
                    const label = item.label?.value;
                    const internalUrl = item.internalUrl?.value;
                    const externalUrl = item.externalUrl?.value;
                    const productHandle =
                      item.referencedProduct?.reference?.handle;
                    const hasBorder = item.border?.value === 'true';

                    // Must have a label
                    if (!label) return null;

                    // Determine the URL to use
                    let url = '#';
                    if (productHandle) {
                      url = `/products/${productHandle}`;
                    } else if (internalUrl) {
                      url =
                        internalUrl.includes('myshopify.com') ||
                        internalUrl.includes(publicStoreDomain)
                          ? new URL(internalUrl).pathname
                          : internalUrl;
                    } else if (externalUrl) {
                      url = externalUrl;
                    }

                    const isExternal =
                      !productHandle && !internalUrl && !!externalUrl;

                    // Main Link Style (Bordered)
                    if (hasBorder) {
                      return (
                        <div
                          key={item.id}
                          className="px-3 py-6 border-b border-secondary"
                        >
                          {isExternal ? (
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cta block text-left"
                              onClick={close}
                            >
                              {label}
                            </a>
                          ) : (
                            <Link
                              to={url}
                              onClick={close}
                              prefetch="intent"
                              className="text-cta block text-left"
                            >
                              {label}
                            </Link>
                          )}
                        </div>
                      );
                    }

                    // Secondary Link Style (No Border)
                    return (
                      <div
                        key={item.id}
                        className={`px-3 py-1 w-full text-left ${
                          index === firstSecondaryIndex ? 'mt-[24px]' : ''
                        }`}
                      >
                        {isExternal ? (
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-body-regular text-black"
                            onClick={close}
                          >
                            {label}
                          </a>
                        ) : (
                          <Link
                            to={url}
                            onClick={close}
                            prefetch="intent"
                            className="text-cta"
                          >
                            {label}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </nav>
              );
            }}
          </Await>
        </Suspense>

        <div className="mt-auto pt-6 pb-8 px-3">
          <SocialMediaGroup className="text-black" />
        </div>
      </div>
    </div>
  );
}

// function SearchAside() {
//   const queriesDatalistId = useId();
//   const {close} = useSheet();

//   return (
//     <div className="flex flex-col h-full">
//       <header className="flex items-center justify-between px-5 h-[58px] border-b border-dark">
//         <h3 className="m-0">SEARCH</h3>
//         <button
//           className="reset w-5 font-bold opacity-80 hover:opacity-100 transition-opacity"
//           onClick={close}
//           aria-label="Close"
//         >
//           &times;
//         </button>
//       </header>
//       <main className="flex-1 min-h-0">
//         <div className="predictive-search">
//           <br />
//           <SearchFormPredictive>
//             {({fetchResults, goToSearch, inputRef}) => (
//               <>
//                 <input
//                   name="q"
//                   onChange={fetchResults}
//                   onFocus={fetchResults}
//                   placeholder="Search"
//                   ref={inputRef}
//                   type="search"
//                   list={queriesDatalistId}
//                 />
//                 &nbsp;
//                 <button onClick={goToSearch}>Search</button>
//               </>
//             )}
//           </SearchFormPredictive>

//           <SearchResultsPredictive>
//             {({items, total, term, state, closeSearch}) => {
//               const {articles, collections, pages, products, queries} = items;

//               if (state === 'loading' && term.current) {
//                 return <div>Loading...</div>;
//               }

//               if (!total) {
//                 return <SearchResultsPredictive.Empty term={term} />;
//               }

//               return (
//                 <>
//                   <SearchResultsPredictive.Queries
//                     queries={queries}
//                     queriesDatalistId={queriesDatalistId}
//                   />
//                   <SearchResultsPredictive.Products
//                     products={products}
//                     closeSearch={closeSearch}
//                     term={term}
//                   />
//                   <SearchResultsPredictive.Collections
//                     collections={collections}
//                     closeSearch={closeSearch}
//                     term={term}
//                   />
//                   <SearchResultsPredictive.Pages
//                     pages={pages}
//                     closeSearch={closeSearch}
//                     term={term}
//                   />
//                   <SearchResultsPredictive.Articles
//                     articles={articles}
//                     closeSearch={closeSearch}
//                     term={term}
//                   />
//                   {term.current && total ? (
//                     <Link
//                       onClick={closeSearch}
//                       to={`${SEARCH_ENDPOINT}?q=${term.current}`}
//                     >
//                       <p>
//                         View all results for <q>{term.current}</q>
//                         &nbsp; →
//                       </p>
//                     </Link>
//                   ) : null}
//                 </>
//               );
//             }}
//           </SearchResultsPredictive>
//         </div>
//       </main>
//     </div>
//   );
// }
