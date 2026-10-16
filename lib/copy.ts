import type { SitePage } from "@/lib/types";

const SHARED = [
  "Cards last up to one year, unless the physician sets a shorter term.",
  "You can start a renewal up to 60 days before the card expires.",
  "A written certification has to reach the Arkansas Department of Health within 30 days of the signature.",
  "The state fee is $50 for a patient, a caregiver, or a 90-day visiting patient. It is separate from the evaluation.",
  "Home grow is not allowed.",
  "The purchase limit is 2.5 ounces in each rolling 14 days, across every dispensary.",
];

export function supportingPoints(page: SitePage) {
  const path = page.path;
  if (path.includes("home-grow")) return ["Patients and caregivers cannot grow cannabis at home.", "Purchases have to come from a licensed dispensary."];
  if (path.includes("delta-8")) return ["Act 629 of 2023 restricts delta-8 and delta-10 hemp products.", "Check the current court status before relying on a hemp product.", "A medical card is a separate program from hemp."];
  if (path.includes("purchase-limit") || path.includes("balance")) return ["The limit is 2.5 ounces every 14 days.", "The portal shows the remaining balance.", "The limit follows you across dispensaries."];
  if (path.includes("tax")) return ["Patients pay 6.5% state sales tax plus local tax at checkout.", "Act 380 of 2025 made the 4% privilege tax permanent."];
  if (path.includes("military")) return ["National Guard and U.S. military members cannot hold a registry card.", "Veterans who are not current service members can apply if they qualify."];
  if (path.includes("minor") || path.includes("caregiver")) return ["A caregiver card is $50.", "The caregiver background check is $40 from 1 October 2026.", "A caregiver is 21 or older, unless they are the parent of a minor patient.", "Minors cannot buy cannabis themselves."];
  if (path.includes("video") || path.includes("telehealth") || path.includes("online")) return ["A first certification cannot be done by telemedicine.", "A renewal can be done by telehealth.", "Audio-only cannot be used to renew a certification."];
  if (path.includes("expired")) return ["Do not assume an expired card is still a renewal.", "Ask the Arkansas Department of Health before you book if the card has already lapsed."];
  if (path.includes("anxiety") || path.includes("insomnia") || path.includes("depression") || path.includes("adhd")) return ["That condition is not on the list of 18.", "PTSD is on the list. Anxiety alone is not.", "Saying you have a non-listed condition does not qualify you."];
  if (path.includes("pain")) return ["Intractable pain means pain that has not responded to ordinary treatment for more than six months.", "Bring records that show the timeline and what has already been tried."];
  if (path.includes("employment") || path.includes("registry")) return ["Amendment 98 has some workplace language, and safety-sensitive jobs are different.", "Federal and DOT jobs follow federal rules.", "The registry is not a public list for employers to browse."];
  if (path.includes("oklahoma") || path.includes("crossing") || path.includes("visiting")) return ["Do not carry cannabis across state lines.", "A visiting patient card is $50 and lasts 90 days.", "The condition has to qualify in Arkansas too.", "Oklahoma has its own temporary process for some out-of-state cards. Product bought there cannot be brought back."];
  if (path.includes("edible") || path.includes("beginner") || path.includes("thc-vs-cbd") || path.includes("product") || path.includes("side-effect") || path.includes("dispensary-visit")) {
    return ["Start low and go slow.", "Edibles can take much longer to take effect than inhaled products. Do not take more while you are waiting.", "This practice does not sell cannabis and does not recommend a dose."];
  }
  if (page.pageType === "Condition article") {
    return ["Cannabis may help some symptoms. It does not treat the condition.", "Bring records from the clinician who manages this condition.", "A named medical reviewer has to sign off before publication. That assignment is still open."];
  }
  return SHARED.slice(0, 4);
}
