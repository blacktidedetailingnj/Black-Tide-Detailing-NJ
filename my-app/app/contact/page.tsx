"use client";

import { useState } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import FormField from "@/components/ui/FormField";
import AppButton from "@/components/ui/AppButton";
import Image from "next/image";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required.";
  } else if (data.firstName.trim().length < 2) {
    errors.firstName = "Must be at least 2 characters.";
  }

  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required.";
  } else if (data.lastName.trim().length < 2) {
    errors.lastName = "Must be at least 2 characters.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\+?[\d\s\-(]{7,15}$/.test(data.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!data.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.message.trim()) {
    errors.message = "A message is required.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Re-validate on change if field has been touched
    if (touched[field]) {
      const newErrors = validate({ ...formData, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
  };

  const handleBlur = (field: keyof FormData) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Touch all fields
    setTouched({ firstName: true, lastName: true, phone: true, email: true, message: true });

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setSubmitStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ firstName: "", lastName: "", phone: "", email: "", message: "" });
        setTouched({});
        setErrors({});
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <main className="bg-base text-white min-h-screen">
      <NavBar />

      {/* Page hero */}
      <section className="pt-16 pb-12 px-6 text-center">
        <Image
          src="/logo.png"
          alt="Black Tide Detailing NJ"
          width={350}
          height={350}
          className="object-contain mx-auto mb-6 drop-shadow-2xl w-40 h-40 sm:w-52 sm:h-52 md:w-[220px] md:h-[220px]"
        />
        <p
          className="text-metallic uppercase flex items-center justify-center gap-2 mb-4"
          style={{ fontSize: "clamp(0.65rem, 1.8vw, 0.8rem)", letterSpacing: "0.35em" }}
        >
          <span className="block w-6 h-px bg-metallic/50" />
          Get In Touch
          <span className="block w-6 h-px bg-metallic/50" />
        </p>
        <h1
          className="font-black uppercase tracking-tight leading-none mb-4"
          style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
        >
          <span className="bg-gradient-to-t from-[#18B6E6] to-white bg-clip-text text-transparent">
            Contact Us
          </span>
        </h1>
        <p className="text-white text-sm tracking-wider max-w-md mx-auto">
          Ready to give your vessel the care it deserves? Reach out and we&apos;ll be in touch shortly.
        </p>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-metallic/30 to-transparent" />
      </div>

      {/* Form section */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Success state */}
          {submitStatus === "success" && (
            <div className="mb-8 rounded-2xl border border-glow/40 bg-glow/10 px-6 py-5 flex items-start gap-4 animate-in fade-in duration-500">
              <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full bg-glow/20 border border-glow/40 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-glow">
                  <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="font-bold tracking-wider uppercase text-sm text-glow">Message Sent!</p>
                <p className="text-metallic text-sm mt-1 tracking-wide">
                  Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            </div>
          )}

          {/* Error state */}
          {submitStatus === "error" && (
            <div className="mb-8 rounded-2xl border border-red-500/40 bg-red-500/10 px-6 py-5 flex items-start gap-4">
              <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-red-400">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M7 4v3.5M7 9.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="font-bold tracking-wider uppercase text-sm text-red-400">Something went wrong</p>
                <p className="text-metallic text-sm mt-1 tracking-wide">
                  Please try again or email us directly.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

            {/* Name row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField
                label="First Name"
                id="firstName"
                type="text"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                error={touched.firstName ? errors.firstName : undefined}
              />
              <FormField
                label="Last Name"
                id="lastName"
                type="text"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                error={touched.lastName ? errors.lastName : undefined}
              />
            </div>

            {/* Phone + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField
                label="Phone Number"
                id="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange("phone")}
                onBlur={handleBlur("phone")}
                error={touched.phone ? errors.phone : undefined}
              />
              <FormField
                label="Email Address"
                id="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                error={touched.email ? errors.email : undefined}
              />
            </div>

            {/* Message */}
            <FormField
              label="How can we help you?"
              id="message"
              multiline
              rows={6}
              value={formData.message}
              onChange={handleChange("message")}
              onBlur={handleBlur("message")}
              error={touched.message ? errors.message : undefined}
            />

            {/* Submit */}
            <div className="pt-2 flex justify-center sm:justify-start">
              <AppButton
                variant="primary"
                size="lg"
                className={submitStatus === "loading" ? "opacity-70 pointer-events-none" : ""}
              >
                {submitStatus === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending…
                  </span>
                ) : "Submit"}
              </AppButton>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}