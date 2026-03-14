import { CookingPageTemplate, getCookingPageMetadata } from "@/components/cooking-page-template";
import { requireIngredientCookingPage } from "@/lib/cooking-pages";

const page = requireIngredientCookingPage("cups-to-grams-sugar");

export const metadata = getCookingPageMetadata(page);

export default function CupsToGramsSugarPage() {
  return <CookingPageTemplate page={page} />;
}
