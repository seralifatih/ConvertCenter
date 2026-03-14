import { CookingPageTemplate, getCookingPageMetadata } from "@/components/cooking-page-template";
import { requireIngredientCookingPage } from "@/lib/cooking-pages";

const page = requireIngredientCookingPage("tsp-to-grams-sugar");

export const metadata = getCookingPageMetadata(page);

export default function TspToGramsSugarPage() {
  return <CookingPageTemplate page={page} />;
}
