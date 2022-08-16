/** @jsx h */
import { ComponentFactory, h } from "preact";
import { tw } from "@twind";

export const PageTitle: ComponentFactory = ({ children }) => (
  <h1 class={tw`text-4xl mb-5`}>{children}</h1>
);
