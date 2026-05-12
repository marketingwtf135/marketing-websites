import { describe, it, expect, vi, beforeEach } from "vitest";
import { detectAutoLang, getManualOverride, setManualOverride, resolveLandingLang, getPrimaryBrowserLang, getLanguageSource } from "@/lib/lang";

function mockLanguages(langs: string[]) {
  Object.defineProperty(navigator, "languages", {
    value: langs,
    configurable: true,
  });
  Object.defineProperty(navigator, "language", {
    value: langs[0] ?? "en",
    configurable: true,
  });
}

describe("lang detection", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('["en-US"] -> en', () => {
    mockLanguages(["en-US"]);
    expect(detectAutoLang()).toBe("en");
  });

  it('["en-US","ru-RU"] -> en (primary wins)', () => {
    mockLanguages(["en-US", "ru-RU"]);
    expect(detectAutoLang()).toBe("en");
  });

  it('["ru-RU","en-US"] -> ru', () => {
    mockLanguages(["ru-RU", "en-US"]);
    expect(detectAutoLang()).toBe("ru");
  });

  it('["uk-UA","en-US"] -> ru (CIS primary)', () => {
    mockLanguages(["uk-UA", "en-US"]);
    expect(detectAutoLang()).toBe("ru");
  });

  it('["be","en"] -> ru (Belarusian)', () => {
    mockLanguages(["be", "en"]);
    expect(detectAutoLang()).toBe("ru");
  });

  it('["de-DE"] -> en', () => {
    mockLanguages(["de-DE"]);
    expect(detectAutoLang()).toBe("en");
  });

  it('["kk-KZ","ru-RU"] -> ru (Kazakh)', () => {
    mockLanguages(["kk-KZ", "ru-RU"]);
    expect(detectAutoLang()).toBe("ru");
  });

  it("getPrimaryBrowserLang returns first code", () => {
    mockLanguages(["fr-FR", "en-US"]);
    expect(getPrimaryBrowserLang()).toBe("fr");
  });
});

describe("manual override", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns null when no override set", () => {
    expect(getManualOverride()).toBeNull();
  });

  it("stores and retrieves override", () => {
    setManualOverride("en");
    expect(getManualOverride()).toBe("en");
  });

  it("resolveLandingLang prefers manual override", () => {
    mockLanguages(["ru-RU"]);
    setManualOverride("en");
    expect(resolveLandingLang()).toBe("en");
  });

  it("resolveLandingLang falls back to auto when no override", () => {
    mockLanguages(["en-US"]);
    expect(resolveLandingLang()).toBe("en");
  });

  it("getLanguageSource returns manual when override set", () => {
    setManualOverride("ru");
    expect(getLanguageSource()).toBe("manual");
  });

  it("getLanguageSource returns auto when no override", () => {
    expect(getLanguageSource()).toBe("auto");
  });
});
