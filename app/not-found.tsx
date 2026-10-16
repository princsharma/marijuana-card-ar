import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap section narrow">
      <h1>That page is not in the Arkansas plan</h1>
      <p>The address does not match a page in the sitemap. No redirect was added for it.</p>
      <p>
        <Link href="/">Go to the renewal homepage</Link> or open the <Link href="/sitemap/">HTML sitemap</Link>.
      </p>
    </div>
  );
}
