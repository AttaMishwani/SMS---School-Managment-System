export default function Footer() {
    return (
      <footer className="border-t bg-slate-900">
        <div className="max-w-[1300px] mx-auto px-4 py-4 text-sm text-slate-500 flex items-center justify-between">
          <p>© {new Date().getFullYear()} School Management System</p>
          <p className="text-slate-400">Powered by MERN</p>
        </div>
      </footer>
    );
  }
