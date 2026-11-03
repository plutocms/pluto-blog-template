/** A post in the list of the public API. */
export interface PostSummary {
  id: string | number;
  slug: string;
  title: string;
  excerpt?: string;
  createdAt?: string;
  publishedAt?: string;
  cover?: PlutoPublicMedia | null;
}

/** One post of the public API, with its body as HTML. */
export interface Post extends PostSummary {
  html: string;
}

export function postDate(
  post: Pick<PostSummary, "createdAt" | "publishedAt">,
  style: "medium" | "long" = "medium",
): string {
  const value = post.publishedAt || post.createdAt;
  return value
    ? new Intl.DateTimeFormat("en", { dateStyle: style }).format(new Date(value))
    : "";
}
