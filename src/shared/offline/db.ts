import { openDB, type DBSchema, type IDBPDatabase } from "idb";

export type QueuedMutation = {
  id: string;
  type: string;
  payload: unknown;
  timestamp: number;
};

interface OfflineDB extends DBSchema {
  "mutation-queue": {
    key: string;
    value: QueuedMutation;
  };
}

let dbPromise: Promise<IDBPDatabase<OfflineDB>> | undefined;

export function getOfflineDb() {
  if (typeof window === "undefined") {
    throw new Error("getOfflineDb can only be called in the browser");
  }

  dbPromise ??= openDB<OfflineDB>("guiaeldenring-offline", 1, {
    upgrade(db) {
      db.createObjectStore("mutation-queue", { keyPath: "id" });
    },
  });

  return dbPromise;
}
