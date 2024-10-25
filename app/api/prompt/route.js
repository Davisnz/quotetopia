import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    await connectToDB();

    const prompts = await Prompt.find({})
      .sort({ createdAt: -1 })
      .populate("creator");

    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch prompts" }), {
      status: 500,
    });
  }
}
