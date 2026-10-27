"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X, MoveUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { assets } from "@/content/assets";
const links = [
  ["Work", "/work"],
  ["Engineering", "/engineering"],
  ["Playground", "/playground"],
  ["About", "/about"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="header">
      <Link href="/" className="brand">
        <span className="brand-mark" aria-hidden="true">
          W<span>✦</span>
        </span>
        <span>
          WORLDSMITH<small>GAMEPLAY ENGINEERING</small>
        </span>
      </Link>
      <nav aria-label="Primary" className="desktop-nav">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            aria-current={path.startsWith(href) ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
      <Link className="contact-link" href="/contact">
        Let’s talk <ArrowUpRight size={15} />
      </Link>
      <button
        className="mobile-toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile">
          {[...links, ["Contact", "/contact"]].map(([l, h]) => (
            <Link href={h} key={h} onClick={() => setOpen(false)}>
              {l}
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div>
        <Link className="footer-title" href="/contact">
          Good systems start
          <br />
          with a conversation. <MoveUpRight />
        </Link>
        <p>Gameplay, architecture, or an interesting problem.</p>
      </div>
      <div className="footer-bottom">
        <Link href="/" className="wordmark">
          WORLDSMITH <span>© {new Date().getFullYear()}</span>
        </Link>
        <span>Built with intent. Made to be explored.</span>
        <Link href="/contact">Get in touch ↗</Link>
      </div>
    </footer>
  );
}
export function ResumeLink() {
  return assets.resume ? (
    <a className="text-link" href={assets.resume} download>
      Download résumé <ArrowUpRight size={14} />
    </a>
  ) : (
    <Link className="text-link" href="/about#experience">
      Background & résumé <ArrowUpRight size={14} />
    </Link>
  );
}
export function ContactDetails() {
  return (
    <div className="contact-details">
      {profile.email ? (
        <a className="contact-address" href={`mailto:${profile.email}`}>
          {profile.email}
          <ArrowUpRight />
        </a>
      ) : (
        <p className="contact-pending">
          Contact details are being prepared.
          <br />
          <span>
            The owner’s email and professional links will appear here once
            confirmed.
          </span>
        </p>
      )}
      {assets.socials.map((s) => (
        <a href={s.url} key={s.url} rel="noopener noreferrer" target="_blank">
          {s.label} ↗
        </a>
      ))}
    </div>
  );
}
