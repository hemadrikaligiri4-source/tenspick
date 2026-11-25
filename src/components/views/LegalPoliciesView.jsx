import React, { useState } from 'react';
import {
  FileCheck2,
  Shield,
  Lock,
  Layers,
  HelpCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const LegalPoliciesView = () => {
  const { policies } = usePortal();
  const [selectedPolicyKey, setSelectedPolicyKey] = useState('revisions');

  const policyMenu = [
    { key: 'revisions', label: 'Revision Policy (Free vs Extra)' },
    { key: 'ownership', label: 'Ownership of Work (IP Rights)' },
    { key: 'handover', label: 'Delivery & Handover Policy' },
    { key: 'support', label: 'Support, Warranty & AMC Retainers' },
    { key: 'terms', label: 'Master Terms and Conditions' },
    { key: 'privacy', label: 'Privacy & Data Encryption' },
    { key: 'confidentiality', label: 'Confidentiality & Non-Disclosure' },
    { key: 'refund', label: 'Refund & Milestone Cancellation' },
  ];

  const currentPolicy = policies[selectedPolicyKey] || policies['revisions'];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-purple-500/20 border border-purple-500/30 px-3 py-0.5 text-xs font-bold text-purple-300">
            Section 11: Legal & Policy Content
          </span>
          <span className="text-xs text-slate-400">Clear, Human-Readable Agreements</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
          Policy Center & Dispute Protection
        </h1>
        <p className="text-xs text-slate-300">
          Transparent, fair terms governing revisions, intellectual property handover, warranty periods, and data security.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Policy Selector Sidebar */}
        <div className="lg:col-span-1 space-y-1 bg-slate-900/60 border border-white/10 rounded-3xl p-3 shadow-xl">
          <span className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Select Policy
          </span>
          {policyMenu.map((item) => (
            <button
              key={item.key}
              onClick={() => setSelectedPolicyKey(item.key)}
              className={`w-full text-left rounded-xl px-3 py-2.5 text-xs font-semibold transition ${
                selectedPolicyKey === item.key
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Policy Document Content */}
        <div className="lg:col-span-3 rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-6">
          <div className="border-b border-white/10 pb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white tracking-tight">
                {currentPolicy.title}
              </h2>
              <span className="text-xs font-mono text-purple-300">
                Last updated: {currentPolicy.lastUpdated}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {currentPolicy.summary}
            </p>
          </div>

          <div className="space-y-6">
            {currentPolicy.sections?.map((sec, idx) => (
              <div key={idx} className="space-y-1.5">
                <h3 className="text-sm font-bold text-white tracking-tight">
                  {sec.heading}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed pl-2 border-l-2 border-purple-500/40">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>Questions regarding this policy?</span>
            <a
              href="mailto:contact@tenspick.com"
              className="font-semibold text-purple-400 hover:text-purple-300 underline"
            >
              contact@tenspick.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

