"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import FormField from "@/components/ui/FormField";
import AppButton from "@/components/ui/AppButton";
import ServiceButton from "@/components/ui/ServiceButton";
import SelectField from "@/components/ui/SelectField";
import Image from "next/image";

const SERVICES = [
  "Basic Wash Package",
  "Full Detail Package",
  "Wax",
  "Interior Cleaning",
  "Oxidation Removal",
  "Monthly Maintenance",
];

const BOAT_SIZES = [
  "Under 20 ft",
  "20-24 ft",
  "25-29 ft",
  "30-34 ft",
  "35-39 ft",
  "40-49 ft",
  "50+ ft",
];

interface FormData {
  fullName: string;
  phone: string;
  vesselInfo: string;
  boatSize: string;
  vesselLocation: string;
  services: string[];
  message: string;
  boatImage: File | null;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  vesselInfo?: string;
  boatSize?: string;
  vesselLocation?: string;
  services?: string;
  message?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Full name is required.";
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = "Must be at least 2 characters.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\+?[\d\s\-(]{7,15}$/.test(data.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!data.vesselInfo.trim()) {
    errors.vesselInfo = "Year, make & model is required.";
  }

  if (!data.boatSize) {
    errors.boatSize = "Please select a boat length.";
  }

  if (!data.vesselLocation.trim()) {
    errors.vesselLocation = "Vessel location is required.";
  }

  if (data.services.length === 0) {
    errors.services = "Please select at least one service.";
  }

  return errors;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    vesselInfo: "",
    boatSize: "",
    vesselLocation: "",
    services: [],
    message: "",
    boatImage: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const confirmationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitStatus === "success" && confirmationRef.current) {
      confirmationRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [submitStatus]);

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const newErrors = validate({ ...formData, [field]: value });
      if (field !== "boatImage") {
        setErrors((prev) => ({ ...prev, [field as keyof FormErrors]: newErrors[field as keyof FormErrors] }));
      }
    }
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const updated = prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      if (touched.services) {
        const newErrors = validate({ ...prev, services: updated });
        setErrors((e) => ({ ...e, services: newErrors.services }));
      }
      return { ...prev, services: updated };
    });
  };

  const handleBlur = (field: keyof FormData) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate(formData);
    if (field !== "boatImage") {
      setErrors((prev) => ({ ...prev, [field as keyof FormErrors]: newErrors[field as keyof FormErrors] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true, phone: true, vesselInfo: true,
      boatSize: true, vesselLocation: true, services: true, message: true,
    });

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setSubmitStatus("loading");

    try {
      const fd = new FormData();
      fd.append("fullName", formData.fullName);
      fd.append("phone", formData.phone);
      fd.append("vesselInfo", formData.vesselInfo);
      fd.append("boatSize", formData.boatSize);
      fd.append("vesselLocation", formData.vesselLocation);
      fd.append("services", JSON.stringify(formData.services));
      fd.append("message", formData.message);
      if (formData.boatImage) fd.append("boatImage", formData.boatImage);

      const res = await fetch("/api/contact", {
        method: "POST",
        body: fd,
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({
          fullName: "", phone: "", vesselInfo: "",
          boatSize: "", vesselLocation: "", services: [], message: "", boatImage: null,
        });
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
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Black Tide Detailing NJ"
            width={350}
            height={350}
            className="object-contain mx-auto mb-6 drop-shadow-2xl w-40 h-40 sm:w-52 sm:h-52 md:w-[220px] md:h-[220px] cursor-pointer"
          />
        </Link>
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
        <p className="text-white text-sm tracking-wider max-w-md mx-auto text-[20px]">
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
            <div
              ref={confirmationRef}
              className="mb-8 rounded-2xl border border-glow/40 bg-glow/10 px-6 py-5 animate-in fade-in duration-500"
            >
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full bg-glow/20 border border-glow/40 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-glow">
                    <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-bold tracking-wider uppercase text-sm text-glow">Request Received!</p>
                  <p className="text-white text-sm mt-1 leading-relaxed tracking-wide">
                    Thank you for considering our services. We appreciate your interest and the opportunity to assist you. A member of our mobile detailing team will review your request and contact you shortly to discuss scheduling and availability.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitStatus("idle")}
                  className="flex-shrink-0 text-white/40 hover:text-white transition-colors ml-2"
                  aria-label="Dismiss"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
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
                  Please try again or contact us directly.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

            {/* Full Name + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
              <FormField
                label="Full Name"
                id="fullName"
                type="text"
                autoComplete="name"
                value={formData.fullName}
                onChange={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                error={touched.fullName ? errors.fullName : undefined}
              />
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
            </div>

            {/* Year, Make & Model + Boat Length */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
              <FormField
                label="Year, Make & Model of Your Vessel"
                id="vesselInfo"
                type="text"
                placeholder="e.g. 2018 Sea Ray 270"
                value={formData.vesselInfo}
                onChange={handleChange("vesselInfo")}
                onBlur={handleBlur("vesselInfo")}
                error={touched.vesselInfo ? errors.vesselInfo : undefined}
              />
              <SelectField
                id="boatSize"
                label="Boat Length"
                value={formData.boatSize}
                onSelect={(val) => {
                  setFormData((prev) => ({ ...prev, boatSize: val }));
                  if (touched.boatSize) {
                    const errs = validate({ ...formData, boatSize: val });
                    setErrors((prev) => ({ ...prev, boatSize: errs.boatSize }));
                  }
                }}
                onBlur={handleBlur("boatSize")}
                error={touched.boatSize ? errors.boatSize : undefined}
                options={BOAT_SIZES}
              />
            </div>

            {/* Vessel Location */}
            <FormField
              label="Vessel Location (where you would like us to service your boat)"
              id="vesselLocation"
              type="text"
              placeholder="Marina name, dock, or address where we'll service your boat"
              value={formData.vesselLocation}
              onChange={handleChange("vesselLocation")}
              onBlur={handleBlur("vesselLocation")}
              error={touched.vesselLocation ? errors.vesselLocation : undefined}
            />

            {/* Boat Image Upload */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-widest text-metallic font-semibold">
                Photo of Your Vessel <span className="normal-case tracking-normal text-metallic/50">(Optional)</span>
              </label>
              <label
                htmlFor="boatImage"
                className={`flex flex-col items-center justify-center gap-2 border rounded-xl px-4 py-6 cursor-pointer transition-all duration-200 ${
                  formData.boatImage
                    ? "border-glow/60 bg-glow/5"
                    : "border-white/20 bg-transparent hover:border-white/40"
                }`}
              >
                {formData.boatImage ? (
                  <>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-glow">
                      <path d="M3 17l4-4 3 3 4-6 4 7H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                      <circle cx="6.5" cy="7.5" r="1.5" stroke="currentColor" strokeWidth="1.4" />
                      <rect x="1" y="1" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                    <span className="text-sm text-white">{formData.boatImage.name}</span>
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); setFormData(prev => ({ ...prev, boatImage: null })); }}
                      className="text-xs text-metallic/60 hover:text-red-400 transition-colors"
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-metallic/50">
                      <path d="M10 13V7M7 10l3-3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M5 17a4 4 0 01-.5-7.95A5.5 5.5 0 1115.5 10h.5a3 3 0 010 6H5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    <span className="text-sm text-metallic/60">Click to upload a photo of your vessel</span>
                    <span className="text-xs text-metallic/40">JPG or PNG · Max 5MB</span>
                  </>
                )}
              </label>
              <input
                id="boatImage"
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (file.size > 5 * 1024 * 1024) {
                    alert("File size must be under 5MB.");
                    return;
                  }
                  setFormData(prev => ({ ...prev, boatImage: file }));
                }}
              />
            </div>

            {/* Services checkboxes */}
            <div className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-widest text-metallic font-semibold">
                Service Needed <span className="normal-case tracking-normal">(check all that apply)</span>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SERVICES.map((service) => (
                  <ServiceButton
                    key={service}
                    label={service}
                    checked={formData.services.includes(service)}
                    onClick={() => handleServiceToggle(service)}
                  />
                ))}
              </div>
              {touched.services && errors.services && (
                <p className="text-red-400 text-xs mt-0.5">{errors.services}</p>
              )}
            </div>

            {/* Message */}
            <FormField
              label="Anything else we should know? (Optional)"
              id="message"
              multiline
              rows={5}
              value={formData.message}
              onChange={handleChange("message")}
              onBlur={handleBlur("message")}
            />

            {/* Submit */}
            <div className="pt-2">
              <AppButton
                variant="primary"
                size="lg"
                className={`w-full${submitStatus === "loading" ? " opacity-70 pointer-events-none" : ""}`}
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

      {/* Contact info */}
      <section className="py-5 px-6">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-5">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
            <a
              href="mailto:blacktidedetailingnj@gmail.com"
              className="flex-1 flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-xl border border-white/20 hover:border-glow/50 hover:bg-glow/5 transition-all duration-200 group w-full"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="shrink-0 text-glow">
                <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M1.5 4l6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <span className="text-sm text-white/80 group-hover:text-white transition-colors">
                blacktidedetailingnj@gmail.com
              </span>
            </a>
            <a
              href="tel:+18488882911"
              className="flex-1 flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-xl border border-white/20 hover:border-glow/50 hover:bg-glow/5 transition-all duration-200 group w-full"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="shrink-0 text-glow">
                <path d="M3 1.5h3l1.5 3.5-1.75 1a8.5 8.5 0 004.25 4.25l1-1.75L14.5 10v3A1.5 1.5 0 0113 14.5C6.1 14.5 1.5 9.9 1.5 3A1.5 1.5 0 013 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm">
                <span className="text-white/80 group-hover:text-white transition-colors">(848) 888-2</span><span className="text-glow">911</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}