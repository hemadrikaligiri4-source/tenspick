import React, { useState } from 'react';
import {
  Sparkles,
  Lock,
  Mail,
  ArrowRight,
  Phone,
  MessageCircle,
  ShieldCheck,
  X,
  ExternalLink,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const AuthModal = () => {
  const { authModalOpen, setAuthModalOpen, addToast, setOnboardingOpen } = usePortal();
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'otp' | 'forgot'
  const [email, setEmail] = useState('sarah.jenkins@acmecorp.io');
  const [password, setPassword] = useState('••••••••••••');
  const [otpCode, setOtpCode] = useState('');

  if (!authModalOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthModalOpen(false);
    addToast('Authenticated', 'Welcome to your Tenspick Client Space.', 'success');
  };

  const handleOtpLogin = (e) => {
    e.preventDefault();
    setAuthModalOpen(false);
    addToast('OTP Verified', 'Welcome to your Tenspick Client Space.', 'success');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    addToast('Password Reset Dispatched', 'Check your inbox for a secure one-click login link.', 'info');
    setAuthMode('login');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl border border-white/15 bg-[#0f121e] p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />

        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Logo & Tagline (Section 4) */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#6C4CC4] via-[#8B5CF6] to-[#c084fc] shadow-xl shadow-purple-500/25 ring-1 ring-white/20 mb-3">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">Tenspick</h2>
          <p className="text-xs text-purple-300 font-semibold tracking-wide">
            From Spark to Scale
          </p>
          <p className="text-xs text-slate-300 mt-1">
            "Welcome to your Tenspick Client Space"
          </p>
        </div>

        {/* Mode 1: Standard Password Login */}
        {authMode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Work Email</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2.5 text-white pl-8 focus:border-purple-500 focus:outline-none"
                />
                <Mail className="h-3.5 w-3.5 text-slate-500 absolute left-2.5 top-3" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-slate-300 font-semibold">Password</label>
                <button
                  type="button"
                  onClick={() => setAuthMode('forgot')}
                  className="text-[11px] text-purple-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2.5 text-white pl-8 focus:border-purple-500 focus:outline-none font-mono"
                />
                <Lock className="h-3.5 w-3.5 text-slate-500 absolute left-2.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6C4CC4] to-[#825de0] py-2.5 font-bold text-white shadow-lg shadow-purple-600/30 hover:brightness-110 transition"
            >
              <span>Sign In to Client Space</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Quick Demo Login Option */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setAuthMode('otp')}
                className="w-full rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 py-2 text-slate-300 font-medium transition"
              >
                Sign in with One-Time OTP
              </button>
            </div>
          </form>
        )}

        {/* Mode 2: OTP Login */}
        {authMode === 'otp' && (
          <form onSubmit={handleOtpLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Enter 6-digit verification code sent to {email}:
              </label>
              <input
                type="text"
                autoFocus
                placeholder="492-810"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full text-center text-lg font-mono tracking-widest rounded-xl bg-slate-950 border border-white/10 px-3 py-2.5 text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-purple-600 py-2.5 font-bold text-white hover:bg-purple-500 transition"
            >
              Verify & Enter Portal
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className="w-full text-center text-slate-400 hover:text-white"
            >
              Back to email login
            </button>
          </form>
        )}

        {/* Mode 3: Forgot Password */}
        {authMode === 'forgot' && (
          <form onSubmit={handleForgotPassword} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Enter your registered email address:
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-purple-600 py-2.5 font-bold text-white hover:bg-purple-500 transition"
            >
              Send Reset Link
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className="w-full text-center text-slate-400 hover:text-white"
            >
              Back to Sign In
            </button>
          </form>
        )}

        {/* Section 4 Footer: Contact Line and WhatsApp for login problems */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center text-[11px] text-slate-400 space-y-1.5">
          <p>Experiencing login problems?</p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="mailto:contact@tenspick.com"
              className="text-purple-400 hover:text-purple-300 underline"
            >
              contact@tenspick.com
            </a>
            <span className="text-slate-600">•</span>
            <a
              href="https://wa.me/919876543210?text=Hi%20Tenspick%2C%20I%20need%20help%20logging%20into%20my%20client%20space."
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline flex items-center gap-1"
            >
              <MessageCircle className="h-3 w-3" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

