import { Video, MessageCircle, Zap, Shield, Users, Target } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: <Video className="w-8 h-8 text-primary" />,
      title: 'Smart Video Templates',
      description:
        'Create and manage video templates with AI-powered suggestions to streamline your content creation process.',
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-primary" />,
      title: 'Intelligent Reply Management',
      description:
        'Automatically generate contextual replies to comments using advanced AI algorithms tailored to your brand voice.',
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: 'Automated Workflows',
      description: 'Set up automated responses and workflows to manage your YouTube channel more efficiently.',
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: 'Privacy First',
      description: 'Your data remains secure with enterprise-grade encryption and privacy protection measures.',
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: 'Community Focus',
      description: 'Build stronger connections with your audience through meaningful, personalized interactions.',
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: 'Analytics & Insights',
      description: 'Track engagement metrics and gain insights to optimize your content strategy.',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-3xl shadow-moderate">
          <span className="text-primary-foreground font-bold text-2xl">Y</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text mb-4">About YouTubester</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Empowering YouTube creators with AI-driven tools to enhance engagement, streamline content management, and
            build stronger communities.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="glass rounded-2xl p-8 border border-border/50">
        <h2 className="text-2xl font-bold text-foreground mb-6">Our Mission</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              At YouTubester, we believe that every creator deserves powerful tools to grow their audience and manage
              their channel effectively. Our mission is to democratize access to advanced YouTube management
              capabilities through intuitive AI-powered solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We're committed to helping creators save time, increase engagement, and focus on what they do best -
              creating amazing content.
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-primary/10 rounded-xl p-6 border border-primary/20">
              <h3 className="font-semibold text-foreground mb-2">Vision</h3>
              <p className="text-muted-foreground text-sm">
                To become the leading platform that transforms how YouTube creators interact with their communities.
              </p>
            </div>
            <div className="bg-gradient-primary/10 rounded-xl p-6 border border-primary/20">
              <h3 className="font-semibold text-foreground mb-2">Values</h3>
              <p className="text-muted-foreground text-sm">
                Innovation, Privacy, Community, and Creator Success drive everything we do.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">What Makes YouTubester Special</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass rounded-xl p-6 border border-border/50 hover:shadow-moderate transition-all duration-300 hover-lift"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-xl border border-primary/20">
                  {feature.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="glass rounded-2xl p-8 border border-border/50">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">By the Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold bg-gradient-primary bg-clip-text">10K+</div>
            <p className="text-muted-foreground text-sm">Active Creators</p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold bg-gradient-primary bg-clip-text">1M+</div>
            <p className="text-muted-foreground text-sm">Comments Processed</p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold bg-gradient-primary bg-clip-text">99.9%</div>
            <p className="text-muted-foreground text-sm">Uptime</p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold bg-gradient-primary bg-clip-text">24/7</div>
            <p className="text-muted-foreground text-sm">Support</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="glass rounded-2xl p-8 border border-border/50">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Built by Creators, for Creators</h2>
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Our team consists of experienced YouTube creators, developers, and AI specialists who understand the
            challenges of content creation firsthand. We've been where you are, and we're here to help you succeed.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Every feature in YouTubester is built based on real creator needs and feedback from our vibrant community of
            users.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Ready to Transform Your YouTube Experience?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join thousands of creators who are already using YouTubester to grow their channels and engage with their
          communities more effectively.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-gradient-primary text-primary-foreground rounded-xl font-medium shadow-moderate hover:shadow-strong transition-all duration-300 hover-lift">
            Get Started Free
          </button>
          <button className="px-8 py-3 glass border border-border/50 text-foreground rounded-xl font-medium hover:shadow-soft transition-all duration-300 hover-lift">
            Watch Demo
          </button>
        </div>
      </div>
    </div>
  );
}
