import { PageIntro, WorkList } from "@/components/editorial";
import { sourceNotice } from "@/content/verification";
export const metadata = { title: "Work" };
export default function Work() {
  return (
    <div className="page-shell">
      <PageIntro
        label="01 / SELECTED EXPLORATIONS"
        title="Systems with a point of view."
      >
        <p>
          Character movement, branching worlds, and the space where engineering
          meets storytelling.
        </p>
      </PageIntro>
      <p className="editorial-notice">{sourceNotice}</p>
      <WorkList />
    </div>
  );
}
