import type { Metadata } from "next";
import { PageView } from "@/components/PageView";
import { getPage } from "@/lib/pages";
import { summary } from "@/lib/site";

const page = getPage("/")!;

export const metadata: Metadata = {
  title: page.title,
  description: summary(page.covers),
};

export default function Home() {
  return <PageView page={page} />;
}
