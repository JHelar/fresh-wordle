/** @jsx h */
/** @jsxFrag Fragment */
import { ComponentFactory, Fragment, h } from "preact";
import { tw } from "@twind";
import { PageTitle } from "./PageTitle.tsx";
import { Head } from "$fresh/src/runtime/head.ts";

type PageLayoutProps = {
  title?: string;
};

const SITE_NAME = "J.H.E.L";

export const PageLayout: ComponentFactory<PageLayoutProps> = (
  { children, title },
) => (
  <>
    <Head>
      <title>{SITE_NAME}{title === undefined ? "" : " | "}{title}</title>
    </Head>
    <div
      class={tw`bg-gray-900 w-screen min-h-screen text-white`}
    >
      <div
        class={tw
          `container min-h-full mx-auto lg:px-40 md:px-20 px-10 py-8 flex flex-col`}
      >
        <PageTitle>
          <a
            href="/"
            class={tw
              `text-current hover:text-green-300 focus:text-green-300 focus:underline focus:outline-none`}
          >
            {SITE_NAME}
          </a>
          {title !== undefined && (
            <span class={tw`pl-4 ml-4 border-l-2`}>{title}</span>
          )}
        </PageTitle>
        {children}
      </div>
    </div>
  </>
);
