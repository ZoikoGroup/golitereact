"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function UpdateProfilePage() {

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    vc_enrollment_id: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  // ✅ Load user from localStorage
  useEffect(() => {

    const user = localStorage.getItem("user");

    if (user) {

      const u = JSON.parse(user);

      setForm({
        username: u.username || "",
        first_name: u.first_name || "",
        last_name: u.last_name || "",
        email: u.email || "",
        vc_enrollment_id: u.vc_enrollment_id || "",
      });

    }

  }, []);



  // ✅ handle change
  const handleChange = (e:any) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };



  // ✅ Submit update
  const handleSubmit = async (e:any) => {

    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {

      const token = localStorage.getItem("golite_token");

      const res = await fetch(
        `${API_BASE}/api/accounts/update-profile/`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
          },

          body: JSON.stringify(form),

        }
      );


      const data = await res.json();


      if (!res.ok) {

        throw new Error(data.message || "Update failed");

      }


      // ✅ update localStorage
      localStorage.setItem("user", JSON.stringify(data));


      setMessage("Profile updated successfully");


    }

    catch (err:any) {

      setError(err.message);

    }

    finally {

      setLoading(false);

    }

  };



  return (

    <>
      <Header />


      <div className="min-h-screen bg-gray-100 py-12">

        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8">


          <h2 className="text-2xl font-bold mb-6 text-center">

            Update Profile

          </h2>


          {message && (
            <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
              {error}
            </div>
          )}



          <form onSubmit={handleSubmit} className="space-y-4">


            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full border p-3 rounded"
              required
            />


            <input
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full border p-3 rounded"
              required
            />


            <input
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full border p-3 rounded"
              required
            />


            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              className="w-full border p-3 rounded"
              required
            />


            <input
              name="vc_enrollment_id"
              value={form.vc_enrollment_id}
              onChange={handleChange}
              placeholder="Enrollment ID"
              className="w-full border p-3 rounded"
            />



            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white p-3 rounded hover:bg-orange-600"
            >

              {loading ? "Updating..." : "Update Profile"}

            </button>


          </form>


        </div>

      </div>


      <Footer />

    </>

  );

}