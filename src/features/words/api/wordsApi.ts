import { supabase } from "../../../shared/supabaseClient";
import type { Word, WordStatus } from "../types";
import type { WordCreateInput, WordUpdateInput } from "../wordSchema";

export async function fetchWords(status: WordStatus): Promise<Word[]> {
  const { data, error } = await supabase
    .from("words")
    .select("*")
    .eq("status", status)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Word[];
}

export async function createWord(input: WordCreateInput): Promise<Word> {
  const { data: auth } = await supabase.auth.getUser();
  const user = auth.user;
  if (!user) throw new Error("Brak zalogowanego uzytkownika");

  const { data, error } = await supabase
    .from("words")
    .insert({
      user_id: user.id,
      en: input.en,
      pl: input.pl,
      status: input.status,
      correct_count: 0,
      wrong_count: 0,
      due: true,
      last_trained_at: null,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data as Word;
}

export async function updateWord(input: WordUpdateInput): Promise<Word> {
  const { id, ...patch } = input;

  const { data, error } = await supabase
    .from("words")
    .update({
      en: patch.en,
      pl: patch.pl,
      status: patch.status,
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data as Word;
}

export async function changeWordStatus(id: string, status: WordStatus): Promise<Word> {
  const { data, error } = await supabase
    .from("words")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data as Word;
}

export async function deleteWord(id: string): Promise<void> {
  const { error } = await supabase.from("words").delete().eq("id", id);
  if (error) throw error;
}
