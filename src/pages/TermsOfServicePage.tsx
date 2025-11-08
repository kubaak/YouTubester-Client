import { FileText, Scale, AlertTriangle, CheckCircle, XCircle, Shield } from 'lucide-react';

export default function TermsOfServicePage() {
  const lastUpdated = 'January 1, 2026';

  const sections = [
    {
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      title: 'Acceptance of Terms',
      content: (
        <div className="space-y-4">
          <p>
            By accessing and using YouTubester, you accept and agree to be bound by the terms and provision of this
            agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm text-green-800">
              <strong>Key Point:</strong> Your use of our service constitutes acceptance of these terms. If you disagree
              with any part of these terms, you must discontinue use of YouTubester.
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <FileText className="w-6 h-6 text-primary" />,
      title: 'Description of Service',
      content: (
        <div className="space-y-4">
          <p>
            YouTubester is a platform that provides AI-powered tools for YouTube creators, including automated comment
            replies, video template management, and channel analytics. Our service is designed to help creators manage
            their channels more efficiently.
          </p>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Service Features Include:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li>AI-generated replies to YouTube comments</li>
              <li>Video template creation and management</li>
              <li>Channel analytics and insights</li>
              <li>Automated workflow tools</li>
              <li>Customer support and documentation</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              <strong>Service Evolution:</strong> We continuously improve our service and may add, modify, or remove
              features. We'll notify users of significant changes that affect their experience.
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <Scale className="w-6 h-6 text-primary" />,
      title: 'User Responsibilities',
      content: (
        <div className="space-y-4">
          <p>As a user of YouTubester, you agree to:</p>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">Account Security</h4>
                <p className="text-muted-foreground text-sm">
                  Maintain the security and confidentiality of your account credentials and notify us immediately of any
                  unauthorized use.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">Lawful Use</h4>
                <p className="text-muted-foreground text-sm">
                  Use our service only for lawful purposes and in accordance with these terms and applicable laws.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">Content Responsibility</h4>
                <p className="text-muted-foreground text-sm">
                  Take full responsibility for all content generated through our platform and ensure it complies with
                  YouTube's terms of service.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">Accurate Information</h4>
                <p className="text-muted-foreground text-sm">
                  Provide accurate, current, and complete information when creating your account and using our services.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: <XCircle className="w-6 h-6 text-red-600" />,
      title: 'Prohibited Uses',
      content: (
        <div className="space-y-4">
          <p>You may not use YouTubester for any of the following prohibited activities:</p>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">Spam or Harassment</h4>
                <p className="text-muted-foreground text-sm">
                  Creating spam content, harassing other users, or generating inappropriate or offensive replies.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">Illegal Activities</h4>
                <p className="text-muted-foreground text-sm">
                  Any illegal activities, including but not limited to copyright infringement, fraud, or violation of
                  privacy rights.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">System Abuse</h4>
                <p className="text-muted-foreground text-sm">
                  Attempting to access, tamper with, or use non-public areas of the service, computer systems, or
                  technical delivery systems.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">Circumvention</h4>
                <p className="text-muted-foreground text-sm">
                  Circumventing, disabling, or otherwise interfering with security-related features or usage limits.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-800">
              <strong>Enforcement:</strong> Violation of these prohibited uses may result in immediate termination of
              your account and legal action if necessary. We reserve the right to determine what constitutes a
              violation.
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: 'Intellectual Property',
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Our Rights:</h4>
            <p className="text-muted-foreground">
              The YouTubester service and its original content, features, and functionality are and will remain the
              exclusive property of YouTubester and its licensors. The service is protected by copyright, trademark, and
              other laws.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Your Content:</h4>
            <p className="text-muted-foreground">
              You retain ownership of content you create using our service. However, you grant us a limited license to
              use, store, and process your content solely for the purpose of providing our services to you.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Feedback:</h4>
            <p className="text-muted-foreground">
              Any feedback, suggestions, or ideas you provide about our service may be used by us without any obligation
              to you, unless otherwise agreed upon in writing.
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
      title: 'Disclaimers and Limitations',
      content: (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-800 font-semibold mb-2">Service "As Is"</p>
            <p className="text-sm text-amber-800">
              The service is provided "as is" and "as available" without any warranties of any kind, either express or
              implied, including but not limited to the implied warranties of merchantability, fitness for a particular
              purpose, or non-infringement.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Limitation of Liability:</h4>
            <p className="text-muted-foreground text-sm">
              In no event shall YouTubester, its directors, employees, partners, agents, suppliers, or affiliates be
              liable for any indirect, incidental, special, consequential, or punitive damages, including without
              limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Service Availability:</h4>
            <p className="text-muted-foreground text-sm">
              We do not guarantee that the service will be available at all times. We may experience hardware, software,
              or other problems or need to perform maintenance related to the service, resulting in interruptions,
              delays, or errors.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Third-Party Services:</h4>
            <p className="text-muted-foreground text-sm">
              Our service integrates with YouTube and other third-party services. We are not responsible for the
              availability, functionality, or terms of service of these third-party platforms.
            </p>
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
          <Scale className="w-8 h-8 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These terms and conditions outline the rules and regulations for the use of YouTubester's services.
          </p>
          <p className="text-sm text-muted-foreground mt-2">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-foreground mb-2">Important Notice</h3>
            <p className="text-muted-foreground text-sm">
              Please read these Terms of Service carefully before using our service. By using YouTubester, you
              acknowledge that you have read, understood, and agreed to be bound by these terms. If you do not agree to
              these terms, you may not use our service.
            </p>
          </div>
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

      {/* Additional Terms */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-6 border border-border/50">
          <h3 className="font-semibold text-foreground mb-4">Account Termination</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              We reserve the right to terminate or suspend your account immediately, without prior notice, for conduct
              that we believe violates these Terms of Service.
            </p>
            <p>
              Upon termination, your right to use the service will cease immediately, but provisions that by their
              nature should survive termination will survive.
            </p>
          </div>
        </div>

        <div className="glass rounded-xl p-6 border border-border/50">
          <h3 className="font-semibold text-foreground mb-4">Governing Law</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of the jurisdiction where
              YouTubester operates.
            </p>
            <p>
              Any disputes arising under these terms will be subject to the exclusive jurisdiction of the courts in that
              jurisdiction.
            </p>
          </div>
        </div>

        <div className="glass rounded-xl p-6 border border-border/50">
          <h3 className="font-semibold text-foreground mb-4">Changes to Terms</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              We reserve the right to modify these terms at any time. We will notify users of material changes via email
              or through the service.
            </p>
            <p>Continued use of the service after changes constitutes acceptance of the new terms.</p>
          </div>
        </div>

        <div className="glass rounded-xl p-6 border border-border/50">
          <h3 className="font-semibold text-foreground mb-4">Severability</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              If any provision of these terms is held to be invalid or unenforceable, the remaining provisions will
              remain in full force and effect.
            </p>
            <p>
              The invalid or unenforceable provision will be replaced with a valid provision that most closely matches
              the intent of the original provision.
            </p>
          </div>
        </div>
      </div>

      {/* Subscription Terms */}
      <div className="glass rounded-xl p-8 border border-border/50">
        <h2 className="text-xl font-bold text-foreground mb-6">Subscription and Billing Terms</h2>
        <div className="space-y-4 text-muted-foreground">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Free Tier:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Limited AI-generated replies per month</li>
                <li>Basic video template features</li>
                <li>Standard customer support</li>
                <li>Subject to usage limits and restrictions</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Premium Subscriptions:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Unlimited access to all features</li>
                <li>Priority customer support</li>
                <li>Advanced analytics and insights</li>
                <li>Multi-channel management</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
            <h4 className="font-semibold text-blue-900 mb-2">Billing and Refunds:</h4>
            <p className="text-sm text-blue-800">
              Premium subscriptions are billed monthly or annually in advance. We offer a 30-day money-back guarantee
              for new subscribers. Cancellations take effect at the end of the current billing period.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="glass rounded-xl p-8 border border-border/50 text-center">
        <h2 className="text-xl font-bold text-foreground mb-4">Questions About These Terms?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          If you have any questions about these Terms of Service, please don't hesitate to contact our legal team.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-gradient-primary text-primary-foreground rounded-xl font-medium shadow-moderate hover:shadow-strong transition-all duration-300 hover-lift">
            Contact Legal Team
          </button>
          <button className="px-8 py-3 glass border border-border/50 text-foreground rounded-xl font-medium hover:shadow-soft transition-all duration-300 hover-lift">
            Download PDF
          </button>
        </div>
      </div>

      {/* Acknowledgment */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-green-900 mb-2">Acknowledgment</h4>
            <p className="text-sm text-green-800">
              By using YouTubester, you acknowledge that you have read these Terms of Service, understood them, and
              agree to be bound by them. These terms constitute the entire agreement between you and YouTubester
              regarding your use of the service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
