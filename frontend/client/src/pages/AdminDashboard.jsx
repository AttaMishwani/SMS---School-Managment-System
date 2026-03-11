import React, { lazy, Suspense, useMemo, useState } from "react";

const CreateNewStudent = lazy(() =>
  import("../components/SchoolAdmin/CreateNewStudent")
);
const RegisterFees = lazy(() =>
  import("../components/SchoolAdmin/RegisterFees")
);

const MENU_ITEMS = [
  { id: "createNewStudent", label: "Create New Student" },
  { id: "registerFee", label: "Register Fee" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("createNewStudent");

  const CurrentTab = useMemo(() => {
    if (activeTab === "createNewStudent") return CreateNewStudent;
    if (activeTab === "registerFee") return RegisterFees;
    return null;
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
          <p className="text-slate-400 text-sm">School Management System</p>
          <h1 className="text-3xl md:text-4xl font-bold mt-1 text-white">
            School Admin Dashboard
          </h1>
          <p className="text-slate-400 mt-2">
            Register fees, manage students, and oversee school admin activities.
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
          <section className="md:col-span-8 lg:col-span-9 bg-slate-900 border border-slate-800 rounded-2xl ">
            <Suspense
              fallback={
                <div className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-6 text-slate-300">
                  Loading tab...
                </div>
              }
            >
              {CurrentTab && <CurrentTab />}
            </Suspense>
          </section>
        </div>
      </div>
    </div>
  );
}