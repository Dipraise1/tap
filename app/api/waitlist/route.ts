import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { xHandle, xId, wallet } = body;

    if (!xHandle || !wallet) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // LOGGING TO CONSOLE AS REQUESTED
    console.log("----------------------------------------");
    console.log("🚀 NEW WAITLIST JOINER");
    console.log(`X Handle: ${xHandle} (ID: ${xId})`);
    console.log(`Wallet:   ${wallet}`);
    console.log("----------------------------------------");

    return NextResponse.json({ success: true, message: "Joined waitlist" });
  } catch (error) {
    return NextResponse.json(
        { error: "Internal Server Error" }, 
        { status: 500 }
    );
  }
}
