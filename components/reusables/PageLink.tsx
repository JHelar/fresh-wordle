/** @jsx h */
import { ComponentFactory, h } from "preact";
import { tw } from "@twind";

type PageLinkProps = {
  href: string;
};

export const PageLink: ComponentFactory<PageLinkProps> = (
  { children, href },
) => (
  <a
    href={href}
    class={tw
      `text-lg text-current hover:text-green-300 focus:text-green-300 focus:underline focus:outline-none`}
  >
    {children}
  </a>
);
