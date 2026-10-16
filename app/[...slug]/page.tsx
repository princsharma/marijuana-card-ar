import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageView } from "@/components/PageView";
import { getPage, pages } from "@/lib/pages";
import { summary } from "@/lib/site";

type Props = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return pages
    .filter((page) => page.path !== "/")
    .map((page) => ({ slug: page.path.split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(`/${slug.join("/")}/`);
  if (!page) return { title: "Page not found" };
  return { title: page.title, description: summary(page.covers) };
}

export default async function RoutedPage({ params }: Props) {
  const { slug } = await params;
  const page = getPage(`/${slug.join("/")}/`);
  if (!page) notFound();
  return <PageView page={page} />;
}
