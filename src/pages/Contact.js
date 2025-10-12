// src/pages/Contact.js
import React from "react";

export default function Contact() {
  return (
    <section className="page-contact container py-5">
      <div className="row g-4">
        {/* Info card */}
        <div className="col-12 col-lg-5">
          <div className="card shadow-soft rounded-4 h-100">
            <div className="card-body">
              <h3 className="mb-2">Get in touch</h3>
              <p className="text-muted">
                Questions about bundles, shipping, or custom orders? We’re happy to help.
              </p>

              <div className="vstack gap-2 mt-3">
                <div><strong>Email:</strong> support@lena-bundles.com</div>
                <div><strong>Phone:</strong> (555) 123-4567</div>
                <div><strong>Hours:</strong> Mon–Fri, 9am–6pm ET</div>
              </div>
            </div>
          </div>
        </div>

        {/* Form card */}
        <div className="col-12 col-lg-7">
          <div className="card shadow-soft rounded-4">
            <div className="card-body">
              <h5 className="mb-3">Send us a message</h5>
              <form className="vstack gap-3">
                <div>
                  <label className="form-label">Name</label>
                  <input className="form-control" placeholder="Your name" />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="form-label">Message</label>
                  <textarea rows={5} className="form-control" placeholder="How can we help?" />
                </div>
                <button type="submit" className="btn btn-primary">Send message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}