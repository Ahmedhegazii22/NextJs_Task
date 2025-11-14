"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateUserPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(form),
    });
    router.push("/users");
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Add User</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-blue-600 text-white py-2 rounded">
          Add User
        </button>
      </form>
    </div>
  );
}
