import Link from "next/link";

interface BreadcrumbProps {
  links: { label: string; href?: string }[];
}

const SalesBreadcrumb = ({ links }: BreadcrumbProps) => {
  return (
    <div className="text-sm text-gray-500 flex items-center mb-4">
      {links.map((link, index) => (
        <span key={index} className="flex items-center">
          {index > 0 && <span className="mx-2">/</span>}
          {link.href ? (
            <Link href={link.href} className="hover:text-green-600">
              {link.label}
            </Link>
          ) : (
            <span className="text-green-600 font-semibold">{link.label}</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default SalesBreadcrumb;
