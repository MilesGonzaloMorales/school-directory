"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schoolSchema } from "@/lib/validators";
import { useState } from "react";

export default function AddSchoolPage() {
  const [serverMsg, setServerMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schoolSchema) });

  const onSubmit = async (values) => {
    setServerMsg("");
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([k, v]) => formData.append(k, v));

      const fileInput = document.getElementById("image");
      if (fileInput?.files?.[0]) {
        formData.append("image", fileInput.files[0]);
      }

      const res = await fetch("/api/schools", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");
      setServerMsg("School saved successfully!");
      reset();
      if (fileInput) fileInput.value = "";
    } catch (e) {
      setServerMsg(e.message || "Something went wrong");
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white shadow rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-1">Add School</h1>
        <p className="text-sm text-gray-500 mb-6">
          Fill the form and upload a school image.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                className="mt-1 w-full border rounded p-2"
                placeholder="ABC School"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-600 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                className="mt-1 w-full border rounded p-2"
                placeholder="info@school.com"
                {...register("email_id")}
              />
              {errors.email_id && (
                <p className="text-red-600 text-sm">
                  {errors.email_id.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">City</label>
              <input
                className="mt-1 w-full border rounded p-2"
                placeholder="Jaipur"
                {...register("city")}
              />
              {errors.city && (
                <p className="text-red-600 text-sm">{errors.city.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">State</label>
              <input
                className="mt-1 w-full border rounded p-2"
                placeholder="Rajasthan"
                {...register("state")}
              />
              {errors.state && (
                <p className="text-red-600 text-sm">{errors.state.message}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Address</label>
              <input
                className="mt-1 w-full border rounded p-2"
                placeholder="Street, Area, Landmark"
                {...register("address")}
              />
              {errors.address && (
                <p className="text-red-600 text-sm">{errors.address.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Contact (10 digits)
              </label>
              <input
                className="mt-1 w-full border rounded p-2"
                placeholder="9876543210"
                {...register("contact")}
              />
              {errors.contact && (
                <p className="text-red-600 text-sm">
                  {errors.contact.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Image</label>
              <input id="image" type="file" accept="image/*" className="mt-1 w-full" />
              <p className="text-xs text-gray-500 mt-1">
                JPG/PNG/WEBP, max 2MB.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-5 py-2 rounded bg-black text-white hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save School"}
          </button>

          {serverMsg && <p className="mt-3 text-sm">{serverMsg}</p>}
        </form>
      </div>
    </main>
  );
}
