import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SectionHeader } from "./SectionHeader";
import { Mail, Send } from "lucide-react";

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

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      const { error } = await supabase.from("leads").insert({
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone || null,
        business_name: result.data.business_name || null,
        message: result.data.message,
      });

      if (error) throw error;

      toast.success("Thanks! We'll be in touch soon.", {
        description: "Your enquiry has been received.",
      });
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
    <section id="contact" className="border-t border-border bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Get in touch"
          title="Tell us about your business"
          description="Fill in the form and we'll get back to you within one business day."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          {/* Side info */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Email us directly
                  </p>
                  <a
                    href="mailto:hello@getseen.co.za"
                    className="font-medium text-foreground transition-colors hover:text-primary"
                  >
                    hello@getseen.co.za
                  </a>
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Prefer WhatsApp? Use the floating button in the corner and we'll reply right
              away. Every enquiry is read by a real person — no bots, no autoresponders.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5 rounded-2xl border border-border bg-card p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Your name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange("name")}
                  autoComplete="name"
                  maxLength={100}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-xs text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
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
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  autoComplete="tel"
                  maxLength={50}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business_name">Business name (optional)</Label>
                <Input
                  id="business_name"
                  name="business_name"
                  value={form.business_name}
                  onChange={handleChange("business_name")}
                  autoComplete="organization"
                  maxLength={150}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">How can we help? *</Label>
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
              />
              {errors.message && (
                <p id="message-error" className="text-xs text-destructive">
                  {errors.message}
                </p>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={submitting}>
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
