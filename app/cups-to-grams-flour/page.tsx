import { CookingPageTemplate, getCookingPageMetadata } from "@/components/cooking-page-template";
import { requireIngredientCookingPage } from "@/lib/cooking-pages";

const page = requireIngredientCookingPage("cups-to-grams-flour");

export const metadata = getCookingPageMetadata(page);

export default function CupsToGramsFlourPage() {
  return <CookingPageTemplate page={page} />;
}
