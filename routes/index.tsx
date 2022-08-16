/** @jsx h */
import { h } from "preact";
import { PageLayout, PageLink, PageTitle, SubTitle } from "@components";
import { tw } from "@twind";

export default function Home() {
  return (
    <PageLayout>
      <section>
        <SubTitle>Doodles</SubTitle>
        <PageLink href="/wordle">Wordle</PageLink>
      </section>
    </PageLayout>
  );
}
