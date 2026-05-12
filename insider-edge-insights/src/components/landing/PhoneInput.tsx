import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ClipboardEvent,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { ChevronDown } from "lucide-react";
import {
  CountrySelector,
  FlagImage,
  defaultCountries,
  getActiveFormattingMask,
  parseCountry,
  usePhoneInput,
  type CountryIso2,
  type ParsedCountry,
} from "react-international-phone";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import { cn } from "@/lib/utils";
import "react-international-phone/style.css";

const DEFAULT_COUNTRY: CountryIso2 = "ru";
const DEFAULT_MASK = "............";

let cachedGeoCountry: CountryIso2 | null = null;
let geoPromise: Promise<CountryIso2 | null> | null = null;

function detectCountryByIP(): Promise<CountryIso2 | null> {
  if (cachedGeoCountry) return Promise.resolve(cachedGeoCountry);
  if (geoPromise) return geoPromise;

  geoPromise = fetch("https://cloudflare.com/cdn-cgi/trace", { signal: AbortSignal.timeout(3000) })
    .then((res) => (res.ok ? res.text() : null))
    .then((text) => {
      if (!text) return null;
      const match = text.match(/loc=(\w{2})/);
      if (!match) return null;
      const iso2 = match[1].toLowerCase() as CountryIso2;
      cachedGeoCountry = iso2;
      return iso2;
    })
    .catch(() => null);

  return geoPromise;
}

const AVAILABLE_COUNTRIES = defaultCountries;

const PREFERRED_COUNTRIES: CountryIso2[] = ["ru", "us", "gb", "de", "ae"];

const PHONE_THEME = {
  "--react-international-phone-height": "48px",
  "--react-international-phone-font-size": "14px",
  "--react-international-phone-border-radius": "8px",
  "--react-international-phone-dropdown-top": "52px",
  "--react-international-phone-flag-width": "20px",
  "--react-international-phone-flag-height": "20px",
  "--react-international-phone-background-color": "hsl(var(--background))",
  "--react-international-phone-text-color": "hsl(var(--foreground))",
  "--react-international-phone-border-color": "hsl(var(--input))",
  "--react-international-phone-country-selector-border-color": "hsl(var(--input))",
  "--react-international-phone-country-selector-background-color": "hsl(var(--background))",
  "--react-international-phone-country-selector-background-color-hover": "hsl(var(--secondary))",
  "--react-international-phone-country-selector-arrow-color": "hsl(var(--muted-foreground))",
  "--react-international-phone-dropdown-item-background-color": "hsl(var(--popover))",
  "--react-international-phone-dropdown-item-text-color": "hsl(var(--popover-foreground))",
  "--react-international-phone-dropdown-item-dial-code-color": "hsl(var(--muted-foreground))",
  "--react-international-phone-selected-dropdown-item-background-color": "hsl(var(--secondary))",
  "--react-international-phone-selected-dropdown-item-text-color": "hsl(var(--foreground))",
  "--react-international-phone-selected-dropdown-item-dial-code-color": "hsl(var(--muted-foreground))",
  "--react-international-phone-disabled-background-color": "hsl(var(--muted))",
  "--react-international-phone-disabled-text-color": "hsl(var(--muted-foreground))",
  "--react-international-phone-disabled-country-selector-background-color": "hsl(var(--muted))",
  "--react-international-phone-disabled-country-selector-arrow-color": "hsl(var(--muted-foreground))",
  "--react-international-phone-dropdown-preferred-list-divider-color": "hsl(var(--border))",
  "--react-international-phone-dropdown-shadow": "0 18px 48px -18px hsl(var(--foreground) / 0.28)",
} as CSSProperties;

function getLocalPlaceholder(country: ParsedCountry): string {
  const mask = getActiveFormattingMask({
    phone: `+${country.dialCode}`,
    country,
    defaultMask: DEFAULT_MASK,
    disableFormatting: false,
  });

  return mask.replace(/\./g, "9").trim();
}

function setNativeInputValue(input: HTMLInputElement, nextValue: string) {
  const prototype = window.HTMLInputElement.prototype;
  const valueSetter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;

  valueSetter?.call(input, nextValue);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

interface PhoneInputProps {
  value: string;
  onChange: (fullNumber: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}

export default function PhoneInput({
  value,
  onChange,
  placeholder = "Телефон",
  className = "",
  disabled = false,
  id,
  ...ariaProps
}: PhoneInputProps) {
  const [focused, setFocused] = useState(false);
  const geoDetected = useRef(false);

  const { country, inputValue, inputRef, setCountry, handlePhoneValueChange } = usePhoneInput({
    value,
    defaultCountry: DEFAULT_COUNTRY,
    countries: AVAILABLE_COUNTRIES,
    preferredCountries: PREFERRED_COUNTRIES,
    defaultMask: DEFAULT_MASK,
    disableDialCodeAndPrefix: true,
    disableDialCodePrefill: true,
    allowMaskOverflow: false,
    forceDialCode: false,
    onChange: ({ phone }) => onChange(phone),
  });

  useEffect(() => {
    if (geoDetected.current || value) return;
    detectCountryByIP().then((iso2) => {
      if (iso2 && !geoDetected.current) {
        geoDetected.current = true;
        setCountry(iso2);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const displayPlaceholder = useMemo(
    () => (focused ? getLocalPlaceholder(country) : placeholder),
    [country, focused, placeholder],
  );

  const hasError = Boolean(ariaProps["aria-invalid"]);

  const applyPastedValue = useCallback(
    (nextValue: string) => {
      const input = inputRef.current;
      if (!input) return;

      setNativeInputValue(input, nextValue);
    },
    [inputRef],
  );

  const handleCountrySelect = useCallback(
    (nextCountry: ParsedCountry) => {
      setCountry(nextCountry.iso2, { focusOnInput: true });
    },
    [setCountry],
  );

  const handlePaste = useCallback(
    (event: ClipboardEvent<HTMLInputElement>) => {
      const pastedText = event.clipboardData.getData("text").trim();
      if (!pastedText) return;

      event.preventDefault();

      const normalizedInternational = pastedText.startsWith("+")
        ? `+${pastedText.slice(1).replace(/\D/g, "")}`
        : "";

      if (normalizedInternational) {
        try {
          const parsed = parsePhoneNumber(normalizedInternational);
          const parsedCountry = parsed?.country?.toLowerCase() as CountryIso2 | undefined;

          if (parsed && parsedCountry) {
            setCountry(parsedCountry, { focusOnInput: false });
            window.setTimeout(() => applyPastedValue(parsed.nationalNumber), 0);
            return;
          }
        } catch {
          // Fallback to sanitized digits below.
        }
      }

      applyPastedValue(pastedText.replace(/\D/g, ""));
    },
    [applyPastedValue, setCountry],
  );

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = new Set([
      "Backspace",
      "Delete",
      "Tab",
      "Escape",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
    ]);

    if (allowedKeys.has(event.key)) return;
    if ((event.ctrlKey || event.metaKey) && ["a", "c", "v", "x", "z", "y"].includes(event.key.toLowerCase())) {
      return;
    }

    if (event.key.length === 1 && !/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  }, []);

  return (
    <div className={cn("w-full", className)} style={PHONE_THEME}>
      <div className="flex w-full">
        <CountrySelector
          selectedCountry={country.iso2}
          onSelect={handleCountrySelect}
          countries={AVAILABLE_COUNTRIES}
          preferredCountries={PREFERRED_COUNTRIES}
          disabled={disabled}
          className="shrink-0"
          renderButtonWrapper={({ rootProps }) => (
            <button
              {...rootProps}
              type="button"
              className="flex h-12 w-[116px] shrink-0 items-center justify-between rounded-l-lg border border-r-0 border-input bg-background px-3 text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="flex min-w-0 items-center gap-2">
                <FlagImage iso2={country.iso2} className="h-5 w-5 shrink-0 overflow-hidden rounded-full" />
                <span className="font-mono text-xs text-foreground/70">+{country.dialCode}</span>
              </span>
              <ChevronDown className="h-3 w-3 shrink-0 text-muted-foreground" aria-hidden="true" />
            </button>
          )}
          dropdownStyleProps={{
            className:
              "z-50 max-h-64 w-72 overflow-y-auto rounded-lg border border-input bg-popover p-1 text-popover-foreground shadow-lg",
            listItemClassName: "rounded-md",
            listItemSelectedClassName: "bg-secondary text-foreground",
            listItemFocusedClassName: "bg-secondary text-foreground",
            listItemCountryNameClassName: "text-sm",
            listItemDialCodeClassName: "text-xs text-muted-foreground",
listItemFlagClassName: "rounded-sm",
            preferredListDividerClassName: "border-border",
          }}
        />

        <input
          ref={inputRef}
          id={id}
          type="tel"
          dir="ltr"
          inputMode="tel"
          autoComplete="tel-national"
          enterKeyHint="next"
          value={inputValue}
          onChange={handlePhoneValueChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={displayPlaceholder}
          disabled={disabled}
          aria-label={placeholder}
          aria-invalid={ariaProps["aria-invalid"]}
          aria-describedby={ariaProps["aria-describedby"]}
          className={cn(
            "h-12 min-w-0 flex-1 rounded-r-lg border border-input bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50",
            hasError &&
              "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
          )}
        />
      </div>
    </div>
  );
}

export function isPhoneValid(phone: string): boolean {
  if (!phone) return true;

  try {
    return isValidPhoneNumber(phone);
  } catch {
    return false;
  }
}
