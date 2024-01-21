"use client";
import { redirect } from "next/navigation";

export default function Page({ params }) {
  redirect("http://localhost:3000/api/shortener?alias=" + params.alias);
}
