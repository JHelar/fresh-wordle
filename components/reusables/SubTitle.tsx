/** @jsx h */
import { ComponentFactory, h } from "preact";
import { tw } from "@twind";

export const SubTitle: ComponentFactory = ({ children }) => (
  <h2 class={tw`text-3xl mb-3`}>{children}</h2>
);
