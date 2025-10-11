import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  function submit(e) {
    e.preventDefault();
    alert("Message sent (demo). Wire to email service later.");
    setForm({ name: "", email: "", message: "" });
  }
  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-8 md:grid-cols-2">
      <div>
        <h1 className="text-2xl font-semibold text-brand">Contact us</h1>
        <p className="mt-2 text-gray-600">Questions about textures, lengths, or shipping? We’re here to help.</p>
        <div className="mt-6 rounded-xl border bg-white p-4">
          <h2 className="text-lg font-semibold">Reach us directly</h2>
          <div className="mt-2 text-sm text-gray-700">
            <p>Email: <a className="text-accent hover:underline" href="mailto:support@lenasbundles.com">support@lenasbundles.com</a></p>
            <p>Phone: (555) 123-4567</p>
            <p>Hours: Mon–Fri, 9am–6pm ET</p>
            <p>Return address: 123 Rose Ave, Suite 200, Atlanta, GA</p>
          </div>
        </div>
      </div>

      <form onSubmit={submit} className="rounded-xl border bg-white p-4">
        <h2 className="text-lg font-semibold">Send a message</h2>
        <div className="mt-3 space-y-3">
          <div>
            <label className="text-sm">Name</label>
            <input className="mt-1 w-full rounded-md border p-2 text-sm" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} required />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <input type="email" className="mt-1 w-full rounded-md border p-2 text-sm" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} required />
          </div>
          <div>
            <label className="text-sm">Message</label>
            <textarea rows={5} className="mt-1 w-full rounded-md border p-2 text-sm" value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})} required />
          </div>
          <button className="rounded-xl bg-brand px-4 py-2 text-white hover:opacity-90" type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}
