import { useLocation, Link } from 'react-router-dom';
import { useState, type ComponentType, type ReactNode } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Video,
  MessageCircle,
  Home,
  HelpCircle,
  Info,
  Mail,
  User,
  LogOut,
} from 'lucide-react';

import { SidebarLink } from './SidebarLink';
import { cn } from '@/lib/cn';
import { useAuth } from '@/contexts/AuthContext';
import { PendingWriteActionBootstrap } from '@/auth/PendingWriteActionBootstrap';

type IconType = ComponentType<{ className?: string }>;

interface NavigationItem {
  readonly path: string;
  readonly label: string;
  readonly icon: IconType;
}

const primaryNav: readonly NavigationItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  { path: '/copy', label: 'Copy', icon: Video },
  { path: '/generate', label: 'Improve', icon: Video },
  { path: '/review', label: 'Review', icon: Video },
  { path: '/replies', label: 'Replies', icon: MessageCircle },
] as const;

const secondaryNav: readonly NavigationItem[] = [
  { path: '/help', label: 'Help', icon: HelpCircle },
  { path: '/about', label: 'About', icon: Info },
  { path: '/contact', label: 'Contact', icon: Mail },
] as const;

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = (): void => {
    logout();
    setIsUserMenuOpen(false);
  };

  const currentPageTitle =
    primaryNav.find((item) => item.path === location.pathname)?.label ||
    secondaryNav.find((item) => item.path === location.pathname)?.label ||
    (location.pathname === '/faq' ? 'FAQ' : null) ||
    (location.pathname === '/privacy' ? 'Privacy Policy' : null) ||
    (location.pathname === '/terms' ? 'Terms of Service' : null) ||
    (location.pathname === '/settings/account' ? 'Account Settings' : null) ||
    (location.pathname === '/settings/channel' ? 'Channel Settings' : null) ||
    'Tubester';

  return (
    <div className="flex min-h-screen bg-gradient-surface text-foreground">
      <PendingWriteActionBootstrap />
      {/* Sidebar */}
      <aside
        id="app-sidebar"
        className={cn(
          'glass shrink-0 border-r border-sidebar-border/50 transition-[width] duration-300 ease-out',
          collapsed ? 'w-16' : 'w-72',
        )}
      >
        {/* Header */}
        <div className={cn('border-b border-sidebar-border/30 py-5', collapsed ? 'px-3' : 'px-6')}>
          <div className={cn('flex', collapsed ? 'flex-col items-center gap-3' : 'items-center gap-3')}>
            <button
              type="button"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded={!collapsed}
              aria-controls="app-sidebar"
              onClick={() => setCollapsed((value) => !value)}
              className={cn(
                'inline-flex items-center justify-center rounded-lg border border-sidebar-border/60 p-2 text-foreground transition-colors hover:bg-sidebar-accent/50 focus:outline-none focus:ring-2 focus:ring-primary',
                !collapsed && 'ml-auto order-3',
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

            {!collapsed && <h1 className="truncate text-xl font-bold tracking-tight text-foreground">Tubester</h1>}
          </div>
        </div>

        {/* Primary nav */}
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

        {/* Secondary nav */}
        <div className={cn('border-t border-sidebar-border/30 px-4 py-4', collapsed && 'px-2')}>
          <nav className="space-y-1.5" aria-label="Secondary">
            {secondaryNav.map(({ path, label, icon: Icon }) => (
              <SidebarLink key={path} to={path} end icon={Icon} size="sm" collapsed={collapsed}>
                {label}
              </SidebarLink>
            ))}
          </nav>
        </div>

        {/* Sidebar footer */}
        <div className="mt-auto border-t border-sidebar-border/30 p-4">
          {!collapsed && (
            <div className="mt-2 flex items-center justify-center gap-4 text-xs">
              <Link to="/faq" className="text-sidebar-foreground/50 transition-colors hover:text-sidebar-foreground">
                FAQ
              </Link>
              <Link
                to="/privacy"
                className="text-sidebar-foreground/50 transition-colors hover:text-sidebar-foreground"
              >
                Privacy
              </Link>
              <Link to="/terms" className="text-sidebar-foreground/50 transition-colors hover:text-sidebar-foreground">
                Terms
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="glass relative z-40 border-b border-border/50 px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-4">
              <h2 className="truncate text-2xl font-bold tracking-tight text-foreground">{currentPageTitle}</h2>

              <div className="hidden rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary sm:inline-flex">
                Beta
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen((open) => !open)}
                  className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-primary shadow-moderate transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-haspopup="menu"
                  aria-expanded={isUserMenuOpen}
                >
                  {user?.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="h-full w-full rounded-full object-cover"
                      title={user.name}
                    />
                  ) : (
                    <User className="h-5 w-5 text-primary-foreground" />
                  )}
                </button>

                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-border/50 bg-background shadow-lg ring-1 ring-black/5"
                    role="menu"
                  >
                    <div className="px-4 py-3 text-sm">
                      <div className="truncate font-medium text-foreground">{user?.name ?? 'Signed in user'}</div>
                      {user?.email && <div className="truncate text-xs text-muted-foreground">{user.email}</div>}
                    </div>

                    <div className="border-t border-border/50">
                      <Link
                        to="/settings/account"
                        className="block px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-sidebar-accent/40"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Account settings
                      </Link>
                      <Link
                        to="/settings/channel"
                        className="block px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-sidebar-accent/40"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Channel settings
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-destructive transition-colors hover:bg-destructive/10"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="z-0 flex-1 overflow-auto px-5 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-6">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
