import React from "react";

const RegisterFees = () => {
  return (
    <div className="p-6 text-white">
      <div className=" p-6">
        <h2 className="text-xl font-semibold mb-6 text-white">
          Register Student Fee
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Student */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-slate-400">
              Select Student
            </label>
            <select
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option>Select Student</option>
              <option>Ali Khan</option>
              <option>Ahmed Raza</option>
            </select>
          </div>

          {/* Month */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-slate-400">
              Fee Month
            </label>
            <input
              type="month"
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Total Fee */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-slate-400">
              Total Fee
            </label>
            <input
              type="number"
              placeholder="Enter total fee"
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Discount */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-slate-400">
              Discount
            </label>
            <input
              type="number"
              placeholder="Enter discount"
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Fine */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-slate-400">
              Late Fine
            </label>
            <input
              type="number"
              placeholder="Enter fine amount"
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Amount Paid */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-slate-400">
              Amount Paid
            </label>
            <input
              type="number"
              placeholder="Enter paid amount"
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Payment Method */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-slate-400">
              Payment Method
            </label>
            <select
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option>Cash</option>
              <option>Bank Transfer</option>
              <option>Online Payment</option>
            </select>
          </div>

          {/* Payment Date */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-slate-400">
              Payment Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-slate-400">
              Payment Status
            </label>
            <select
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option>Paid</option>
              <option>Partial</option>
              <option>Unpaid</option>
            </select>
          </div>

          {/* Notes */}
          <div className="flex flex-col md:col-span-2 lg:col-span-3">
            <label className="text-sm mb-2 text-slate-400">
              Notes
            </label>
            <textarea
              rows="3"
              placeholder="Optional notes"
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="px-5 py-2 rounded-md bg-slate-700 hover:bg-slate-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500"
            >
              Register Fee
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default RegisterFees;