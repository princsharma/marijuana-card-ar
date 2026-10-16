import { NextResponse } from "next/server";
import { NOT_DELIVERED, validateBooking, type BookingInput } from "@/lib/validate";

export async function POST(request: Request) {
  const input = (await request.json().catch(() => null)) as Partial<BookingInput> | null;
  if (!input) return NextResponse.json({ delivered: false, message: "Send JSON." }, { status: 400 });
  const errors = validateBooking({
    fullName: String(input.fullName ?? ""),
    email: String(input.email ?? ""),
    phone: String(input.phone ?? ""),
    cardExpiry: String(input.cardExpiry ?? ""),
    window: String(input.window ?? ""),
    renewalConfirm: Boolean(input.renewalConfirm),
    consent: Boolean(input.consent),
  });
  if (Object.keys(errors).length) {
    return NextResponse.json({ delivered: false, message: "Check the highlighted fields.", errors }, { status: 400 });
  }
  return NextResponse.json({ delivered: false, message: NOT_DELIVERED }, { status: 503 });
}
