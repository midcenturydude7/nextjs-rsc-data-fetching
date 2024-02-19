import React from "react";
import Spinner from "./components/Spinner";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 text-black">
      <Spinner className="w-8 animate-spin" />
    </div>
  );
}
