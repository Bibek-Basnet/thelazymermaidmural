import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity webhook → instant site refresh.
 * Configure at sanity.io/manage → API → Webhooks:
 *   URL:    https://<your-domain>/api/revalidate
 *   Secret: same value as SANITY_REVALIDATE_SECRET in the environment.
 * Without it, edits still go live within 60 seconds (ISR).
 */
export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      return NextResponse.json(
        { message: "Missing SANITY_REVALIDATE_SECRET" },
        { status: 500 }
      );
    }

    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      req,
      secret
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 }
      );
    }

    revalidateTag("sanity", { expire: 0 });

    return NextResponse.json({
      revalidated: true,
      type: body?._type,
      now: Date.now(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ message }, { status: 500 });
  }
}
