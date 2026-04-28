import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, MessageCircleMore, Send, UserRoundCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { trackEvent, trackServerEvent } from "@/lib/analytics";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  business_name: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message is too long"),
});

type FormState = {
  name: string;
  email: string;
  phone: string;
  business_name: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  business_name: "",
  message: "",
};

export function Contact() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = leadSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Request failed");
      }

      toast.success("Thanks! We'll be in touch soon.", {
        description: "Your enquiry has been received.",
      });
      trackEvent("form_submit", "contact_form");
      trackServerEvent("form_submit");
      setForm(initialState);
    } catch (err) {
      console.error("Lead submission failed:", err);
      toast.error("Something went wrong", {
        description: "Please try again or email us directly at hello@getseen.co.za.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/10 bg-slate-950 py-20 sm:py-28"
    >
      <img
        src="https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=1600&q=80"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-slate-950/80" />
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <div className="relative mx-auto max-w-3xl rounded-3xl border border-white/10 bg-black/35 px-6 py-7 text-center backdrop-blur-md sm:px-10 sm:py-9">
          <div className="pointer-events-none absolute -top-8 left-1/2 h-20 w-44 -translate-x-1/2 rounded-full bg-cyan-300/18 blur-2xl" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Get in touch</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
            Speak to a real person about your website
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Tell us about your business and we will get back to you within one business day.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <motion.div
            className="space-y-6"
            whileHover={prefersReducedMotion ? undefined : { y: -3 }}
          >
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-300/15 text-cyan-200">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-300">
                    Email us directly
                  </p>
                  <a
                    href="mailto:hello@getseen.co.za"
                    className="font-medium text-white transition-colors hover:text-cyan-300"
                  >
                    hello@getseen.co.za
                  </a>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-emerald-400/10 p-6 backdrop-blur-md">
              <div className="mb-4 flex items-center gap-2 text-emerald-100">
                <UserRoundCheck className="h-4 w-4" />
                <p className="text-sm font-semibold">Human support, no bots</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="max-w-[90%] rounded-xl bg-white/10 px-3 py-2 text-slate-100">
                  Hi GetSeen, can you redesign my plumbing website?
                </div>
                <div className="ml-auto max-w-[90%] rounded-xl bg-emerald-300/20 px-3 py-2 text-emerald-50">
                  Absolutely. We can send you a free concept this week.
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-200">
                Prefer WhatsApp? Use the floating button and chat to us directly.
              </p>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              Every enquiry is reviewed by a real person who understands local service businesses.
            </p>
          </motion.div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-100">
                  Your name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange("name")}
                  autoComplete="name"
                  maxLength={100}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className="border-white/20 bg-slate-900/50 text-white placeholder:text-slate-400"
                />
                {errors.name && (
                  <p id="name-error" className="text-xs text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-100">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  autoComplete="email"
                  maxLength={255}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="border-white/20 bg-slate-900/50 text-white placeholder:text-slate-400"
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-100">
                  Phone (optional)
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  autoComplete="tel"
                  maxLength={50}
                  className="border-white/20 bg-slate-900/50 text-white placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business_name" className="text-slate-100">
                  Business name (optional)
                </Label>
                <Input
                  id="business_name"
                  name="business_name"
                  value={form.business_name}
                  onChange={handleChange("business_name")}
                  autoComplete="organization"
                  maxLength={150}
                  className="border-white/20 bg-slate-900/50 text-white placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-slate-100">
                How can we help? *
              </Label>
              <Textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange("message")}
                rows={5}
                maxLength={2000}
                placeholder="Tell us a bit about your business and what you're looking for…"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className="border-white/20 bg-slate-900/50 text-white placeholder:text-slate-400"
              />
              {errors.message && (
                <p id="message-error" className="text-xs text-destructive">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <MessageCircleMore className="h-3.5 w-3.5 text-cyan-300" />
              You can also contact us instantly via WhatsApp
            </div>
            <Button
              type="submit"
              size="lg"
              variant="hero"
              className="w-full sm:w-auto"
              disabled={submitting}
            >
              {submitting ? (
                "Sending…"
              ) : (
                <>
                  Send enquiry
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
