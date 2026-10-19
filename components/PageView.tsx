import Image from "next/image";
import Link from "next/link";
import { JsonLd, LinkGroup, PageIntro } from "@/components/Bits";
import { CheckIcon } from "@/components/Graphics";
import { BookingForm, ContactForm, ReminderForm, ReviewForm } from "@/components/Forms";
import { DispensaryLocator } from "@/components/DispensaryMap";
import { ChecklistTool, CityBrowser, FaqAccordion, HelpBrowser, QualifyQuiz } from "@/components/Interactive";
import { cityFaqs, cityFor, formatPopulation } from "@/lib/cities";
import { dispensariesNear } from "@/lib/dispensaries";
import { supportingPoints } from "@/lib/copy";
import { linksInSlot } from "@/lib/linking";
import { pages, pagesInTab } from "@/lib/pages";
import { schemaFor } from "@/lib/schema";
import {
  ADH_HOME,
  ADH_RESOURCES,
  CONDITIONS,
  IN_PERSON_OFFERED,
  PRICES,
  SITE_NAME,
  TELEMED_RULE,
  usd,
} from "@/lib/site";
import { HOME_FAQS } from "@/lib/help";
import type { SitePage } from "@/lib/types";

function RenewalCta({ bookHref }: { bookHref: string }) {
  return (
    <aside className="renew-cta span-12">
      <div className="renew-cta-price">
        <p>Evaluation</p>
        <strong>{usd(PRICES.renewal)}</strong>
        <span>Paid to this practice</span>
      </div>
      <div className="renew-cta-body">
        <h2>Book the video renewal</h2>
        <p>The {usd(PRICES.adhPatient)} state fee is separate and is paid to the Arkansas Department of Health.</p>
      </div>
      <div className="filters">
        <Link className="btn btn-primary" href={bookHref}>Book a renewal</Link>
        <Link className="btn" href="/pricing/">See pricing</Link>
      </div>
    </aside>
  );
}

function EndLinks({ page, stacked = false }: { page: SitePage; stacked?: boolean }) {
  return (
    <div className={stacked ? "link-stack" : "grid-2"} style={stacked ? undefined : { marginTop: "1.5rem" }}>
      <LinkGroup title="Next step" links={[...linksInSlot(page, "end"), ...linksInSlot(page, "intro")]} />
      <LinkGroup title="Related" links={linksInSlot(page, "related")} />
    </div>
  );
}

function ConditionBadges() {
  return (
    <ul className="condition-badges">
      {CONDITIONS.map((condition) => (
        <li key={condition.name}>
          {condition.href ? (
            <Link className="condition-badge" href={condition.href}>{condition.name}</Link>
          ) : (
            <span className="condition-badge is-plain">{condition.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

const PHYSICIAN_PHOTO = {
  src: "/visuals/johnathan-miller.webp",
  alt: "Dr. Johnathan Miller at a laptop for a video visit.",
};

const HOME_GUIDES = [
  {
    href: "/blog/card-renewal/when-to-renew/",
    kicker: "Renewal",
    title: "When Can You Renew Your Arkansas Medical Card?",
    text: "The window opens up to 60 days before the card expires.",
    src: "/visuals/reading-booklet.jpg",
    alt: "Hands holding a blank booklet. Illustrative, not a patient record.",
  },
  {
    href: "/blog/card-renewal/renewal-cost/",
    kicker: "Cost",
    title: "Arkansas Medical Card Renewal Cost",
    text: "The evaluation and the separate state fee.",
    src: "/visuals/state-fee.jpg",
    alt: "An envelope on a desk, set aside for a separate fee. Illustrative.",
  },
  {
    href: "/blog/first-card/can-you-get-card-online/",
    kicker: "First card",
    title: "Can You Get an Arkansas Medical Card Online?",
    text: "A first certification stays in person. A renewal can be video.",
    src: "/visuals/video-only.jpg",
    alt: "A laptop open to a video visit. Illustrative, not a physician from this practice.",
  },
  {
    href: "/blog/arkansas-rules/is-weed-legal-in-arkansas/",
    kicker: "Rules",
    title: "Is Weed Legal in Arkansas? Medical vs Recreational",
    text: "Medical use and adult-use are not the same question in Arkansas.",
    src: "/visuals/records-folder.jpg",
    alt: "A closed folder and a pen. Illustrative, not a record from this practice.",
  },
];

function HomePage({ page }: { page: SitePage }) {
  return (
    <div className="hp">
      <section className="hp-hero">
        <div className="hp-wrap hp-hero-grid">
          <div>
            <p className="hp-eye">Already have a card</p>
            <h1>{page.title}</h1>
            <p className="hp-lede">
              One video visit. If you are approved, you get a written certification, then you submit it to the state for your card.
            </p>
            <div className="hp-actions">
              <a className="hp-btn hp-btn-solid" href="#booking">Book a renewal</a>
              <Link className="hp-btn" href="/how-it-works/">See the steps</Link>
            </div>
            <p className="hp-note">
              A first card cannot be done by video. <Link href="/new-patients/">New patients start here.</Link>
            </p>
          </div>
          <div className="hp-hero-stage">
            <figure className="hp-hero-photo">
              <Image src={PHYSICIAN_PHOTO.src} alt={PHYSICIAN_PHOTO.alt} fill priority sizes="(max-width: 980px) 100vw, 560px" />
            </figure>
            <p className="hp-hero-price">
              <strong>{usd(PRICES.renewal)}</strong>
              <span>Evaluation</span>
            </p>
            <div className="hp-hero-card">
              <figure>
                <Image src={PHYSICIAN_PHOTO.src} alt="" fill sizes="48px" />
              </figure>
              <div>
                <strong>Dr. Johnathan Miller</strong>
                <span>Named for these video renewals. The Arkansas licence still has to be confirmed.</span>
              </div>
              <Link href="/doctors/johnathan-miller/">Profile</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="hp-block" aria-label="What this visit includes">
        <div className="hp-wrap">
          <div className="hp-intro">
            <h2>What this visit includes</h2>
            <p>Four facts about a renewal. Nothing here is a guarantee of approval.</p>
          </div>
          <ul className="hp-features">
            <li className="hp-accent">
              <span className="hp-ico"><LineIcon name="visit" /></span>
              <strong>Video visit</strong>
              <span>A phone call does not qualify.</span>
            </li>
            <li>
              <span className="hp-ico"><LineIcon name="list" /></span>
              <strong>If approved</strong>
              <span>A new written certification.</span>
            </li>
            <li>
              <span className="hp-ico"><LineIcon name="fee" /></span>
              <strong>{usd(PRICES.adhPatient)} state fee</strong>
              <span>Paid to the Arkansas Department of Health.</span>
            </li>
            <li>
              <span className="hp-ico"><LineIcon name="id" /></span>
              <strong>60 days</strong>
              <span>Book before the card expires.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="hp-block">
        <div className="hp-wrap">
          <div className="hp-intro">
            <p className="hp-eye">In this order</p>
            <h2>A renewal has four parts.</h2>
            <p>The physician visit is only the second one. Each part has to happen before the next.</p>
          </div>
          <div className="hp-orbit">
            <div className="hp-orbit-col">
              <article><span>01</span><h3>Book the visit</h3><p>Choose a video time up to 60 days before your Arkansas card expires.</p></article>
              <article><span>03</span><h3>Submit to the state</h3><p>Send the certification within 30 days and pay the {usd(PRICES.adhPatient)} state fee there.</p></article>
            </div>
            <figure className="hp-orbit-photo">
              <Image src="/visuals/video-only.jpg" alt="A laptop open to a video visit. Illustrative, not a physician from this practice." fill sizes="280px" />
            </figure>
            <div className="hp-orbit-col">
              <article><span>02</span><h3>Meet the physician</h3><p>The visit is on video with the physician named for these renewals.</p></article>
              <article><span>04</span><h3>Print the card</h3><p>State processing can take up to 14 days. There is no temporary card.</p></article>
            </div>
          </div>
          <p className="hp-center-link"><Link href="/how-it-works/">Open the full guide</Link></p>
        </div>
      </section>

      <section className="hp-block">
        <div className="hp-wrap">
          <div className="hp-intro">
            <p className="hp-eye">Physician</p>
            <h2>Who you meet on video.</h2>
            <p>One physician is named for these renewals. A licence number, medical school, and patient reviews are not published here because they were not confirmed.</p>
          </div>
          <div className="hp-people">
            <article className="hp-person hp-accent">
              <figure>
                <Image src={PHYSICIAN_PHOTO.src} alt={PHYSICIAN_PHOTO.alt} fill sizes="120px" />
              </figure>
              <h3>Dr. Johnathan Miller</h3>
              <p>Video renewals for people who already hold an Arkansas card.</p>
              <Link className="hp-btn hp-btn-accent" href="/doctors/johnathan-miller/">Read the profile</Link>
            </article>
            <article className="hp-person">
              <span className="hp-ico"><LineIcon name="user" /></span>
              <h3>Doctor directory</h3>
              <p>Profiles published for this practice. No other physicians are listed yet.</p>
              <Link className="hp-btn" href="/doctors/">Open the directory</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="hp-block">
        <div className="hp-wrap hp-split">
          <figure className="hp-split-photo">
            <Image src="/visuals/who-ready.jpg" alt="A desk set up for a video visit. Illustrative." fill sizes="(max-width: 980px) 100vw, 560px" />
          </figure>
          <div>
            <p className="hp-eye">Before the visit</p>
            <h2>Bring the card you already hold.</h2>
            <ul className="hp-plain">
              <li>Your current Arkansas medical marijuana card</li>
              <li>An Arkansas licence or state ID</li>
              <li>A device that can do video</li>
            </ul>
            <Link className="hp-btn hp-btn-solid" href="/how-it-works/">What to have ready</Link>
          </div>
        </div>
      </section>

      <section className="hp-conditions">
        <div className="hp-wrap hp-conditions-grid">
          <div>
            <p className="hp-eye">State form</p>
            <h2>The 18 qualifying conditions.</h2>
            <p>The physician decides whether a condition qualifies. A name on this list does not guarantee a certification or a card. Current military and National Guard members are barred, and this practice does not sell cannabis.</p>
            <div className="hp-actions">
              <Link className="hp-btn hp-btn-solid" href="/eligibility/">Check eligibility</Link>
              <Link className="hp-btn" href="/conditions/">All condition guides</Link>
            </div>
          </div>
          <ul className="hp-condition-list">
            {CONDITIONS.map((condition) => (
              <li key={condition.name}>
                {condition.href ? <Link href={condition.href}>{condition.name}</Link> : condition.name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="hp-fees">
        <div className="hp-wrap hp-fee-grid">
          <div className="hp-fee hp-fee-practice">
            <p>Paid to this practice</p>
            <strong>{usd(PRICES.renewal)}</strong>
            <span>The video evaluation. Book it on this page.</span>
            <a className="hp-btn hp-btn-accent" href="#booking">Book a renewal</a>
          </div>
          <div className="hp-fee hp-fee-state">
            <p>Paid to the state</p>
            <strong>{usd(PRICES.adhPatient)}</strong>
            <span>The patient card fee. This practice does not collect it.</span>
            <Link className="hp-btn" href="/pricing/">See the full fee list</Link>
          </div>
        </div>
      </section>

      <section className="hp-guides">
        <div className="hp-wrap">
          <div className="hp-section-head">
            <h2>From the guides.</h2>
            <Link href="/blog/">All articles</Link>
          </div>
          <div className="hp-guide-grid">
            {HOME_GUIDES.map((guide) => (
              <article key={guide.href}>
                <figure className="hp-guide-photo">
                  <Image src={guide.src} alt={guide.alt} fill sizes="(max-width: 640px) 100vw, 280px" />
                </figure>
                <p className="hp-eye">{guide.kicker}</p>
                <h3><Link href={guide.href}>{guide.title}</Link></h3>
                <p>{guide.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hp-faq">
        <div className="hp-wrap hp-faq-grid">
          <div>
            <p className="hp-eye">Questions</p>
            <h2>Before you book.</h2>
            <p>Verified reviews are not on this build yet. <Link href="/reviews/">The reviews page</Link> stays empty until a review system is connected.</p>
            <Link className="hp-text-link" href="/faq/">Read the full FAQ</Link>
          </div>
          <FaqAccordion items={HOME_FAQS} />
        </div>
      </section>

      <section className="hp-close">
        <div className="hp-wrap hp-close-grid">
          <div>
            <p className="hp-eye">Evaluation {usd(PRICES.renewal)}</p>
            <h2>Book the video renewal.</h2>
            <p>The {usd(PRICES.adhPatient)} state fee is separate and is paid to the Arkansas Department of Health.</p>
          </div>
          <div className="hp-actions">
            <a className="hp-btn hp-btn-accent" href="#booking">Book a renewal</a>
            <Link className="hp-btn hp-btn-ghost" href="/pricing/">See pricing</Link>
          </div>
          <figure className="hp-close-photo">
            <Image src={PHYSICIAN_PHOTO.src} alt="" fill sizes="180px" />
          </figure>
        </div>
      </section>

      <section className="hp-book">
        <div className="hp-wrap hp-book-grid">
          <BookingForm />
          <ReminderForm />
        </div>
      </section>
    </div>
  );
}

function LineIcon({ name }: { name: "clinic" | "list" | "fee" | "user" | "id" | "visit" }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "clinic") {
    return (
      <svg {...props}>
        <path d="M4 20V9l8-5 8 5v11" />
        <path d="M9 20v-6h6v6" />
        <path d="M12 8v4M10 10h4" />
      </svg>
    );
  }
  if (name === "list") {
    return (
      <svg {...props}>
        <path d="M8 7h11M8 12h11M8 17h11" />
        <path d="M4.5 7h.01M4.5 12h.01M4.5 17h.01" />
      </svg>
    );
  }
  if (name === "fee") {
    return (
      <svg {...props}>
        <path d="M6 4h12v16l-2-1.2L14 20l-2-1.2L10 20l-2-1.2L6 20z" />
        <path d="M9 9h6M9 13h6" />
      </svg>
    );
  }
  if (name === "user") {
    return (
      <svg {...props}>
        <circle cx="12" cy="8" r="3" />
        <path d="M6 19c1.2-2.4 3.2-3.5 6-3.5s4.8 1.1 6 3.5" />
      </svg>
    );
  }
  if (name === "id") {
    return (
      <svg {...props}>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="9" cy="12" r="2" />
        <path d="M14 11h4M14 14h3" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path d="M8 4v3M16 4v3M5 9h14" />
      <rect x="5" y="6" width="14" height="14" rx="2" />
      <path d="M9 14h6" />
    </svg>
  );
}

const FIRST_CARD_STEPS: { icon: "user" | "id" | "list" | "visit" | "fee"; text: string }[] = [
  { icon: "user", text: "Be 18 or older, or have a parent or guardian register as caregiver." },
  { icon: "id", text: "Live in Arkansas and have an Arkansas licence or state ID." },
  { icon: "list", text: "Have one of the 18 qualifying conditions. Current military members are barred." },
  { icon: "visit", text: "Complete an in-person evaluation. This website cannot do that step by video." },
  { icon: "fee", text: `Submit the written certification to the state within 30 days and pay ${usd(PRICES.adhPatient)}.` },
];

function NewPatients({ page }: { page: SitePage }) {
  return (
    <>
      <PageIntro
        page={page}
        photo={{
          src: "/visuals/first-visit.jpg",
          alt: "An in-person clinic visit. Not a photograph of a physician from this practice.",
        }}
      >
        <p className="lede">
          Arkansas does not allow a physician to issue a first written certification from a telemedicine visit.
          Renewals are different: those can be done by video.
        </p>
      </PageIntro>
      <div className="wrap bento-wrap">
        <div className="bento">
          <article className="tile span-4 photo-tile">
            <div className="photo-frame first-frame">
              <Image src="/visuals/clinic-visit.jpg" alt="A clinic entrance." fill sizes="360px" />
            </div>
            <div className="first-copy">
              <span className="line-icon"><LineIcon name="clinic" /></span>
              <div><strong>In person</strong><p>The first certification cannot be done on a video visit.</p></div>
            </div>
          </article>
          <article className="tile span-4 photo-tile">
            <div className="photo-frame first-frame">
              <Image src="/visuals/conditions-form.jpg" alt="A blank checklist on a clipboard." fill sizes="360px" />
            </div>
            <div className="first-copy">
              <span className="line-icon"><LineIcon name="list" /></span>
              <div><strong>18 conditions</strong><p>The physician uses the state certification form.</p></div>
            </div>
          </article>
          <article className="tile span-4 photo-tile">
            <div className="photo-frame first-frame">
              <Image src="/visuals/state-fee.jpg" alt="A blank receipt and a payment card on a desk." fill sizes="360px" />
            </div>
            <div className="first-copy">
              <span className="line-icon"><LineIcon name="fee" /></span>
              <div><strong>{usd(PRICES.adhPatient)} state fee</strong><p>Paid to the Arkansas Department of Health, not here.</p></div>
            </div>
          </article>
        </div>
      </div>
      <div className="wrap bento-wrap">
        <div className="bento">
          <article className="tile tile-navy span-5 rule-tile">
            <p className="kicker">17 CAR 140-3201(b)(12)</p>
            <h2>First visits stay in clinic</h2>
            <p>
              The rule is 17 CAR 140-3201(b)(12). Read it on the{" "}
              <a href={TELEMED_RULE}>Arkansas rules site</a>. Until this practice confirms an in-person clinic, partner, or event, there is no first-visit booking on this site.
            </p>
          </article>
          <article className="tile span-7">
            <h2>What a first card takes</h2>
            <ol className="steps">
              {FIRST_CARD_STEPS.map((step) => (
                <li key={step.icon}>
                  <span className="step-ico"><LineIcon name={step.icon} /></span>
                  <span>{step.text}</span>
                </li>
              ))}
            </ol>
          </article>
          <article className="tile span-12 condition-board">
            <div className="condition-head">
              <div>
                <p className="kicker">State form</p>
                <h2>The 18 qualifying conditions</h2>
              </div>
              <p>Conditions without a link are on the state form and do not have their own article yet.</p>
            </div>
            <ConditionBadges />
          </article>
          {!IN_PERSON_OFFERED ? (
            <article className="tile tile-soft span-12 note-tile">
              <p>The call to action on this page is a renewal reminder, not an online first-visit booking.</p>
            </article>
          ) : null}
          <div className="span-7">
            <ReminderForm />
          </div>
          <div className="span-5">
            <EndLinks page={page} stacked />
          </div>
        </div>
      </div>
    </>
  );
}

function PricingPage({ page }: { page: SitePage }) {
  return (
    <>
      <PageIntro page={page}>
        <p className="lede">
          Two charges, two payees. {usd(PRICES.renewal)} is the video evaluation. {usd(PRICES.adhPatient)} is the state card fee. The state fee is not included, and there is no reduced state fee.
        </p>
      </PageIntro>
      <div className="wrap bento-wrap">
        <div className="bento">
          <article className="tile tile-navy span-7 plan-card">
            <p className="kicker">Booked on this site</p>
            <h2>Renewal evaluation</h2>
            <p className="price-amount">
              {usd(PRICES.renewal)} <small>per visit</small>
            </p>
            <p className="price-caption">Paid to this practice when payments are connected. Video visit, not a phone call.</p>
            <ul className="include-list">
              <li><CheckIcon /> Already-carded Arkansas patients</li>
              <li><CheckIcon /> Arkansas-licensed physician on video</li>
              <li><CheckIcon /> New written certification if you are approved</li>
              <li><CheckIcon /> Book up to 60 days before the card expires</li>
            </ul>
            <div className="plan-actions">
              <Link className="btn btn-primary" href="/#booking">Book a renewal</Link>
              <Link className="btn" href="/how-it-works/">How the visit works</Link>
            </div>
          </article>
          <div className="span-5 fee-stack">
            <article className="tile tile-sky">
              <p className="kicker">Paid to the state</p>
              <h2>Patient card</h2>
              <p className="price-amount">{usd(PRICES.adhPatient)}</p>
              <p className="price-caption">New or renewal. Pay the Arkansas Department of Health when you submit the certification. This practice does not collect it.</p>
            </article>
            <div className="bento">
              <article className="tile span-6 fee-mini">
                <strong>{usd(PRICES.adhCaregiver)}</strong>
                <p>Caregiver card, paid to the state.</p>
              </article>
              <article className="tile span-6 fee-mini">
                <strong>{usd(PRICES.caregiverBackground)}</strong>
                <p>Caregiver background check, from 1 October 2026.</p>
              </article>
              <article className="tile span-6 fee-mini">
                <strong>{usd(PRICES.adhVisiting)}</strong>
                <p>Visiting patient card, 90 days, paid to the state.</p>
              </article>
              <article className="tile tile-soft span-6 fee-mini">
                <strong>No cut rate</strong>
                <p>Arkansas does not offer a reduced patient fee.</p>
              </article>
            </div>
          </div>
          <article className="tile span-3 photo-tile">
            <div className="photo-frame">
              <Image src="/visuals/video-only.jpg" alt="A laptop open to a video visit. Illustrative, not a physician from this practice." fill sizes="280px" />
            </div>
            <div><strong>Included</strong><p>The video evaluation and a certification if approved.</p></div>
          </article>
          <article className="tile span-3 photo-tile">
            <div className="photo-frame">
              <Image src="/visuals/step-submit.jpg" alt="Hands placing a form into an envelope." fill sizes="280px" />
            </div>
            <div><strong>You submit</strong><p>Send the certification to the state within 30 days.</p></div>
          </article>
          <article className="tile span-3 photo-tile">
            <div className="photo-frame">
              <Image src="/visuals/state-fee.jpg" alt="An envelope on a desk, set aside for a separate fee. Illustrative." fill sizes="280px" />
            </div>
            <div><strong>Not included</strong><p>The {usd(PRICES.adhPatient)} state fee is separate.</p></div>
          </article>
          <article className="tile span-3 photo-tile">
            <div className="photo-frame">
              <Image src="/visuals/empty-consult.jpg" alt="An empty consultation desk. This practice does not sell cannabis." fill sizes="280px" />
            </div>
            <div><strong>Not sold here</strong><p>This practice does not sell cannabis.</p></div>
          </article>
          <article className="tile span-8 photo-tile">
            <div className="photo-frame first-frame">
              <Image src="/visuals/clinic-hallway.jpg" alt="An empty clinic hallway. Not a photograph of a physician from this practice." fill sizes="720px" />
            </div>
            <div>
              <p className="kicker">Not offered online</p>
              <h2>New-patient evaluation {usd(PRICES.newInPerson)}</h2>
              <p>A first certification has to be in person. This build does not book that visit. The price is listed so it is not confused with a renewal.</p>
              <Link className="btn" href="/new-patients/">Read the first-card rules</Link>
            </div>
          </article>
          <article className="tile tile-soft span-4">
            <h2>Refunds</h2>
            <p>Do not assume a refund amount. The state fee is non-refundable at the Arkansas Department of Health. The practice policy is still a draft.</p>
            <Link href="/policy/refund-policy/">Read the draft refund policy</Link>
          </article>
          <div className="tile span-12">
            <h2>Full fee list</h2>
            <div className="table-scroll">
              <table>
                <caption>Evaluation fees and Arkansas Department of Health fees</caption>
                <thead>
                  <tr><th scope="col">Item</th><th scope="col">Amount</th><th scope="col">Who you pay</th></tr>
                </thead>
                <tbody>
                  <tr><td>Renewal evaluation</td><td>{usd(PRICES.renewal)}</td><td>This practice, once payments are connected</td></tr>
                  <tr><td>New-patient evaluation</td><td>{usd(PRICES.newInPerson)}</td><td>Only if in-person visits are offered. They are not offered on this build.</td></tr>
                  <tr><td>Patient card, new or renewal</td><td>{usd(PRICES.adhPatient)}</td><td>Arkansas Department of Health</td></tr>
                  <tr><td>Visiting patient, 90 days</td><td>{usd(PRICES.adhVisiting)}</td><td>Arkansas Department of Health</td></tr>
                  <tr><td>Caregiver card</td><td>{usd(PRICES.adhCaregiver)}</td><td>Arkansas Department of Health</td></tr>
                  <tr><td>Caregiver background check</td><td>{usd(PRICES.caregiverBackground)}</td><td>State process, from 1 October 2026</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <EndLinks page={page} />
      </div>
    </>
  );
}

const RENEWAL_PATH: {
  title: string;
  short: string;
  src: string;
  alt: string;
  text: string;
  facts: { label: string; text: string }[];
}[] = [
  {
    title: "Book the video visit",
    short: "Choose a time if you already have a card.",
    src: "/visuals/step-book.jpg",
    alt: "A person choosing a time on a laptop calendar.",
    text: "If you already have an Arkansas card, you can book up to 60 days before it expires. The renewal visit is video. A phone call does not qualify.",
    facts: [
      { label: "You do", text: "Pick a video time from home." },
      { label: "You need", text: "A current Arkansas card. A first card is not booked here." },
    ],
  },
  {
    title: "Meet the physician",
    short: "A video visit, then a written certification if approved.",
    src: PHYSICIAN_PHOTO.src,
    alt: PHYSICIAN_PHOTO.alt,
    text: "The visit is with an Arkansas-licensed physician. If you are approved, you receive a new written certification.",
    facts: [
      { label: "You meet", text: "Dr. Johnathan Miller on video." },
      { label: "Licence", text: "The Arkansas licence still has to be confirmed before launch." },
    ],
  },
  {
    title: "Submit the certification",
    short: "Send it to the state within 30 days.",
    src: "/visuals/step-submit.jpg",
    alt: "Hands placing a form into an envelope.",
    text: `Send the new written certification to the Arkansas Department of Health within 30 days and pay the separate ${usd(PRICES.adhPatient)} state fee.`,
    facts: [
      { label: "You send", text: "The written certification to the state within 30 days." },
      { label: "You pay", text: `${usd(PRICES.adhPatient)} to the Arkansas Department of Health. This practice does not collect that fee.` },
    ],
  },
  {
    title: "Print the card",
    short: "After the state approves it. No temporary card.",
    src: "/visuals/step-print.jpg",
    alt: "A home printer with a blank card being picked up.",
    text: "State processing can take up to 14 days. Print the card when it is approved, or ask for it to be mailed.",
    facts: [
      { label: "You wait", text: "Up to 14 days. There is no temporary card." },
      { label: "You receive", text: "A card to print, or a mailed card if you ask for one." },
    ],
  },
];

function HowItWorks({ page }: { page: SitePage }) {
  return (
    <>
      <PageIntro
        page={page}
        photo={{
          src: "/visuals/hero-visit.jpg",
          alt: "A patient joining a video visit on a laptop at home. Not a photograph of a physician from this practice.",
        }}
      >
        <p className="lede">A renewal is a video visit, a written certification, and a submission to the state. A first card is not booked here.</p>
      </PageIntro>
      <section className="wrap bento-wrap">
        <article className="tile path-board">
          <div className="path-head">
            <div>
              <p className="kicker">The visit</p>
              <h2>Four parts, in order</h2>
            </div>
            <p>Each part has to happen before the next. The physician visit is only the second one.</p>
          </div>
          <ol className="path-rail">
            {RENEWAL_PATH.map((step, index) => (
              <li key={step.title}>
                <span className="path-num">{index + 1}</span>
                <strong>{step.title}</strong>
                <p>{step.short}</p>
              </li>
            ))}
          </ol>
        </article>
        <div className="path-list">
          {RENEWAL_PATH.map((step, index) => (
            <article key={step.title} className="path-card">
              <figure className="path-photo">
                <Image src={step.src} alt={step.alt} fill sizes="(max-width: 980px) 100vw, 320px" />
                <p className="step-badge">Step {index + 1}</p>
              </figure>
              <div className="path-copy">
                <h2>{step.title}</h2>
                <p>{step.text}</p>
                <ul className="path-facts">
                  {step.facts.map((fact) => (
                    <li key={fact.label}>
                      <span>{fact.label}</span>
                      <p>{fact.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <div className="bento bento-start">
          <article className="tile span-7">
            <p className="kicker">Before the visit</p>
            <h2>What to have ready</h2>
            <ul className="path-ready">
              <li>Your current Arkansas medical marijuana card</li>
              <li>An Arkansas licence or state ID</li>
              <li>A device that can do video. A phone call does not qualify.</li>
            </ul>
          </article>
          <article className="tile span-5 photo-tile">
            <div className="photo-frame first-frame">
              <Image src="/visuals/first-visit.jpg" alt="An in-person clinic visit. Not a photograph of a physician from this practice." fill sizes="420px" />
            </div>
            <div>
              <strong>First cards stay in clinic</strong>
              <p>This page is for people who already have a card. <Link href="/new-patients/">Read the first-card rules.</Link></p>
            </div>
          </article>
          <RenewalCta bookHref="/#booking" />
        </div>
        <EndLinks page={page} />
      </section>
    </>
  );
}

function MoneyPage({ page }: { page: SitePage }) {
  if (page.path === "/how-it-works/") {
    return <HowItWorks page={page} />;
  }
  if (page.path === "/eligibility/") {
    return (
      <>
        <PageIntro page={page}>
          <p className="lede">Four paper rules decide whether you can be in the registry. The physician still decides whether to certify you.</p>
        </PageIntro>
        <div className="wrap bento-wrap">
          <div className="bento">
            <article className="tile span-3 photo-tile">
              <div className="photo-frame">
                <Image src="/visuals/household.jpg" alt="A blank calendar and two mugs on a kitchen table. Illustrative." fill sizes="280px" />
              </div>
              <div><strong>Age</strong><p>18 or older, or a minor with a parent or guardian caregiver.</p></div>
            </article>
            <article className="tile span-3 photo-tile">
              <div className="photo-frame">
                <Image src="/visuals/closed-wallet.jpg" alt="A closed wallet beside a blank card. Not an Arkansas licence or state ID." fill sizes="280px" />
              </div>
              <div><strong>Residency</strong><p>Arkansas licence or state ID.</p></div>
            </article>
            <article className="tile span-3 photo-tile">
              <div className="photo-frame">
                <Image src="/visuals/conditions-form.jpg" alt="A printed form and a pen on a desk." fill sizes="280px" />
              </div>
              <div><strong>Condition</strong><p>One of the 18 on the certification form.</p></div>
            </article>
            <article className="tile span-3 photo-tile">
              <div className="photo-frame">
                <Image src="/visuals/set-aside.jpg" alt="A folder set aside on an empty desk. Illustrative, not a military record." fill sizes="280px" />
              </div>
              <div><strong>Military</strong><p>Current National Guard and U.S. military members are barred.</p></div>
            </article>
          </div>
        </div>
        <div className="wrap bento-wrap">
          <article className="tile condition-board">
            <div className="condition-head">
              <div>
                <p className="kicker">State form</p>
                <h2>The 18 qualifying conditions</h2>
              </div>
              <p>Conditions without a link are on the state form and do not have their own article yet.</p>
            </div>
            <ConditionBadges />
          </article>
          <EndLinks page={page} />
          <RenewalCta bookHref="/#booking" />
        </div>
      </>
    );
  }
  return (
    <>
      <PageIntro page={page}>
        <p className="lede">{page.covers}</p>
      </PageIntro>
      <div className="wrap narrow section">
        {page.path === "/faq/" && <FaqAccordion items={HOME_FAQS} />}
        <p>
          <Link href={linksInSlot(page, "intro")[0]?.href ?? "/"}>{linksInSlot(page, "intro")[0]?.label ?? "Continue"}</Link>
        </p>
        <EndLinks page={page} />
        <RenewalCta bookHref="/#booking" />
      </div>
    </>
  );
}

function ArticlePage({ page }: { page: SitePage }) {
  const points = supportingPoints(page);
  const medical = page.pageType === "Condition article" || page.path.includes("/dosage-and-usage/");
  return (
    <>
      <PageIntro page={page}>
        <p className="lede">{page.covers}</p>
      </PageIntro>
      {medical ? (
        <div className="wrap">
          <p className="callout callout-warn">
            This is general information, not medical advice. Cannabis may help some symptoms. It does not treat a disease. Do not stop a medicine without your own clinician.
          </p>
        </div>
      ) : null}
      <div className="wrap bento-wrap">
        <div className="bento">
          <article className="tile span-4 photo-tile">
            <div className="photo-frame profile-frame">
              <Image
                src={medical ? "/visuals/records-folder.jpg" : "/visuals/reading-booklet.jpg"}
                alt={medical ? "A closed folder and a pen. Illustrative, not a record from this practice." : "Hands holding a blank booklet. Illustrative."}
                fill
                sizes="360px"
              />
            </div>
          </article>
          <article className="tile span-8">
            <h2>Arkansas details</h2>
            <ul>
              {points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
      <article className="wrap narrow section">
        {linksInSlot(page, "intro").length > 0 && (
          <p>
            In this section:{" "}
            {linksInSlot(page, "intro").map((link, index) => (
              <span key={link.href}>
                {index > 0 ? ", " : ""}
                <Link href={link.href}>{link.label}</Link>
              </span>
            ))}
            .
          </p>
        )}
        <p>
          Program basics are published by the <a href={ADH_HOME}>Arkansas Department of Health</a>. Rules change. Re-check them before you rely on a date or a fee.
        </p>
        {page.pageType === "Condition article" && (
          <>
            <h2>What to bring</h2>
            <p>Bring records that show the diagnosis and what treatment you have already tried. The physician decides whether the condition qualifies. This page cannot promise a certification.</p>
          </>
        )}
        <EndLinks page={page} />
        <div className="page-cta"><RenewalCta bookHref="/#booking" /></div>
      </article>
    </>
  );
}

function HubPage({ page }: { page: SitePage }) {
  const list = linksInSlot(page, "list");
  return (
    <>
      <PageIntro page={page}>
        <p className="lede">{page.covers}</p>
      </PageIntro>
      <div className="wrap bento-wrap">
        {page.path === "/cities/" ? (
          <div className="tile"><CityBrowser /></div>
        ) : page.path === "/doctors/" ? (
          <ul className="plain-list bento">
            {list.map((link) => (
              <li key={link.href} className="tile span-6 profile-card">
                {link.href === "/doctors/johnathan-miller/" && (
                  <div className="photo-frame profile-frame">
                    <Image src={PHYSICIAN_PHOTO.src} alt={PHYSICIAN_PHOTO.alt} fill sizes="(max-width: 980px) 100vw, 560px" />
                  </div>
                )}
                <div className="profile-body">
                  <h3><Link href={link.href}>{link.label}</Link></h3>
                  <p>Named in this plan as an Arkansas physician. The licence still has to be confirmed before launch.</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="plain-list bento">
            {list.map((link) => (
              <li key={link.href} className="tile span-4">
                <h3><Link href={link.href}>{link.label}</Link></h3>
              </li>
            ))}
          </ul>
        )}
        {page.path === "/conditions/" && (
          <div className="tile stack-gap">
            <h2>On the state form, without a separate article yet</h2>
            <ul>
              {CONDITIONS.filter((item) => !item.href).map((item) => (
                <li key={item.name}>{item.name}</li>
              ))}
            </ul>
          </div>
        )}
        <EndLinks page={page} />
        <div className="page-cta"><RenewalCta bookHref="/#booking" /></div>
      </div>
    </>
  );
}

function CityPage({ page }: { page: SitePage }) {
  const city = cityFor(page.path);
  if (!city) return <ArticlePage page={page} />;
  const nearbyDispensaries = dispensariesNear(city.name);
  const faqs = cityFaqs(city);
  return (
    <>
      <PageIntro page={page}>
        <p className="lede">
          {city.name} patients who already have a card can renew by video. A first certification still has to be in person.
        </p>
      </PageIntro>
      <div className="wrap bento-wrap">
        <div className="bento">
          <article className="tile span-3 photo-tile">
            <div className="photo-frame">
              <Image src="/visuals/city-street.jpg" alt="A quiet main street. Illustrative, not a specific clinic address." fill sizes="280px" />
            </div>
            <div><strong>{city.county}</strong><p>County</p></div>
          </article>
          <article className="tile span-3 photo-tile">
            <div className="photo-frame">
              <Image src="/visuals/residential-street.jpg" alt="A residential street. Illustrative, not a specific address." fill sizes="280px" />
            </div>
            <div><strong>{city.region}</strong><p>Region</p></div>
          </article>
          <article className="tile span-3 photo-tile">
            <div className="photo-frame">
              <Image src="/visuals/household.jpg" alt="A kitchen table. Illustrative, not a census record." fill sizes="280px" />
            </div>
            <div><strong>{formatPopulation(city.population)}</strong><p>2025 population estimate</p></div>
          </article>
          <article className="tile span-3 photo-tile">
            <div className="photo-frame">
              <Image src="/visuals/state-fee.jpg" alt="An envelope on a desk. Illustrative, not a tax bill." fill sizes="280px" />
            </div>
            <div><strong>6.5%</strong><p>State sales tax, plus local tax</p></div>
          </article>
        </div>
      </div>
      <div className="wrap section">
        <p>
          Population figures in the plan are 2025 Census estimates. Confirm the county and the local sales-tax rate before publishing a number. This page does not invent a local tax percentage.
        </p>
        <h2>Dispensaries in or near {city.name}</h2>
        {nearbyDispensaries.length === 0 ? (
          <p>No location in the directory snapshot is mapped to {city.name}. Use the locator and confirm it on the state list.</p>
        ) : (
          <ul>
            {nearbyDispensaries.map((item) => (
              <li key={item.id}>{item.name}, {item.address}</li>
            ))}
          </ul>
        )}
        <p><Link href="/tools/dispensary-locator/">Open the dispensary locator</Link></p>
        <h2>Local questions</h2>
        <FaqAccordion items={faqs.map((item) => ({ id: item.id, question: item.q, answer: item.a }))} />
        <div className="grid-2">
          <BookingForm />
          <LinkGroup title="Nearby cities" links={linksInSlot(page, "related")} />
        </div>
      </div>
    </>
  );
}

function ToolPage({ page }: { page: SitePage }) {
  if (page.path === "/tools/dispensary-locator/") {
    return (
      <DispensaryLocator title={page.title}>
        <EndLinks page={page} />
      </DispensaryLocator>
    );
  }
  if (page.path === "/tools/do-i-qualify/") {
    return (
      <>
        <PageIntro
          page={page}
          photo={{
            src: "/visuals/conditions-form.jpg",
            alt: "A printed form and a pen on a desk.",
          }}
        >
          <p className="lede">Five questions on your card, residency, and condition. The result points to a renewal or the first-card rules.</p>
        </PageIntro>
        <div className="wrap bento-wrap">
          <div className="bento">
            <article className="tile span-8">
              <QualifyQuiz />
            </article>
            <article className="tile tile-soft span-4">
              <p className="kicker">Paper rules only</p>
              <h2>What this checks</h2>
              <ul className="qualify-points">
                <li>Whether you already have an Arkansas card</li>
                <li>Age, or a parent or guardian caregiver</li>
                <li>An Arkansas licence or state ID</li>
                <li>The military exclusion</li>
                <li>One of the 18 conditions on the state form</li>
              </ul>
              <p>It does not decide whether a physician will certify you, and it does not submit anything to the state.</p>
            </article>
          </div>
          <p className="qualify-note">Official forms and the dispensary list live on the <a href={ADH_RESOURCES}>ADH resources page</a>.</p>
          <EndLinks page={page} />
        </div>
      </>
    );
  }
  return (
    <>
      <PageIntro page={page}>
        <p className="lede">{page.covers}</p>
      </PageIntro>
      <div className="wrap section">
        {page.path === "/tools/application-checklist/" && (
          <>
            <p>
              Use this before you submit to the Arkansas Department of Health. The certification has to be less than 30 days old. The state fee is {usd(PRICES.adhPatient)} and is not included in the evaluation price. If a caregiver is involved, add their card fee and the background check. When the state approves the card, print it or ask for mail. There is no temporary card while you wait, and the wait can be up to 14 days.
            </p>
            <ChecklistTool />
          </>
        )}
        <p>Official forms and the dispensary list live on the <a href={ADH_RESOURCES}>ADH resources page</a>.</p>
        <EndLinks page={page} />
        <div className="page-cta"><RenewalCta bookHref="/#booking" /></div>
      </div>
    </>
  );
}

function ComparePage({ page }: { page: SitePage }) {
  const competitor = page.path.includes("clinic") ? "AR Cannabis Clinic" : "Arkansas Marijuana Card";
  return (
    <>
      <PageIntro page={page}>
        <p className="lede">{page.covers}</p>
      </PageIntro>
      <div className="wrap section">
        <div className="table-scroll">
          <table>
            <caption>{SITE_NAME} compared with {competitor}</caption>
            <thead>
              <tr><th scope="col">Topic</th><th scope="col">{SITE_NAME}</th><th scope="col">{competitor}</th></tr>
            </thead>
            <tbody>
              <tr><th scope="row">Renewal visit</th><td>Video with an Arkansas-licensed physician</td><td>Confirm on their site</td></tr>
              <tr><th scope="row">First certification</th><td>Not offered online. Arkansas requires an in-person first visit.</td><td>Confirm on their site</td></tr>
              <tr><th scope="row">Renewal evaluation</th><td>{usd(PRICES.renewal)} plus the {usd(PRICES.adhPatient)} state fee</td><td>Confirm on their site</td></tr>
              <tr><th scope="row">Audio-only renewal</th><td>Not offered. State rules do not allow it.</td><td>Confirm on their site</td></tr>
              <tr><th scope="row">Refunds</th><td>Policy is still a draft. Read it before paying.</td><td>Confirm on their site</td></tr>
            </tbody>
          </table>
        </div>
        <p>This page does not link to competitor sites. Do not treat the empty column as a finding.</p>
        <EndLinks page={page} />
        <div className="page-cta"><RenewalCta bookHref="/#booking" /></div>
      </div>
    </>
  );
}

function TrustPage({ page }: { page: SitePage }) {
  return (
    <>
      <PageIntro page={page}>
        <p className="lede">{page.covers}</p>
      </PageIntro>
      <div className="wrap narrow section">
        {page.path === "/doctors/johnathan-miller/" && (
          <>
            <p>Dr. Johnathan Miller is the physician named in this plan. A licence number, medical school, and patient reviews are not published here because they were not confirmed in the source workbook.</p>
            <dl className="card">
              <dt>Role</dt>
              <dd>Physician named for Arkansas certifications</dd>
              <dt>Licence</dt>
              <dd>Confirm the current Arkansas licence before launch</dd>
              <dt>Visit type</dt>
              <dd>Video renewals. First certifications are not done by telemedicine.</dd>
            </dl>
          </>
        )}
        {page.path === "/reviews/" && (
          <>
            <p className="callout">No verified Arkansas reviews are on file in this build. Sample quotes are not shown.</p>
            <ReviewForm />
          </>
        )}
        {page.path === "/contributors/first-last/" && (
          <dl className="card">
            <dt>First name</dt><dd>Assigned when a writer is added</dd>
            <dt>Last name</dt><dd>Assigned when a writer is added</dd>
            <dt>URL pattern</dt><dd>/contributors/first-last/</dd>
          </dl>
        )}
        {page.path === "/about-us/" && (
          <>
            <p>{SITE_NAME} evaluates Arkansas patients for medical marijuana card renewal by video. It is a private practice, not the Arkansas Department of Health, and it does not sell cannabis.</p>
            <p>First certifications stay in person. Only physicians licensed in Arkansas can certify. The physician list is on the doctors page and is incomplete until licences are confirmed.</p>
          </>
        )}
        {page.path === "/contact-us/" && (
          <>
            <p className="callout">Phone, public email, and clinic hours were not in the sitemap. Add them before launch. The form below checks a message and then stops, because no inbox is connected.</p>
            <ContactForm />
          </>
        )}
        {page.path === "/help/" && <HelpBrowser />}
        {linksInSlot(page, "list").length > 0 && page.path !== "/help/" && (
          <ul>
            {linksInSlot(page, "list").map((link) => (
              <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
            ))}
          </ul>
        )}
        <EndLinks page={page} />
        <div className="page-cta"><RenewalCta bookHref="/#booking" /></div>
      </div>
    </>
  );
}

function PolicyPage({ page }: { page: SitePage }) {
  const blocks: Record<string, string[]> = {
    "/policy/privacy-policy/": [
      "This draft describes what a renewal visit would collect: name, contact details, date of birth, Arkansas residency, card expiration, and health information needed for the certification.",
      "It would be used to schedule the visit, complete the evaluation, and meet record rules. It would not be sold.",
      "The final policy has to name the legal entity, the retention period, and how a patient requests a copy or a correction.",
    ],
    "/policy/terms/": [
      "The site is information plus a renewal request. Sending a form on this build does not create an appointment.",
      "You must be an Arkansas patient seeking a renewal, or you should use the new-patient page instead of booking.",
      "A lawyer still needs to set the governing law, liability limits, and payment terms.",
    ],
    "/policy/hipaa-compliance/": [
      "A medical practice that certifies patients handles health information and should operate under HIPAA.",
      "This page does not claim a certification seal. The safeguards, business associates, and notice of privacy practices still have to be written by the practice.",
    ],
    "/policy/consent-for-telehealth/": [
      "Arkansas renewal visits on this site are video visits. Audio-only is not a renewal.",
      "Telehealth has limits: the physician can stop the visit, ask you to be seen in person, or decline to certify you.",
      "Booking is only for people who already have a card. A first certification is not consented to by video.",
    ],
    "/policy/refund-policy/": [
      "The workbook says to state a refund policy and does not provide the terms.",
      "Do not promise a refund amount on this draft. The state fee paid to the Arkansas Department of Health is non-refundable at the state.",
      "Replace this page with the practice policy before anyone is charged.",
    ],
    "/policy/accessibility-statement/": [
      "The target is WCAG AAA contrast, keyboard access, visible focus, labels on fields, and text for controls.",
      "Automated checks and a manual pass are part of the build notes. That is not a formal conformance claim.",
      "Contact the practice, once a contact method is published, to report a barrier.",
    ],
    "/policy/editorial-policy/": [
      "Condition and product pages may say cannabis might help symptoms. They do not say it treats a disease.",
      "A medical reviewer has to be named before those pages are treated as reviewed. That assignment is still open.",
      "When a law changes, update the existing page. Do not add a news post just to put a year in the title.",
    ],
    "/policy/disclaimer/": [
      "Nothing on this site is medical advice, legal advice, or a promise that you will be approved.",
      "The physician makes the certification decision. The Arkansas Department of Health issues the card.",
      "Cannabis remains illegal under federal law. Do not travel across state lines with it.",
    ],
  };
  const copy = blocks[page.path];
  return (
    <>
      <PageIntro page={page}>
        <p className="lede">{page.path === "/policy/" ? "Every legal page for this site." : "Draft for a healthcare lawyer to review before launch."}</p>
      </PageIntro>
      <div className="wrap narrow section">
        {page.path !== "/policy/" && <p className="callout callout-warn">Draft. Not a finished legal policy.</p>}
        {copy?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <ul>
          {linksInSlot(page, "list").concat(linksInSlot(page, "intro")).map((link) => (
            <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
          ))}
        </ul>
      </div>
    </>
  );
}

function SitemapPage({ page }: { page: SitePage }) {
  const tabs = [...new Set(pages.map((item) => item.tab))];
  return (
    <>
      <PageIntro page={page}>
        <p className="lede">Every page in the Arkansas plan, grouped by section.</p>
      </PageIntro>
      <div className="wrap section">
        {tabs.map((tab) => (
          <section key={tab}>
            <h2>{tab}</h2>
            <ul>
              {pagesInTab(tab).map((item) => (
                <li key={item.path}><Link href={item.path}>{item.title}</Link></li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}

export function PageView({ page }: { page: SitePage }) {
  let body = <ArticlePage page={page} />;
  if (page.pageType === "Homepage (sales page)") body = <HomePage page={page} />;
  else if (page.pageType === "New-patient page") body = <NewPatients page={page} />;
  else if (page.path === "/pricing/") body = <PricingPage page={page} />;
  else if (page.pageType === "Money page" || page.pageType === "FAQ page") body = <MoneyPage page={page} />;
  else if (page.pageType === "Blog hub" || page.pageType === "Silo hub" || page.pageType === "Conditions hub" || page.pageType === "Tools hub" || page.pageType === "Compare hub" || page.pageType === "Doctors hub" || page.pageType === "Contributors hub" || page.pageType === "Cities hub") body = <HubPage page={page} />;
  else if (page.pageType === "City page") body = <CityPage page={page} />;
  else if (page.pageType === "Tool") body = <ToolPage page={page} />;
  else if (page.pageType === "Compare page") body = <ComparePage page={page} />;
  else if (["Doctor profile", "Reviews page", "Contributor profile", "About page", "Contact page", "Help page"].includes(page.pageType)) body = <TrustPage page={page} />;
  else if (page.pageType === "Policy page") body = <PolicyPage page={page} />;
  else if (page.pageType === "HTML sitemap") body = <SitemapPage page={page} />;
  return (
    <>
      <JsonLd data={schemaFor(page)} />
      {body}
    </>
  );
}

export function pageDescription(page: SitePage) {
  return page.covers;
}
