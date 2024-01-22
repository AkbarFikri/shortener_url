"use client";
import { useSearchParams } from "next/navigation";
import { CopyIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function successPage() {
  const searchParams = useSearchParams();
  const baseUrl = searchParams.get("baseUrl");
  const aliasUrl = searchParams.get("alias");
  const [isCopied, setIsCopied] = useState(false);

  function copy(text) {
    setIsCopied(true);
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-200">
      <div className="flex flex-col w-1/3 items-center justify-center h-full p-4">
        <div className="text-4xl font-extrabold mb-8">
          <span className="text-blue-950 font-bold">Short Success!</span>
        </div>
        <div className="bg-green-300 w-full rounded-lg py-4 px-4 space-y-4">
          <div className="w-full space-y-1">
            <h3 className="flex font-bold w-full justify-center ">Base URL</h3>
            <div className="flex justify-between items-center gap-2">
              <span className="overflow-auto">{baseUrl}</span>
            </div>
          </div>
          <div className="w-full space-y-1  ">
            <h3 className="flex font-bold w-full justify-center">Alias URL</h3>
            <div className="flex justify-between items-center gap-2">
              <span className="overflow-auto ">{aliasUrl}</span>
              <CopyIcon
                className="h-5 w-5 hover:cursor-pointer"
                onClick={() => copy(aliasUrl)}
              />
            </div>
          </div>
        </div>
        {isCopied ? (
          <div
            className=" mt-4 bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 "
            role="alert"
          >
            <span class="font-bold">Success</span> Copied to clipboard.
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
