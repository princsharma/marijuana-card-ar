import { NextResponse } from "next/server";
import { NOT_DELIVERED, validateReview, type ReviewInput } from "@/lib/validate";

export async function POST(request: Request) {
  const input = (await request.json().catch(() => null)) as Partial<ReviewInput> | null;
  if (!input) return NextResponse.json({ delivered: false, message: "Send JSON." }, { status: 400 });
  const errors = validateReview({
    firstName: String(input.firstName ?? ""),
    city: String(input.city ?? ""),
    rating: String(input.rating ?? ""),
    review: String(input.review ?? ""),
    patientConfirm: Boolean(input.patientConfirm),
  });
  if (Object.keys(errors).length) {
    return NextResponse.json({ delivered: false, message: "Check the highlighted fields.", errors }, { status: 400 });
  }
  return NextResponse.json(
    { delivered: false, message: `${NOT_DELIVERED} The review was not published.` },
    { status: 503 },
  );
}
