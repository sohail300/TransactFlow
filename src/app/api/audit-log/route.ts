import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AuditLog from "@/models/AuditLog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { User } from "lucide-react";

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log("session", session);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Only Admin can change roles
  if (session.user.role !== "Admin") {
    return NextResponse.json({ message: "Access Denied" }, { status: 403 });
  }

  try {
    await dbConnect();

    const logs = await AuditLog.find()
      .populate({
        path: "userId",
        select: "email",
        strictPopulate: false,
      })
      .populate({
        path: "managerId",
        select: "email",
        strictPopulate: false,
      })
      .lean();

    console.log("logs", logs);

    return NextResponse.json({ logs }, { status: 200 });
  } catch (error) {
    console.error("[ERROR]:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
