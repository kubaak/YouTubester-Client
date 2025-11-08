import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Video,
  MessageCircle,
  Settings,
  Zap,
  ChevronRight,
  ExternalLink,
  PlayCircle,
} from 'lucide-react';

export default function HelpPage() {
  const [selectedCategory, setSelectedCategory] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'getting-started', label: 'Getting Started', icon: <Zap className="w-5 h-5" /> },
    { id: 'video-templates', label: 'Video Templates', icon: <Video className="w-5 h-5" /> },
    { id: 'reply-management', label: 'Reply Management', icon: <MessageCircle className="w-5 h-5" /> },
    { id: 'account-settings', label: 'Account & Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const helpContent = {
    'getting-started': [
      {
        title: 'Welcome to YouTubester',
        content: 'Learn the basics of using YouTubester to enhance your YouTube channel management.',
        type: 'guide',
        sections: [
          {
            title: 'What is YouTubester?',
            content:
              'YouTubester is an AI-powered platform designed to help YouTube creators manage their channels more efficiently. It provides tools for automated comment replies, video template management, and channel analytics.',
          },
          {
            title: 'Setting up your account',
            content:
              '1. Sign up for a YouTubester account\n2. Connect your YouTube channel using OAuth\n3. Complete your profile setup\n4. Choose your subscription plan',
          },
          {
            title: 'Connecting your YouTube channel',
            content:
              "To connect your YouTube channel:\n• Go to Settings > Account\n• Click 'Connect YouTube Channel'\n• Sign in with your Google account\n• Grant necessary permissions\n• Your channel will be connected automatically",
          },
        ],
      },
      {
        title: 'Quick Start Tutorial',
        content: 'Get up and running with YouTubester in just 5 minutes.',
        type: 'video',
        duration: '5 min',
        sections: [
          {
            title: 'Dashboard Overview',
            content:
              'The dashboard provides an overview of your channel performance, recent activity, and quick access to key features.',
          },
          {
            title: 'First Steps',
            content:
              '1. Complete your profile\n2. Set up your brand voice\n3. Create your first video template\n4. Configure reply automation\n5. Review and test your settings',
          },
        ],
      },
    ],
    'video-templates': [
      {
        title: 'Creating Video Templates',
        content: 'Learn how to create and manage video templates for consistent content creation.',
        type: 'guide',
        sections: [
          {
            title: 'What are video templates?',
            content:
              'Video templates are predefined formats that help you maintain consistency across your content. They include elements like intro/outro scripts, description formats, and tag suggestions.',
          },
          {
            title: 'Creating a new template',
            content:
              "1. Navigate to Video Templates\n2. Click 'New Template'\n3. Choose a template type (Tutorial, Review, Vlog, etc.)\n4. Customize the template elements\n5. Save and activate your template",
          },
          {
            title: 'Template elements',
            content:
              '• Title format and suggestions\n• Description structure\n• Tag recommendations\n• Thumbnail guidelines\n• Intro/outro scripts\n• Call-to-action prompts',
          },
        ],
      },
      {
        title: 'Advanced Template Features',
        content: 'Discover advanced features for power users.',
        type: 'guide',
        sections: [
          {
            title: 'Dynamic placeholders',
            content:
              'Use placeholders like {{video_topic}}, {{date}}, and {{channel_name}} to automatically populate template fields with relevant information.',
          },
          {
            title: 'Template sharing',
            content: 'Share your templates with team members or export them for use across multiple channels.',
          },
        ],
      },
    ],
    'reply-management': [
      {
        title: 'AI-Powered Reply System',
        content: 'Master the art of automated comment management with our AI system.',
        type: 'guide',
        sections: [
          {
            title: 'How AI replies work',
            content:
              'Our AI analyzes incoming comments and generates contextual replies based on your brand voice, previous interactions, and comment sentiment.',
          },
          {
            title: 'Setting up automated replies',
            content:
              '1. Go to Replies > Settings\n2. Define your brand voice and tone\n3. Set up reply templates for common scenarios\n4. Configure automation rules\n5. Enable the system and start replying automatically',
          },
          {
            title: 'Training the AI',
            content:
              '• Review and edit AI-generated replies\n• Approve or reject suggestions\n• Provide feedback to improve accuracy\n• Upload sample replies to train the system',
          },
        ],
      },
      {
        title: 'Managing Reply Workflows',
        content: 'Create efficient workflows for comment management.',
        type: 'guide',
        sections: [
          {
            title: 'Approval workflows',
            content:
              "Set up approval processes to review AI-generated replies before they're posted to maintain quality control.",
          },
          {
            title: 'Bulk actions',
            content: 'Process multiple comments at once with bulk approve, reject, or edit operations.',
          },
        ],
      },
    ],
    'account-settings': [
      {
        title: 'Account Management',
        content: 'Manage your YouTubester account settings and preferences.',
        type: 'guide',
        sections: [
          {
            title: 'Profile settings',
            content:
              'Update your personal information, contact details, and communication preferences in the Settings > Profile section.',
          },
          {
            title: 'Notification preferences',
            content:
              'Customize which notifications you receive and how you want to be contacted (email, in-app, etc.).',
          },
          {
            title: 'Privacy settings',
            content: 'Control your data privacy settings, including data sharing preferences and export options.',
          },
        ],
      },
      {
        title: 'Billing and Subscriptions',
        content: 'Manage your subscription and billing information.',
        type: 'guide',
        sections: [
          {
            title: 'Upgrading your plan',
            content: 'Access premium features by upgrading your subscription in Settings > Billing.',
          },
          {
            title: 'Payment methods',
            content: 'Add, remove, or update your payment methods for seamless billing.',
          },
        ],
      },
    ],
  };

  const quickLinks = [
    { title: 'Getting Started Guide', icon: <BookOpen className="w-4 h-4" />, category: 'getting-started' },
    { title: 'Video Tutorial Library', icon: <PlayCircle className="w-4 h-4" />, external: true },
    { title: 'API Documentation', icon: <ExternalLink className="w-4 h-4" />, external: true },
    { title: 'Community Forum', icon: <MessageCircle className="w-4 h-4" />, external: true },
  ];

  const currentContent = helpContent[selectedCategory as keyof typeof helpContent] || [];

  const filteredContent = currentContent.filter(
    (item) =>
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl shadow-moderate">
          <BookOpen className="w-8 h-8 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Help Center</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about using YouTubester effectively. Find guides, tutorials, and answers to
            common questions.
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link, index) => (
          <div
            key={index}
            className="glass rounded-xl p-4 border border-border/50 hover:shadow-moderate transition-all duration-300 hover-lift cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">{link.icon}</div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground text-sm">{link.title}</h3>
                {link.external && <ExternalLink className="w-3 h-3 text-muted-foreground mt-1" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="glass rounded-xl p-6 border border-border/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass rounded-xl p-6 border border-border/50 sticky top-8">
            <h3 className="font-semibold text-foreground mb-4">Categories</h3>
            <nav className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-primary text-primary-foreground shadow-moderate'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {category.icon}
                  <span>{category.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {filteredContent.length === 0 ? (
            <div className="glass rounded-xl p-8 border border-border/50 text-center">
              <p className="text-muted-foreground">
                {searchQuery ? 'No articles found matching your search.' : 'No content available for this category.'}
              </p>
            </div>
          ) : (
            filteredContent.map((article, index) => (
              <div key={index} className="glass rounded-xl p-8 border border-border/50">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg border ${
                        article.type === 'video'
                          ? 'bg-blue-100 border-blue-200 text-blue-600'
                          : 'bg-green-100 border-green-200 text-green-600'
                      }`}
                    >
                      {article.type === 'video' ? <PlayCircle className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">{article.title}</h2>
                      <p className="text-muted-foreground text-sm">
                        {article.content}
                        {article.duration && ` • ${article.duration}`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {article.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h3 className="font-semibold text-foreground mb-3 flex items-center">
                        <ChevronRight className="w-4 h-4 text-primary mr-2" />
                        {section.title}
                      </h3>
                      <div className="pl-6 text-muted-foreground leading-relaxed">
                        {section.content.split('\n').map((line, lineIndex) => (
                          <p key={lineIndex} className={lineIndex > 0 ? 'mt-2' : ''}>
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {article.type === 'video' && (
                  <div className="mt-6 pt-6 border-t border-border/30">
                    <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-primary text-primary-foreground rounded-xl font-medium shadow-moderate hover:shadow-strong transition-all duration-300 hover-lift">
                      <PlayCircle className="w-4 h-4" />
                      <span>Watch Tutorial</span>
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Additional Resources */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass rounded-xl p-6 border border-border/50">
          <h3 className="font-semibold text-foreground mb-4">Video Tutorials</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Watch step-by-step video guides to master YouTubester features.
          </p>
          <button className="flex items-center space-x-2 text-primary hover:text-primary/80 text-sm font-medium">
            <PlayCircle className="w-4 h-4" />
            <span>View All Videos</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <div className="glass rounded-xl p-6 border border-border/50">
          <h3 className="font-semibold text-foreground mb-4">Community Forum</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Connect with other creators and get help from the community.
          </p>
          <button className="flex items-center space-x-2 text-primary hover:text-primary/80 text-sm font-medium">
            <MessageCircle className="w-4 h-4" />
            <span>Join Discussion</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <div className="glass rounded-xl p-6 border border-border/50">
          <h3 className="font-semibold text-foreground mb-4">Developer Resources</h3>
          <p className="text-muted-foreground text-sm mb-4">API documentation and integration guides for developers.</p>
          <button className="flex items-center space-x-2 text-primary hover:text-primary/80 text-sm font-medium">
            <ExternalLink className="w-4 h-4" />
            <span>API Docs</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Still Need Help */}
      <div className="glass rounded-xl p-8 border border-border/50 text-center">
        <h2 className="text-xl font-bold text-foreground mb-4">Still need help?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Can't find what you're looking for? Our support team is here to help you succeed with YouTubester.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-gradient-primary text-primary-foreground rounded-xl font-medium shadow-moderate hover:shadow-strong transition-all duration-300 hover-lift">
            Contact Support
          </button>
          <button className="px-8 py-3 glass border border-border/50 text-foreground rounded-xl font-medium hover:shadow-soft transition-all duration-300 hover-lift">
            Schedule a Demo
          </button>
        </div>
      </div>
    </div>
  );
}
