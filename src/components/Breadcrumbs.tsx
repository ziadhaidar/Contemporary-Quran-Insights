import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="inline-flex items-center">
              {index > 0 && (
                <ChevronRight className="mx-1 h-4 w-4 text-neutral-400" />
              )}
              
              {isLast ? (
                <span className="text-sm font-medium text-neutral-500" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link 
                  to={item.path}
                  className="text-sm font-medium text-primary-600 hover:text-primary-800"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}