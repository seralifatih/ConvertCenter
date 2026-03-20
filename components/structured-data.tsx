export function StructuredData({ data }: { data: unknown; id?: string }) {
  const serializedData = JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: serializedData,
      }}
      type="application/ld+json"
    />
  );
}
