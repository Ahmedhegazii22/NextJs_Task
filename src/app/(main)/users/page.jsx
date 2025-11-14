"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/users", { cache: "no-store" });
      const data = await res.json();
      setUsers(data || []);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  if (loading) return <p className="p-6">Loading users...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Users</h1>
        <Link
          href="/users/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + Add User
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Username</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b">
                <td className="p-2">{u.username}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2 flex gap-2">
                  <Link
                    href={`/users/${u._id}`}
                    className="text-blue-600 underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={async () => {
                      await fetch(`/api/users/${u._id}`, { method: "DELETE" });
                      setUsers(users.filter((x) => x._id !== u._id));
                    }}
                    className="text-red-600 underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
