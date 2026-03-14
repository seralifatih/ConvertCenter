import { PillLink } from "@/components/pill";
import { UtilityCard } from "@/components/utility-card";

type RelatedLinkItem = {
  label: string;
  href: string;
};

export function RelatedLinks({
  title,
  links,
}: {
  title: string;
  links: RelatedLinkItem[];
}) {
  return (
    <UtilityCard>
      <div className="mb-4 flex items-center gap-3">
        <h2 className="section-title">{title}</h2>
        <span className="section-badge">{links.length} links</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <PillLink href={link.href} key={`${link.href}-${link.label}`} mono>
            {link.label}
          </PillLink>
        ))}
      </div>
    </UtilityCard>
  );
}
