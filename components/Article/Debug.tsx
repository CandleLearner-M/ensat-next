"use client";

export default function Debug({ data }: { data: any }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        padding: "20px",
        background: "rgba(0,0,0,0.8)",
        color: "white",
        borderRadius: "8px",
        maxWidth: "80vw",
        maxHeight: "50vh",
        overflow: "auto",
        fontSize: "12px",
      }}
    >
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
