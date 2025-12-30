import { useState } from "react";
import type { Word, WordStatus } from "../types";
import { useChangeWordStatus, useDeleteWord, useUpdateWord } from "../api/wordsQueries";

export function WordRow({ word }: { word: Word }) {
  const [isEditing, setIsEditing] = useState(false);
  const [en, setEn] = useState(word.en);
  const [pl, setPl] = useState(word.pl);

  const upd = useUpdateWord();
  const del = useDeleteWord();
  const statusMut = useChangeWordStatus();

  const onSave = async () => {
    await upd.mutateAsync({ id: word.id, en: en.trim(), pl: pl.trim(), status: word.status });
    setIsEditing(false);
  };

  const onDelete = async () => {
    const ok = window.confirm(`Usunac "${word.en}"?`);
    if (!ok) return;
    await del.mutateAsync(word.id);
  };

  const onStatus = async (status: WordStatus) => {
    await statusMut.mutateAsync({ id: word.id, status });
  };

  return (
    <li className="rounded-2xl border bg-white text-black p-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {isEditing ? (
          <>
            <input className="h-11 rounded-xl border px-3" value={en} onChange={(e) => setEn(e.target.value)} />
            <input className="h-11 rounded-xl border px-3" value={pl} onChange={(e) => setPl(e.target.value)} />
          </>
        ) : (
          <>
            <div className="font-semibold text-lg break-words">{word.en}</div>
            <div className="text-gray-600 break-words">{word.pl}</div>
          </>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
      <select
  className="h-11 rounded-xl bg-black text-white border border-gray-700 px-3"
  value={word.status}
  onChange={(e) => onStatus(e.target.value as WordStatus)}
>
  <option value="new" className="bg-black text-white">
    new
  </option>
  <option value="learning" className="bg-black text-white">
    learning
  </option>
  <option value="known" className="bg-black text-white">
    known
  </option>
</select>


        {isEditing ? (
          <div className="flex gap-2">
            <button
              className="h-11 rounded-xl border px-4"
              onClick={() => {
                setIsEditing(false);
                setEn(word.en);
                setPl(word.pl);
              }}
              type="button"
            >
              Anuluj
            </button>
            <button className="h-11 rounded-xl bg-black text-white px-4" onClick={onSave} type="button" disabled={upd.isPending}>
              Zapisz
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button className="h-11 rounded-xl bg-black text-white px-4" onClick={() => setIsEditing(true)} type="button">
              Edytuj
            </button>
            <button className="h-11 rounded-xl bg-black text-white px-4" onClick={onDelete} type="button" disabled={del.isPending}>
              Usun
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
