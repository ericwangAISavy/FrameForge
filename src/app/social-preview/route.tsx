import { ImageResponse } from "next/og";
const size = { width: 1200, height: 630 };
export const dynamic = "force-static";
export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#111619",
        padding: 90,
        color: "#e9e5dd",
      }}
    >
      <div
        style={{
          fontSize: 20,
          letterSpacing: 5,
          color: "#bda783",
          marginBottom: 70,
        }}
      >
        WORLDSMITH / AN ENGINEERING FIELD JOURNAL
      </div>
      <div style={{ fontSize: 75, lineHeight: 1.15 }}>Engineering worlds</div>
      <div style={{ fontSize: 75, color: "#bda783", lineHeight: 1.15 }}>
        worth exploring.
      </div>
      <div
        style={{
          fontSize: 18,
          color: "#a2aaa9",
          marginTop: 65,
          letterSpacing: 3,
        }}
      >
        SYSTEMS / STORIES / POSSIBILITIES
      </div>
    </div>,
    size,
  );
}
