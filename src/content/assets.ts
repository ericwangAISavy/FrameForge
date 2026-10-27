// Owner-authorized files in public/assets; null slots render intentional editorial alternatives.
export const assets = {
  portrait: null as string | null,
  resume: null as string | null,
  socials: [] as { label: string; url: string }[],
  repositories: [] as { label: string; url: string }[],
  projects: {} as Record<
    string,
    {
      thumbnail?: string;
      screenshots?: string[];
      clip?: string;
      diagram?: string;
    }
  >,
};
