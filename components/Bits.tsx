import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mark, mastMark } from "@/components/Graphics";
import { crumbsFor } from "@/lib/pages";
import type { PlannedLink, SitePage } from "@/lib/types";

export function Breadcrumbs({ page }: { page: SitePage }) {
  if (page.path === "/") return null;
  const crumbs = crumbsFor(page);
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;
          return (
            <li key={crumb.href}>
              {last ? <span aria-current="page">{crumb.label}</span> : <Link href={crumb.href}>{crumb.label}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function DecideNote({ page }: { page: SitePage }) {
  if (page.status !== "Decide") return null;
  const copy: Record<string, string> = {
    "/new-patients/":
      "Open decision: this practice has not confirmed an in-person first-visit option. This page explains the Arkansas in-person rule. It does not book a first certification online.",
    "/compare/vs-ar-cannabis-clinic/":
      "Open decision: confirm that AR Cannabis Clinic still operates, and confirm every competitor detail on their own site before treating this comparison as final.",
    "/compare/vs-arkansas-marijuana-card/":
      "Open decision: confirm that Arkansas Marijuana Card still operates, and confirm every competitor detail on their own site before treating this comparison as final.",
    "/doctors/johnathan-miller/":
      "Open decision: confirm that Dr. Johnathan Miller holds a current Arkansas licence before this profile is used in public.",
    "/contributors/first-last/":
      "Open decision: this URL is the contributor template from the sitemap. Replace it with a real writer, first and last name only, before launch.",
  };
  return (
    <p className="callout callout-warn" role="note">
      {copy[page.path] ?? "This page is marked Decide in the sitemap and still needs a business answer."}
    </p>
  );
}

const PATH = /(\/(?:[a-z0-9-]+\/)+)/g;

export function TextWithLinks({ text }: { text: string }) {
  const parts = text.split(PATH);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("/") ? (
          <Link key={`${part}-${index}`} href={part}>
            {part}
          </Link>
        ) : (
          <span key={`${index}-${part.slice(0, 12)}`}>{part}</span>
        ),
      )}
    </>
  );
}

export function LinkGroup({ title, links }: { title: string; links: PlannedLink[] }) {
  if (!links.length) return null;
  return (
    <div className="card">
      <h2>{title}</h2>
      <ul>
        {links.map((link, index) => (
          <li key={`${link.slot}-${link.href}-${index}`}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PageIntro({
  page,
  children,
  photo,
}: {
  page: SitePage;
  children?: ReactNode;
  photo?: { src: string; alt: string };
}) {
  return (
    <header className="mast">
      <div className={photo ? "wrap mast-with-photo" : "wrap"}>
        <div>
          <Breadcrumbs page={page} />
          <p className="kicker">{page.section}</p>
          <h1>{page.title}</h1>
          <DecideNote page={page} />
          {children}
        </div>
        {photo ? (
          <div className="mast-photo">
            <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 980px) 100vw, 420px" />
          </div>
        ) : (
          <div className="mast-art">
            <Mark name={mastMark(page)} />
          </div>
        )}
      </div>
    </header>
  );
}
