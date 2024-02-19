import UsersTable from "./components/UsersTable";
import SearchInput from "./components/SearchInput";
import LocalLoading from "./components/LocalLoading";
import { Suspense } from "react";

export default async function Page({ searchParams }: { searchParams: any }) {
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  return (
    <div className="min-h-screen bg-gray-50 px-8 pt-12">
      <div className="flex items-center justify-between">
        <div className="w-80">
          <SearchInput search={search} />
        </div>
        <div className="ml-16 mt-0 flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </button>
        </div>
      </div>

      <Suspense fallback={<LocalLoading />}>
        <UsersTable searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
