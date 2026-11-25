import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Paperclip,
  Sparkles,
  Phone,
  Mail,
  CheckCheck,
  Bell,
  Clock,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const MessagesView = () => {
  const {
    messages,
    sendMessage,
    currentProject,
    currentPersona,
  } = usePortal();

  const [inputMessage, setInputMessage] = useState('');
  const [notifyWhatsApp, setNotifyWhatsApp] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);

  const projectMessages = messages.filter(
    (m) => m.projectId === currentProject.id
  );

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    sendMessage({
      projectId: currentProject.id,
      content: inputMessage,
    });
    setInputMessage('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-purple-500/20 border border-purple-500/30 px-3 py-0.5 text-xs font-bold text-purple-300">
              Section 9: Messages & Updates
            </span>
            <span className="text-xs text-slate-400">
              Centralized Project Hub (Zero lost messages on WhatsApp)
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            Project Chat & Weekly Progress Updates
          </h1>
          <p className="text-xs text-slate-300">
            Real-time collaboration channel synchronized with instant email & WhatsApp notifications.
          </p>
        </div>

        {/* Sync Toggles */}
        <div className="flex items-center gap-3 bg-slate-900 border border-white/10 rounded-2xl px-4 py-2 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={notifyEmail}
              onChange={(e) => setNotifyEmail(e.target.checked)}
              className="rounded border-white/20 bg-slate-950 text-purple-600 focus:ring-0"
            />
            <span className="flex items-center gap-1">
              <Mail className="h-3.5 w-3.5 text-purple-400" />
              <span>Email Sync</span>
            </span>
          </label>
          <span className="text-slate-600">|</span>
          <label className="flex items-center gap-2 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={notifyWhatsApp}
              onChange={(e) => setNotifyWhatsApp(e.target.checked)}
              className="rounded border-white/20 bg-slate-950 text-emerald-500 focus:ring-0"
            />
            <span className="flex items-center gap-1">
              <Phone className="h-3.5 w-3.5 text-emerald-400" />
              <span>WhatsApp Alerts</span>
            </span>
          </label>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="flex flex-col h-[650px] rounded-3xl border border-white/10 bg-slate-900/60 shadow-xl backdrop-blur-md overflow-hidden">
        {/* Channel Info Bar */}
        <div className="border-b border-white/10 px-6 py-3.5 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <h3 className="text-xs font-bold text-white">
                #{currentProject.id} — {currentProject.name} Channel
              </h3>
              <p className="text-[11px] text-slate-400">
                Tenspick Squad ({currentProject.pm.name}, {currentProject.teamMembers.map(t => t.name).join(', ')})
              </p>
            </div>
          </div>

          <div className="text-[11px] text-purple-300 font-mono">
            Active Channel
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {projectMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.isWeeklyUpdate
                  ? 'items-center my-4'
                  : msg.role === 'client'
                  ? 'items-end'
                  : 'items-start'
              }`}
            >
              {msg.isWeeklyUpdate ? (
                /* Weekly Executive Update Card */
                <div className="w-full max-w-2xl rounded-2xl border border-purple-500/30 bg-purple-950/30 p-5 shadow-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-purple-400" />
                      <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                        Weekly Milestone Progress Report
                      </span>
                    </div>
                    <span className="text-[10px] text-purple-300 font-mono">{msg.timestamp}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{msg.title}</h4>
                  <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                    {msg.content}
                  </div>
                </div>
              ) : (
                /* Standard Chat Bubble */
                <div
                  className={`max-w-xl rounded-2xl p-4 text-xs space-y-1 ${
                    msg.role === 'client'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                      : 'bg-slate-950/80 border border-white/10 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 text-[10px] opacity-80 mb-1">
                    <span className="font-semibold">{msg.sender}</span>
                    <span className="font-mono">{msg.timestamp}</span>
                  </div>
                  <p className="leading-relaxed whitespace-pre-line">{msg.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Message Input Form */}
        <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-slate-950/80 flex items-center gap-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Message Tenspick team as ${currentPersona.name}...`}
            className="flex-1 rounded-2xl bg-slate-900 border border-white/10 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
          />
          <button
            type="submit"
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 hover:brightness-110 transition shrink-0"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

