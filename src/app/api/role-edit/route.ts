import User from "@/models/User";
import dbConnect from "@/lib/dbConnect"; // Helper to connect to MongoDB
import { getServerSession } from "next-auth";
import { roleUpdateSchema } from "@/app/schema/roleUpdate";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {
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

    const parsedInput = roleUpdateSchema.safeParse(await req.json());

    if (!parsedInput.success) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const { userId, newRole } = parsedInput.data;
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.role = newRole;
    await user.save();

    return NextResponse.json(
      { message: "Role updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("[ERROR]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
