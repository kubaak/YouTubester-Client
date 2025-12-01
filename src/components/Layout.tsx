import { useLocation, Link } from 'react-router-dom';
import { useState, type ComponentType, type ReactNode } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Video,
  MessageCircle,
  Home,
  Settings,
  HelpCircle,
  Info,
  Mail,
  User,
  LogOut,
} from 'lucide-react';
import { SidebarLink } from './SidebarLink';
import { cn } from '@/lib/cn';
import { useAuth } from '@/contexts/AuthContext';

type IconType = ComponentType<{ className?: string }>;

interface NavigationItem {
  readonly path: string;
  readonly label: string;
  readonly icon: IconType;
}

const primaryNav: readonly NavigationItem[] = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/replies', label: 'Replies', icon: MessageCircle },
  { path: '/videoTemplate', label: 'Video Templates', icon: Video },
  { path: '/settings', label: 'Settings', icon: Settings },
] as const;

const secondaryNav: readonly NavigationItem[] = [
  { path: '/help', label: 'Help', icon: HelpCircle },
  { path: '/about', label: 'About', icon: Info },
  { path: '/contact', label: 'Contact', icon: Mail },
] as const;

const TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/replies': 'Replies',
  '/videoTemplate': 'Video Templates',
  '/settings': 'Settings',
  '/help': 'Help',
  '/about': 'About',
  '/contact': 'Contact',
  '/faq': 'FAQ',
  '/privacy': 'Privacy Policy',
  '/terms': 'Terms of Service',
};

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  var location = useLocation();
  var { user, logout } = useAuth();
  var [collapsed, setCollapsed] = useState(false);
  var [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  var handleLogout = (): void => {
    logout();
    setIsUserMenuOpen(false);
  };

  var pageTitle = TITLES[location.pathname] ?? 'YouTubester';

  return (
    <div className="min-h-screen bg-gradient-surface flex">
      {/* Sidebar */}
      <aside
        id="app-sidebar"
        className={cn(
          'glass border-r border-sidebar-border/50 transition-[width] duration-300 ease-out',
          collapsed ? 'w-16' : 'w-72',
        )}
      >
        {/* Header */}
        <div className={cn('px-6 py-6 border-b border-sidebar-border/30', collapsed && 'px-3')}>
          <div className={cn('flex items-center gap-3', collapsed && 'justify-center gap-2')}>
            <div className="w-8 h-8 bg-gradient-primary rounded-xl grid place-items-center shadow-moderate">
              <span className="text-primary-foreground font-bold text-sm">Y</span>
            </div>
            {!collapsed && <h1 className="text-xl font-bold text-foreground">YouTubester</h1>}
            <button
              type="button"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded={!collapsed}
              aria-controls="app-sidebar"
              onClick={() => setCollapsed((v) => !v)}
              className={cn(
                'ml-auto rounded-lg border p-2 hover:bg-sidebar-accent/50 focus:outline-none focus:ring-2 focus:ring-primary',
                collapsed && 'ml-0',
              )}
              title={collapsed ? 'Expand' : 'Collapse'}
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Primary nav */}
        <nav className={cn('px-4 py-6', collapsed && 'px-2')} aria-label="Primary">
          <ul className="space-y-1">
            {primaryNav.map(({ path, label, icon: Icon }) => (
              <li key={path} className="animate-slide-up">
                <SidebarLink to={path} end={path === '/'} icon={Icon} collapsed={collapsed}>
                  {label}
                </SidebarLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Secondary nav */}
        <div className="px-4 py-4 border-t border-sidebar-border/30">
          <nav className="space-y-1" aria-label="Secondary">
            {secondaryNav.map(({ path, label, icon: Icon }) => (
              <SidebarLink key={path} to={path} end icon={Icon} size="sm" collapsed={collapsed}>
                {label}
              </SidebarLink>
            ))}
          </nav>
        </div>

        {/* Sidebar footer */}
        <div className="mt-auto p-4 border-t border-sidebar-border/30">
          {!collapsed && (
            <div className="mt-3 flex justify-center gap-4 text-xs">
              <Link to="/faq" className="text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors">
                FAQ
              </Link>
              <Link
                to="/privacy"
                className="text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link to="/terms" className="text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors">
                Terms
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* … your existing header & main stay the same … */}
        <header className="glass border-b border-border/50 px-8 py-5 backdrop-blur-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-foreground">
                {primaryNav.find((item) => item.path === location.pathname)?.label ||
                  secondaryNav.find((item) => item.path === location.pathname)?.label ||
                  (location.pathname === '/faq' ? 'FAQ' : null) ||
                  (location.pathname === '/privacy' ? 'Privacy Policy' : null) ||
                  (location.pathname === '/terms' ? 'Terms of Service' : null) ||
                  'YouTubester'}
              </h2>
              <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20">
                Beta
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span>All systems operational</span>
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen((previousIsUserMenuOpen) => !previousIsUserMenuOpen)}
                  className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-moderate hover-lift cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-haspopup="menu"
                  aria-expanded={isUserMenuOpen}
                >
                  {user?.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-full h-full object-cover rounded-full"
                      title={user.name}
                    />
                  ) : (
                    <User className="w-5 h-5 text-primary-foreground" />
                  )}
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 glass rounded-xl border border-border/40 shadow-moderate z-50 overflow-hidden">
                    <div className="px-4 py-3 text-sm">
                      <div className="font-medium text-foreground truncate">
                        {user?.name ?? 'Signed in user'}
                      </div>
                      {user?.email && (
                        <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                      )}
                    </div>
                    <div className="border-t border-border/40">
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-foreground hover:bg-sidebar-accent/40"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Account settings
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-destructive hover:bg-destructive/10"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-auto animate-fade-in">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
