import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export default function FaqPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqData: FaqItem[] = [
    {
      question: 'What is YouTubester and how does it work?',
      answer:
        'YouTubester is an AI-powered platform designed to help YouTube creators manage their channels more efficiently. It uses advanced algorithms to generate contextual replies to comments, create video templates, and automate various channel management tasks. Simply connect your YouTube account, configure your preferences, and let our AI assist you in engaging with your audience.',
      category: 'general',
    },
    {
      question: 'Is YouTubester free to use?',
      answer:
        'YouTubester offers a free tier with basic features including limited AI-generated replies and video templates. Our Premium plans provide unlimited access to all features, advanced AI capabilities, priority support, and detailed analytics. You can start with our free plan and upgrade as your channel grows.',
      category: 'pricing',
    },
    {
      question: 'How do I connect my YouTube channel?',
      answer:
        "To connect your YouTube channel, go to Settings > Account > Connect YouTube Channel. You'll be redirected to Google's secure authentication page where you can grant YouTubester the necessary permissions to manage your channel. We only request the minimum permissions required for our features to work.",
      category: 'setup',
    },
    {
      question: 'Can I customize the AI-generated replies?',
      answer:
        'Absolutely! You can train the AI to match your brand voice by providing examples of your preferred communication style. In the Settings page, you can set up custom reply templates, define your brand tone, and specify topics you want the AI to focus on or avoid. The AI learns from your feedback and improves over time.',
      category: 'features',
    },
    {
      question: 'Is my YouTube account data secure?',
      answer:
        "Yes, security is our top priority. We use enterprise-grade encryption for all data transmission and storage. Your YouTube credentials are never stored on our servers - we use OAuth tokens that can be revoked at any time. We're GDPR compliant and follow strict data protection protocols. You can review our complete privacy policy for more details.",
      category: 'security',
    },
    {
      question: 'How do video templates work?',
      answer:
        'Video templates allow you to create standardized formats for your content. You can set up templates for different video types (tutorials, reviews, vlogs, etc.) with predefined elements like intro/outro scripts, description formats, and tag suggestions. The AI can suggest improvements and help you maintain consistency across your content.',
      category: 'features',
    },
    {
      question: 'Can I use YouTubester for multiple channels?',
      answer:
        'Yes, our Premium plans support multiple YouTube channels. You can manage all your channels from a single dashboard, with separate settings and configurations for each channel. This is perfect for creators who manage multiple channels or agencies working with multiple clients.',
      category: 'features',
    },
    {
      question: 'What happens if I exceed my monthly limits?',
      answer:
        "If you reach your monthly limits on the free plan, you'll receive a notification with options to upgrade or wait until the next billing cycle. Premium users have much higher limits, and if exceeded, we'll notify you before any additional charges. You can always monitor your usage in the dashboard.",
      category: 'pricing',
    },
    {
      question: 'How accurate are the AI-generated replies?',
      answer:
        'Our AI has a high accuracy rate and continuously improves through machine learning. However, we always recommend reviewing AI-generated content before posting. You can set up approval workflows to ensure all replies meet your standards. The AI learns from your edits and becomes more accurate over time.',
      category: 'features',
    },
    {
      question: 'Can I export my data?',
      answer:
        'Yes, you can export all your data including templates, reply history, and analytics at any time. Go to Settings > Data Management > Export Data. This ensures you always have access to your content and can migrate to other platforms if needed.',
      category: 'general',
    },
    {
      question: 'How do I cancel my subscription?',
      answer:
        "You can cancel your subscription at any time from Settings > Billing > Manage Subscription. Your account will remain active until the end of your current billing period, and you'll retain access to all premium features during this time. After cancellation, your account will automatically downgrade to the free tier.",
      category: 'pricing',
    },
    {
      question: 'Do you offer refunds?',
      answer:
        "We offer a 30-day money-back guarantee for all premium plans. If you're not satisfied with YouTubester within the first 30 days, contact our support team for a full refund. Refunds for longer subscriptions are evaluated on a case-by-case basis.",
      category: 'pricing',
    },
    {
      question: 'How can I get support?',
      answer:
        'We offer multiple support channels: live chat (available 24/7 for Premium users), email support, and an extensive knowledge base. Free users have access to email support with responses typically within 24 hours. Premium users receive priority support with faster response times.',
      category: 'support',
    },
    {
      question: 'Does YouTubester work with YouTube Shorts?',
      answer:
        'Yes! YouTubester fully supports YouTube Shorts. You can create specific templates for Shorts, manage comments on Short videos, and use our AI to generate engaging replies that work well for the Shorts format. Our analytics also track Shorts performance separately.',
      category: 'features',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'General' },
    { id: 'features', label: 'Features' },
    { id: 'setup', label: 'Setup & Getting Started' },
    { id: 'pricing', label: 'Pricing & Billing' },
    { id: 'security', label: 'Security & Privacy' },
    { id: 'support', label: 'Support' },
  ];

  const filteredFaqs = faqData.filter((faq) => {
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl shadow-moderate">
          <HelpCircle className="w-8 h-8 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Frequently Asked Questions</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about YouTubester. If you can't find what you're looking for, don't
            hesitate to contact our support team.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="glass rounded-xl p-6 border border-border/50 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-gradient-primary text-primary-foreground shadow-moderate'
                  : 'bg-background border border-border hover:bg-accent text-muted-foreground hover:text-foreground'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="glass rounded-xl p-8 border border-border/50 text-center">
            <p className="text-muted-foreground">No questions found matching your search criteria.</p>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => (
            <div key={index} className="glass rounded-xl border border-border/50 overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent/50 transition-colors duration-200"
              >
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>

              {openItems.includes(index) && (
                <div className="px-6 pb-4 border-t border-border/30 bg-accent/20">
                  <div className="pt-4">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Contact Section */}
      <div className="glass rounded-xl p-8 border border-border/50 text-center">
        <h2 className="text-xl font-bold text-foreground mb-4">Still have questions?</h2>
        <p className="text-muted-foreground mb-6">
          Our support team is here to help you get the most out of YouTubester.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-xl font-medium shadow-moderate hover:shadow-strong transition-all duration-300 hover-lift">
            Contact Support
          </button>
          <button className="px-6 py-3 glass border border-border/50 text-foreground rounded-xl font-medium hover:shadow-soft transition-all duration-300 hover-lift">
            Browse Help Center
          </button>
        </div>
      </div>
    </div>
  );
}
