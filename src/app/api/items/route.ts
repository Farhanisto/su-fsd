import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface Item {
  createdAt: string;
  filename: string;
}

export async function GET() {
  const filePath = path.join(process.cwd(), "data.csv");

  try {
    const fileContents = await fs.readFile(filePath, "utf-8");
    const items: Item[] = fileContents
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => {
        const [createdAt, filename] = line.split(";");
        return {
          createdAt: createdAt.trim(),
          filename: filename.trim(),
        };
      });

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { message: "Error reading file", error },
      { status: 500 }
    );
  }
}
