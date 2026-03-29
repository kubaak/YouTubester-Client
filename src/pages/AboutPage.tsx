import { Shield, Sparkles, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const principles = [
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: 'AI that assists, not replaces',
      description:
        'Tubester is designed to help creators move faster, not take control away from them. AI suggestions are there to support your workflow, while you stay in charge of what gets published.',
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      title: 'Built for practical creator workflows',
      description:
        'Tubester focuses on real tasks creators deal with every day: replying to comments, reusing successful metadata, and improving video titles, descriptions, and tags without unnecessary complexity.',
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: 'Privacy and control matter',
      description:
        'Tubester uses Google authentication so you can securely connect your account and choose the channel you want to work with. You remain in control of your access and your publishing decisions.',
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: 'Made for growing channels',
      description:
        'Whether you are publishing regularly, managing a backlog of videos, or handling a growing stream of comments, Tubester aims to reduce repetitive work so you can focus more on creating.',
    },
  ];

  return (
    <div className="space-y-12">
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">About Tubester</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Tubester was created to help YouTube creators save time on repetitive channel management tasks and stay in
            control while using AI.
          </p>
        </div>
      </section>

      <section className="glass rounded-2xl p-8 border border-border/50">
        <h2 className="text-2xl font-bold text-foreground mb-6">Why Tubester exists</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Running a YouTube channel involves much more than publishing videos. Creators spend time replying to
            comments, rewriting metadata, reusing formats that already work, and trying to keep everything consistent
            across their content.
          </p>
          <p>
            Tubester exists to make that work easier. It combines AI assistance with practical tools that help you move
            faster on the operational side of your channel, without taking away your control over the final result.
          </p>
          <p>
            The goal is simple: reduce repetitive work, support better consistency, and give creators more time to focus
            on making videos.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">What Tubester stands for</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {principles.map((item, index) => (
            <div
              key={index}
              className="glass rounded-xl p-6 border border-border/50 hover:shadow-moderate transition-all duration-300 hover-lift"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-xl border border-primary/20">{item.icon}</div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass rounded-2xl p-8 border border-border/50">
        <h2 className="text-2xl font-bold text-foreground mb-6">Who Tubester is for</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Tubester is built for YouTube creators who want a faster, more structured way to manage parts of their
            workflow. It is especially useful for creators who publish regularly, reuse content patterns, and want help
            handling channel activity more efficiently.
          </p>
          <p>
            If you want AI to help with the repetitive parts of channel management while you stay in charge of review
            and publishing, Tubester is built for you.
          </p>
        </div>
      </section>

      <section className="text-center space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Want to learn more?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore the FAQ or get in touch if you have questions about how Tubester works.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/faq"
            className="px-8 py-3 glass border border-border/50 text-foreground rounded-xl font-medium hover:shadow-soft transition-all duration-300 hover-lift"
          >
            View FAQ
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3 bg-gradient-primary text-primary-foreground rounded-xl font-medium shadow-moderate hover:shadow-strong transition-all duration-300 hover-lift"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
