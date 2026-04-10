import { Link } from 'react-router-dom';
import type { ComponentType } from 'react';

import { cn } from '@/lib/cn';

type IconType = ComponentType<{ className?: string }>;

type NavigationItem = {
  readonly path: string;
  readonly label: string;
  readonly icon: IconType;
};

type MobileNavigationMenuProps = {
  primaryNav: readonly NavigationItem[];
  secondaryNav: readonly NavigationItem[];
  currentPath: string;
  onClose: () => void;
};

function MobileNavList({
  items,
  currentPath,
  onClose,
  ariaLabel,
}: {
  items: readonly NavigationItem[];
  currentPath: string;
  onClose: () => void;
  ariaLabel: string;
}) {
  return (
    <nav aria-label={ariaLabel}>
      <ul className="space-y-1.5">
        {items.map(({ path, label, icon: Icon }) => {
          const isActive = currentPath === path;

          return (
            <li key={path}>
              <Link
                to={path}
                onClick={onClose}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-accent hover:text-foreground',
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function MobileNavigationMenu({ primaryNav, secondaryNav, currentPath, onClose }: MobileNavigationMenuProps) {
  return (
    <div
      id="mobile-navigation"
      className="border-t border-border/50 bg-background/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <MobileNavList
        items={primaryNav}
        currentPath={currentPath}
        onClose={onClose}
        ariaLabel="Mobile primary navigation"
      />

      <div className="mt-4 border-t border-border/50 pt-4">
        <MobileNavList
          items={secondaryNav}
          currentPath={currentPath}
          onClose={onClose}
          ariaLabel="Mobile secondary navigation"
        />

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 px-3 text-xs text-muted-foreground">
          <Link to="/faq" onClick={onClose} className="transition-colors hover:text-foreground">
            FAQ
          </Link>
          <Link to="/privacy" onClick={onClose} className="transition-colors hover:text-foreground">
            Privacy
          </Link>
          <Link to="/terms" onClick={onClose} className="transition-colors hover:text-foreground">
            Terms
          </Link>
        </div>
      </div>
    </div>
  );
}
