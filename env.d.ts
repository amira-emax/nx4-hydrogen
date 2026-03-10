/// <reference types="vite/client" />
/// <reference types="react-router" />
/// <reference types="@shopify/oxygen-workers-types" />
/// <reference types="@shopify/hydrogen/react-router-types" />

// Enhance TypeScript's built-in typings.
import '@total-typescript/ts-reset';

// Add custom environment variables
declare global {
  interface Env {
    STORE_PASSWORD?: string;
    // Page CMS
    HOME_PAGE_CMS_SLUG?: string;
    ORIGINS_PAGE_CMS_SLUG?: string;
    CONTACT_US_PAGE_CMS_SLUG?: string;
    // Global CMS
    GLOBAL_BANNER_CMS_SLUG?: string;
    GLOBAL_NEWSLETTER_POPUP_CMS_SLUG?: string;
    GLOBAL_DESKTOP_HEADER_CMS_SLUG?: string;
    GLOBAL_MOBILE_MENU_CMS_SLUG?: string;
    GLOBAL_FOOTER_CMS_SLUG?: string;
    GLOBAL_SOCIAL_MEDIAS_CMS_SLUG?: string;
  }
}
