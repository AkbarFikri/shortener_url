"use client";
import { Link2Icon } from "@radix-ui/react-icons";
import isUrl from "is-url";
import { useState } from "react";

export default function Home() {
  const [base, setBase] = useState("");
  const [alias, setAlias] = useState("");
  const [errorBase, setErrorBase] = useState("");
  const [errorAlias, setErrorAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  async function handleSubmit() {
    if (!base) {
      setErrorBase("Error, Base URL is Needed!");
      return;
    }
    if (!alias) {
      setErrorAlias("Error, Alias is Needed!");
      return;
    }
    const validateBaseUrl = isUrl(base);
    if (!validateBaseUrl) {
      setErrorBase("Error, The base is not a URL!");
      return;
    }
    const data = {};
    data.base_url = base;
    data.alias = alias;
    const result = await fetch("/api/shortener", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await result.json();
    if (!result.ok) {
      setErrorAlias("Error Alias Has been used!");
      return;
    }
    setShortUrl(res.result.short_url);
  }

  return (
    <main>
      <div className="w-screen h-screen flex items-center justify-center bg-slate-200">
        <div className="flex flex-col w-1/3 items-center justify-center h-full p-4">
          <div className="text-4xl font-extrabold mb-8">
            <span className="text-blue-950">Short.</span>
            <span className="text-cyan-600"> Share.</span>
            <span className="text-cyan-400"> Track</span>
          </div>
          <div className="flex w-full items-center py-3 px-4 bg-white rounded-full gap-2 focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.12)] duration-300 focus-within:outline-blue-400 focus-within:outline mb-4">
            <Link2Icon className="h-6 w-6 fill-blue-950 " color="" />
            <input
              name="base"
              type="text"
              className="w-full text-base focus:outline-none"
              placeholder="Paste link and shorten it"
              onChange={(e) => setBase(e.target.value)}
            />
          </div>
          {errorBase && (
            <span className="w-full rounded-2xl bg-red-200 text-red-600 h-10 text-center items-center flex justify-center">
              {errorBase}
            </span>
          )}
          <div className="flex w-full justify-evenly items-center py-3 px-4 bg-white rounded-full gap-2 focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.12)] duration-300 focus-within:outline-blue-400 focus-within:outline mb-4 mt-4">
            <div className="flex text-base w-2/3 justify-center items-center">
              <p>akbarfikri.my.id</p>
            </div>
            <div className="">/</div>
            <input
              name="alias"
              type="text"
              className="focus:outline-none w-full"
              placeholder="Enter alias here"
              onChange={(e) => setAlias(e.target.value)}
            />
          </div>
          {errorAlias && (
            <span className="w-full rounded-2xl bg-red-200 text-red-600 h-10 text-center items-center flex justify-center mb-4">
              {errorAlias}
            </span>
          )}
          <div className="">
            <button
              className="px-6 py-2 text-white rounded-full bg-blue-950"
              onClick={handleSubmit}
            >
              {" "}
              Shorten{" "}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
