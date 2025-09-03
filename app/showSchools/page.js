export const dynamic = "force-dynamic";

async function fetchSchools() {
  // Figure out base URL
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/schools`, {
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch");
  return data.data || [];
}

export default async function ShowSchoolsPage() {
  const schools = await fetchSchools();
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Schools</h1>
        {schools.length === 0 ? (
          <p className="text-gray-600">
            No schools yet. Add one from{" "}
            <a className="underline" href="/addSchool">
              Add School
            </a>
            .
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools.map((s) => (
              <article
                key={s.id}
                className="bg-white shadow rounded-1xl overflow-hidden"
              >
                <div className="aspect-[16/9] bg-gray-100">
                  <img
                    src={s.image || "/schoolImages/placeholder.png"}
                    alt={s.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-lg">{s.name}</h2>
                  <p className="text-sm text-gray-600">{s.address}</p>
                  <p className="text-sm text-gray-500 mt-1">{s.city}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
