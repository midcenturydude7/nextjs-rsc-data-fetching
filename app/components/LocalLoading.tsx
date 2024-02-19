import Spinner from "./Spinner";

export default function LocalLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 text-black">
      <Spinner className="w-8 animate-spin" />
    </div>
  );
}
