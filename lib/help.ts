import type { FaqItem } from "@/lib/types";

export const HELP_ITEMS: FaqItem[] = [
  {
    id: "are-you-adh",
    category: "About us",
    question: "Are you the Arkansas Department of Health?",
    answer:
      "No. This is a private telehealth practice. The Arkansas Department of Health issues registry cards. Start with /about-us/ if you want the short version.",
  },
  {
    id: "do-you-sell-cannabis",
    category: "About us",
    question: "Do you sell cannabis?",
    answer:
      "No. The visit is an evaluation only. Patients buy products from licensed dispensaries. Use /tools/dispensary-locator/ to look up a location.",
  },
  {
    id: "is-this-an-emergency-service",
    category: "About us",
    question: "Is this an emergency service?",
    answer: "No. If this is an emergency, call 911. For a mental health crisis, contact a local crisis line.",
  },
  {
    id: "can-i-get-my-first-card-online",
    category: "Getting a card",
    question: "Can I get my first card online?",
    answer:
      "No. Arkansas requires an in-person first certification. Renewals can be online by video. Read /new-patients/ before you book anything.",
  },
  {
    id: "do-i-qualify",
    category: "Getting a card",
    question: "Do I qualify?",
    answer:
      "You need one of the 18 listed conditions, you need to be 18 or older (minors go through a parent caregiver), and you need Arkansas residency. Try /tools/do-i-qualify/.",
  },
  {
    id: "do-i-need-medical-records",
    category: "Getting a card",
    question: "Do I need medical records?",
    answer:
      "Records help the physician confirm a qualifying condition. Bring what you have from the clinician who treats that condition.",
  },
  {
    id: "can-you-guarantee-approval",
    category: "Getting a card",
    question: "Can you guarantee approval?",
    answer:
      "No. The physician decides whether to certify you, and the state decides whether to issue the card. Read /policy/refund-policy/ for how fees are handled.",
  },
  {
    id: "are-your-doctors-licensed-in-arkansas",
    category: "Visits and doctors",
    question: "Are your doctors licensed in Arkansas?",
    answer:
      "Only an Arkansas-licensed physician can certify a patient. Dr. Johnathan Miller is the physician named in this plan, and that licence still has to be confirmed before launch. See /doctors/johnathan-miller/.",
  },
  {
    id: "can-i-renew-by-phone",
    category: "Visits and doctors",
    question: "Can I renew by phone?",
    answer: "No. Arkansas rules do not allow an audio-only renewal. The renewal visit has to be video.",
  },
  {
    id: "what-happens-during-the-visit",
    category: "Visits and doctors",
    question: "What happens during the renewal visit?",
    answer:
      "It is a short video review with an Arkansas-licensed physician. If you are approved, you receive a new written certification to submit to the state.",
  },
  {
    id: "how-much-does-renewal-cost",
    category: "Fees and refunds",
    question: "How much does renewal cost?",
    answer:
      "The renewal evaluation is $129, plus the separate $50 Arkansas Department of Health fee. Details are on /pricing/.",
  },
  {
    id: "is-the-adh-fee-included",
    category: "Fees and refunds",
    question: "Is the ADH fee included?",
    answer: "No. The $50 state fee is paid to the Arkansas Department of Health. There is no reduced state fee.",
  },
  {
    id: "what-if-im-not-approved",
    category: "Fees and refunds",
    question: "What if I am not approved?",
    answer:
      "The physician can decline to certify you. The refund terms are not final in this plan yet. Read /policy/refund-policy/ before you pay.",
  },
  {
    id: "how-long-is-my-certification-valid",
    category: "ADH application and renewal",
    question: "How long is my certification valid?",
    answer: "Submit the written certification to the Arkansas Department of Health within 30 days of the physician signature.",
  },
  {
    id: "when-can-i-renew",
    category: "ADH application and renewal",
    question: "When can I renew?",
    answer: "You can renew up to 60 days before your card expires. The homepage can add that date to your calendar.",
  },
  {
    id: "who-submits-my-application",
    category: "ADH application and renewal",
    question: "Who submits my ADH application?",
    answer: "You submit it online. The care team can tell you which fields to complete. Use /tools/application-checklist/ so nothing is missed.",
  },
  {
    id: "when-will-i-get-my-card",
    category: "ADH application and renewal",
    question: "When will I get my card?",
    answer:
      "The state says processing can take up to 14 days. There is no temporary card. You can print the card once it is approved, or ask for it to be mailed.",
  },
  {
    id: "is-my-information-private",
    category: "Privacy",
    question: "Is my information private?",
    answer: "Health information is meant to be handled under HIPAA. Read /policy/hipaa-compliance/ and /policy/privacy-policy/.",
  },
  {
    id: "do-you-share-with-employers",
    category: "Privacy",
    question: "Do you share information with employers?",
    answer: "No. This practice does not send your certification details to an employer.",
  },
];

export const HOME_FAQS = HELP_ITEMS.filter((item) =>
  [
    "can-i-get-my-first-card-online",
    "can-i-renew-by-phone",
    "how-much-does-renewal-cost",
    "when-can-i-renew",
    "what-happens-during-the-visit",
    "can-you-guarantee-approval",
  ].includes(item.id),
);
