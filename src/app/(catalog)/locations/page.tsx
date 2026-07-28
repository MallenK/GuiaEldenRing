import { LocationList } from "@/modules/catalog/ui/LocationList";

export default function LocationsPage() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-6 text-2xl font-bold">Ubicaciones</h1>
      <LocationList />
    </main>
  );
}
