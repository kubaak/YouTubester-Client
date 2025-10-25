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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">YouTubester</h1>
        </div>
        
        {/* Navigation */}
        <nav className="px-4 py-6">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              var isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              {navigationItems.find(item => item.path === location.pathname)?.label || "YouTubester"}
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Welcome back!</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 px-6 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}