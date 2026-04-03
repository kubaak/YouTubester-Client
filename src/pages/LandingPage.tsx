import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Video, MessageCircle, Zap, Shield, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-surface flex items-center justify-center">
        <div className="glass rounded-2xl p-8 shadow-dramatic border border-border/50">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <span className="text-lg font-medium text-foreground">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: <MessageCircle className="w-7 h-7 text-primary" />,
      title: 'AI Comment Replies',
      description:
        'Generate contextual reply suggestions for YouTube comments using AI. Review, edit, and approve before posting.',
    },
    {
      icon: <Video className="w-7 h-7 text-primary" />,
      title: 'Video Metadata Copying',
      description: 'Copy tags, descriptions, playlists, and other metadata from one video to another in seconds.',
    },
    {
      icon: <Sparkles className="w-7 h-7 text-primary" />,
      title: 'AI-Powered Metadata',
      description:
        'Generate or enrich titles, descriptions, and tags for your videos using AI, then push changes directly to YouTube.',
    },
    {
      icon: <Zap className="w-7 h-7 text-primary" />,
      title: 'Batch Operations',
      description: 'Approve, ignore, or edit multiple comment replies at once with a powerful grid-based interface.',
    },
    {
      icon: <Shield className="w-7 h-7 text-primary" />,
      title: 'Secure OAuth Authentication',
      description:
        'Sign in with your Google account. No passwords stored. You can revoke access anytime from your Google account settings.',
    },
    {
      icon: <CheckCircle className="w-7 h-7 text-primary" />,
      title: 'Review Workflow',
      description:
        'Every AI suggestion goes through your approval before anything is posted, so you stay in full control.',
    },
  ];

  const steps = [
    { number: '1', title: 'Connect', description: 'Sign in with your Google / YouTube account.' },
    { number: '2', title: 'Create', description: 'Let AI generate replies and enrich your video metadata.' },
    { number: '3', title: 'Review & Publish', description: 'Approve suggestions and push them to YouTube.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-end px-6 py-4 bg-background/70 backdrop-blur-md border-b border-border/50">
        <Link to="/login">
          <Button
            size="sm"
            className="bg-gradient-primary text-primary-foreground shadow-moderate hover:shadow-strong hover-lift"
          >
            Sign In
          </Button>
        </Link>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-36 pb-16 text-center">
        <img
          src="/tubester_logo.png"
          alt="Tubester logo"
          className="h-20 mx-auto mb-8"
        />
        <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
          Manage Your YouTube Channel{' '}
          <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Smarter with AI
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
          Tubester helps creators generate smart comment replies, reuse video metadata, and enrich content with AI
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/login">
            <Button
              size="lg"
              className="bg-gradient-primary text-primary-foreground shadow-moderate hover:shadow-strong hover-lift px-8 h-12 text-base"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <a href="#features">
            <Button
              size="lg"
              variant="outline"
              className="glass border border-border/50 text-foreground hover:shadow-soft hover-lift px-8 h-12 text-base"
            >
              Learn More
            </Button>
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-foreground text-center mb-4">Everything You Need</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          A complete toolkit for YouTube creators who want to save time and boost engagement.
        </p>
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
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">How It Works</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="w-14 h-14 mx-auto bg-gradient-primary rounded-2xl grid place-items-center shadow-moderate">
                <span className="text-primary-foreground font-bold text-xl">{step.number}</span>
              </div>
              <h3 className="font-semibold text-foreground text-lg">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="glass rounded-2xl p-12 border border-border/50 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Sign in with your Google account and start managing your YouTube channel more efficiently today.
          </p>
          <Link to="/login">
            <Button
              size="lg"
              className="bg-gradient-primary text-primary-foreground shadow-moderate hover:shadow-strong hover-lift px-10 h-12 text-base"
            >
              Sign In with Google
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} Tubester. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
