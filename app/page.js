import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-6 flex items-center justify-center bg-gray-50">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold">School Directory</h1>
        <p className="text-gray-600 mt-2">
          Add schools and browse them like products.
        </p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link href="/addSchool" className="px-4 py-2 rounded bg-black text-white">
            Add School
          </Link>
          <Link href="/showSchools" className="px-4 py-2 rounded border">
            View Schools
          </Link>
        </div>
      </div>
    </main>
  );
}
