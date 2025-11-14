import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// GET USER
export async function GET(req, context) {
  try {
    await dbConnect();
    const { id } = await context.params;

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userResponse = user.toObject();
    delete userResponse.password;

    return NextResponse.json(userResponse, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// PUT USER
export async function PUT(req, context) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const body = await req.json();

    if (!body.username || !body.email) {
      return NextResponse.json(
        { message: "Username and email are required" },
        { status: 400 }
      );
    }

    if (body.password && body.password.trim() !== "") {
      body.password = await bcrypt.hash(body.password, 10);
    } else {
      delete body.password;
    }

    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userResponse = updatedUser.toObject();
    delete userResponse.password;

    return NextResponse.json(userResponse, { status: 200 });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    await dbConnect();
    const { id } = await context.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
