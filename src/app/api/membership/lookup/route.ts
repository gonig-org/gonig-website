import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const membershipNo = searchParams.get("membershipNo")?.trim().toUpperCase();

  if (!membershipNo) {
    return NextResponse.json({ error: "No membership number provided" }, { status: 400 });
  }

  const member = await client.fetch<{ fullName: string; status: string } | null>(
    `*[_type == "member" && membershipNo == $membershipNo][0] {
      fullName,
      status
    }`,
    { membershipNo }
  );

  if (!member) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.json({ fullName: member.fullName, status: member.status });
}
