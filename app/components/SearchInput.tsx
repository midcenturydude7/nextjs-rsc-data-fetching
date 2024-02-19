"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function SearchInput({ search }: { search?: string }) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  return (
    <div className="relative mt-1 rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </div>
      <input
        type="text"
        name="search"
        id="search"
        className="block w-full rounded-md border-gray-300 pl-10 text-sm text-black focus:border-gray-400 focus:outline-none focus:ring-0"
        placeholder="Search"
        defaultValue={search}
        onChange={(e) => {
          startTransition(() => {
            if (e.target.value) {
              router.push(`/?search=${e.target.value}`);
            } else {
              router.push("/");
            }
          });
        }}
      />
      {isPending && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <Spinner
            className="h-5 w-5 animate-spin text-gray-400"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}
