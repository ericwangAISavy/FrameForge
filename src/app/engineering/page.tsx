import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/editorial";
import { studies } from "@/content/case-studies";
export const metadata = { title: "Engineering notes" };
export default function Engineering() {
  return (
    <div className="page-shell">
      <PageIntro
        label="02 / ENGINEERING NOTES"
        title="The thinking behind the feeling."
      >
        <p>
          Five illustrative technical analyses. Each starts with a problem,
          names its constraints, and follows the consequences.
        </p>
      </PageIntro>
      <div className="study-list full-studies">
        {studies.map((s, i) => (
          <Link href={`/engineering/${s.slug}`} key={s.slug}>
            <span className="study-number">0{i + 1}</span>
            <div>
              <span className="eyebrow">
                {s.category} / Illustrative analysis
              </span>
              <h2>{s.subtitle}</h2>
              <p>{s.problem}</p>
            </div>
            <span className="study-time">{s.readTime}</span>
            <ArrowUpRight />
          </Link>
        ))}
      </div>
    </div>
  );
}
