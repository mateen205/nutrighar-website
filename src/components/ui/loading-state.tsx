export function LoadingState({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16" role="status">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-ng-mist border-t-ng-leaf" />
      <p className="text-sm text-ng-muted">{label}</p>
    </div>
  );
}
