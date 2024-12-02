import { getServerSession } from "next-auth"; // For session handling
import { authOptions } from "@/lib/authOptions"; // Your next-auth configuration
import dbConnect from "@/lib/dbConnect"; // Helper to connect to MongoDB
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log("session", session);

  if (!session) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }

  // Only Admin can change roles
  if (session.user.role !== "Admin") {
    return NextResponse.json({ message: "Access Denied" }, { status: 403 });
  }

  try {
    await dbConnect();

    const users = await User.find();
    console.log(users);

    return NextResponse.json({ users }, { status: 201 });
  } catch (error) {
    console.log("[ERROR]:", error);
    return NextResponse.json(
      { msg: "Error fetching transactions" },
      { status: 500 }
    );
  }
}
