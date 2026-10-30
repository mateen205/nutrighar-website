import type { ReactNode } from "react";
import { Leaf } from "lucide-react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="card-ng flex flex-col items-center px-6 py-12 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-ng-mist text-ng-deep">
        <Leaf className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-ng-forest">{title}</h3>
      {description ? <p className="mt-2 max-w-md body-muted text-sm">{description}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
