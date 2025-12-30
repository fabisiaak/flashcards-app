import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { WordStatus } from "../types";
import type { WordCreateInput, WordUpdateInput } from "../wordSchema";
import { fetchWords, createWord, updateWord, deleteWord, changeWordStatus } from "./wordsApi";

const qk = {
  words: (status: WordStatus) => ["words", status] as const,
};

export function useWords(status: WordStatus) {
  return useQuery({
    queryKey: qk.words(status),
    queryFn: () => fetchWords(status),
  });
}

export function useCreateWord() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (input: WordCreateInput) => createWord(input),
    onSuccess: (created) => {
      // refresh tab docelowy (status nowego slowka)
      qc.invalidateQueries({ queryKey: ["words", created.status] });
    },
  });
}

export function useUpdateWord() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (input: WordUpdateInput) => updateWord(input),
    onSuccess: (_data, vars) => {
      // odswiez obecny + potencjalnie poprzedni status (jesli zmieniony)
      qc.invalidateQueries({ queryKey: ["words"] });
      qc.invalidateQueries({ queryKey: ["words", vars.status] });
    },
  });
}

export function useChangeWordStatus() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: WordStatus }) => changeWordStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["words"] });
    },
  });
}

export function useDeleteWord() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteWord(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["words"] });
    },
  });
}
