import { NextResponse } from "next/server";
import dbConnect from "@lib/dbConnect.js";
import User from "@models/User.js";

export async function POST(request) {
  const user = await request.json();
  await dbConnect();
  // await JournalEntry.create({ title, content, specialLink, image, userId });
  // console.log(path);
  const { id, firstName, lastName, fullName, username, primaryEmailAddress } =
    user;

  const email = primaryEmailAddress.emailAddress;

  const update = {
    firstName,
    lastName,
    fullName,
    username,
    email,
  };

  const options = {
    new: true, // return the updated document
    upsert: true, // create a new document if none exists
  };

  try {
    await User.findOneAndUpdate({ id }, update, options);
    console.log("User created or updated:");
  } catch (error) {
    console.error("Error in creating or updating user:", error);
  }

  return NextResponse.json(
    { message: "User Created/Updated" },
    { status: 200 }
  );
}
