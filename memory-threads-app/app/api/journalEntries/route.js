// app/api/journalEntries.route.js
import { NextResponse } from "next/server";
import dbConnect from "@lib/dbConnect.js";
import JournalEntry from "@models/JournalEntryModel.js";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

export async function POST(request) {
  const { userId } = auth();
  const { title, content, specialLink, image } = await request.json();
  await dbConnect();
  await JournalEntry.create({ title, content, specialLink, image, userId });
  // console.log(path);
  revalidatePath("/dashboard");
  return NextResponse.json(
    { message: "Journal entry created" },
    { status: 201 }
  );
}

export async function GET() {
  const { userId } = auth();
  await dbConnect();

  try {
    const entries = await JournalEntry.find({ userId }).sort({
      dateCreated: -1,
    }); // Fetch all journal entries
    return NextResponse.json(entries);
  } catch (error) {
    return NextResponse.error(error);
  }
}
