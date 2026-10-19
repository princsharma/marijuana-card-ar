"use client";

import Link from "next/link";
import { useState } from "react";
import { CITIES } from "@/lib/cities";
import { HELP_ITEMS } from "@/lib/help";
import { CONDITIONS } from "@/lib/site";
import { TextWithLinks } from "@/components/Bits";

const CHECKS = [
  { id: "id", label: "Arkansas driver licence or state ID", detail: "This is how you show age and residency." },
  { id: "cert", label: "Written certification signed within the last 30 days", detail: "Submit it to the state before that window closes." },
  { id: "fee", label: "$50 state fee ready", detail: "The Arkansas Department of Health fee is separate and non-refundable to the state." },
  { id: "account", label: "Online state application ready to submit", detail: "You submit the application yourself." },
  { id: "caregiver", label: "Caregiver items, if someone else will help", detail: "A caregiver is 21 or older, or the parent of a minor. Budget the $50 card fee and the $40 background check." },
  { id: "print", label: "A way to print the card, or a request for mail", detail: "There is no temporary card. You can print it once the state approves you." },
];

export function ChecklistTool() {
  const [done, setDone] = useState<string[]>([]);
  function toggle(id: string) {
    setDone((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }
  const width = `${Math.round((done.length / CHECKS.length) * 100)}%`;
  return (
    <div>
      <p>
        {done.length} of {CHECKS.length} complete
      </p>
      <div className="progress-track" aria-hidden="true">
        <div className="progress-bar" style={{ width }} />
      </div>
      <ul className="plain-list" style={{ display: "grid", gap: "0.6rem", marginTop: "1rem" }}>
        {CHECKS.map((item) => (
          <li key={item.id}>
            <label className="check card">
              <input type="checkbox" checked={done.includes(item.id)} onChange={() => toggle(item.id)} />
              <span>
                <strong>{item.label}</strong>
                <br />
                {item.detail}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <div className="filters no-print">
        <button className="btn" type="button" onClick={() => window.print()}>
          Print checklist
        </button>
        <button className="btn" type="button" onClick={() => setDone([])}>
          Reset
        </button>
      </div>
      {done.length === CHECKS.length ? (
        <p className="status" role="status">
          Every item is checked. Submit the application yourself on the state site, then keep a copy of the certification.
        </p>
      ) : null}
    </div>
  );
}

type Answers = {
  hasCard?: "yes" | "no";
  military?: "yes" | "no";
  residency?: "adult" | "minor" | "no";
  conditions: string[];
};

export function QualifyQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ conditions: [] });
  const [error, setError] = useState("");

  function next() {
    setError("");
    if (step === 0 && !answers.hasCard) return setError("Choose yes or no.");
    if (step === 1 && !answers.military) return setError("Choose yes or no.");
    if (step === 2 && !answers.residency) return setError("Choose the option that fits.");
    if (step === 3 && answers.conditions.length === 0) return setError("Select at least one option.");
    setStep((value) => value + 1);
  }

  const result = (() => {
    if (step < 4) return null;
    if (answers.military === "yes") {
      return {
        title: "Not eligible for a registry card",
        body: "National Guard members and U.S. military members are barred from Arkansas registry cards. Veterans who are not current service members can still apply if they meet the other rules.",
        href: "/blog/first-card/military-members/",
        label: "Read the military rule",
      };
    }
    if (answers.residency === "no") {
      return {
        title: "Residency or age is missing",
        body: "You need to be 18 or older with an Arkansas licence or state ID, or the parent or guardian of a minor patient.",
        href: "/eligibility/",
        label: "Read the eligibility rules",
      };
    }
    if (answers.conditions.includes("none") || answers.conditions.filter((item) => item !== "none").length === 0) {
      return {
        title: "No listed condition was selected",
        body: "Anxiety, insomnia, and depression are not on the Arkansas list. PTSD is. A condition can be added only through the state petition process.",
        href: "/blog/eligibility/does-anxiety-qualify/",
        label: "See why anxiety is not on the list",
      };
    }
    if (answers.residency === "minor") {
      return {
        title: "A minor needs a caregiver",
        body: "A minor cannot buy cannabis. A parent or guardian registers as the caregiver. The first certification still has to be in person.",
        href: "/blog/caregivers-and-minors/minor-patients/",
        label: "Read the minor-patient rules",
      };
    }
    if (answers.hasCard === "yes") {
      return {
        title: "You can look at a video renewal",
        body: "You already have a card, you are not barred by military service, and you selected a listed condition. Renewal has to be by video. This quiz is not a medical decision.",
        href: "/#booking",
        label: "Go to renewal booking",
      };
    }
    return {
      title: "A first card has to start in person",
      body: "You may meet the paper rules, but Arkansas does not allow the first certification by telemedicine. This site cannot book that visit online.",
      href: "/new-patients/",
      label: "Read the first-card steps",
    };
  })();

  const progress = `${((Math.min(step, 4) + 1) / 5) * 100}%`;

  return (
    <div className="qualify">
      <div className="qualify-progress">
        <p>Step {Math.min(step + 1, 5)} of 5</p>
        <div className="progress-track" aria-hidden="true">
          <div className="progress-bar" style={{ width: progress }} />
        </div>
      </div>
      {error ? <p className="error" role="alert">{error}</p> : null}
      {step === 0 && (
        <fieldset>
          <legend>Do you already have an Arkansas medical marijuana card?</legend>
          <div className="quiz-options">
            <label><input type="radio" name="hasCard" checked={answers.hasCard === "yes"} onChange={() => setAnswers({ ...answers, hasCard: "yes" })} /> <span>Yes, I need a renewal</span></label>
            <label><input type="radio" name="hasCard" checked={answers.hasCard === "no"} onChange={() => setAnswers({ ...answers, hasCard: "no" })} /> <span>No, this would be a first card</span></label>
          </div>
        </fieldset>
      )}
      {step === 1 && (
        <fieldset>
          <legend>Are you a member of the U.S. military or the Arkansas National Guard?</legend>
          <div className="quiz-options">
            <label><input type="radio" name="military" checked={answers.military === "yes"} onChange={() => setAnswers({ ...answers, military: "yes" })} /> <span>Yes</span></label>
            <label><input type="radio" name="military" checked={answers.military === "no"} onChange={() => setAnswers({ ...answers, military: "no" })} /> <span>No</span></label>
          </div>
        </fieldset>
      )}
      {step === 2 && (
        <fieldset>
          <legend>Which describes you?</legend>
          <div className="quiz-options">
            <label><input type="radio" name="residency" checked={answers.residency === "adult"} onChange={() => setAnswers({ ...answers, residency: "adult" })} /> <span>I am 18 or older and I have an Arkansas licence or state ID</span></label>
            <label><input type="radio" name="residency" checked={answers.residency === "minor"} onChange={() => setAnswers({ ...answers, residency: "minor" })} /> <span>I am the parent or guardian of a minor patient</span></label>
            <label><input type="radio" name="residency" checked={answers.residency === "no"} onChange={() => setAnswers({ ...answers, residency: "no" })} /> <span>Neither</span></label>
          </div>
        </fieldset>
      )}
      {step === 3 && (
        <fieldset>
          <legend>Which listed conditions apply? Select all that apply.</legend>
          <div className="quiz-options is-grid">
            {CONDITIONS.map((condition) => (
              <label key={condition.name}>
                <input
                  type="checkbox"
                  checked={answers.conditions.includes(condition.name)}
                  onChange={() =>
                    setAnswers({
                      ...answers,
                      conditions: answers.conditions.includes(condition.name)
                        ? answers.conditions.filter((item) => item !== condition.name)
                        : [...answers.conditions.filter((item) => item !== "none"), condition.name],
                    })
                  }
                />
                <span>{condition.name}</span>
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                checked={answers.conditions.includes("none")}
                onChange={() => setAnswers({ ...answers, conditions: answers.conditions.includes("none") ? [] : ["none"] })}
              />
              <span>None of these</span>
            </label>
          </div>
        </fieldset>
      )}
      {result && (
        <div className="qualify-result" role="status">
          <h2>{result.title}</h2>
          <p>{result.body}</p>
          <Link className="btn btn-primary" href={result.href}>{result.label}</Link>
        </div>
      )}
      {step < 4 && (
        <div className="filters">
          {step > 0 ? <button className="btn" type="button" onClick={() => { setError(""); setStep((value) => value - 1); }}>Back</button> : null}
          <button className="btn btn-primary" type="button" onClick={next}>{step === 3 ? "See result" : "Continue"}</button>
        </div>
      )}
      {step === 4 ? (
        <button className="btn" type="button" onClick={() => { setStep(0); setAnswers({ conditions: [] }); setError(""); }}>
          Start over
        </button>
      ) : null}
    </div>
  );
}

export function HelpBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(HELP_ITEMS.map((item) => item.category))];
  const results = HELP_ITEMS.filter((item) => {
    if (category !== "All" && item.category !== category) return false;
    const hay = `${item.question} ${item.answer}`.toLowerCase();
    return hay.includes(query.trim().toLowerCase());
  });
  return (
    <div>
      <div className="field">
        <label htmlFor="help-search">Search help</label>
        <input id="help-search" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="filters" role="group" aria-label="Help categories">
        {categories.map((item) => (
          <button key={item} className="chip" type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>
            {item}
          </button>
        ))}
      </div>
      <p role="status">{results.length} questions</p>
      {results.length === 0 ? <p className="callout">No questions match that search. Try another word or choose All.</p> : null}
      <div className="accordion">
        {results.map((item) => (
          <details key={item.id} id={item.id} open={query.trim().length > 0}>
            <summary>{item.question}</summary>
            <p><TextWithLinks text={item.answer} /></p>
          </details>
        ))}
      </div>
    </div>
  );
}

export function CityBrowser() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const regions = ["All", ...new Set(CITIES.map((city) => city.region))];
  const results = CITIES.filter((city) => {
    if (region !== "All" && city.region !== region) return false;
    return city.name.toLowerCase().includes(query.trim().toLowerCase());
  });
  return (
    <div>
      <div className="field">
        <label htmlFor="city-search">Find a city</label>
        <input id="city-search" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="filters">
        {regions.map((item) => (
          <button key={item} className="chip" type="button" aria-pressed={region === item} onClick={() => setRegion(item)}>
            {item}
          </button>
        ))}
      </div>
      {results.length === 0 ? <p className="callout">No city matches that filter.</p> : null}
      <ul className="plain-list grid-2">
        {results.map((city) => (
          <li key={city.path} className="card">
            <h3><Link href={city.path}>{city.name}</Link></h3>
            <p>{city.county} County · {city.region} · {city.population.toLocaleString("en-US")} residents</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FaqAccordion({ items }: { items: { id: string; question: string; answer: string }[] }) {
  return (
    <div className="accordion">
      {items.map((item) => (
        <details key={item.id} id={item.id}>
          <summary>{item.question}</summary>
          <p><TextWithLinks text={item.answer} /></p>
        </details>
      ))}
    </div>
  );
}
