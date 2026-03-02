const pendingAdmins = [
  { name: "Maria Smith", school: "Greenwood High", email: "maria@greenwood.edu" },
  { name: "Ahmed Khan", school: "Sunrise Academy", email: "ahmed@sunrise.edu" },
  { name: "Sara Lee", school: "Blue Valley School", email: "sara@bluevalley.edu" },
];

export default function PendingAdminsTab() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 min-h-[520px]">
      <h2 className="text-2xl font-semibold text-slate-800 mb-5">Pending Admins</h2>
      <div className="space-y-3">
        {pendingAdmins.map((admin) => (
          <div
            key={admin.email}
            className="border border-gray-200 rounded-xl px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          >
            <div>
              <p className="font-semibold text-slate-800">{admin.name}</p>
              <p className="text-sm text-slate-600">{admin.school}</p>
              <p className="text-sm text-slate-500">{admin.email}</p>
            </div>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 w-full md:w-auto">
              Approve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
