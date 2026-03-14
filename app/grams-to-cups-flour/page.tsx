import { CookingPageTemplate, getCookingPageMetadata } from "@/components/cooking-page-template";
import { requireIngredientCookingPage } from "@/lib/cooking-pages";

const page = requireIngredientCookingPage("grams-to-cups-flour");

export const metadata = getCookingPageMetadata(page);

export default function GramsToCupsFlourPage() {
  return <CookingPageTemplate page={page} />;
}
