import React from 'react';
import { Sparkles, MessageCircle, AlertCircle, Heart } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const Footer = () => {
  const { setActiveActionModal, setActiveTab } = usePortal();

  return (
    <footer className="w-full border-t border-white/10 bg-[#090b12] py-6 px-4 sm:px-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Purpose */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600/30 text-purple-300 border border-purple-500/30">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div>
            <p className="font-semibold text-slate-200">
              Tenspick Client Portal <span className="text-slate-500 font-normal">| From Spark to Scale</span>
            </p>
            <p className="text-[11px] text-slate-400">
              All-in-one private space for deliverables, approvals, feedback, and support.
            </p>
          </div>
        </div>

        {/* Quick Links & Contact */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
          <a
            href="mailto:contact@tenspick.com"
            className="text-slate-400 hover:text-purple-300 transition"
          >
            contact@tenspick.com
          </a>
          <span className="text-slate-600">•</span>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline flex items-center gap-1"
          >
            <MessageCircle className="h-3 w-3" />
            <span>WhatsApp Support</span>
          </a>
          <span className="text-slate-600">•</span>
          <button
            onClick={() => setActiveTab('legal')}
            className="text-slate-400 hover:text-white transition"
          >
            Revision Policy & IP Rights
          </button>
          <span className="text-slate-600">•</span>
          {/* Section 8.4: Feedback on the portal itself */}
          <button
            onClick={() => setActiveActionModal('portal_feedback')}
            className="flex items-center gap-1 text-purple-400 hover:text-purple-300 font-medium underline underline-offset-2 transition"
          >
            <AlertCircle className="h-3 w-3" />
            <span>Report a problem / Suggest an improvement</span>
          </button>
        </div>

        {/* Copyright */}
        <div className="text-[11px] text-slate-400 flex items-center gap-1">
          <span>© {new Date().getFullYear()} Tenspick. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

