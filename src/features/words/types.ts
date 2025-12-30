export type WordStatus = "new" | "learning" | "known";

export type Word = {
  id: string;
  user_id: string;
  en: string;
  pl: string;
  status: WordStatus;
  created_at: string;
  last_trained_at: string | null;
  correct_count: number;
  wrong_count: number;
  due: boolean;
};
