import React from 'react';
import { MessageCircle, Video, TrendingUp, Users } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
}

function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <div className="group glass p-6 rounded-2xl shadow-soft hover-lift border border-border/50 hover:border-primary/30 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-3">
            <div className="p-2 bg-gradient-primary rounded-xl shadow-moderate group-hover:shadow-strong transition-all duration-300">
              <div className="text-primary-foreground w-5 h-5 transition-transform duration-300 group-hover:scale-110">
                {icon}
              </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
          </div>
          <p className="text-3xl font-bold text-foreground mb-2 transition-all duration-300 group-hover:text-primary">
            {value}
          </p>
          {trend && (
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-success/10 rounded-full">
                <TrendingUp className="w-3 h-3 text-success" />
              </div>
              <p className="text-sm text-success font-medium">{trend}</p>
            </div>
          )}
        </div>
      </div>

      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300" />
    </div>
  );
}

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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Replies"
          value="1,234"
          icon={<MessageCircle className="w-5 h-5" />}
          trend="+12% from last week"
        />
        <StatCard title="Video Templates" value="45" icon={<Video className="w-5 h-5" />} trend="+3 new this week" />
        <StatCard title="Active Users" value="89" icon={<Users className="w-5 h-5" />} trend="+5% from last month" />
        <StatCard
          title="Engagement Rate"
          value="87%"
          icon={<TrendingUp className="w-5 h-5" />}
          trend="+2% from last week"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="xl:col-span-2 glass p-7 rounded-3xl shadow-moderate border border-border/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">Recent Activity</h3>
            <div className="p-2 bg-primary/10 rounded-xl">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="space-y-4">
            {[
              { type: 'success', text: 'New reply template created', time: '2 mins ago', icon: MessageCircle },
              { type: 'info', text: 'Video template updated', time: '1 hour ago', icon: Video },
              { type: 'warning', text: 'System maintenance completed', time: '3 hours ago', icon: TrendingUp },
              { type: 'success', text: 'User engagement increased', time: '5 hours ago', icon: Users },
            ].map((activity, index) => {
              const Icon = activity.icon;
              const colorClass = {
                success: 'bg-success/10 text-success border-success/20',
                info: 'bg-primary/10 text-primary border-primary/20',
                warning: 'bg-warning/10 text-warning border-warning/20',
              }[activity.type];

              return (
                <div
                  key={index}
                  className="group flex items-center space-x-4 p-4 rounded-2xl hover:bg-accent/30 transition-all duration-300"
                >
                  <div
                    className={`p-2 rounded-xl border ${colorClass} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground">{activity.text}</span>
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">{activity.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass p-7 rounded-3xl shadow-moderate border border-border/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">Quick Actions</h3>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          </div>
          <div className="space-y-3">
            {[
              { icon: MessageCircle, text: 'Create New Reply', gradient: 'from-blue-500 to-purple-600' },
              { icon: Video, text: 'Add Video Template', gradient: 'from-purple-500 to-pink-600' },
              { icon: TrendingUp, text: 'View Analytics', gradient: 'from-green-500 to-blue-600' },
              { icon: Users, text: 'Manage Users', gradient: 'from-orange-500 to-red-600' },
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className="group w-full text-left p-4 rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-moderate transition-all duration-300 hover-lift"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-3 bg-gradient-to-r ${action.gradient} rounded-xl shadow-moderate group-hover:shadow-strong transition-all duration-300`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                        {action.text}
                      </span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
