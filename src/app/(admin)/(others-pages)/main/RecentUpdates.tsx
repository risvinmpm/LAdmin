"use client";
import React from "react";

const updatesData = [
  {
    id: 1,
    projectId: 1,
    date: "2024-01-10",
    title: "Cabinet Installation Completed",
    description:
      "All upper and lower cabinets have been installed successfully. Next phase: countertop fitting.",
  },
  {
    id: 2,
    projectId: 1,
    date: "2024-01-15",
    title: "Painting Work Started",
    description:
      "Painting team has begun interior wall painting. Expected to finish in 4 days.",
  },
];

export default function RecentUpdates({ projectId }: { projectId: number }) {
  const projectUpdates = updatesData.filter(
    (update) => update.projectId === projectId
  );

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold text-gray-800 mb-3">Recent Updates</h3>
      {projectUpdates.length ? (
        <ul className="space-y-4">
          {projectUpdates.map((update) => (
            <li key={update.id} className="border-b pb-3">
              <p className="text-sm text-gray-500">{update.date}</p>
              <h4 className="font-medium text-gray-800">{update.title}</h4>
              <p className="text-gray-600 text-sm">{update.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No recent updates yet.</p>
      )}
    </div>
  );
}
