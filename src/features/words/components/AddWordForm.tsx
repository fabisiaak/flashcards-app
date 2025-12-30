import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { wordCreateSchema, type WordCreateInput } from "../wordSchema";
import { useCreateWord } from "../api/wordsQueries";

export function AddWordForm() {
  const create = useCreateWord();

  const form = useForm<WordCreateInput>({
    resolver: zodResolver(wordCreateSchema),
    defaultValues: { en: "", pl: "", status: "new" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await create.mutateAsync(values);
    form.reset({ en: "", pl: "", status: "new" });
  });

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border p-4 flex flex-col gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="flex flex-col gap-1 sm:col-span-1">
          <label className="text-sm opacity-70">EN</label>
          <input
            className="h-11 rounded-xl border px-3"
            placeholder="np. approach"
            {...form.register("en")}
          />
          {form.formState.errors.en && (
            <p className="text-sm text-red-600">{form.formState.errors.en.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 sm:col-span-1">
          <label className="text-sm opacity-70">PL</label>
          <input
            className="h-11 rounded-xl border px-3"
            placeholder="np. podejscie"
            {...form.register("pl")}
          />
          {form.formState.errors.pl && (
            <p className="text-sm text-red-600">{form.formState.errors.pl.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 sm:col-span-1">
          <label className="text-sm opacity-70">Status</label>
          <select className="h-11 rounded-xl border px-3" {...form.register("status")}>
            <option value="new">new</option>
            <option value="learning">learning</option>
            <option value="known">known</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={create.isPending}
        className="h-11 rounded-xl bg-black text-white disabled:opacity-50"
      >
        {create.isPending ? "Dodaje..." : "Dodaj slowko"}
      </button>

      {create.isError && (
        <p className="text-sm text-red-600">Blad: {(create.error as Error).message}</p>
      )}
    </form>
  );
}
