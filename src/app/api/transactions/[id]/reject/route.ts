import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Transaction from "@/models/Transactions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions"; // Import your NextAuth config
import AuditLog from "@/models/AuditLog";

// Approve the transaction
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Extract transaction ID from URL parameters
  const { id: transactionId } = params;

  const session = await getServerSession(authOptions);

  if (
    !session ||
    (session.user.role !== "Manager" && session.user.role !== "Admin")
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    // Connect to the database
    await dbConnect();

    // Find the transaction by its ID
    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    if (transaction.status !== "Pending") {
      return NextResponse.json(
        { message: "Only pending transactions can be approved" },
        { status: 400 }
      );
    }

    // Approve the transaction
    transaction.status = "Rejected";
    transaction.approvedBy = session.user.id; // Record who approved the transaction
    await transaction.save();

    // Create an audit log entry
    const newAudit = await AuditLog.create({
      action: "Reject",
      transactionId: transaction._id,
      managerId: session.user.id,
    });

    console.log(newAudit);

    // Return the updated transaction
    return NextResponse.json({
      message: "Transaction rejected successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
