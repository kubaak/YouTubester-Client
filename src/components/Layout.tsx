import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Video, MessageCircle, Home, Settings } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

interface NavigationItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

var navigationItems: NavigationItem[] = [
  {
    path: "/",
    label: "Dashboard",
    icon: <Home className="w-5 h-5" />,
  },
  {
    path: "/replies",
    label: "Replies",
    icon: <MessageCircle className="w-5 h-5" />,
  },
  {
    path: "/videoTemplate",
    label: "Video Templates",
    icon: <Video className="w-5 h-5" />,
  },
  {
    path: "/settings",
    label: "Settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export default function Layout({ children }: LayoutProps) {
  var location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-surface flex">
      {/* Sidebar */}
      <div className="w-72 glass border-r border-sidebar-border/50">
        {/* Header */}
        <div className="px-6 py-6 border-b border-sidebar-border/30">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center shadow-moderate">
              <span className="text-primary-foreground font-bold text-sm">Y</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              YouTubester
            </h1>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="px-4 py-6">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              var isActive = location.pathname === item.path;
              
              return (
                <li key={item.path} className="animate-slide-up">
                  <Link
                    to={item.path}
                    className={`group flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover-lift ${
                      isActive
                        ? "bg-gradient-primary text-primary-foreground shadow-moderate border border-primary/20"
                        : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 hover:shadow-soft"
                    }`}
                  >
                    <span className={`mr-4 transition-transform duration-300 group-hover:scale-110 ${
                      isActive ? "text-primary-foreground" : "text-primary/70"
                    }`}>{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-primary-foreground rounded-full animate-scale-in" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Sidebar Footer */}
        <div className="mt-auto p-4 border-t border-sidebar-border/30">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-sidebar-accent/30">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">U</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">User</p>
              <p className="text-xs text-sidebar-foreground/60">Premium Plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="glass border-b border-border/50 px-8 py-5 backdrop-blur-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-foreground">
                {navigationItems.find(item => item.path === location.pathname)?.label || "YouTubester"}
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
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-moderate hover-lift cursor-pointer">
                <span className="text-primary-foreground font-bold text-sm">U</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto animate-fade-in">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
