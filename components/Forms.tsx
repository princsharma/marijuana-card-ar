"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import { PRICES, usd } from "@/lib/site";
import {
  NOT_DELIVERED,
  validateBooking,
  validateContact,
  validateReview,
  type BookingInput,
  type ContactInput,
  type ReviewInput,
} from "@/lib/validate";

function Summary({ errors }: { errors: Record<string, string> }) {
  const entries = Object.entries(errors);
  if (!entries.length) return null;
  return (
    <div className="error-summary" role="alert" tabIndex={-1}>
      <strong>Fix {entries.length} {entries.length === 1 ? "item" : "items"} before sending.</strong>
      <ul>
        {entries.map(([key, message]) => (
          <li key={key}>
            <a href={`#${key}`}>{message}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? (
        <p className="error" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

async function post(url: string, body: unknown) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await response.json()) as { message?: string; delivered?: boolean };
  return { ok: response.ok, status: response.status, data };
}

export function BookingForm({ id = "booking" }: { id?: string }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [values, setValues] = useState<BookingInput>({
    fullName: "",
    email: "",
    phone: "",
    cardExpiry: "",
    window: "",
    renewalConfirm: false,
    consent: false,
  });

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next = validateBooking(values);
    setErrors(next);
    setMessage("");
    if (Object.keys(next).length) return;
    setPending(true);
    try {
      const result = await post("/api/booking/", values);
      setMessage(result.data.message || NOT_DELIVERED);
    } catch {
      setMessage("The form could not reach the server. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  const described = (key: string) => (errors[key] ? { "aria-invalid": true, "aria-describedby": `${key}-error` } : {});

  return (
    <form id={id} className="form-card" onSubmit={onSubmit} noValidate>
      <h2>Book a renewal</h2>
      <p>Video visit for people who already have an Arkansas card. Evaluation {usd(PRICES.renewal)}. The state fee is separate.</p>
      <Summary errors={errors} />
      {message ? <p className="status-bad" role="status">{message}</p> : null}
      <Field id="fullName" label="Full name" error={errors.fullName}>
        <input id="fullName" name="fullName" autoComplete="name" value={values.fullName} onChange={(e) => setValues({ ...values, fullName: e.target.value })} {...described("fullName")} />
      </Field>
      <Field id="email" label="Email" error={errors.email}>
        <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} {...described("email")} />
      </Field>
      <Field id="phone" label="Phone" error={errors.phone}>
        <input id="phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={(e) => setValues({ ...values, phone: e.target.value })} {...described("phone")} />
      </Field>
      <Field id="cardExpiry" label="Card expiration date" error={errors.cardExpiry}>
        <input id="cardExpiry" name="cardExpiry" type="date" value={values.cardExpiry} onChange={(e) => setValues({ ...values, cardExpiry: e.target.value })} {...described("cardExpiry")} />
      </Field>
      <Field id="window" label="Preferred time of day" error={errors.window}>
        <select id="window" name="window" value={values.window} onChange={(e) => setValues({ ...values, window: e.target.value })} {...described("window")}>
          <option value="">Choose one</option>
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
        </select>
      </Field>
      <label className="check">
        <input type="checkbox" checked={values.renewalConfirm} onChange={(e) => setValues({ ...values, renewalConfirm: e.target.checked })} />
        <span>I already have an Arkansas medical marijuana card. This request is a renewal, not a first certification.</span>
      </label>
      {errors.renewalConfirm ? <p className="error">{errors.renewalConfirm} <Link href="/new-patients/">Read the first-card rules.</Link></p> : null}
      <label className="check">
        <input type="checkbox" checked={values.consent} onChange={(e) => setValues({ ...values, consent: e.target.checked })} />
        <span>I agree to the <Link href="/policy/consent-for-telehealth/">telehealth consent</Link>. I understand the visit will be by video.</span>
      </label>
      {errors.consent ? <p className="error">{errors.consent}</p> : null}
      <button className="btn btn-primary" type="submit" disabled={pending} aria-busy={pending}>
        {pending ? "Checking…" : "Submit renewal request"}
      </button>
    </form>
  );
}

export function ReminderForm() {
  const [expiry, setExpiry] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [note, setNote] = useState("");

  function download() {
    setError("");
    setNote("");
    if (!expiry) {
      setError("Enter the date your card expires.");
      return;
    }
    const expires = new Date(`${expiry}T12:00:00`);
    if (Number.isNaN(expires.getTime())) {
      setError("Enter a valid date.");
      return;
    }
    const opens = new Date(expires);
    opens.setDate(opens.getDate() - 60);
    const stamp = (date: Date) => {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      return `${y}${m}${d}`;
    };
    const end = new Date(opens);
    end.setDate(end.getDate() + 1);
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Arkansas Renewal//Renewal reminder//EN",
      "BEGIN:VEVENT",
      `DTSTART;VALUE=DATE:${stamp(opens)}`,
      `DTEND;VALUE=DATE:${stamp(end)}`,
      "SUMMARY:Arkansas medical card renewal window opens",
      "DESCRIPTION:You can renew up to 60 days before the card expires. The visit has to be by video.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "arkansas-renewal-reminder.ics";
    anchor.click();
    URL.revokeObjectURL(url);
    const when = opens.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    setNote(
      email.trim()
        ? `Calendar file downloaded for ${when}. Email reminders are not sent until an email provider is connected.`
        : `Calendar file downloaded. Add it for ${when}, which is 60 days before the card expires.`,
    );
  }

  return (
    <form id="reminder" className="form-card" onSubmit={(event) => { event.preventDefault(); download(); }}>
      <h2>Renewal reminder</h2>
      <p>Add the date your renewal window opens. That is 60 days before the card expires.</p>
      {error ? <p className="error" role="alert">{error}</p> : null}
      {note ? <p className="status" role="status">{note}</p> : null}
      <Field id="reminder-expiry" label="Card expiration date" error={undefined}>
        <input id="reminder-expiry" type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
      </Field>
      <Field id="reminder-email" label="Email (optional, not sent on this build)" error={undefined}>
        <input id="reminder-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
      </Field>
      <button className="btn btn-primary" type="submit">Add to calendar</button>
    </form>
  );
}

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [values, setValues] = useState<ContactInput>({ fullName: "", email: "", topic: "", message: "" });

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next = validateContact(values);
    setErrors(next);
    setMessage("");
    if (Object.keys(next).length) return;
    setPending(true);
    try {
      const result = await post("/api/contact/", values);
      setMessage(result.data.message || NOT_DELIVERED);
    } catch {
      setMessage("The form could not reach the server. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate>
      <h2>Send a message</h2>
      <Summary errors={errors} />
      {message ? <p className="status-bad" role="status">{message}</p> : null}
      <Field id="fullName" label="Name" error={errors.fullName}>
        <input id="fullName" value={values.fullName} onChange={(e) => setValues({ ...values, fullName: e.target.value })} autoComplete="name" />
      </Field>
      <Field id="email" label="Email" error={errors.email}>
        <input id="email" type="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} autoComplete="email" />
      </Field>
      <Field id="topic" label="Topic" error={errors.topic}>
        <select id="topic" value={values.topic} onChange={(e) => setValues({ ...values, topic: e.target.value })}>
          <option value="">Choose one</option>
          <option>Renewal</option>
          <option>First card question</option>
          <option>Records</option>
          <option>Something else</option>
        </select>
      </Field>
      <Field id="message" label="Message" error={errors.message}>
        <textarea id="message" value={values.message} onChange={(e) => setValues({ ...values, message: e.target.value })} />
      </Field>
      <button className="btn btn-primary" type="submit" disabled={pending}>{pending ? "Checking…" : "Send message"}</button>
    </form>
  );
}

export function ReviewForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [values, setValues] = useState<ReviewInput>({ firstName: "", city: "", rating: "", review: "", patientConfirm: false });

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next = validateReview(values);
    setErrors(next);
    setMessage("");
    if (Object.keys(next).length) return;
    setPending(true);
    try {
      const result = await post("/api/review/", values);
      setMessage(result.data.message || NOT_DELIVERED);
    } catch {
      setMessage("The form could not reach the server. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate>
      <h2>Share a review</h2>
      <p>Reviews are not published until they are verified. This build does not store them.</p>
      <Summary errors={errors} />
      {message ? <p className="status-bad" role="status">{message}</p> : null}
      <Field id="firstName" label="First name" error={errors.firstName}>
        <input id="firstName" value={values.firstName} onChange={(e) => setValues({ ...values, firstName: e.target.value })} />
      </Field>
      <Field id="city" label="Arkansas city" error={errors.city}>
        <input id="city" value={values.city} onChange={(e) => setValues({ ...values, city: e.target.value })} />
      </Field>
      <fieldset className="field">
        <legend>Rating</legend>
        <div className="filters">
          {["1", "2", "3", "4", "5"].map((score) => (
            <label key={score} className="chip" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              <input type="radio" name="rating" value={score} checked={values.rating === score} onChange={() => setValues({ ...values, rating: score })} />
              {score}
            </label>
          ))}
        </div>
        {errors.rating ? <p className="error">{errors.rating}</p> : null}
      </fieldset>
      <Field id="review" label="What happened at your visit" error={errors.review}>
        <textarea id="review" value={values.review} onChange={(e) => setValues({ ...values, review: e.target.value })} />
      </Field>
      <label className="check">
        <input type="checkbox" checked={values.patientConfirm} onChange={(e) => setValues({ ...values, patientConfirm: e.target.checked })} />
        <span>I am an Arkansas medical marijuana patient.</span>
      </label>
      {errors.patientConfirm ? <p className="error">{errors.patientConfirm}</p> : null}
      <button className="btn btn-primary" type="submit" disabled={pending}>{pending ? "Checking…" : "Submit review"}</button>
    </form>
  );
}
