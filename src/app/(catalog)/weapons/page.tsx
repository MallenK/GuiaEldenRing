import { WeaponList } from "@/modules/catalog/ui/WeaponList";

export default function WeaponsPage() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-6 text-2xl font-bold">Armas</h1>
      <WeaponList />
    </main>
  );
}
