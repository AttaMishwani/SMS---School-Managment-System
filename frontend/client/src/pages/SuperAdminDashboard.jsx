import { useMemo, useState } from "react";
import { lazy  , Suspense} from "react";

const PendingSchoolsTab = lazy(() => import("../components/superadmin/PendingSchoolsTab"));
const PendingAdminsTab = lazy(() => import("../components/superadmin/PendingAdminsTab"));
const RemoveUsersTab = lazy(() => import("../components/superadmin/RemoveUsersTab"));
const ReportsTab = lazy(() => import("../components/superadmin/ReportsTab"));

const MENU_ITEMS = [
  { id: "pendingSchools", label: "Pending Schools" },
  { id: "pendingAdmins", label: "Pending Admins" },
  { id: "removeUsers", label: "Remove Users" },
  { id: "reports", label: "Reports" },
];

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("pendingSchools");

  const CurrentTab = useMemo(() => {
    if (activeTab === "pendingSchools") return PendingSchoolsTab;
    if (activeTab === "pendingAdmins") return PendingAdminsTab;
    if (activeTab === "removeUsers") return RemoveUsersTab;
    return ReportsTab;
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-8">
      <div className="max-w-[1300px] mx-auto">

        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
          <p className="text-slate-400 text-sm">School Management System</p>
          <h1 className="text-3xl md:text-4xl font-bold mt-1 text-white">
            Super Admin Dashboard
          </h1>
          <p className="text-slate-400 mt-2">
            Review requests, manage school approvals, and monitor platform activity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Sidebar */}
          <aside className="md:col-span-4 lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-4 h-fit">
            <h2 className="text-lg font-semibold text-white mb-1">Actions</h2>
            <p className="text-sm text-slate-400 mb-4">
              Select a section to manage
            </p>

            <div className="space-y-3">
              {MENU_ITEMS.map((item) => {
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition
                      ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-lg"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Content Panel */}
          <section className="md:col-span-8 lg:col-span-9 bg-slate-900 border border-slate-800 rounded-2xl p-6">
         <Suspense fallback={ <div className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-6 text-slate-300">
                  Loading tab...
                </div>}>

           <CurrentTab />
         </Suspense>
          </section>

        </div>
      </div>
    </div>
  );
}
