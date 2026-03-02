const usersToRemove = [
  { name: "Ali Raza", role: "Student", school: "Sunrise Academy" },
  { name: "John Doe", role: "Teacher", school: "Blue Valley School" },
  { name: "Ayesha Noor", role: "Admin", school: "Greenwood High" },
];

export default function RemoveUsersTab() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 min-h-[520px]">
      <h2 className="text-2xl font-semibold text-slate-800 mb-5">Remove Users</h2>
      <div className="space-y-3">
        {usersToRemove.map((user) => (
          <div
            key={`${user.name}-${user.role}`}
            className="border border-gray-200 rounded-xl px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          >
            <div>
              <p className="font-semibold text-slate-800">{user.name}</p>
              <p className="text-sm text-slate-600">{user.role}</p>
              <p className="text-sm text-slate-500">{user.school}</p>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 w-full md:w-auto">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
