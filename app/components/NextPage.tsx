import React from "react";
import Link from "next/link";

export default function NextPage({
  page,
  totalPages,
  currentSearchParams,
}: {
  page: number;
  totalPages: number;
  currentSearchParams: URLSearchParams;
}) {
  const newSearchParams = new URLSearchParams(currentSearchParams);

  newSearchParams.set("page", `${page + 1}`);

  return page < totalPages ? (
    <Link
      className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
      href={`/?${newSearchParams}`}
    >
      Next
    </Link>
  ) : (
    <button
      disabled
      className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm font-semibold text-gray-900 opacity-50"
    >
      Next
    </button>
  );
}
