import { Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { cn } from '@/lib/cn';

interface UserMenuUser {
  name?: string | null;
  email?: string | null;
  picture?: string | null;
}

interface UserMenuProps {
  user?: UserMenuUser | null;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onLogout: () => void;
  variant?: 'mobile' | 'desktop';
}

export function UserMenu({ user, isOpen, onOpen, onClose, onLogout, variant = 'desktop' }: UserMenuProps) {
  const isMobile = variant === 'mobile';
  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuId = isMobile ? 'user-menu-mobile' : 'user-menu-desktop';

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsidePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      if (rootRef.current?.contains(target)) {
        return;
      }

      onClose();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      event.preventDefault();
      onClose();
      buttonRef.current?.focus();
    };

    document.addEventListener('pointerdown', handleOutsidePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handleOutsidePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          if (isOpen) {
            onClose();
          } else {
            onOpen();
          }
        }}
        className={cn(
          'flex items-center justify-center overflow-hidden rounded-full bg-gradient-primary shadow-moderate focus:outline-none focus:ring-2 focus:ring-primary',
          !isMobile && 'transition-transform hover:scale-[1.02]',
          isMobile ? 'h-9 w-9' : 'h-10 w-10',
        )}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={isOpen ? menuId : undefined}
        aria-label={isOpen ? 'Close user menu' : 'Open user menu'}
      >
        {user?.picture ? (
          <img
            src={user.picture}
            alt={user.name ?? 'User avatar'}
            className="h-full w-full rounded-full object-cover"
            title={user.name ?? undefined}
          />
        ) : (
          <User className={cn('text-primary-foreground', isMobile ? 'h-4 w-4' : 'h-5 w-5')} />
        )}
      </button>

      {isOpen && (
        <div
          id={menuId}
          className="absolute right-0 z-[70] mt-2 w-56 overflow-hidden rounded-2xl border border-border/50 bg-background shadow-lg ring-1 ring-black/5"
        >
          <div className="px-4 py-3 text-sm">
            <div className="truncate font-medium text-foreground">{user?.name ?? 'Signed in user'}</div>
            {user?.email && <div className="truncate text-xs text-muted-foreground">{user.email}</div>}
          </div>

          <div className="border-t border-border/50">
            <Link
              to="/settings/account"
              className="block px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-sidebar-accent/40"
              onClick={onClose}
            >
              Account settings
            </Link>

            <Link
              to="/settings/channel"
              className="block px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-sidebar-accent/40"
              onClick={onClose}
            >
              Channel settings
            </Link>

            <button
              type="button"
              onClick={onLogout}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
