import { useState } from 'react';
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
      question: 'What is Tubester and how does it work?',
      answer:
        'Tubester is an AI-powered platform built to help YouTube creators save time and manage their channels more efficiently. It can generate contextual replies to comments, create optimized titles, descriptions, and tags, and copy metadata from your existing videos. Just connect your YouTube account, choose your preferences, and use Tubester to simplify content management and audience engagement.',
      category: 'general',
    },
    {
      question: 'Is Tubester free to use?',
      answer:
        'Tubester offers a free tier with access to basic features, including limited AI-generated replies and video templates. Paid plans unlock higher usage limits. You can start with the free plan and upgrade later as your needs grow.',
      category: 'pricing',
    },
    {
      question: 'How do I connect my YouTube channel?',
      answer:
        'To connect your YouTube channel, simply sign in with your Google account and select the YouTube channel you want Tubester to work with.',
      category: 'setup',
    },
    {
      question: 'Can I customize the AI-generated replies?',
      answer: 'Yes. You can review and refine AI-generated replies before posting.',
      category: 'features',
    },
    {
      question: 'Is my YouTube account data secure?',
      answer:
        "We take security seriously. Data is protected during transmission and storage, and Tubester uses Google's OAuth flow for authentication. Your password is never shared with Tubester, and you can revoke access from your Google account at any time. For more information, please review our privacy policy.",
      category: 'security',
    },
    {
      question: 'Can I use Tubester for multiple channels?',
      answer:
        'Support for multiple channels depends on your plan. If available on your plan, you can manage more than one YouTube channel from a single account while keeping each channel’s settings separate.',
      category: 'features',
    },
    {
      question: 'What happens if I exceed my monthly limits?',
      answer:
        "If you reach your plan's monthly limits, you'll see it in the app and can upgrade if needed. Limits reset at the start of the next billing cycle.",
      category: 'pricing',
    },
    {
      question: 'How accurate are the AI-generated replies?',
      answer:
        'AI-generated replies are designed to be relevant and helpful, but they may still need review before posting. We recommend checking outputs to make sure they match your intent, tone, and channel standards.',
      category: 'features',
    },
    {
      question: 'How can I get support?',
      answer: 'If you need help, please email us at info@tubester.app',
      category: 'support',
    },
    {
      question: 'Does Tubester work with YouTube Shorts?',
      answer:
        'Yes. Tubester can also be used with YouTube Shorts where the relevant YouTube metadata or workflow is supported.',
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
            Find answers to common questions about Tubester. If you can't find what you're looking for, don't hesitate
            to contact our support team.
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
        <p className="text-muted-foreground mb-6">Our support team is here to help you get the most out of Tubester.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:info@tubester.app?subject=Tubester%20Support"
            className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-xl font-medium shadow-moderate hover:shadow-strong transition-all duration-300 hover-lift"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
