import React from "react";
import { User, Bell, Shield, Globe } from "lucide-react";

interface SettingsSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function SettingsSection({ title, icon, children }: SettingsSectionProps) {
  return (
    <div className="glass rounded-3xl shadow-moderate border border-border/50 p-8 animate-slide-up">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-gradient-primary rounded-2xl shadow-moderate">
          <div className="text-primary-foreground w-6 h-6">{icon}</div>
        </div>
        <h3 className="text-2xl font-bold text-foreground">{title}</h3>
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
    <div className="group flex items-start justify-between py-6 border-b border-border/30 last:border-b-0 hover:bg-accent/20 -mx-4 px-4 rounded-2xl transition-all duration-300">
      <div className="flex-1 space-y-1">
        <label className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{label}</label>
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        )}
      </div>
      <div className="ml-6 flex-shrink-0">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="glass p-8 rounded-3xl shadow-moderate border border-border/50">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-lg text-muted-foreground">
          Customize your experience and manage your account preferences.
        </p>
      </div>
      
      <SettingsSection
        title="Profile Settings"
        icon={<User className="w-6 h-6" />}
      >
        <div className="space-y-6">
          <SettingRow label="Display Name">
            <input
              type="text"
              className="glass px-4 py-3 border border-border/50 rounded-2xl text-sm w-64 bg-input focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              defaultValue="John Doe"
              placeholder="Enter your display name"
            />
          </SettingRow>
          <SettingRow
            label="Email Address"
            description="Used for notifications and account recovery"
          >
            <input
              type="email"
              className="glass px-4 py-3 border border-border/50 rounded-2xl text-sm w-64 bg-input focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              defaultValue="john@example.com"
              placeholder="Enter your email"
            />
          </SettingRow>
          <SettingRow label="Time Zone">
            <select className="glass px-4 py-3 border border-border/50 rounded-2xl text-sm w-64 bg-input focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300">
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
        icon={<Bell className="w-6 h-6" />}
      >
        <div className="space-y-6">
          <SettingRow
            label="Email Notifications"
            description="Receive updates about your replies and templates"
          >
            <div className="relative">
              <input
                type="checkbox"
                defaultChecked
                className="sr-only peer"
                id="email-notifications"
              />
              <label
                htmlFor="email-notifications"
                className="flex items-center cursor-pointer"
              >
                <div className="relative w-14 h-8 bg-muted peer-checked:bg-primary rounded-full transition-colors duration-300 shadow-inner">
                  <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6 shadow-moderate" />
                </div>
                <span className="ml-4 text-sm font-medium text-foreground">Enabled</span>
              </label>
            </div>
          </SettingRow>
          <SettingRow
            label="Push Notifications"
            description="Get real-time notifications in your browser"
          >
            <div className="relative">
              <input
                type="checkbox"
                defaultChecked
                className="sr-only peer"
                id="push-notifications"
              />
              <label
                htmlFor="push-notifications"
                className="flex items-center cursor-pointer"
              >
                <div className="relative w-14 h-8 bg-muted peer-checked:bg-primary rounded-full transition-colors duration-300 shadow-inner">
                  <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6 shadow-moderate" />
                </div>
                <span className="ml-4 text-sm font-medium text-foreground">Enabled</span>
              </label>
            </div>
          </SettingRow>
          <SettingRow
            label="Weekly Summary"
            description="Receive a weekly summary of your activity"
          >
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only peer"
                id="weekly-summary"
              />
              <label
                htmlFor="weekly-summary"
                className="flex items-center cursor-pointer"
              >
                <div className="relative w-14 h-8 bg-muted peer-checked:bg-primary rounded-full transition-colors duration-300 shadow-inner">
                  <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6 shadow-moderate" />
                </div>
                <span className="ml-4 text-sm font-medium text-foreground">Disabled</span>
              </label>
            </div>
          </SettingRow>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Privacy & Security"
        icon={<Shield className="w-6 h-6" />}
      >
        <div className="space-y-6">
          <SettingRow
            label="Two-Factor Authentication"
            description="Add an extra layer of security to your account"
          >
            <button className="group glass px-6 py-3 bg-gradient-primary text-primary-foreground text-sm font-medium rounded-2xl hover:shadow-moderate transition-all duration-300 hover-lift border border-primary/20">
              <span className="group-hover:scale-105 transition-transform duration-300">Enable 2FA</span>
            </button>
          </SettingRow>
          <SettingRow
            label="Data Export"
            description="Download a copy of your data"
          >
            <button className="group glass px-6 py-3 border border-border/50 text-foreground text-sm font-medium rounded-2xl hover:border-primary/30 hover:shadow-moderate transition-all duration-300 hover-lift">
              <span className="group-hover:scale-105 transition-transform duration-300">Export Data</span>
            </button>
          </SettingRow>
          <SettingRow
            label="Delete Account"
            description="Permanently delete your account and all data"
          >
            <button className="group glass px-6 py-3 bg-destructive text-destructive-foreground text-sm font-medium rounded-2xl hover:shadow-moderate transition-all duration-300 hover-lift border border-destructive/20">
              <span className="group-hover:scale-105 transition-transform duration-300">Delete Account</span>
            </button>
          </SettingRow>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Preferences"
        icon={<Globe className="w-6 h-6" />}
      >
        <div className="space-y-6">
          <SettingRow label="Language">
            <select className="glass px-4 py-3 border border-border/50 rounded-2xl text-sm w-64 bg-input focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300">
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
            <div className="flex space-x-2">
              {[
                { value: 'light', label: '☀️ Light' },
                { value: 'dark', label: '🌙 Dark' },
                { value: 'system', label: '💻 System' }
              ].map((theme) => (
                <label key={theme.value} className="relative">
                  <input
                    type="radio"
                    name="theme"
                    value={theme.value}
                    defaultChecked={theme.value === 'system'}
                    className="sr-only peer"
                  />
                  <div className="glass px-4 py-3 border border-border/50 rounded-2xl text-sm cursor-pointer peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary/50 hover:border-primary/30 transition-all duration-300">
                    {theme.label}
                  </div>
                </label>
              ))}
            </div>
          </SettingRow>
          <SettingRow
            label="Auto-save"
            description="Automatically save your work as you type"
          >
            <div className="relative">
              <input
                type="checkbox"
                defaultChecked
                className="sr-only peer"
                id="auto-save"
              />
              <label
                htmlFor="auto-save"
                className="flex items-center cursor-pointer"
              >
                <div className="relative w-14 h-8 bg-muted peer-checked:bg-primary rounded-full transition-colors duration-300 shadow-inner">
                  <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6 shadow-moderate" />
                </div>
                <span className="ml-4 text-sm font-medium text-foreground">Enabled</span>
              </label>
            </div>
          </SettingRow>
        </div>
      </SettingsSection>

      {/* Action Buttons */}
      <div className="glass p-8 rounded-3xl shadow-moderate border border-border/50">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Changes are automatically saved as you make them.
          </p>
          <div className="flex space-x-4">
            <button className="group glass px-8 py-3 border border-border/50 text-foreground font-medium rounded-2xl hover:border-primary/30 hover:shadow-moderate transition-all duration-300 hover-lift">
              <span className="group-hover:scale-105 transition-transform duration-300">Reset to Defaults</span>
            </button>
            <button className="group glass px-8 py-3 bg-gradient-primary text-primary-foreground font-medium rounded-2xl hover:shadow-moderate transition-all duration-300 hover-lift border border-primary/20">
              <span className="group-hover:scale-105 transition-transform duration-300">Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}