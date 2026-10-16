"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { childrenOf } from "@/lib/pages";
import { HEADER_LINKS, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

function normalize(path: string) {
  if (!path || path === "/") return "/";
  const base = path.split("#")[0].split("?")[0];
  return base.endsWith("/") ? base : `${base}/`;
}

const NOTICE_EVENT = "ar-notice";

function noticeHidden() {
  return sessionStorage.getItem("ar-notice-dismissed") === "1";
}

export function NoticeBar() {
  const pathname = usePathname();
  const hidden = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener(NOTICE_EVENT, onStoreChange);
      return () => window.removeEventListener(NOTICE_EVENT, onStoreChange);
    },
    noticeHidden,
    () => false,
  );
  if (hidden || normalize(pathname) !== "/") return null;
  return (
    <div className="notice">
      <div className="wrap notice-inner">
        <p>
          Renewal visits are by video.{" "}
          <Link href="/pricing/">See current pricing</Link> before you book. A first
          certification cannot be done by telemedicine.
        </p>
        <button
          className="btn btn-on-dark"
          type="button"
          onClick={() => {
            sessionStorage.setItem("ar-notice-dismissed", "1");
            window.dispatchEvent(new Event(NOTICE_EVENT));
          }}
        >
          Dismiss notice
        </button>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = normalize(usePathname());
  const [open, setOpen] = useState(false);
  const menuId = useId();
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const item = (href: string, label: string) => (
    <Link href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>
      {label}
    </Link>
  );

  return (
    <header className="site-header">
      <div className="wrap header-bar">
        <Link href="/" className="wordmark">
          <span className="brand-mark" aria-hidden="true">AR</span>
          <span>
            {SITE_NAME}
            <small>{SITE_TAGLINE}</small>
          </span>
        </Link>
        <nav className="nav-row" aria-label="Primary">
          <ul className="nav-list">
            {HEADER_LINKS.map((link) => (
              <li key={link.href}>{item(link.href, link.label)}</li>
            ))}
          </ul>
        </nav>
        <div className="header-actions">
          <Link className="btn btn-primary" href="/#booking">
            Renew my card
          </Link>
          <button
            className="btn menu-button"
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close menu" : "Menu"}
          </button>
        </div>
      </div>
      <nav id={menuId} className="wrap menu-panel" data-open={open} aria-label="Primary mobile">
        {HEADER_LINKS.map((link) => (
          <span key={link.href}>{item(link.href, link.label)}</span>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  const policies = childrenOf("/policy/");
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <h2>Arkansas Renewal</h2>
          <p className="fine">
            Private telehealth renewals for people who already hold an Arkansas medical
            marijuana card. This practice is not the Arkansas Department of Health and does
            not sell cannabis.
          </p>
          <p className="fine">
            Scheduling, email, and payment are not connected on this build. Do not treat a
            form submission as a confirmed appointment.
          </p>
        </div>
        <div>
          <h2>Practice</h2>
          <ul className="footer-list">
            <li><Link href="/about-us/">About</Link></li>
            <li><Link href="/contact-us/">Contact</Link></li>
            <li><Link href="/doctors/">Doctors</Link></li>
            <li><Link href="/reviews/">Reviews</Link></li>
            <li><Link href="/compare/">Compare</Link></li>
            <li><Link href="/sitemap/">HTML sitemap</Link></li>
          </ul>
        </div>
        <div>
          <h2>Policies</h2>
          <ul className="footer-list">
            <li><Link href="/policy/">All policies</Link></li>
            {policies.map((policy) => (
              <li key={policy.path}>
                <Link href={policy.path}>{policy.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
