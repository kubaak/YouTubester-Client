import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
    priority: 'medium',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: '',
        priority: 'medium',
      });
    }, 3000);
  };

  const supportChannels = [
    {
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: '24/7 for Premium users',
      action: 'Start Chat',
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: 'Email Support',
      description: 'Send us a detailed message about your issue',
      availability: 'Response within 24 hours',
      action: 'Send Email',
    },
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: 'Phone Support',
      description: 'Speak directly with our technical experts',
      availability: 'Mon-Fri, 9AM-6PM EST',
      action: 'Schedule Call',
    },
  ];

  const categories = [
    { value: 'general', label: 'General Question' },
    { value: 'technical', label: 'Technical Issue' },
    { value: 'billing', label: 'Billing & Account' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'feedback', label: 'Feedback' },
  ];

  const priorities = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' },
  ];

  if (isSubmitted) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-3xl">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Message Sent Successfully!</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Thank you for contacting us. We've received your message and will get back to you soon.
            </p>
          </div>
        </div>

        <div className="glass rounded-xl p-8 border border-border/50 text-center">
          <h2 className="text-xl font-bold text-foreground mb-4">What happens next?</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">1</div>
              <h3 className="font-semibold">We Review</h3>
              <p className="text-sm text-muted-foreground">
                Our team reviews your message and determines the best way to help
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">2</div>
              <h3 className="font-semibold">We Respond</h3>
              <p className="text-sm text-muted-foreground">
                You'll receive a response within 24 hours (faster for Premium users)
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">3</div>
              <h3 className="font-semibold">We Resolve</h3>
              <p className="text-sm text-muted-foreground">We work with you until your issue is completely resolved</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl shadow-moderate">
          <Mail className="w-8 h-8 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Get in Touch</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a question, need help, or want to share feedback? We're here to help you succeed with YouTubester.
          </p>
        </div>
      </div>

      {/* Before You Contact Us */}
      <div className="glass rounded-xl p-6 border border-border/50">
        <h3 className="font-semibold text-foreground mb-4">Before You Contact Us</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            • Check our <span className="text-primary font-medium">FAQ section</span> for quick answers
          </li>
          <li>
            • Browse our <span className="text-primary font-medium">Help Center</span> for detailed guides
          </li>
          <li>
            • Try our <span className="text-primary font-medium">troubleshooting tools</span> in Settings
          </li>
          <li>• Make sure you're using the latest version of YouTubester</li>
        </ul>
      </div>

      {/* Support Channels */}
      <div className="grid md:grid-cols-3 gap-6">
        {supportChannels.map((channel, index) => (
          <div
            key={index}
            className="glass rounded-xl p-6 border border-border/50 hover:shadow-moderate transition-all duration-300 hover-lift"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">{channel.icon}</div>
                <h3 className="font-semibold text-foreground">{channel.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm">{channel.description}</p>
              <div className="flex items-center space-x-2 text-xs text-primary">
                <Clock className="w-4 h-4" />
                <span>{channel.availability}</span>
              </div>
              <button className="w-full px-4 py-2 bg-gradient-primary text-primary-foreground rounded-lg font-medium text-sm shadow-moderate hover:shadow-strong transition-all duration-300 hover-lift">
                {channel.action}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <div className="glass rounded-xl p-8 border border-border/50">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">Send us a Message</h2>
          <p className="text-muted-foreground">
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium text-foreground">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="priority" className="text-sm font-medium text-foreground">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              >
                {priorities.map((priority) => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium text-foreground">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder="Brief description of your message"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-vertical"
              placeholder="Please provide detailed information about your question or issue..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <p className="text-xs text-muted-foreground">* Required fields. We typically respond within 24 hours.</p>
            <button
              type="submit"
              className="flex items-center space-x-2 px-8 py-3 bg-gradient-primary text-primary-foreground rounded-xl font-medium shadow-moderate hover:shadow-strong transition-all duration-300 hover-lift"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </div>
        </form>
      </div>

      {/* Additional Info */}
      <div className="glass rounded-xl p-6 border border-border/50">
        <h3 className="font-semibold text-foreground mb-4">Response Times</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">General Questions:</span>
            <span className="font-medium text-foreground">24-48 hours</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Technical Issues:</span>
            <span className="font-medium text-foreground">12-24 hours</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Billing Questions:</span>
            <span className="font-medium text-foreground">4-12 hours</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Premium Users:</span>
            <span className="font-medium text-primary">Priority support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
