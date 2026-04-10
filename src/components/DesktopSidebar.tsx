import type { ComponentType } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { SidebarLink } from './SidebarLink';
import { cn } from '@/lib/cn';

type IconType = ComponentType<{ className?: string }>;

type NavigationItem = {
  readonly path: string;
  readonly label: string;
  readonly icon: IconType;
};

type DesktopSidebarProps = {
  collapsed: boolean;
  onToggleCollapse: () => void;
  primaryNav: readonly NavigationItem[];
  secondaryNav: readonly NavigationItem[];
};

export function DesktopSidebar({ collapsed, onToggleCollapse, primaryNav, secondaryNav }: DesktopSidebarProps) {
  return (
    <aside
      id="app-sidebar"
      className={cn(
        'glass hidden shrink-0 border-r border-sidebar-border/50 transition-[width] duration-300 ease-out lg:flex lg:flex-col',
        collapsed ? 'lg:w-16' : 'lg:w-72',
      )}
    >
      <div className={cn('border-b border-sidebar-border/30 py-5', collapsed ? 'px-3' : 'px-6')}>
        <div className={cn('flex', collapsed ? 'flex-col items-center gap-3' : 'items-center gap-3')}>
          <button
            type="button"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!collapsed}
            aria-controls="app-sidebar"
            onClick={onToggleCollapse}
            className={cn(
              'inline-flex items-center justify-center rounded-lg border border-sidebar-border/60 p-2 text-foreground transition-colors hover:bg-sidebar-accent/50 focus:outline-none focus:ring-2 focus:ring-primary',
              !collapsed && 'order-3 ml-auto',
            )}
            title={collapsed ? 'Expand' : 'Collapse'}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          <img
            src="/tubester_logo.png"
            alt="Tubester logo"
            className="h-10 w-auto max-w-full shrink-0 object-contain"
          />

          {!collapsed && <h1 className="truncate text-xl font-semibold tracking-tight text-foreground">Tubester</h1>}
        </div>
      </div>

      <nav className={cn('px-4 py-5', collapsed && 'px-2')} aria-label="Primary">
        <ul className="space-y-1.5">
          {primaryNav.map(({ path, label, icon: Icon }) => (
            <li key={path}>
              <SidebarLink to={path} end={path === '/'} icon={Icon} collapsed={collapsed}>
                {label}
              </SidebarLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={cn('border-t border-sidebar-border/30 px-4 py-4', collapsed && 'px-2')}>
        <nav aria-label="Secondary">
          <ul className="space-y-1.5">
            {secondaryNav.map(({ path, label, icon: Icon }) => (
              <li key={path}>
                <SidebarLink to={path} end icon={Icon} size="sm" collapsed={collapsed}>
                  {label}
                </SidebarLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-auto border-t border-sidebar-border/30 p-4">
        {!collapsed && (
          <div className="mt-2 flex items-center justify-center gap-4 text-xs">
            <Link to="/faq" className="text-sidebar-foreground/50 transition-colors hover:text-sidebar-foreground">
              FAQ
            </Link>
            <Link to="/privacy" className="text-sidebar-foreground/50 transition-colors hover:text-sidebar-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="text-sidebar-foreground/50 transition-colors hover:text-sidebar-foreground">
              Terms
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
