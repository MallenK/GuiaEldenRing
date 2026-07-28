import { BuildForm } from "@/modules/progress/ui/BuildForm";
import { BuildList } from "@/modules/progress/ui/BuildList";

export default function BuildsPage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 p-8">
      <h1 className="text-2xl font-bold">Mis builds</h1>
      <BuildForm />
      <BuildList />
    </main>
  );
}
