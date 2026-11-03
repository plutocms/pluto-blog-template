export function formatPostDate(value?: string, style: "medium" | "long" = "medium"): string {
  return value
    ? new Intl.DateTimeFormat("en", { dateStyle: style }).format(new Date(value))
    : "";
}
