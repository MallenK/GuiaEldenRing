import { TalismanList } from "@/modules/catalog/ui/TalismanList";

export default function TalismansPage() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-6 text-2xl font-bold">Talismanes</h1>
      <TalismanList />
    </main>
  );
}
