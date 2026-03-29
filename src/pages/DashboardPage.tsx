import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="glass p-8 rounded-3xl shadow-moderate border border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back! 👋</h1>
            <p className="text-lg text-muted-foreground">Here's what's happening with your YouTube content today.</p>
          </div>
          <div className="hidden md:block w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center shadow-strong">
            <TrendingUp className="w-12 h-12 text-primary-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
