import {Suspense, useState, useEffect, useRef} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import type {
  GlobalBannerCmsQuery,
  GlobalDesktopHeaderCmsQuery,
} from 'types/storefrontapi.generated';
import {useSheet} from '~/components/SheetContext';
import {Menu, User} from 'lucide-react';
import {cn} from '~/lib/utils';
import {Button} from './ui/button';
import {Banner} from './cms/Banner';
import {Logo} from '../assets/Logo';

interface HeaderProps {
  header: HeaderQuery;
  globalDesktopHeader: GlobalDesktopHeaderCmsQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  globalBanner: Promise<GlobalBannerCmsQuery | null>;
  forceSolidBackground?: boolean;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  globalDesktopHeader,
  isLoggedIn,
  cart,
  publicStoreDomain,
  globalBanner,
  forceSolidBackground,
}: HeaderProps) {
  const {shop, menu} = header;
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Simple threshold to avoid jitter
      if (Math.abs(currentScrollY - lastScrollY.current) < 10) {
        return;
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down & past top
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 w-full z-10 flex flex-col transition-all duration-300">
      <Banner globalBannerPromise={globalBanner} />
      <header
        className={cn(
          'group h-header pl-4 md:pl-10 flex items-center justify-between transition-all duration-300',
          forceSolidBackground
            ? 'bg-white text-black'
            : 'bg-transparent text-white hover:bg-white hover:text-black',
          isVisible ? 'translate-y-0' : '-translate-y-full',
        )}
        data-header-solid={forceSolidBackground}
        role="banner"
      >
        <div className="flex-1 flex justify-start">
          {/* desktop */}
          <HeaderMenu
            globalDesktopHeader={globalDesktopHeader}
            viewport="desktop"
            primaryDomainUrl={header.shop.primaryDomain.url}
            publicStoreDomain={publicStoreDomain}
          />
          {/* mobile */}
          <HeaderMenuMobileToggle />
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <NavLink
            prefetch="intent"
            to="/"
            style={activeLinkStyle}
            end
            className="no-underline!"
          >
            <Logo className="w-[80px] transition-colors duration-300 text-white group-hover:text-black group-data-[header-solid=true]:text-black" />
          </NavLink>
        </div>

        <div className="flex-1 flex justify-end h-full">
          <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
        </div>
      </header>
    </div>
  );
}

export function HeaderMenu({
  globalDesktopHeader,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  globalDesktopHeader: HeaderProps['globalDesktopHeader'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const className = cn(
    viewport === 'mobile'
      ? 'flex flex-col gap-4 items-start'
      : 'hidden md:flex gap-8 items-center',
  );
  const {close} = useSheet();

  const textColorClass =
    viewport === 'mobile'
      ? 'text-black'
      : 'text-white hover:text-gray-200 group-hover:text-black group-hover:hover:text-gray-700 group-data-[header-solid=true]:text-black group-data-[header-solid=true]:hover:text-gray-700';

  const items =
    globalDesktopHeader?.globalDesktopHeader?.items?.references?.nodes || [];

  return (
    <nav className={className} role="navigation">
      {items.map((item: any) => {
        const label = item.label?.value;
        const internalUrl = item.internalUrl?.value;
        const externalUrl = item.externalUrl?.value;
        const productHandle = item.referencedProduct?.reference?.handle;

        if (!label) return null;

        let url = '#';
        if (productHandle) {
          url = `/products/${productHandle}`;
        } else if (internalUrl) {
          url =
            internalUrl.includes('myshopify.com') ||
            internalUrl.includes(publicStoreDomain) ||
            internalUrl.includes(primaryDomainUrl)
              ? new URL(internalUrl).pathname
              : internalUrl;
        } else if (externalUrl) {
          url = externalUrl;
        }

        const isExternal = !productHandle && !internalUrl && !!externalUrl;

        if (isExternal) {
          return (
            <a
              key={item.id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'font-normal transition-colors duration-300 select-none',
                textColorClass,
              )}
              onClick={close}
            >
              {label}
            </a>
          );
        }

        return (
          <NavLink
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            <p
              className={cn(
                'font-normal transition-colors duration-300 select-none',
                textColorClass,
              )}
            >
              {label}
            </p>
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="flex items-center gap-6" role="navigation">
      <NavLink
        prefetch="intent"
        to="/account"
        style={activeLinkStyle}
        className="hidden md:block"
      >
        <Suspense
          fallback={
            <User
              strokeWidth={1}
              className="w-5 h-5 transition-colors duration-300 text-white group-hover:text-black group-data-[header-solid=true]:text-black"
            />
          }
        >
          <Await
            resolve={isLoggedIn}
            errorElement={
              <User
                strokeWidth={1}
                className="w-5 h-5 transition-colors duration-300 text-white group-hover:text-black group-data-[header-solid=true]:text-black"
              />
            }
          >
            {(isLoggedIn) => (
              <User
                strokeWidth={1}
                className="w-5 h-5 transition-colors duration-300 text-white group-hover:text-black group-data-[header-solid=true]:text-black"
              />
            )}
          </Await>
        </Suspense>
      </NavLink>
      {/* <SearchToggle /> */}
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useSheet();
  return (
    <button className="reset md:hidden" onClick={() => open('mobile')}>
      <Menu className="w-8 h-8" />
    </button>
  );
}

function SearchToggle() {
  const {open} = useSheet();
  return (
    <button
      className="reset transition-colors duration-300 text-white group-hover:text-black group-data-[header-solid=true]:text-black"
      onClick={() => open('search')}
    >
      Search
    </button>
  );
}

function CartBadge({count}: {count: number | null}) {
  const {open} = useSheet();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
      className="h-full"
    >
      <Button variant="filled" size="sm" className="h-full! px-[40px]">
        Cart ({count === null ? 0 : count})
      </Button>
    </a>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    opacity: isPending ? 0.5 : 1,
  };
}
