import React from "react";
import Link from "next/link";

export default function PreviousPage({
  page,
  currentSearchParams,
}: {
  page: number;
  currentSearchParams: URLSearchParams;
}) {
  const newSearchParams = new URLSearchParams(currentSearchParams);

  if (page > 2) {
    newSearchParams.set("page", `${page - 1}`);
  } else {
    newSearchParams.delete("page");
  }

  return page > 1 ? (
    <Link
      className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
      href={`/?${newSearchParams}`}
    >
      Previous
    </Link>
  ) : (
    <button
      disabled
      className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm font-semibold text-gray-900 opacity-50"
    >
      Previous
    </button>
  );
}
