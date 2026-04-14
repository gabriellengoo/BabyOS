"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  message: ""
};

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  function validate() {
    const nextErrors: Partial<FormState> = {};
    if (!formState.name.trim()) nextErrors.name = "Name required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      nextErrors.email = "Valid email required.";
    }
    if (formState.message.trim().length < 20) {
      nextErrors.message = "Add more detail.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setFormState(initialState);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-3">
      <label className="grid gap-2">
        <span className="type-fine text-black/45">Name</span>
        <input
          value={formState.name}
          onChange={(event) =>
            setFormState((current) => ({ ...current, name: event.target.value }))
          }
          className="rounded border border-black/10 px-3 py-3 type-small outline-none focus:border-black/30"
          placeholder="Your name"
        />
        {errors.name ? <span className="type-fine text-black/45">{errors.name}</span> : null}
      </label>
      <label className="grid gap-2">
        <span className="type-fine text-black/45">Email</span>
        <input
          value={formState.email}
          onChange={(event) =>
            setFormState((current) => ({ ...current, email: event.target.value }))
          }
          className="rounded border border-black/10 px-3 py-3 type-small outline-none focus:border-black/30"
          placeholder="studio@company.com"
        />
        {errors.email ? <span className="type-fine text-black/45">{errors.email}</span> : null}
      </label>
      <label className="grid gap-2">
        <span className="type-fine text-black/45">Message</span>
        <textarea
          value={formState.message}
          onChange={(event) =>
            setFormState((current) => ({ ...current, message: event.target.value }))
          }
          className="min-h-28 rounded border border-black/10 px-3 py-3 type-small outline-none focus:border-black/30"
          placeholder="Tell Gabrielle about the role, project, or collaboration."
        />
        {errors.message ? <span className="type-fine text-black/45">{errors.message}</span> : null}
      </label>
      <button type="submit" className="surface-blur justify-self-start rounded px-4 py-3 type-small">
        Send enquiry
      </button>
      {submitted ? (
        <p className="type-fine text-black/45">
          Frontend validation passed. Connect this to your preferred lightweight form service.
        </p>
      ) : null}
    </form>
  );
}
