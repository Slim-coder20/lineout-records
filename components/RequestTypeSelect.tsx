/**
 * =============================================================================
 * SELECT TYPE DEMANDE — components/RequestTypeSelect.tsx
 * =============================================================================
 * QUOI   : Liste déroulante custom (infos / devis) pour le formulaire contact.
 * POURQUOI : "use client" = interactif (ouverture, clic, état).
 *            La valeur est envoyée au serveur via <input type="hidden" name="requestType">.
 * =============================================================================
 */
"use client";

import { useEffect, useId, useRef, useState } from "react";

const OPTIONS = [
  { value: "infos", label: "Demande d'informations" },
  { value: "devis", label: "Demande de devis" },
] as const;

type RequestTypeValue = (typeof OPTIONS)[number]["value"];

export default function RequestTypeSelect() {
  const listboxId = useId(); // ID unique pour l'accessibilité (aria-controls)
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<RequestTypeValue>("infos");

  const selectedLabel =
    OPTIONS.find((option) => option.value === value)?.label ?? "";

  // Ferme le menu si clic en dehors du composant
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectOption = (optionValue: RequestTypeValue) => {
    setValue(optionValue);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative mt-1">
      {/* Champ invisible inclus dans le FormData à la soumission */}
      <input type="hidden" name="requestType" value={value} required />

      {/* Bouton qui ouvre/ferme la liste (pas un vrai <select> natif) */}
      <button
        type="button"
        id="requestType"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((isOpen) => !isOpen)}
        className="form-field flex w-full cursor-pointer items-center justify-between gap-2 text-left"
      >
        <span className="text-brand-dark">{selectedLabel}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
          className={`size-5 shrink-0 text-brand-mid transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="Type de demande"
          className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-brand-mid/30 bg-white py-1 shadow-[0_8px_24px_-4px_rgba(64,80,80,0.18)]"
        >
          {OPTIONS.map((option) => {
            const isSelected = value === option.value;

            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => selectOption(option.value)}
                  className={`flex w-full items-center gap-2 px-4 py-3 text-left text-sm transition-colors ${
                    isSelected
                      ? "bg-brand-accent/35 font-medium text-brand-dark"
                      : "text-brand-dark hover:bg-brand-accent/20"
                  }`}
                >
                  {isSelected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-4 shrink-0 text-brand-dark"
                      aria-hidden
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span className={isSelected ? "" : "pl-6"}>{option.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
