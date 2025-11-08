import { Shield, Eye, Lock, Server, Users, FileText } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const lastUpdated = 'January 1, 2026';

  const sections = [
    {
      icon: <Eye className="w-6 h-6 text-primary" />,
      title: 'Information We Collect',
      content: (
        <div className="space-y-4">
          <p>
            We collect information you provide directly to us, such as when you create an account, use our services, or
            contact us for support.
          </p>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Personal Information:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li>Name and email address</li>
              <li>YouTube channel information and credentials (via OAuth)</li>
              <li>Billing information for premium subscriptions</li>
              <li>Communication preferences</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Usage Information:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li>How you use our services and features</li>
              <li>Video templates and reply configurations you create</li>
              <li>Analytics and performance metrics</li>
              <li>Device information and browser type</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      icon: <Server className="w-6 h-6 text-primary" />,
      title: 'How We Use Your Information',
      content: (
        <div className="space-y-4">
          <p>We use the information we collect to provide, maintain, and improve our services.</p>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Service Provision:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li>Generate AI-powered replies for your YouTube comments</li>
              <li>Create and manage video templates</li>
              <li>Provide analytics and insights about your channel</li>
              <li>Process billing and subscription management</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Communication:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li>Send you service updates and important notices</li>
              <li>Respond to your support requests and feedback</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Improvement and Analytics:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li>Analyze usage patterns to improve our services</li>
              <li>Train and improve our AI algorithms</li>
              <li>Monitor service performance and reliability</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: 'Information Sharing',
      content: (
        <div className="space-y-4">
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share your information in
            limited circumstances:
          </p>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Service Providers:</h4>
            <p className="text-muted-foreground">
              We work with trusted third-party service providers who assist us in operating our platform, such as cloud
              hosting, payment processing, and analytics services. These providers are bound by strict confidentiality
              agreements.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Legal Requirements:</h4>
            <p className="text-muted-foreground">
              We may disclose your information when required by law, such as to comply with a subpoena, court order, or
              other legal process, or to protect the rights, property, and safety of YouTubester, our users, and the
              public.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Business Transfers:</h4>
            <p className="text-muted-foreground">
              In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of
              the transaction, but only with continued protection under this privacy policy.
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <Lock className="w-6 h-6 text-primary" />,
      title: 'Data Security',
      content: (
        <div className="space-y-4">
          <p>We implement industry-standard security measures to protect your personal information:</p>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Encryption:</h4>
              <p className="text-muted-foreground text-sm">
                All data transmission uses TLS encryption, and sensitive data is encrypted at rest using AES-256.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Access Control:</h4>
              <p className="text-muted-foreground text-sm">
                Strict access controls limit who can view your data, with regular access reviews and monitoring.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Infrastructure:</h4>
              <p className="text-muted-foreground text-sm">
                We use secure cloud infrastructure with regular security audits and compliance certifications.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Monitoring:</h4>
              <p className="text-muted-foreground text-sm">
                24/7 security monitoring and incident response to detect and prevent unauthorized access.
              </p>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
            <p className="text-sm text-foreground">
              <strong>Important:</strong> While we implement robust security measures, no system is 100% secure. We
              cannot guarantee absolute security, but we continuously work to protect your information using industry
              best practices.
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <FileText className="w-6 h-6 text-primary" />,
      title: 'Your Rights and Choices',
      content: (
        <div className="space-y-4">
          <p>You have several rights regarding your personal information:</p>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-primary text-xs font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Access and Portability</h4>
                <p className="text-muted-foreground text-sm">
                  Request a copy of your personal data in a structured, commonly used format.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-primary text-xs font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Correction and Update</h4>
                <p className="text-muted-foreground text-sm">
                  Update or correct inaccurate personal information through your account settings.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-primary text-xs font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Deletion</h4>
                <p className="text-muted-foreground text-sm">
                  Request deletion of your personal data, subject to certain legal and operational requirements.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-primary text-xs font-bold">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Marketing Communications</h4>
                <p className="text-muted-foreground text-sm">
                  Opt out of marketing emails at any time using the unsubscribe link or account settings.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-primary text-xs font-bold">5</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Data Processing Restrictions</h4>
                <p className="text-muted-foreground text-sm">
                  Request limitations on how we process your personal information in certain circumstances.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

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
            Your privacy is important to us. This policy explains how we collect, use, and protect your information when
            you use YouTubester.
          </p>
          <p className="text-sm text-muted-foreground mt-2">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Overview */}
      <div className="glass rounded-xl p-8 border border-border/50">
        <h2 className="text-xl font-bold text-foreground mb-4">Overview</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            At YouTubester, we are committed to protecting your privacy and ensuring transparency about how we handle
            your personal information. This Privacy Policy describes our practices concerning the collection, use, and
            disclosure of information when you use our service.
          </p>
          <p>
            By using YouTubester, you agree to the collection and use of information in accordance with this policy. We
            will not use or share your information except as described in this Privacy Policy.
          </p>
        </div>
      </div>

      {/* Main Sections */}
      {sections.map((section, index) => (
        <div key={index} className="glass rounded-xl p-8 border border-border/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">{section.icon}</div>
            <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
          </div>
          <div className="text-muted-foreground leading-relaxed">{section.content}</div>
        </div>
      ))}

      {/* Additional Important Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-6 border border-border/50">
          <h3 className="font-semibold text-foreground mb-4">Data Retention</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              We retain your personal information for as long as necessary to provide our services and fulfill the
              purposes outlined in this policy.
            </p>
            <p>
              Account data is retained until you delete your account or request deletion. Usage analytics may be
              retained longer in anonymized form for service improvement.
            </p>
          </div>
        </div>

        <div className="glass rounded-xl p-6 border border-border/50">
          <h3 className="font-semibold text-foreground mb-4">International Transfers</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              Our servers are located in secure data centers. If you access our service from outside these regions, your
              information may be transferred internationally.
            </p>
            <p>
              We ensure adequate protection for international transfers through appropriate safeguards and security
              measures.
            </p>
          </div>
        </div>

        <div className="glass rounded-xl p-6 border border-border/50">
          <h3 className="font-semibold text-foreground mb-4">Children's Privacy</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              YouTubester is not intended for users under 13 years old. We do not knowingly collect personal information
              from children under 13.
            </p>
            <p>
              If you believe we have collected information from a child under 13, please contact us immediately so we
              can delete such information.
            </p>
          </div>
        </div>

        <div className="glass rounded-xl p-6 border border-border/50">
          <h3 className="font-semibold text-foreground mb-4">Policy Updates</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting
              the new policy on this page.
            </p>
            <p>Continued use of our service after changes constitutes acceptance of the updated policy.</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="glass rounded-xl p-8 border border-border/50 text-center">
        <h2 className="text-xl font-bold text-foreground mb-4">Questions About This Policy?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          If you have any questions about this Privacy Policy or how we handle your personal information, we're here to
          help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-gradient-primary text-primary-foreground rounded-xl font-medium shadow-moderate hover:shadow-strong transition-all duration-300 hover-lift">
            Contact Privacy Team
          </button>
          <button className="px-8 py-3 glass border border-border/50 text-foreground rounded-xl font-medium hover:shadow-soft transition-all duration-300 hover-lift">
            Download PDF Version
          </button>
        </div>
      </div>

      {/* Compliance Notice */}
      <div className="bg-accent/30 border border-border rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <h4 className="font-semibold text-foreground mb-2">Compliance & Certifications</h4>
            <p className="text-muted-foreground">
              YouTubester is committed to compliance with applicable privacy laws including GDPR, CCPA, and other
              regional privacy regulations. We regularly review and update our practices to maintain the highest
              standards of data protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
