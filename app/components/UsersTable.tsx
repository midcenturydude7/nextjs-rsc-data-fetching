import { prisma } from "@/lib/prisma";

import NextPage from "./NextPage";
import PreviousPage from "./PreviousPage";

import { ChevronRightIcon } from "@heroicons/react/20/solid";

export default async function UsersTable({
  searchParams,
}: {
  searchParams: any;
}) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const perPage = 7;
  const totalUsers =
    (await prisma.user.count({
      where: {
        name: {
          contains: search,
        },
      },
    })) + 1;
  const totalPages = Math.ceil(totalUsers / perPage);

  const page =
    typeof searchParams.page === "string" &&
    +searchParams.page > 1 &&
    +searchParams.page <= Math.ceil(totalPages)
      ? +searchParams.page
      : 1;

  const users = await prisma.user.findMany({
    take: perPage,
    skip: (page - 1) * perPage,
    where: {
      name: {
        contains: search,
      },
    },
  });

  const currentSearchParams = new URLSearchParams();
  if (search) {
    currentSearchParams.set("search", search);
  }

  if (page > 1) {
    currentSearchParams.set("page", `${page + 1}`);
  }

  const previousPageSearchParams = new URLSearchParams();
  if (search) {
    previousPageSearchParams.set("search", search);
  }
  previousPageSearchParams.set("page", `${page - 1}`);

  return (
    <div className="min-h-screen bg-gray-50 px-8 pt-8">
      <div className="mt-2 flow-root">
        <div className="-mx-6 -my-2">
          <div className="inline-block min-w-full px-6 py-2 align-middle">
            <div className="overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">
                      ID
                    </th>
                    <th className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th className="relative py-3.5 pl-3 pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900">
                        {user.id}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-4 pr-6 text-right text-sm font-medium">
                        <a
                          href="#"
                          className="inline-flex items-center text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                          <ChevronRightIcon className="h-4 w-4" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="ml-5 text-sm text-gray-700">
          Showing{" "}
          <span className="font-semibold">{`${page === 1 ? page : (page - 1) * perPage + 2}`}</span>{" "}
          to{" "}
          <span className="font-semibold">
            {Math.min(page * perPage + 1, totalUsers)}
          </span>{" "}
          of <span className="font-semibold">{totalUsers}</span> users
        </p>
        <div className="space-x-2">
          <PreviousPage page={page} currentSearchParams={currentSearchParams} />
          <NextPage
            page={page}
            totalPages={totalPages}
            currentSearchParams={currentSearchParams}
          />
        </div>
      </div>
    </div>
  );
}
