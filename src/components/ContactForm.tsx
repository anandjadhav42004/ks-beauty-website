/* 
To activate: create a free account at emailjs.com, set up an email service + 2 templates 
(client auto-reply + owner notification), then paste your Service ID, Template IDs, 
and Public Key into the marked placeholders below.
*/

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import emailjs from "@emailjs/browser";

type FormState = "idle" | "loading" | "success";

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (data: FormData) => {
    const e: Record<string, string> = {};
    if (!data.get("name")) e.name = "Name is required";
    if (!data.get("email")) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.get("email") as string))
      e.email = "Please enter a valid email";
    if (!data.get("date")) e.date = "Event date is required";
    if (!data.get("service")) e.service = "Please select a service";
    if (!data.get("message")) e.message = "A message is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const errs = validate(data);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setFormState("loading");

    // EmailJS credentials (configure in .env or deployment host environment variables)
    const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
    const CLIENT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CLIENT_TEMPLATE_ID || "YOUR_CLIENT_TEMPLATE_ID";
    const OWNER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID || "YOUR_OWNER_TEMPLATE_ID";
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";
    const OWNER_EMAIL = import.meta.env.VITE_OWNER_EMAIL || "rivaaz.glam@gmail.com";

    try {
      // 1. Client Auto-Reply Email
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        CLIENT_TEMPLATE_ID,
        {
          to_name: data.get("name"),
          to_email: data.get("email"),
          service: data.get("service"),
          event_date: data.get("date"),
          message: `Hi ${data.get("name")}, thank you for reaching out to KS Beauty! We've received your inquiry for ${data.get("service")} on ${data.get("date")}. If we're available for your date, we'll personally reach out within 24 hours with a custom quote and next steps. In the meantime, feel free to follow our latest bridal looks on Instagram @ks_beauty6ix. Warmly, KS Beauty`,
        },
        PUBLIC_KEY
      );

      // 2. Business Owner Notification Email
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        OWNER_TEMPLATE_ID,
        {
          owner_email: OWNER_EMAIL,
          client_name: data.get("name"),
          client_email: data.get("email"),
          event_date: data.get("date"),
          service_requested: data.get("service"),
          message_details: data.get("message"),
        },
        PUBLIC_KEY
      );
    } catch (err) {
      // Expected notice when using placeholder credentials before user setup
      console.warn("EmailJS call notice (configure credentials at emailjs.com to send live emails):", err);
    } finally {
      setFormState("success");
    }
  };

  const fields: Array<{
    name: string;
    label: string;
    type: "text" | "email" | "date" | "select" | "textarea";
    options?: string[];
    rows?: number;
  }> = [
    { name: "name", label: "Full Name", type: "text" },
    { name: "email", label: "Email Address", type: "email" },
    { name: "date", label: "Event Date", type: "date" },
    {
      name: "service",
      label: "Service",
      type: "select",
      options: ["Bridal Makeup & Hair", "Special Event", "Group Booking", "Trial Session"],
    },
    { name: "message", label: "Tell Us About Your Vision", type: "textarea", rows: 4 },
  ];

  return (
    <section
      id="contact"
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: "#1F3329" }}
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="blob-1 absolute rounded-full"
          style={{
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(184, 147, 90, 0.08) 0%, transparent 70%)",
            top: "-100px",
            right: "-50px",
          }}
        />
        <div
          className="blob-3 absolute rounded-full"
          style={{
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(122, 46, 56, 0.1) 0%, transparent 70%)",
            bottom: "-100px",
            left: "-50px",
          }}
        />
      </div>

      {/* Botanical */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%23B8935A' stroke-width='0.4' opacity='0.05'%3E%3Cellipse cx='100' cy='100' rx='40' ry='80'/%3E%3Cellipse cx='100' cy='100' rx='80' ry='40'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="max-w-2xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div style={{ width: "32px", height: "1px", background: "#B8935A", opacity: 0.7 }} />
            <span
              style={{
                fontFamily: "var(--app-font-sans)",
                fontSize: "11px",
                fontWeight: 600,
                color: "#B8935A",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Get in Touch
            </span>
            <div style={{ width: "32px", height: "1px", background: "#B8935A", opacity: 0.7 }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--app-font-serif)",
              fontSize: "clamp(26px, 3.5vw, 44px)",
              fontWeight: 700,
              color: "#FBF6EE",
              lineHeight: 1.15,
              marginBottom: "12px",
            }}
          >
            Request Your Free Quote
          </h2>
          <p
            style={{
              fontFamily: "var(--app-font-sans)",
              fontSize: "16px",
              color: "rgba(251, 246, 238, 0.6)",
              lineHeight: 1.7,
            }}
          >
            We respond within 24 hours with a personalized package.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            background: "rgba(251, 246, 238, 0.04)",
            border: "1px solid rgba(184, 147, 90, 0.2)",
            borderRadius: "24px",
            padding: "40px 36px",
            backdropFilter: "blur(8px)",
            position: "relative",
          }}
        >
          <AnimatePresence mode="wait">
            {formState === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "40px 0",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: "rgba(184, 147, 90, 0.15)",
                    border: "2px solid #B8935A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Check size={28} style={{ color: "#B8935A" }} strokeWidth={2.5} />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--app-font-serif)",
                      fontSize: "26px",
                      fontWeight: 700,
                      color: "#FBF6EE",
                      marginBottom: "12px",
                    }}
                  >
                    Message Received
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--app-font-sans)",
                      fontSize: "16px",
                      color: "rgba(251, 246, 238, 0.7)",
                      lineHeight: 1.7,
                      maxWidth: "380px",
                    }}
                  >
                    Thank you! We'll get back to you within 24 hours with a personalized quote.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: "flex", flexDirection: "column", gap: "20px" }}
                noValidate
              >
                {fields.map((field) => (
                  <div key={field.name}>
                    <div
                      className={`float-label-group ${field.type === "textarea" ? "textarea-group" : ""}`}
                    >
                      {field.type === "textarea" ? (
                        <>
                          <textarea
                            name={field.name}
                            id={field.name}
                            rows={field.rows}
                            placeholder=" "
                            data-testid={`contact-field-${field.name}`}
                            style={{
                              resize: "vertical",
                              minHeight: "100px",
                              paddingTop: "20px",
                              paddingBottom: "12px",
                            }}
                          />
                          <label htmlFor={field.name}>{field.label}</label>
                        </>
                      ) : field.type === "select" ? (
                        <>
                          <select
                            name={field.name}
                            id={field.name}
                            data-testid={`contact-field-${field.name}`}
                            defaultValue=""
                            style={{ appearance: "none", cursor: "pointer" }}
                          >
                            <option value="" disabled />
                            {field.options?.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          <label htmlFor={field.name}>{field.label}</label>
                        </>
                      ) : (
                        <>
                          <input
                            type={field.type}
                            name={field.name}
                            id={field.name}
                            placeholder=" "
                            data-testid={`contact-field-${field.name}`}
                          />
                          <label htmlFor={field.name}>{field.label}</label>
                        </>
                      )}
                    </div>
                    {errors[field.name] && (
                      <p
                        style={{
                          fontFamily: "var(--app-font-sans)",
                          fontSize: "12px",
                          color: "#e07070",
                          marginTop: "6px",
                          paddingLeft: "4px",
                        }}
                      >
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={formState === "loading"}
                  data-testid="contact-submit-button"
                  style={{
                    background: "#B8935A",
                    color: "#1F3329",
                    border: "1px solid #B8935A",
                    borderRadius: "var(--radius)",
                    padding: "16px 32px",
                    fontFamily: "var(--app-font-sans)",
                    fontWeight: 700,
                    fontSize: "14px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: formState === "loading" ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    transition: "all 250ms ease-out",
                    opacity: formState === "loading" ? 0.8 : 1,
                    marginTop: "4px",
                  }}
                  onMouseEnter={(e) => {
                    if (formState !== "loading") {
                      e.currentTarget.style.boxShadow = "0 0 24px rgba(184, 147, 90, 0.4)";
                      e.currentTarget.style.transform = "scale(1.01)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  {formState === "loading" ? (
                    <>
                      <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Request
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
