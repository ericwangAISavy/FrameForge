export type Verification =
  | "Verified"
  | "Unverified"
  | "Illustrative"
  | "Independent concept"
  | "Demonstrated implementation"
  | "Planned or experimental";
export type Claim = { text: string; status: Verification; evidence?: string };
export const sourceNotice =
  "The supplied career profile is fictional reference material. These studies explore engineering ideas; they are not commercial project credits.";
