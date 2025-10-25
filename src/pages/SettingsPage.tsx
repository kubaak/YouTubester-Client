import React from "react";
import { User, Bell, Shield, Globe } from "lucide-react";

interface SettingsSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function SettingsSection({ title, icon, children }: SettingsSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <div className="text-blue-600 mr-3">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}

interface SettingRowProps {
  label: string;
  description?: string;
  children: React.ReactNode;
}

function SettingRow({ label, description, children }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-900">{label}</label>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>
      <div className="ml-4">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <SettingsSection
        title="Profile Settings"
        icon={<User className="w-5 h-5" />}
      >
        <div className="space-y-4">
          <SettingRow label="Display Name">
            <input
              type="text"
              className="px-3 py-2 border border-gray-300 rounded-md text-sm w-48"
              defaultValue="John Doe"
            />
          </SettingRow>
          <SettingRow
            label="Email"
            description="Used for notifications and account recovery"
          >
            <input
              type="email"
              className="px-3 py-2 border border-gray-300 rounded-md text-sm w-48"
              defaultValue="john@example.com"
            />
          </SettingRow>
          <SettingRow label="Time Zone">
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm w-48">
              <option>UTC-8 (Pacific Time)</option>
              <option>UTC-5 (Eastern Time)</option>
              <option>UTC+0 (GMT)</option>
              <option>UTC+1 (CET)</option>
            </select>
          </SettingRow>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Notifications"
        icon={<Bell className="w-5 h-5" />}
      >
        <div className="space-y-4">
          <SettingRow
            label="Email Notifications"
            description="Receive updates about your replies and templates"
          >
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">Enabled</span>
            </label>
          </SettingRow>
          <SettingRow
            label="Push Notifications"
            description="Get real-time notifications in your browser"
          >
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">Enabled</span>
            </label>
          </SettingRow>
          <SettingRow
            label="Weekly Summary"
            description="Receive a weekly summary of your activity"
          >
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">Enabled</span>
            </label>
          </SettingRow>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Privacy & Security"
        icon={<Shield className="w-5 h-5" />}
      >
        <div className="space-y-4">
          <SettingRow
            label="Two-Factor Authentication"
            description="Add an extra layer of security to your account"
          >
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
              Enable
            </button>
          </SettingRow>
          <SettingRow
            label="Data Export"
            description="Download a copy of your data"
          >
            <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors">
              Export Data
            </button>
          </SettingRow>
          <SettingRow
            label="Delete Account"
            description="Permanently delete your account and all data"
          >
            <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors">
              Delete Account
            </button>
          </SettingRow>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Preferences"
        icon={<Globe className="w-5 h-5" />}
      >
        <div className="space-y-4">
          <SettingRow label="Language">
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm w-48">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </SettingRow>
          <SettingRow
            label="Theme"
            description="Choose your preferred color scheme"
          >
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm w-48">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </SettingRow>
          <SettingRow
            label="Auto-save"
            description="Automatically save your work as you type"
          >
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">Enabled</span>
            </label>
          </SettingRow>
        </div>
      </SettingsSection>

      <div className="flex justify-end space-x-4 pt-6">
        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}