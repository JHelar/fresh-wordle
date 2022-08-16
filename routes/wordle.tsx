/** @jsx h */
import { h } from "preact";
import Game from "../islands/Game.tsx";
import { PageLayout } from "@components";
import { tw } from "@twind";

export default () => (
  <PageLayout title={"Wordle"}>
    <div class={tw`w-full flex justify-start md:justify-center`}>
      <Game />
    </div>
  </PageLayout>
);
