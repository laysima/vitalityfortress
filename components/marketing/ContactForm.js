"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { sendMessage } from "@/app/actions/contact";
import { button, input } from "@/components/ui/styles";

const TOPICS = ["Free session", "Membership", "Personal coaching", "Something else"];

function FieldError({ errors, id }) {
  return errors?.length ? (
    <p id={id} className="mt-2 animate-enter text-sm text-signal-deep">
      {errors[0]}
    </p>
  ) : null;
}

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, undefined);
  const formRef = useRef(null);
  const e = state?.errors;

  useEffect(() => {
    if (state?.ok) {
      toast.success("Message sent", { description: "A coach will reply within one working day." });
      formRef.current?.reset();
    }
  }, [state]);

  const v = state?.ok ? {} : (state?.values ?? {});

  return (
    <form ref={formRef} action={action} className="grid gap-5 sm:grid-cols-2" noValidate>
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">Name</label>
        <input id="name" name="name" autoComplete="name" defaultValue={v.name} aria-invalid={e?.name ? true : undefined} aria-describedby={e?.name ? "name-error" : undefined} className={input} />
        <FieldError id="name-error" errors={e?.name} />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
        <input id="email" name="email" type="email" inputMode="email" autoComplete="email" defaultValue={v.email} aria-invalid={e?.email ? true : undefined} aria-describedby={e?.email ? "email-error" : undefined} className={input} />
        <FieldError id="email-error" errors={e?.email} />
      </div>
      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-sm font-medium">What can we help with?</legend>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t, i) => (
            <label key={t} className="press cursor-pointer rounded-full border border-line-strong px-4 py-2 text-sm has-checked:border-ink has-checked:bg-ink has-checked:text-paper has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ink">
              <input type="radio" name="topic" value={t} defaultChecked={v.topic ? v.topic === t : i === 0} className="sr-only" />
              {t}
            </label>
          ))}
        </div>
        <FieldError errors={e?.topic} />
      </fieldset>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-2 block text-sm font-medium">Message</label>
        <textarea id="message" name="message" rows={5} defaultValue={v.message} aria-invalid={e?.message ? true : undefined} aria-describedby={e?.message ? "message-error" : undefined} className={`${input} h-auto resize-y py-3`} />
        <FieldError id="message-error" errors={e?.message} />
      </div>
      <div className="sm:col-span-2">
        <button type="submit" disabled={pending} className={button({ size: "lg" })}>
          {pending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
