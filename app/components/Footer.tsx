import {Suspense} from 'react';
import {Await, NavLink} from 'react-router';
import type {HeaderQuery} from 'storefrontapi.generated';
import type {FooterMenuCmsQuery} from 'types/storefrontapi.generated';
import {Logo} from '../assets/Logo';
import {SocialMediaGroup} from './SocialMediaGroup';

interface FooterProps {
  footer: Promise<FooterMenuCmsQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
  footerRef?: React.RefObject<HTMLElement>;
  className?: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
  footerRef,
  className,
}: FooterProps) {
  return (
    <footer
      ref={footerRef}
      className={`w-full bg-primary min-h-dvh px-4 md:px-[120px] flex flex-col ${
        className || ''
      }`}
    >
      <Suspense>
        <Await
          resolve={footerPromise}
          errorElement={<div className="hidden">Footer error</div>}
        >
          {(footer) => (
            <>
              <div className="my-[48px] md:mb-0 flex-1 flex items-center justify-center text-white text-center">
                <NavLink to="/">
                  <Logo className="h-[40px] md:h-[64px] w-auto text-white" />
                </NavLink>
              </div>
              {header.shop.primaryDomain?.url && (
                <FooterMenu
                  footerMenu={footer?.footerMenu}
                  primaryDomainUrl={header.shop.primaryDomain.url}
                  publicStoreDomain={publicStoreDomain}
                />
              )}
              <div className="relative mt-8 md:mt-[120px] py-4 flex flex-row border-t border-strong justify-center">
                <p className="text-detail text-white text-center">
                  {(footer?.footerMenu?.caption?.value || '')
                    .split(/\n|\\n/)
                    .map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && (
                          <>
                            <br className="md:hidden" />
                            <span className="hidden md:inline">&nbsp;</span>
                          </>
                        )}
                      </span>
                    ))}
                </p>
              </div>
            </>
          )}
        </Await>
      </Suspense>
    </footer>
  );
}
function FooterMenu({
  footerMenu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  footerMenu: FooterMenuCmsQuery['footerMenu'];
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: string;
}) {
  // Get groups from CMS data
  const groups = footerMenu?.groups?.references?.nodes || [];
  return (
    <nav
      className="grid grid-cols-2 md:flex md:flex-row justify-between gap-x-4 gap-y-8 md:gap-4 mb-8 md:mb-0 px-6 md:px-4"
      role="navigation"
    >
      {groups.map((group, index) => {
        const title = group.title?.value;
        const items = group.items?.references?.nodes || [];

        if (!title) return null;

        return (
          <div key={group.id} className="flex flex-col gap-4 flex-1">
            <p className="text-body-regular text-secondary">{title}</p>
            <div className="flex flex-col gap-1">
              {items.map((item) => {
                const label = item.label?.value;
                const internalUrl = item.internalUrl?.value;
                const externalUrl = item.externalUrl?.value;
                const productHandle = item.referencedProduct?.reference?.handle;

                // Must have a label and at least one URL source
                if (!label) return null;
                if (!productHandle && !internalUrl && !externalUrl) return null;

                // Determine the URL to use
                // Priority: Referenced Product > Internal URL > External URL
                let url = '#';
                if (productHandle) {
                  url = `/products/${productHandle}`;
                } else if (internalUrl) {
                  // If the url is internal, we strip the domain
                  url =
                    internalUrl.includes('myshopify.com') ||
                    internalUrl.includes(publicStoreDomain) ||
                    internalUrl.includes(primaryDomainUrl)
                      ? new URL(internalUrl).pathname
                      : internalUrl;
                } else if (externalUrl) {
                  url = externalUrl;
                }

                // Only external if no productHandle and no internalUrl
                const isExternal =
                  !productHandle && !internalUrl && !!externalUrl;

                return isExternal ? (
                  <a
                    href={url}
                    key={item.id}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-cta text-white hover:text-gray-300 transition-colors"
                  >
                    {label}
                  </a>
                ) : (
                  <NavLink
                    end
                    key={item.id}
                    prefetch="intent"
                    style={activeLinkStyle}
                    to={url}
                    className="text-cta"
                  >
                    {label}
                  </NavLink>
                );
              })}
            </div>
            {/* render social media at the last menu */}
            {index === groups.length - 1 && (
              <SocialMediaGroup className="mt-8" />
            )}
          </div>
        );
      })}
    </nav>
  );
}

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}
