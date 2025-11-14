"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditUserPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const res = await fetch(`/api/users/${id}`);
        if (!res.ok) throw new Error("Failed to load user data");
        const data = await res.json();
        setForm({ ...data, password: "" });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchUser();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const updateData = { username: form.username, email: form.email };
      if (form.password) updateData.password = form.password;

      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save changes");
      }

      router.push("/users");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading && !form.username) return <p className="p-6">Loading...</p>;
  if (error && !form.username)
    return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block mb-2 font-medium">Username</label>
          <input
            className="border p-2 rounded w-full"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            className="border p-2 rounded w-full"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            New Password (optional)
          </label>
          <input
            className="border p-2 rounded w-full"
            type="password"
            placeholder="Leave empty to keep current password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded disabled:bg-gray-400"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
