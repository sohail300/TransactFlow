import { getServerSession } from "next-auth"; // For session handling
import { authOptions } from "@/lib/authOptions"; // Your next-auth configuration
import Transaction from "@/models/Transactions"; // Mongoose transaction model
import dbConnect from "@/lib/dbConnect"; // Helper to connect to MongoDB
import { transactionSchema } from "@/app/schema/transactionSchema";
import { NextResponse } from "next/server";
import AuditLog from "@/models/AuditLog";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  console.log("session", session);

  if (!session) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    const parsedInput = transactionSchema.safeParse(await req.json());

    if (!parsedInput.success) {
      return NextResponse.json({ msg: "Invalid input" }, { status: 400 });
    }

    const { type, amount, description } = parsedInput.data;

    // Create a new transaction
    const newTransaction = await Transaction.create({
      type,
      amount: amount * 100,
      description,
      employeeId: session.user.id,
    });

    console.log(newTransaction);

    // Create an audit log entry
    const newAudit = await AuditLog.create({
      action: "Submit",
      transactionId: newTransaction._id,
      userId: session.user.id,
    });

    console.log(newAudit);

    return NextResponse.json({ msg: "Transaction created" }, { status: 201 });
  } catch (error) {
    console.log("[ERROR]:", error);
    return NextResponse.json(
      { msg: "Error fetching transactions" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }

  const { role } = session.user;
  let transactions = [];

  try {
    // Connect to the database
    await dbConnect();

    // Fetch transactions based on the user's role
    if (role === "Employee") {
      transactions = await Transaction.find({ employeeId: session.user.id });
    } else if (role === "Manager" || role === "Admin") {
      transactions = await Transaction.find();
    }

    return NextResponse.json({ transactions }, { status: 200 });
  } catch (error) {
    console.log("[ERROR]:", error);
    return NextResponse.json(
      { msg: "Error fetching transactions" },
      { status: 500 }
    );
  }
}
