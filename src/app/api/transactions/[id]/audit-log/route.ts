import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AuditLog from "@/models/AuditLog";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: transactionId } = params;

    await dbConnect();

    const logs = await AuditLog.find({ transactionId });

    return NextResponse.json(logs);
  } catch (error) {
    console.error("[ERROR]:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic"; // Allows dynamic fetching of logs
