import { StructuredData } from "@/components/structured-data";
import { makeFaqSchemaIfPresent, type FaqSchemaItem } from "@/lib/seo";

export function FaqStructuredData({
  faqItems,
}: {
  faqItems: readonly FaqSchemaItem[];
}) {
  const faqSchema = makeFaqSchemaIfPresent(faqItems);

  return faqSchema ? <StructuredData data={faqSchema} /> : null;
}
