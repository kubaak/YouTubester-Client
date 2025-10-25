import React from "react";
import { MessageCircle, Video, TrendingUp, Users } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
}

function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 flex items-center mt-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className="text-blue-600">{icon}</div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Replies"
          value="1,234"
          icon={<MessageCircle className="w-8 h-8" />}
          trend="+12% from last week"
        />
        <StatCard
          title="Video Templates"
          value="45"
          icon={<Video className="w-8 h-8" />}
          trend="+3 new this week"
        />
        <StatCard
          title="Active Users"
          value="89"
          icon={<Users className="w-8 h-8" />}
          trend="+5% from last month"
        />
        <StatCard
          title="Engagement Rate"
          value="87%"
          icon={<TrendingUp className="w-8 h-8" />}
          trend="+2% from last week"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">New reply template created</span>
              <span className="text-xs text-gray-400 ml-auto">2 mins ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Video template updated</span>
              <span className="text-xs text-gray-400 ml-auto">1 hour ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">System maintenance completed</span>
              <span className="text-xs text-gray-400 ml-auto">3 hours ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">Create New Reply</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Video className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">Add Video Template</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">View Analytics</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}