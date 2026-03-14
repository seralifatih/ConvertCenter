import { CookingPageTemplate, getCookingPageMetadata } from "@/components/cooking-page-template";
import { requireIngredientCookingPage } from "@/lib/cooking-pages";

const page = requireIngredientCookingPage("grams-to-cups-sugar");

export const metadata = getCookingPageMetadata(page);

export default function GramsToCupsSugarPage() {
  return <CookingPageTemplate page={page} />;
}
