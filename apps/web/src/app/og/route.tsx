import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  const title = new URL(request.url).searchParams.get("title") ?? "Opralvin One";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#e3e6e0",
          color: "#1c1612",
          padding: 64,
        }}
      >
        <p style={{ fontSize: 28 }}>Opralvin One</p>
        <p style={{ fontSize: 48, lineHeight: 1.15, maxWidth: 980 }}>{title}</p>
        <p style={{ fontSize: 22, color: "#8e1e24" }}>Book a free process audit</p>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
