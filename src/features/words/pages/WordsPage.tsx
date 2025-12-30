import { useMemo, useState } from "react";
import type { WordStatus } from "../types";
import { AddWordForm } from "../components/AddWordForm";
import { WordsList } from "../components/WordsList";

const TABS: { key: WordStatus; label: string }[] = [
  { key: "new", label: "New" },
  { key: "learning", label: "Learning" },
  { key: "known", label: "Known" },
];

export default function WordsPage() {
  const [tab, setTab] = useState<WordStatus>("new");

  const title = useMemo(() => {
    const found = TABS.find((t) => t.key === tab);
    return found?.label ?? "Words";
  }, [tab]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={[
              "h-11 px-4 rounded-xl border whitespace-nowrap",
              tab === t.key
                ? "bg-black text-white"
                : "bg-white text-black border-gray-300",
            ].join(" ")}
            type="button"
          >
            {t.label}
          </button>
        ))}
      </div>

      <AddWordForm />

      <div className="rounded-2xl border p-3 sm:p-4">
        <WordsList status={tab} />
      </div>
    </div>
  );
}
