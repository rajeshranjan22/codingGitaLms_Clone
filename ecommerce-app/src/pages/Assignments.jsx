import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Assignments = () => {
  return (
    <div className="min-h-screen pt-20 bg-neutral-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Assignments</h1>
            <p className="text-neutral-400 text-sm">
              Search, filter and sort your assignments.
            </p>
          </div>

          <Link
            to="/student"
            className="text-sm text-neutral-300 hover:text-white underline"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* FILTER BAR */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 mb-4">
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Search */}
              <div className="md:col-span-2">
                <input
                  placeholder="Search by heading"
                  className="w-full rounded-md bg-neutral-950 border border-neutral-700 text-neutral-100 text-sm px-3 py-2 outline-none focus:border-neutral-500"
                />
              </div>

              {/* Status Filter */}
              <div>
                <select className="w-full rounded-md bg-neutral-950 border border-neutral-700 text-neutral-100 text-sm px-3 py-2">
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="submitted">Submitted (On time)</option>
                  <option value="late">Submitted (Late)</option>
                </select>
              </div>

              {/* Sort */}
              <div className="flex gap-2">
                <select className="flex-1 rounded-md bg-neutral-950 border border-neutral-700 text-neutral-100 text-sm px-3 py-2">
                  <option value="deadline">Sort by deadline</option>
                  <option value="createdAt">Sort by created date</option>
                  <option value="heading">Sort by heading</option>
                </select>

                <select className="rounded-md bg-neutral-950 border border-neutral-700 text-neutral-100 text-sm px-3 py-2">
                  <option value="asc">Asc</option>
                  <option value="desc">Desc</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ASSIGNMENTS LIST */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900">
          <div className="p-4 border-b border-neutral-800">
            <div className="flex items-center justify-between">
              <div className="text-white font-semibold">All Assignments</div>
            </div>
          </div>

          <div className="p-4">
            <div className="text-neutral-400 text-sm">
              No assignments found.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignments;
