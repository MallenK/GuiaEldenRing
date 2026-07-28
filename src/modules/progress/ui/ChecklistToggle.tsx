"use client";

import { useChecklistStatus } from "../hooks/useChecklist";
import { useToggleChecklistItem } from "../hooks/useToggleChecklistItem";

export function ChecklistToggle({
  refType,
  refId,
  label,
}: {
  refType: string;
  refId: string;
  label: string;
}) {
  const completed = useChecklistStatus(refType, refId);
  const toggle = useToggleChecklistItem();

  return (
    <label className="flex w-fit items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => toggle.mutate({ refType, refId, completed: e.target.checked })}
      />
      {label}
    </label>
  );
}
