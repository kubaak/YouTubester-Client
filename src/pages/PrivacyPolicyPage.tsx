import { Shield, Eye, Lock, Server, Users, FileText } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const lastUpdated = 'April 1, 2026';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl shadow-moderate">
          <Shield className="w-8 h-8 text-primary-foreground" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            This policy explains how Tubester collects, uses, and protects your data.
          </p>
          <p className="text-sm text-muted-foreground mt-2">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Identity */}
      <section className="glass rounded-xl p-8 border border-border/50">
        <h2 className="text-xl font-bold mb-4">Who We Are</h2>
        <p className="text-muted-foreground">
          Tubester is operated by <strong>99 Soft LLC</strong>, a company registered in Wyoming, USA. 99 Soft LLC acts
          as the data controller for personal data processed through this service.
        </p>
      </section>

      {/* Information we collect */}
      <section className="glass rounded-xl p-8 border border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <Eye className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold">Information We Collect</h2>
        </div>

        <div className="space-y-4 text-muted-foreground">
          <p>We collect only the data necessary to provide Tubester’s functionality.</p>

          <div>
            <h4 className="font-semibold text-foreground">Account & YouTube Data</h4>
            <ul className="list-disc ml-6">
              <li>Name and email address (from your Google account)</li>
              <li>YouTube channel ID, title, and basic metadata</li>
              <li>
                Authentication data used to connect your Google / YouTube account via OAuth. This may include session
                information stored securely in your browser (e.g., cookies). We do not store your Google account
                password.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground">User Content</h4>
            <ul className="list-disc ml-6">
              <li>Video metadata (titles, descriptions, tags)</li>
              <li>Drafts and edits you create</li>
              <li>AI prompts and generated suggestions</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground">Technical Data</h4>
            <ul className="list-disc ml-6">
              <li>Basic usage logs</li>
              <li>Device and browser information</li>
              <li>Essential cookies used for authentication and session management</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How we use data */}
      <section className="glass rounded-xl p-8 border border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <Server className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold">How We Use Your Data</h2>
        </div>

        <ul className="list-disc ml-6 text-muted-foreground space-y-1">
          <li>Provide AI-assisted suggestions for your YouTube content</li>
          <li>Allow you to review and edit metadata before publishing</li>
          <li>Submit changes to YouTube on your behalf when you explicitly request it</li>
          <li>Maintain authentication and account connection</li>
          <li>Improve performance and reliability of the service</li>
        </ul>

        <p className="text-muted-foreground mt-4">
          We process your data to provide the service you request and to improve the functionality and reliability of
          the platform.
        </p>
      </section>

      {/* Google compliance */}
      <section className="glass rounded-xl p-8 border border-border/50">
        <h2 className="text-xl font-bold mb-4">Google / YouTube Data Usage</h2>

        <p className="text-muted-foreground mb-4">
          Tubester uses YouTube API Services and Google OAuth to access your YouTube data.
        </p>

        <div className="space-y-2 text-muted-foreground">
          <p>
            Tubester’s use of information received from Google APIs adheres to the Google API Services User Data Policy,
            including the Limited Use requirements.
          </p>

          <ul className="list-disc ml-6">
            <li>We do not use Google user data for advertising</li>
            <li>We do not sell Google user data</li>
            <li>We only use Google data to provide features you explicitly use</li>
            <li>We do not share Google user data except as necessary to operate the service</li>
          </ul>
        </div>
      </section>

      {/* Sharing */}
      <section className="glass rounded-xl p-8 border border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold">Data Sharing</h2>
        </div>

        <p className="text-muted-foreground mb-4">We do not sell your personal data.</p>

        <p className="text-muted-foreground">
          We may share data with service providers necessary to operate the platform, such as hosting providers,
          infrastructure services, and AI processing services. These providers process data only on our behalf.
        </p>
      </section>

      {/* Security */}
      <section className="glass rounded-xl p-8 border border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold">Data Security</h2>
        </div>

        <ul className="list-disc ml-6 text-muted-foreground">
          <li>Secure communication via HTTPS</li>
          <li>Access controls and restricted system access</li>
          <li>Monitoring for reliability and abuse prevention</li>
        </ul>

        <p className="text-sm text-muted-foreground mt-4">
          While we take reasonable measures, no system is completely secure.
        </p>
      </section>

      {/* Retention */}
      <section className="glass rounded-xl p-8 border border-border/50">
        <h2 className="text-xl font-bold mb-4">Data Retention</h2>
        <p className="text-muted-foreground">
          We retain your data while your account is active and as necessary to provide the service. Data may be deleted
          upon request or when you disconnect your account.
        </p>
      </section>

      {/* International */}
      <section className="glass rounded-xl p-8 border border-border/50">
        <h2 className="text-xl font-bold mb-4">International Data Processing</h2>
        <p className="text-muted-foreground">
          Your data may be processed in countries outside your country of residence. By using the service, you
          acknowledge such processing.
        </p>
      </section>

      {/* Rights */}
      <section className="glass rounded-xl p-8 border border-border/50">
        <h2 className="text-xl font-bold mb-4">Your Rights</h2>

        <ul className="list-disc ml-6 text-muted-foreground">
          <li>Request access to your data</li>
          <li>Request correction or deletion</li>
          <li>Disconnect your Google / YouTube account</li>
        </ul>

        <p className="text-muted-foreground mt-4">To exercise these rights, contact us using the details below.</p>
      </section>

      {/* Age restriction */}
      <section className="glass rounded-xl p-8 border border-border/50">
        <h2 className="text-xl font-bold mb-4">Children</h2>
        <p className="text-muted-foreground">This service is not intended for users under the age of 13.</p>
      </section>

      {/* Contact */}
      <section className="glass rounded-xl p-8 border border-border/50 text-center">
        <h2 className="text-xl font-bold mb-4">Contact</h2>
        <p className="text-muted-foreground mb-2">For any privacy-related questions or requests:</p>
        <p className="font-medium text-foreground">info@tubester.app</p>
      </section>

      {/* Footer note */}
      <div className="text-sm text-muted-foreground text-center">
        Tubester aims to comply with applicable data protection laws.
      </div>
    </div>
  );
}
