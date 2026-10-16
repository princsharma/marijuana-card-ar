# Gaps and deployment

Do not point a production domain at this build until the items below are decided. Staging can run with `npm run build` and `npm start`, or any Node host that supports Next.js 16.

## Workbook conflicts left open

- **UTM.** The workbook has no UTM sheet, column, or instruction. No `utm_` parameters were added to links, buttons, or campaigns.
- **Domain.** Overview still says `https://your-arkansas-domain.com`. Set `NEXT_PUBLIC_SITE_URL` when the domain is chosen.
- **In-person first visits.** Decision 1 default is used: the homepage books renewals only. `/new-patients/` explains the in-person rule and offers a calendar reminder. It does not book a first certification online.
- **New-patient price.** The Schema sheet mentions offers at $149 and $129. Decision 5 says $149 only if in-person visits exist. JSON-LD offers the $129 renewal only. The pricing table shows $149 as not offered online.
- **Doctor.** Dr. Johnathan Miller is named, and the Arkansas licence is not confirmed. No licence number is published.
- **Contributor URL.** `/contributors/first-last/` is the template row from the sheet. No writer name was provided.
- **Competitors.** Compare pages do not invent prices or link to competitor sites. Status is Decide.
- **Help count.** The Help Centre sheet has 19 questions. The Schema sheet says 27. The page uses the 19 questions that were written.
- **Refund terms, phone, email, and hours** are not in the workbook. Those pages say so. Forms validate, then the API returns “not delivered” because no scheduling or email provider is connected.
- **Coupon.** No coupon code was specified. The homepage notice points at pricing and states the telemedicine limit. It is not a discount code.
- **Reviews.** No verified reviews were supplied, so none are displayed.
- **Dispensaries.** The locator uses a 36-row snapshot from the Arkansas Cannabis Industry Association directory, not a live ABC feed. Visitors are told to confirm the state list.
- **Medical reviewer.** Condition pages say a reviewer must be named before publication. `reviewedBy` is omitted from JSON-LD until that person is confirmed.
- **Policies** are drafts for a healthcare lawyer. They are not finished legal documents.

## Accessibility

Colors used for text were checked against WCAG contrast math: body text about 15:1, links about 9.9:1, white on the green button about 12.5:1, all above 7:1. Keyboard focus uses a 3px outline. This is not a formal WCAG AAA conformance claim. A full audit still has to cover every criterion, including with assistive technology.

## Hosting

No hosting account or repository remote was specified. Build on Node 20 or newer. Do not deploy until the domain and the open decisions are approved.
