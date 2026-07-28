import { getOfflineDb, type QueuedMutation } from "./db";

export async function enqueueMutation(type: string, payload: unknown) {
  const db = await getOfflineDb();
  const mutation: QueuedMutation = {
    id: crypto.randomUUID(),
    type,
    payload,
    timestamp: Date.now(),
  };
  await db.put("mutation-queue", mutation);
  return mutation;
}

export async function listQueuedMutations() {
  const db = await getOfflineDb();
  return db.getAll("mutation-queue");
}

export async function removeQueuedMutation(id: string) {
  const db = await getOfflineDb();
  await db.delete("mutation-queue", id);
}

/**
 * Drains the mutation queue against a sync endpoint. Mutations carry a
 * client-generated id so the server can apply them idempotently on replay.
 */
export async function drainMutationQueue(
  syncFn: (mutations: QueuedMutation[]) => Promise<{ appliedIds: string[] }>,
) {
  const pending = await listQueuedMutations();
  if (pending.length === 0) return;

  const { appliedIds } = await syncFn(pending);
  await Promise.all(appliedIds.map(removeQueuedMutation));
}
