import { NextRequest, NextResponse } from "next/server";

import { registerUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await registerUser(body);

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        message: result.message,
        fieldErrors: result.fieldErrors ?? null,
      },
      { status: result.status },
    );
  }

  return NextResponse.json(
    {
      success: true,
      user: result.data,
    },
    { status: result.status },
  );
}
