import { CookingPageTemplate, getCookingPageMetadata } from "@/components/cooking-page-template";
import { requireIngredientCookingPage } from "@/lib/cooking-pages";

const page = requireIngredientCookingPage("tbsp-to-grams-sugar");

export const metadata = getCookingPageMetadata(page);

export default function TbspToGramsSugarPage() {
  return <CookingPageTemplate page={page} />;
}
