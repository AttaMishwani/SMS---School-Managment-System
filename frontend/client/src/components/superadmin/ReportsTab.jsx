const reports = [
  { title: "Monthly Signup Report", period: "February 2026", type: "PDF" },
  { title: "User Activity Report", period: "Last 30 days", type: "CSV" },
  { title: "School Approval Report", period: "Q1 2026", type: "PDF" },
];

export default function ReportsTab() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 min-h-[520px]">
      <h2 className="text-2xl font-semibold text-slate-800 mb-5">Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((report) => (
          <div key={report.title} className="border border-gray-200 rounded-xl p-4">
            <p className="font-semibold text-slate-800">{report.title}</p>
            <p className="text-sm text-slate-600 mt-1">{report.period}</p>
            <p className="text-xs text-slate-500 mt-1">{report.type}</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Open
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
