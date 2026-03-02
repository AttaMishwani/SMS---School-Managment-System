import { useEffect, useState } from "react";

const BASE = "http://localhost:5000/api/schools";
const PENDING_SCHOOLS_URL = `${BASE}/pendingschools`;

export default function PendingSchoolsTab() {
  const [pendingSchools, setPendingSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPendingSchools = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(PENDING_SCHOOLS_URL);
      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Failed to fetch pending schools.");

      setPendingSchools(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.message || "Error fetching pending schools.");
      setPendingSchools([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (schoolId, status) => {
    try {
      setError("");

      const response = await fetch(`${BASE}/${schoolId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData?.message || "Failed to update status.");
      }

      // Remove from the list immediately (since it's no longer PENDING)
      setPendingSchools((prev) => prev.filter((s) => s._id !== schoolId));
    } catch (err) {
      setError(err?.message || "Failed to update status.");
    }
  };

  useEffect(() => {
    fetchPendingSchools();
  }, []);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Pending Schools</h2>
          <p className="text-sm text-slate-400">Approve or suspend schools requesting access.</p>
        </div>

        <button
          onClick={fetchPendingSchools}
          className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700"
        >
          Refresh
        </button>
      </div>

      {loading && (
        <div className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-300">
          Loading pending schools...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-rose-900/40 bg-rose-950/40 px-4 py-3 text-rose-200">
          {error}
        </div>
      )}

      {!loading && !error && pendingSchools.length === 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-300">
          No pending schools found.
        </div>
      )}

      {!loading && !error && pendingSchools.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-950 text-slate-300">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">School</th>
                <th className="px-4 py-3 text-left font-semibold">Email</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Registered</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {pendingSchools.map((school) => {
                const name = school?.name || school?.schoolName || "-";
                const email = school?.ownerEmail || school?.email || "-";
                const status = school?.status || "PENDING";
                const registered = school?.createdAt
                  ? new Date(school.createdAt).toLocaleDateString()
                  : "-";

                return (
                  <tr key={school._id} className="hover:bg-slate-950/60">
                    <td className="px-4 py-3 text-white">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                        <span className="font-medium">{name}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-slate-300">{email}</td>

                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-200">
                        {status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-slate-300">{registered}</td>

                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleAction(school._id, "ACTIVE")}
                          className="rounded-lg bg-emerald-600 px-3 py-2 font-medium text-white hover:bg-emerald-700"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => handleAction(school._id, "SUSPENDED")}
                          className="rounded-lg bg-rose-600 px-3 py-2 font-medium text-white hover:bg-rose-700"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}