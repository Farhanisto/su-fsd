import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface Item {
  createdAt: string;
  filename: string;
}

export async function GET() {
  // const items: Item[] = [
  //   { createdAt: "2023-09-20T10:00:00Z", filename: "file23.txt" },
  //   { createdAt: "2023-09-21T12:00:00Z", filename: "file3.txt" },
  //   { createdAt: "2023-09-19T09:00:00Z", filename: "file10.txt" },
  //   { createdAt: "2023-09-20T11:00:00Z", filename: "file1.txt" },
  // ];
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
