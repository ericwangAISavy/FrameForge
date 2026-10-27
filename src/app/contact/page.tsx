import Link from "next/link";
import { PageIntro } from "@/components/editorial";
import { ContactDetails, ResumeLink } from "@/components/site";
export const metadata = { title: "Contact" };
export default function Contact() {
  return (
    <div className="page-shell contact-page">
      <PageIntro
        label="05 / START A CONVERSATION"
        title="An interesting problem is a good place to start."
      >
        <p>
          Gameplay systems, technical collaboration, or a story that needs a
          different kind of interaction.
        </p>
      </PageIntro>
      <ContactDetails />
      <div className="contact-options">
        <ResumeLink />
        <Link className="text-link" href="/engineering">
          Browse engineering notes ↗
        </Link>
      </div>
      <p className="editorial-notice">
        No contact form is collecting data. Confirmed professional contact
        details will be published here by the portfolio owner.
      </p>
    </div>
  );
}
