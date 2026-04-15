// SidebarLink.tsx
import { NavLink } from 'react-router-dom';
import type { ComponentType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type IconType = ComponentType<{ className?: string }>;

type SidebarLinkProps = {
  to: string;
  end?: boolean;
  icon: IconType;
  children: ReactNode;
  size?: 'md' | 'sm';
  collapsed?: boolean; // NEW
};

export function SidebarLink({ to, end, icon: Icon, children, size = 'md', collapsed = false }: SidebarLinkProps) {
  const base = cn(
    'group flex items-center font-medium transition-all hover-lift',
    size === 'md' ? 'px-4 py-3 rounded-xl text-sm duration-300' : 'px-3 py-2 rounded-lg text-xs duration-200',
  );
  const iconSize = size === 'md' ? 'w-5 h-5' : 'w-4 h-4'; // margin handled below

  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          base,
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2',
          isActive
            ? 'bg-gradient-primary text-primary-foreground shadow-moderate border border-primary/20'
            : 'text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 hover:shadow-soft',
        )
      }
      title={typeof children === 'string' ? children : undefined} // tooltip when collapsed
    >
      {({ isActive }) => (
        <>
          <Icon
            className={cn(
              iconSize,
              'shrink-0 transition-transform duration-300 group-hover:scale-110',
              isActive ? 'text-primary-foreground' : 'text-primary/70',
            )}
          />
          {/* label */}
          <span
            className={cn(
              'font-medium ml-4',
              collapsed && 'sr-only', // fully hide for a11y; keep tooltip via title
            )}
          >
            {children}
          </span>
          {!collapsed && isActive && (
            <div className="ml-auto w-2 h-2 bg-primary-foreground rounded-full animate-scale-in" />
          )}
        </>
      )}
    </NavLink>
  );
}
