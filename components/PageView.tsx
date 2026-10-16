import Image from "next/image";
import Link from "next/link";
import { JsonLd, LinkGroup, PageIntro } from "@/components/Bits";
import { CheckIcon, Mark } from "@/components/Graphics";
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
  ADH_FAQS,
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

const RENEWAL_STEPS: { title: string; src: string; alt: string; text: string }[] = [
  {
    title: "Book the video visit",
    src: "/visuals/step-book.jpg",
    alt: "A person choosing a time on a laptop calendar.",
    text: "Book if you already have an Arkansas card. You can renew up to 60 days before it expires.",
  },
  {
    title: "Meet the physician",
    src: "/visuals/step-meet.jpg",
    alt: "A laptop video visit with a clinician. Not a physician from this practice.",
    text: "The visit is video with an Arkansas-licensed physician. A phone call does not qualify.",
  },
  {
    title: "Submit to the state",
    src: "/visuals/step-submit.jpg",
    alt: "Hands placing a form into an envelope.",
    text: "If approved, submit the new written certification within 30 days and pay the state fee.",
  },
  {
    title: "Print the card",
    src: "/visuals/step-print.jpg",
    alt: "A home printer with a blank card being picked up.",
    text: "Print the card when the state approves it, or ask for it to be mailed. There is no temporary card.",
  },
];

function RenewalSteps() {
  return (
    <div className="bento">
      {RENEWAL_STEPS.map((step, index) => (
        <article key={step.title} className="tile span-3 step-photo">
          <div className="photo-frame step-frame">
            <Image src={step.src} alt={step.alt} fill sizes="(max-width: 640px) 100vw, 280px" />
            <p className="step-badge">Step {index + 1}</p>
          </div>
          <div className="step-body">
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function HomePage({ page }: { page: SitePage }) {
  return (
    <>
      <section className="wrap bento-wrap">
        <div className="bento">
          <div className="tile tile-navy span-7 hero-tile">
            <p className="kicker">Renewals by video · Arkansas only</p>
            <h1>{page.title}</h1>
            <p className="lede">
              Already have a card? Renew with an Arkansas-licensed physician on a video visit.
              Audio-only renewals are not allowed.
            </p>
            <p className="hero-note">
              A first certification cannot be completed by telemedicine. If you do not have a card yet, start on{" "}
              <Link href="/new-patients/">new patients</Link>.
            </p>
            <div className="filters">
              <a className="btn btn-primary" href="#booking">Book a renewal</a>
              <Link className="btn" href="/pricing/">See pricing</Link>
            </div>
            <p className="lede">Renewal evaluation {usd(PRICES.renewal)}, plus the separate {usd(PRICES.adhPatient)} state fee.</p>
          </div>
          <div className="tile span-5 hero-photo">
            <Image
              src="/visuals/hero-visit.jpg"
              alt="A patient joining a video visit on a laptop. Not a photograph of a physician from this practice."
              fill
              priority
              sizes="(max-width: 980px) 100vw, 420px"
            />
            <p className="hero-caption">Video visit with a written certification if you are approved.</p>
          </div>
        </div>
        <div className="bento">
          <article className="tile span-3 photo-tile">
            <div className="photo-frame">
              <Image src="/visuals/days-60.jpg" alt="A blank desk calendar." fill sizes="280px" />
            </div>
            <div><strong>60 days</strong><p>Renew before the card expires.</p></div>
          </article>
          <article className="tile span-3 photo-tile">
            <div className="photo-frame">
              <Image src="/visuals/video-only.jpg" alt="A laptop open to a video visit." fill sizes="280px" />
            </div>
            <div><strong>Video only</strong><p>Audio-only cannot renew a certification.</p></div>
          </article>
          <article className="tile span-3 photo-tile">
            <div className="photo-frame">
              <Image src="/visuals/wait-14.jpg" alt="A clock and a sealed envelope." fill sizes="280px" />
            </div>
            <div><strong>14 days</strong><p>State processing. No temporary card.</p></div>
          </article>
          <article className="tile span-3 photo-tile">
            <div className="photo-frame">
              <Image src="/visuals/clinic-visit.jpg" alt="A small clinic entrance." fill sizes="280px" />
            </div>
            <div><strong>In person</strong><p>First certifications stay in clinic.</p></div>
          </article>
        </div>
      </section>
      <section className="wrap bento-wrap">
        <h2>How a renewal works</h2>
        <RenewalSteps />
      </section>
      <section className="wrap bento-wrap">
        <div className="bento">
          <article className="tile tile-mint span-6 media-tile">
            <Mark name="ok" />
            <div>
              <h2>Who can book here</h2>
              <ul>
                <li>People who already hold an Arkansas medical marijuana card</li>
                <li>Arkansas residents renewing by video</li>
                <li>Patients whose card is inside the 60-day renewal window, or who want a reminder</li>
              </ul>
            </div>
          </article>
          <article className="tile tile-pink span-6 media-tile">
            <Mark name="stop" />
            <div>
              <h2>Who should not book a renewal</h2>
              <ul>
                <li>First-time patients. Use the new-patient page.</li>
                <li>Current military and National Guard members. The registry bars them.</li>
                <li>Anyone hoping to buy cannabis here. This practice does not sell it.</li>
              </ul>
            </div>
          </article>
        </div>
      </section>
      <section className="wrap bento-wrap">
        <h2>Physicians and reviews</h2>
        <div className="bento">
          <article className="tile span-6 profile-card">
            <div className="photo-frame profile-frame">
              <Image
                src="/visuals/physician-visit.jpg"
                alt="An illustrative video visit. Not a photograph of Dr. Johnathan Miller or any physician from this practice."
                fill
                sizes="(max-width: 980px) 100vw, 560px"
              />
              <p className="hero-caption">Illustrative video visit. Not a physician from this practice.</p>
            </div>
            <div className="profile-body">
              <h3><Link href="/doctors/johnathan-miller/">Dr. Johnathan Miller</Link></h3>
              <p>Named in this plan as an Arkansas physician. The licence still has to be confirmed before launch.</p>
            </div>
          </article>
          <article className="tile span-6 profile-card">
            <div className="photo-frame profile-frame">
              <Image
                src="/visuals/patient-reviews.jpg"
                alt="A phone showing an empty review form. No patient reviews are displayed."
                fill
                sizes="(max-width: 980px) 100vw, 560px"
              />
            </div>
            <div className="profile-body">
              <h3><Link href="/reviews/">Patient reviews</Link></h3>
              <p>Verified Arkansas reviews will appear after a review system is connected. None are invented here.</p>
            </div>
          </article>
        </div>
      </section>
      <section className="wrap bento-wrap">
        <div className="faq-split">
          <figure className="faq-banner">
            <Image
              src="/visuals/faq-banner.jpg"
              alt="A patient at home during a video appointment."
              fill
              sizes="(max-width: 860px) 100vw, 420px"
            />
          </figure>
          <div className="faq-copy">
            <h2>Common questions</h2>
            <FaqAccordion items={HOME_FAQS} />
          </div>
        </div>
      </section>
      <section className="band">
        <div className="wrap section grid-2">
          <ReminderForm />
          <BookingForm />
        </div>
      </section>
    </>
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
          <article className="tile tile-mint span-3 stat-tile">
            <Mark name="video" />
            <div><strong>Included</strong><p>The video evaluation and a certification if approved.</p></div>
          </article>
          <article className="tile tile-yellow span-3 stat-tile">
            <Mark name="card" />
            <div><strong>You submit</strong><p>Send the certification to the state within 30 days.</p></div>
          </article>
          <article className="tile tile-pink span-3 stat-tile">
            <Mark name="receipt" />
            <div><strong>Not included</strong><p>The {usd(PRICES.adhPatient)} state fee is separate.</p></div>
          </article>
          <article className="tile tile-sky span-3 stat-tile">
            <Mark name="stop" />
            <div><strong>Not sold here</strong><p>This practice does not sell cannabis.</p></div>
          </article>
          <article className="tile span-8 media-tile">
            <Mark name="clinic" />
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

const RENEWAL_STORY: { kicker: string; title: string; src: string; alt: string; text: string }[] = [
  {
    kicker: "Step 1",
    title: "You book from home",
    src: "/visuals/step-book.jpg",
    alt: "A person choosing a time on a laptop calendar.",
    text: "If you already have an Arkansas card, you can book up to 60 days before it expires. The renewal visit is video. A phone call does not qualify.",
  },
  {
    kicker: "Step 2",
    title: "You meet the physician on video",
    src: "/visuals/step-meet.jpg",
    alt: "A laptop video visit with a clinician. Not a physician from this practice.",
    text: "The visit is with an Arkansas-licensed physician. If you are approved, you receive a new written certification. The person on the screen in this photo is not a physician from this practice.",
  },
  {
    kicker: "Step 3",
    title: "You submit the certification",
    src: "/visuals/step-submit.jpg",
    alt: "Hands placing a form into an envelope.",
    text: "Send the new written certification to the Arkansas Department of Health within 30 days and pay the separate state fee. This practice does not collect that fee.",
  },
  {
    kicker: "Step 4",
    title: "You print the card when the state approves it",
    src: "/visuals/step-print.jpg",
    alt: "A home printer with a blank card being picked up.",
    text: "State processing can take up to 14 days. There is no temporary card. Print the card when it is approved, or ask for it to be mailed.",
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
        <p className="lede">A renewal is a video visit, then a submission to the state. A first card is not booked here.</p>
      </PageIntro>
      <section className="wrap bento-wrap">
        {RENEWAL_STORY.map((chapter, index) => (
          <article key={chapter.title} className={index % 2 ? "story-row is-flip" : "story-row"}>
            <figure className="story-photo">
              <Image src={chapter.src} alt={chapter.alt} fill sizes="(max-width: 980px) 100vw, 640px" />
              <p className="step-badge">{chapter.kicker}</p>
            </figure>
            <div className="story-copy">
              <h2>{chapter.title}</h2>
              <p>{chapter.text}</p>
            </div>
          </article>
        ))}
        <div className="bento">
          <article className="tile span-4 photo-tile">
            <div className="photo-frame first-frame">
              <Image src="/visuals/days-60.jpg" alt="A blank desk calendar." fill sizes="360px" />
            </div>
            <div><strong>60 days</strong><p>The renewal window opens before the card expires.</p></div>
          </article>
          <article className="tile span-4 photo-tile">
            <div className="photo-frame first-frame">
              <Image src="/visuals/wait-14.jpg" alt="A clock and a sealed envelope." fill sizes="360px" />
            </div>
            <div><strong>Up to 14 days</strong><p>Official timing is on the <a href={ADH_FAQS}>ADH FAQ</a>. No temporary card.</p></div>
          </article>
          <article className="tile span-4 photo-tile">
            <div className="photo-frame first-frame">
              <Image src="/visuals/first-visit.jpg" alt="An in-person clinic visit. Not a photograph of a physician from this practice." fill sizes="360px" />
            </div>
            <div><strong>First cards stay in clinic</strong><p>This page is for people who already have a card. <Link href="/new-patients/">Read the first-card rules.</Link></p></div>
          </article>
          <article className="tile tile-navy span-12 story-close">
            <div>
              <p className="kicker">Evaluation {usd(PRICES.renewal)}</p>
              <h2>Book the video renewal</h2>
              <p>The {usd(PRICES.adhPatient)} state fee is separate and is paid to the Arkansas Department of Health.</p>
            </div>
            <div className="filters">
              <Link className="btn btn-primary" href="/#booking">Book a renewal</Link>
              <Link className="btn" href="/pricing/">See pricing</Link>
            </div>
          </article>
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
            <article className="tile tile-yellow span-3 stat-tile">
              <Mark name="care" />
              <div><strong>Age</strong><p>18 or older, or a minor with a parent or guardian caregiver.</p></div>
            </article>
            <article className="tile tile-sky span-3 stat-tile">
              <Mark name="card" />
              <div><strong>Residency</strong><p>Arkansas licence or state ID.</p></div>
            </article>
            <article className="tile tile-mint span-3 stat-tile">
              <Mark name="checklist" />
              <div><strong>Condition</strong><p>One of the 18 on the certification form.</p></div>
            </article>
            <article className="tile tile-pink span-3 stat-tile">
              <Mark name="stop" />
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
          <article className="tile tile-sky span-4">
            <Mark name={page.pageType === "Condition article" ? "care" : "document"} />
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
        ) : (
          <ul className="plain-list bento">
            {list.map((link) => (
              <li key={link.href} className="tile span-4 media-tile">
                <Mark name="document" />
                <h2><Link href={link.href}>{link.label}</Link></h2>
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
          <article className="tile tile-yellow span-3 stat-tile">
            <Mark name="pin" />
            <div><strong>{city.county}</strong><p>County</p></div>
          </article>
          <article className="tile tile-mint span-3 stat-tile">
            <Mark name="pin" />
            <div><strong>{city.region}</strong><p>Region</p></div>
          </article>
          <article className="tile tile-sky span-3 stat-tile">
            <Mark name="care" />
            <div><strong>{formatPopulation(city.population)}</strong><p>2025 population estimate</p></div>
          </article>
          <article className="tile tile-pink span-3 stat-tile">
            <Mark name="document" />
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
  return (
    <>
      <PageIntro page={page}>
        <p className="lede">{page.covers}</p>
      </PageIntro>
      <div className="wrap section">
        {page.path === "/tools/do-i-qualify/" && (
          <>
            <p>
              This quiz checks the paper rules only: age or caregiver status, Arkansas residency, military exclusion, and whether a condition is one of the 18 on the certification form. It does not decide whether a physician will certify you, and it does not submit anything to the state.
            </p>
            <QualifyQuiz />
          </>
        )}
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
