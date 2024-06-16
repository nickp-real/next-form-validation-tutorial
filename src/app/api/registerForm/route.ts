import { schema } from "@/app/registrationSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const data = Object.fromEntries(formData);
  const parsed = schema.safeParse(data);

  if (!parsed.success)
    return NextResponse.json(
      { message: "Invalid data", error: parsed.error },
      { status: 400 },
    );

  // Add data to db
  return NextResponse.json({ message: "User registered", user: parsed.data });
}
