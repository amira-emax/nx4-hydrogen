import {Image} from '@shopify/hydrogen';
import {Await} from 'react-router';
import {Suspense} from 'react';
import {useRouteLoaderData} from 'react-router';
import type {RootLoader} from '~/root';
import {cn} from '~/lib/utils';

export function SocialMediaGroup({className}: {className?: string}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  const socialMediaPromise = rootData?.globalSocialMedias;

  return (
    <Suspense>
      <Await resolve={socialMediaPromise}>
        {(socialMedias) => {
          const label = socialMedias?.globalSocialMedias?.label?.value;
          const items =
            socialMedias?.globalSocialMedias?.platforms?.references?.nodes ||
            [];

          return (
            <div className={cn('text-white space-y-4', className)}>
              <div className="text-body-regular text-secondary">{label}</div>
              <div className="flex gap-4 items-center justify-start">
                {items.map((item) => {
                  if (item?.logo?.reference?.image && item?.url?.value) {
                    return (
                      <a
                        key={item.id}
                        href={item.url.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:opacity-80 transition-opacity"
                      >
                        <Image
                          data={item.logo.reference.image}
                          alt={label || undefined}
                          className="bg-transparent w-6 h-6 object-contain"
                          sizes="24px"
                          draggable={false}
                        />
                      </a>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
