"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, ArrowDown, ScanLine } from "lucide-react";
import { Landscape } from "./landscape";
import { ResumeLink } from "./site";
import { profile } from "@/content/profile";
export function Hero() {
  const [debug, setDebug] = useState(false);
  return (
    <section className={`hero ${debug ? "debug-on" : ""}`}>
      <div className="hero-scene">
        <Landscape />
        <div className="hero-vignette" />
      </div>
      <div className="hero-content">
        <div className="hero-kicker">
          <span className="tiny-cross">✦</span>{" "}
          {profile.name || "AN ENGINEERING FIELD JOURNAL"}
        </div>
        <h1>
          I build the systems
          <br />
          behind the
          <br />
          <em>experience.</em>
        </h1>
        <p>
          Gameplay engineering, interactive systems, and the small technical
          decisions that make virtual worlds feel alive.
        </p>
        <div className="hero-actions">
          <Link className="button primary" href="/work">
            Explore work <ArrowUpRight size={17} />
          </Link>
          <Link className="text-link" href="/engineering">
            Engineering notes <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="hero-specialties">
          <span>C++ / UNREAL ENGINE</span>
          <i />
          <span>SYSTEMS / STORYTELLING</span>
        </div>
      </div>
      <div className="scene-meta">
        <span>WORLD STUDY — 001</span>
        <span>AN ORIGINAL PROCEDURAL COMPOSITION</span>
      </div>
      <button
        className="debug-button"
        aria-pressed={debug}
        onClick={() => setDebug(!debug)}
      >
        <ScanLine size={15} />
        {debug ? "Hide scene notes" : "Inspect scene"}
      </button>
      {debug && (
        <div className="debug-panel">
          <span>SCENE INSPECTOR</span>
          <p>
            2D SVG · layered depth
            <br />
            Collision concepts · no physics engine
            <br />
            Original geometry · no game assets
          </p>
        </div>
      )}
      <div className="hero-bottom">
        <a className="scroll-hint" href="#selected-work">
          <ArrowDown size={14} /> A FEW THINGS WORTH EXPLORING
        </a>
        <ResumeLink />
      </div>
    </section>
  );
}
