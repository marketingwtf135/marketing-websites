import { useState, useCallback, useRef } from "react";
import { useFormSubmit } from "./useFormSubmit";
import { Lang } from "@/lib/content";
import { isPhoneValid } from "@/components/landing/PhoneInput";

function sanitizeName(value: string): string {
  return value.replace(/[^\p{L}\s\-']/gu, "");
}

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
}

export interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
}

const EMPTY: LeadFormData = {
  name: "", email: "", phone: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_RE = /^[\p{L}\s\-']+$/u;

export function useLeadForm(lang: Lang) {
  const [form, setForm] = useState<LeadFormData>({ ...EMPTY });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error" | null>(null);
  const submittingRef = useRef(false);
  const { status, submit, reset } = useFormSubmit();

  const validate = useCallback((data: LeadFormData, l: Lang): FieldErrors => {
    const e: FieldErrors = {};
    if (!data.name.trim()) {
      e.name = l === "ru" ? "Укажите имя" : "Name is required";
    }
    if (!data.phone.trim()) {
      e.phone = l === "ru" ? "Укажите номер телефона" : "Phone number is required";
    } else if (!isPhoneValid(data.phone.trim())) {
      e.phone = l === "ru" ? "Некорректный номер телефона" : "Invalid phone number";
    }
    if (data.email.trim() && !EMAIL_RE.test(data.email.trim())) {
      e.email = l === "ru" ? "Некорректный email" : "Invalid email";
    }
    return e;
  }, []);

  const setField = useCallback((key: keyof LeadFormData, value: string) => {
    const val = key === "name" ? sanitizeName(value) : value;
    setForm(prev => ({ ...prev, [key]: val }));
    if (submitted) {
      setErrors(prev => {
        if (!(key in prev)) return prev;
        const next = { ...prev };
        delete next[key as keyof FieldErrors];
        return next;
      });
    }
  }, [submitted]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;

    setSubmitted(true);
    const trimmedForm = { ...form, name: form.name.trim() };
    const errs = validate(trimmedForm, lang);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    submittingRef.current = true;
    const result = await submit({ ...trimmedForm, language: lang });
    submittingRef.current = false;

    if (result === "success") {
      setForm({ ...EMPTY });
      setErrors({});
      setSubmitted(false);
      setModalType("success");
    } else {
      setModalType("error");
    }
  }, [form, lang, validate, submit]);

  const closeModal = useCallback(() => {
    setModalType(null);
    reset();
  }, [reset]);

  return { form, errors, status, modalType, setField, handleSubmit, closeModal };
}
