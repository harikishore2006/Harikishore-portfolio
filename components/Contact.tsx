"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon, GithubIcon, LinkedInIcon, WhatsappIcon } from "@/components/ui/icons";
import { Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig } from "@/data/site";
import { submitContactForm, validateContactForm, type ContactFormValues } from "@/lib/contact";
import { MagneticLink } from "@/components/ui/MagneticLink";

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function Contact() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");

  const handleChange = (field: keyof ContactFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateContactForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setIsSubmitted(false);
      return;
    }

    setIsSubmitted(true);
    submitContactForm(values);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setCopyError("");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
      setCopyError("Clipboard access is unavailable. Select the email address to copy it.");
    }
  };

  return (
    <Section id="contact" className="bg-[#171715] px-5 text-[#f3f3f0] sm:px-8 lg:px-10 xl:px-14">
      <SectionHeading
        eyebrow="06 / CONTACT"
        title="Let&apos;s build something together."
        description="Have a project, opportunity, or idea? I&apos;d be glad to hear from you."
        tone="dark"
      />

      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="min-w-0">
          <div>
            <div className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#e7a847]">Email</div>
            <div className="mt-4 flex items-center justify-between gap-4 border-b border-white/20 pb-4">
              <div>
                <a href={`mailto:${siteConfig.email}`} className="break-all text-base font-medium text-[#f3f3f0] hover:text-[#e7a847] sm:text-lg">
                  {siteConfig.email}
                </a>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-[#f3f3f0] transition hover:border-[#e7a847] hover:text-[#e7a847]"
              >
                {copied ? <CheckIcon className="h-4 w-4 text-emerald-300" /> : <CopyIcon className="h-4 w-4" />}
              </button>
            </div>
            {copyError ? <p role="status" className="mt-3 text-xs text-[#f0c078]">{copyError}</p> : null}
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {[
              { href: siteConfig.linkedin, label: "LinkedIn", icon: LinkedInIcon },
              { href: siteConfig.github, label: "GitHub", icon: GithubIcon },
              { href: siteConfig.whatsapp, label: "WhatsApp", icon: WhatsappIcon },
            ].map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-[#e7a847]"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </div>

          <MagneticLink
            href={`mailto:${siteConfig.email}`}
            className="mt-10 flex h-32 w-32 items-center justify-center rounded-full bg-[#e7a847] text-center text-[0.68rem] font-semibold uppercase leading-5 tracking-[0.1em] text-[#171715] transition-transform duration-500 hover:rotate-6 sm:h-40 sm:w-40 sm:text-xs"
          >
            Let&apos;s<br />talk ↗
          </MagneticLink>
        </div>

        <form onSubmit={handleSubmit} noValidate className="min-w-0 border-t border-white/20 pt-6">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-white/65">Name</span>
              <input
                type="text"
                value={values.name}
                onChange={(event) => handleChange("name", event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className="w-full border border-white/20 bg-white/[0.04] px-4 py-3 text-[#f3f3f0] placeholder:text-white/35 focus:border-[#e7a847] focus:outline-none"
                placeholder="Your name"
              />
              {errors.name ? <span id="name-error" className="mt-2 block text-sm text-rose-300">{errors.name}</span> : null}
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-white/65">Email</span>
              <input
                type="email"
                value={values.email}
                onChange={(event) => handleChange("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="w-full border border-white/20 bg-white/[0.04] px-4 py-3 text-[#f3f3f0] placeholder:text-white/35 focus:border-[#e7a847] focus:outline-none"
                placeholder="you@example.com"
              />
              {errors.email ? <span id="email-error" className="mt-2 block text-sm text-rose-300">{errors.email}</span> : null}
            </label>
          </div>

          <label className="mt-5 block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-white/65">Subject</span>
            <input
              type="text"
              value={values.subject}
              onChange={(event) => handleChange("subject", event.target.value)}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              className="w-full border border-white/20 bg-white/[0.04] px-4 py-3 text-[#f3f3f0] placeholder:text-white/35 focus:border-[#e7a847] focus:outline-none"
              placeholder="Project collaboration"
            />
            {errors.subject ? <span id="subject-error" className="mt-2 block text-sm text-rose-300">{errors.subject}</span> : null}
          </label>

          <label className="mt-5 block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-white/65">Message</span>
            <textarea
              value={values.message}
              onChange={(event) => handleChange("message", event.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="min-h-[160px] w-full border border-white/20 bg-white/[0.04] px-4 py-3 text-[#f3f3f0] placeholder:text-white/35 focus:border-[#e7a847] focus:outline-none"
              placeholder="Tell me about your project, idea, or opportunity."
            />
            {errors.message ? <span id="message-error" className="mt-2 block text-sm text-rose-300">{errors.message}</span> : null}
          </label>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className="inline-flex items-center justify-center border border-[#e7a847] bg-[#e7a847] px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#171715] transition-colors hover:bg-transparent hover:text-[#e7a847]"
            >
              Send Message
            </button>
            <div aria-live="polite" className="min-h-5 text-sm text-[#e7a847]">
              {isSubmitted ? "Your mail app has opened with the message ready to send." : ""}
            </div>
          </div>
        </form>
      </div>
    </Section>
  );
}
