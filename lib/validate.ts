export type FieldErrors = Record<string, string>;

export type BookingInput = {
  fullName: string;
  email: string;
  phone: string;
  cardExpiry: string;
  window: string;
  renewalConfirm: boolean;
  consent: boolean;
};

export type ContactInput = {
  fullName: string;
  email: string;
  topic: string;
  message: string;
};

export type ReviewInput = {
  firstName: string;
  city: string;
  rating: string;
  review: string;
  patientConfirm: boolean;
};

const emailOk = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export function validateBooking(input: BookingInput): FieldErrors {
  const errors: FieldErrors = {};
  if (input.fullName.trim().length < 2) errors.fullName = "Enter your full name.";
  if (!emailOk(input.email)) errors.email = "Enter a valid email address.";
  const digits = input.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 11) {
    errors.phone = "Enter a 10-digit phone number.";
  }
  if (!input.cardExpiry) errors.cardExpiry = "Enter the date your card expires.";
  if (!input.window) errors.window = "Choose a preferred time of day.";
  if (!input.renewalConfirm) {
    errors.renewalConfirm =
      "Online booking is for renewals only. A first certification has to be in person.";
  }
  if (!input.consent) errors.consent = "Confirm the telehealth consent before sending.";
  return errors;
}

export function validateContact(input: ContactInput): FieldErrors {
  const errors: FieldErrors = {};
  if (input.fullName.trim().length < 2) errors.fullName = "Enter your name.";
  if (!emailOk(input.email)) errors.email = "Enter a valid email address.";
  if (!input.topic) errors.topic = "Choose a topic.";
  if (input.message.trim().length < 10) {
    errors.message = "Enter a message of at least 10 characters.";
  }
  return errors;
}

export function validateReview(input: ReviewInput): FieldErrors {
  const errors: FieldErrors = {};
  if (input.firstName.trim().length < 2) errors.firstName = "Enter your first name.";
  if (input.city.trim().length < 2) errors.city = "Enter your Arkansas city.";
  if (!["1", "2", "3", "4", "5"].includes(input.rating)) {
    errors.rating = "Choose a rating from 1 to 5.";
  }
  if (input.review.trim().length < 20) {
    errors.review = "Enter at least 20 characters so the review is specific.";
  }
  if (!input.patientConfirm) {
    errors.patientConfirm = "Confirm that you are an Arkansas patient.";
  }
  return errors;
}

export const NOT_DELIVERED =
  "This build has no scheduling or email provider, so nothing was sent to a clinic. The form checks your details and stops there until a provider is connected.";
