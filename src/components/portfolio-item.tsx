import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface Tag {
  name: string;
  color: string;
}

interface PortfolioItemProps {
  title: string;
  description: string;
  imageUrl?: string;
  projectUrl?: string;
  tags?: Tag[];
}

export default function PortfolioItem({
  title,
  description,
  imageUrl,
  projectUrl = "#",
  tags = [],
}: PortfolioItemProps) {
  // Default tags if none provided
  const defaultTags = [
    { name: "React", color: "blue" },
    { name: "Next.js", color: "indigo" },
    { name: "Tailwind", color: "purple" },
  ];

  const displayTags = tags.length > 0 ? tags : defaultTags;

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all">
      <div className="aspect-video w-full bg-gray-100 relative">
        {imageUrl ? (
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
            <span className="text-4xl font-bold text-blue-200">
              {title.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {displayTags.map((tag, index) => (
            <span
              key={index}
              className={`px-3 py-1 bg-${tag.color}-100 text-${tag.color}-600 rounded-full text-xs`}
            >
              {tag.name}
            </span>
          ))}
        </div>
        <a
          href={projectUrl}
          className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center"
        >
          View Project
          <ArrowUpRight className="ml-1 w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
