import { NextResponse } from "next/server";
import { NOT_DELIVERED, validateContact, type ContactInput } from "@/lib/validate";

export async function POST(request: Request) {
  const input = (await request.json().catch(() => null)) as Partial<ContactInput> | null;
  if (!input) return NextResponse.json({ delivered: false, message: "Send JSON." }, { status: 400 });
  const errors = validateContact({
    fullName: String(input.fullName ?? ""),
    email: String(input.email ?? ""),
    topic: String(input.topic ?? ""),
    message: String(input.message ?? ""),
  });
  if (Object.keys(errors).length) {
    return NextResponse.json({ delivered: false, message: "Check the highlighted fields.", errors }, { status: 400 });
  }
  return NextResponse.json({ delivered: false, message: NOT_DELIVERED }, { status: 503 });
}
