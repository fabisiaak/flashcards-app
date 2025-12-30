import type { WordStatus } from "../types";
import { useWords } from "../api/wordsQueries";
import { WordRow } from "./WordRow";

export function WordsList({ status }: { status: WordStatus }) {
  const q = useWords(status);

  if (q.isLoading) return <div className="p-4">Laduje...</div>;
  if (q.isError) return <div className="p-4 text-red-600">Blad: {(q.error as Error).message}</div>;

  const items = q.data ?? [];

  if (!items.length) return <div className="p-4 opacity-70">Brak slowek w tej kategorii.</div>;

  return (
    <ul className="flex flex-col gap-3">
      {items.map((w) => (
        <WordRow key={w.id} word={w} />
      ))}
    </ul>
  );
}
