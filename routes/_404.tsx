/** @jsx h */
import { h } from "preact";
import { PageLayout, SubTitle } from "@components";

export default function Home() {
  return (
    <PageLayout title="404">
      <SubTitle>There is no content here.</SubTitle>
    </PageLayout>
  );
}
