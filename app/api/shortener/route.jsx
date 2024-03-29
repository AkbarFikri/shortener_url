import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const parrentUrl = process.env.OWN_BASE_URL;
const siteNotFound = parrentUrl + "/unavailabel";

export async function GET(request) {
  const searchQuery = request.nextUrl.searchParams;
  const alias = searchQuery.get("alias");
  let base = "";

  if (!alias) {
    return NextResponse.redirect(siteNotFound);
  }
  const result = await prisma.shortUrl.findUnique({
    where: {
      alias: alias,
    },
    select: {
      id: true,
      base_url: true,
    },
  });
  if (!result) {
    return NextResponse.redirect(siteNotFound);
  }
  if (
    !result.base_url.includes("http://") ||
    !result.base_url.includes("https://")
  ) {
    base = "http://" + result.base_url;
  } else {
    base = result.base_url;
  }

  return NextResponse.redirect(base);
}

export async function POST(request) {
  const { alias, base_url } = await request.json();

  if (!alias || !base_url) {
    return NextResponse.json(
      { massage: "Error Alias or Base Url Must be added" },
      { status: 404 }
    );
  }
  const count = await prisma.shortUrl.count({
    where: {
      alias: alias,
    },
  });
  if (count != 0) {
    return NextResponse.json(
      { massage: "Error Alias Has been taken" },
      { status: 404 }
    );
  }
  const result = await prisma.shortUrl.create({
    data: {
      alias: alias,
      base_url: base_url,
    },
    select: {
      id: true,
      alias: true,
      base_url: true,
    },
  });

  const short_url = parrentUrl + "/" + result.alias;

  result.short_url = short_url;

  return NextResponse.json({ result }, { status: 200 });
}
