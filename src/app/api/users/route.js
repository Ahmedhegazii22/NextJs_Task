import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";

// GET - Get all users
export async function GET() {
  try {
    await dbConnect();
    const users = await User.find();
    return Response.json(users, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Error fetching users", error: error.message },
      { status: 500 }
    );
  }
}

//  POST - Create new user
export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();
    const user = await User.create(data);
    return Response.json(user, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: "Error creating user", error: error.message },
      { status: 500 }
    );
  }
}
