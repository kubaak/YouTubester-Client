import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';

export default function LoginPage() {
  var { login, isLoading } = useAuth();

  var handleGoogleLogin = (): void => {
    var returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '/';
    login(returnUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass rounded-2xl p-8 shadow-dramatic border border-border/50">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-moderate">
              <span className="text-primary-foreground font-bold text-2xl">Y</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              Welcome to YouTubester
            </h1>
            <p className="text-muted-foreground">
              Sign in to manage your YouTube comments and replies
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <Button 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full h-12 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 shadow-soft hover-lift"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285f4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34a853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#fbbc05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#ea4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {isLoading ? 'Signing in...' : 'Continue with Google'}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Secure Authentication</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full mr-3" />
                <span>Secure OAuth 2.0 authentication</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full mr-3" />
                <span>No passwords stored</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full mr-3" />
                <span>Access to YouTube data only</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border/30">
            <p className="text-center text-xs text-muted-foreground">
              By continuing, you agree to our{' '}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Beta Badge */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span>Beta Version - Early Access</span>
          </div>
        </div>
      </div>
    </div>
  );
}