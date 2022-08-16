/** @jsx h */
import { ComponentFactory, h } from "preact";
import { AppProps } from "$fresh/server.ts";

const App: ComponentFactory<AppProps> = ({ Component }) => (
  <html class="dark maybe">
    <Component />
  </html>
);

export default App;
