import { useState } from "react";

const MENU_ITEMS = [
  { id: "pendingSchools", label: "Pending Schools" },
  { id: "pendingAdmins", label: "Pending Admins" },
  { id: "removeUsers", label: "Remove Users" },
  { id: "reports", label: "Reports" },
];

const DUMMY_DATA = {
  pendingSchools: [
    "Greenwood High",
    "Sunrise Academy",
    "Blue Valley School",
  ],
  pendingAdmins: ["Maria Smith", "Ahmed Khan", "Sara Lee"],
  removeUsers: ["Ali Raza (Student)", "John Doe (Teacher)", "Ayesha Noor (Admin)"],
  reports: ["Monthly Signup Report", "User Activity Report", "School Approval Report"],
};

function PanelContent({ activeTab }) {
  const list = DUMMY_DATA[activeTab] || [];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 min-h-[420px]">
      {activeTab === "pendingSchools" && (
        <>
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Pending Schools</h2>
          <ul className="space-y-3">
            {list.map((school) => (
              <li
                key={school}
                className="flex items-center justify-between border rounded-lg px-4 py-3"
              >
                <span>{school}</span>
                <button className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700">
                  Approve
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {activeTab === "pendingAdmins" && (
        <>
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Pending Admins</h2>
          <ul className="space-y-3">
            {list.map((admin) => (
              <li
                key={admin}
                className="flex items-center justify-between border rounded-lg px-4 py-3"
              >
                <span>{admin}</span>
                <button className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700">
                  Approve
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {activeTab === "removeUsers" && (
        <>
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Remove Users</h2>
          <ul className="space-y-3">
            {list.map((user) => (
              <li
                key={user}
                className="flex items-center justify-between border rounded-lg px-4 py-3"
              >
                <span>{user}</span>
                <button className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {activeTab === "reports" && (
        <>
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Reports</h2>
          <ul className="space-y-3">
            {list.map((report) => (
              <li
                key={report}
                className="flex items-center justify-between border rounded-lg px-4 py-3"
              >
                <span>{report}</span>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
                  Open
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("pendingSchools");

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Super Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <aside className="md:col-span-4 lg:col-span-3 bg-white rounded-xl shadow-lg p-4 h-fit">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Actions</h2>
            <div className="space-y-3">
              {MENU_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                    activeTab === item.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </aside>

          <section className="md:col-span-8 lg:col-span-9">
            <PanelContent activeTab={activeTab} />
          </section>
        </div>
      </div>
    </div>
  );
}
