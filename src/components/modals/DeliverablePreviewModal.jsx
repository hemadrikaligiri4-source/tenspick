import React, { useState, useRef } from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Send,
  MessageSquare,
  Paperclip,
  ExternalLink,
  ShieldCheck,
  Clock,
  User,
  Info,
  MapPin,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const DeliverablePreviewModal = () => {
  const {
    previewDeliverable,
    setPreviewDeliverable,
    currentPersona,
    addDeliverableComment,
    addPinAnnotation,
    setActiveActionModal,
    setModalPayload,
    ROLES,
  } = usePortal();

  const [commentInput, setCommentInput] = useState('');
  const [pinMode, setPinMode] = useState(false);
  const [pinPrompt, setPinPrompt] = useState(null); // { x, y }
  const [pinCommentText, setPinCommentText] = useState('');
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'comments' | 'pins'
  const imageRef = useRef(null);

  if (!previewDeliverable) return null;

  const canApprove =
    currentPersona.canApprove !== false &&
    (currentPersona.role === ROLES.CLIENT || currentPersona.role === ROLES.ADMIN);

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addDeliverableComment(previewDeliverable.id, commentInput);
    setCommentInput('');
  };

  const handleImageClick = (e) => {
    if (!pinMode || !imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setPinPrompt({ x, y });
  };

  const handleSavePin = () => {
    if (!pinCommentText.trim() || !pinPrompt) return;
    addPinAnnotation(previewDeliverable.id, {
      x: pinPrompt.x,
      y: pinPrompt.y,
      text: pinCommentText,
    });
    setPinPrompt(null);
    setPinCommentText('');
    setPinMode(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative flex flex-col h-[94vh] max-h-[900px] w-full max-w-6xl rounded-3xl border border-white/15 bg-[#0e111d] shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 bg-slate-900/60">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className={`rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                previewDeliverable.status === 'Approved'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : previewDeliverable.status === 'Changes Requested'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
              }`}
            >
              {previewDeliverable.status}
            </span>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-white truncate">
                {previewDeliverable.name}
              </h3>
              <p className="text-[11px] text-slate-400 truncate">
                Version: <span className="text-purple-300 font-semibold">{previewDeliverable.version}</span> • Uploaded: {previewDeliverable.uploadDate} • Due: {previewDeliverable.dueDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Action Buttons */}
            {previewDeliverable.status !== 'Approved' && (
              <>
                <button
                  onClick={() => {
                    setModalPayload(previewDeliverable);
                    setActiveActionModal('change_request');
                  }}
                  className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-950/40 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-900/50 transition"
                >
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>Request Changes</span>
                </button>

                <button
                  disabled={!canApprove}
                  onClick={() => {
                    setModalPayload(previewDeliverable);
                    setActiveActionModal('approve');
                  }}
                  className={`flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-xs font-bold transition shadow-lg ${
                    canApprove
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-600/30 hover:brightness-110'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
                  }`}
                  title={!canApprove ? 'Your role has view-only rights; only Main Client / Admin can sign off' : 'Approve deliverable'}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{canApprove ? 'Approve Deliverable' : 'Approval Restricted'}</span>
                </button>
              </>
            )}

            <button
              onClick={() => setPreviewDeliverable(null)}
              className="rounded-xl p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition ml-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Main Body (Split layout: Preview on left, Details & Comments on right) */}
        <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
          {/* Left Column: Interactive Canvas & Preview */}
          <div className="flex-1 flex flex-col bg-[#07090f] p-4 overflow-y-auto">
            {/* Canvas Control Toolbar */}
            <div className="flex items-center justify-between mb-3 bg-slate-900/70 border border-white/10 rounded-xl px-3 py-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-medium">Interactive Preview Canvas</span>
                <span className="text-[10px] text-purple-300 bg-purple-950 px-1.5 py-0.5 rounded border border-purple-500/30">
                  {previewDeliverable.fileType}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPinMode(!pinMode)}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
                    pinMode
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/40 ring-2 ring-purple-400'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                  title="Click anywhere on the preview image to pin a comment"
                >
                  <MapPin className="h-3.5 w-3.5 text-purple-300" />
                  <span>{pinMode ? 'Click on Canvas to Pin' : 'Pin a Comment'}</span>
                </button>

                <a
                  href={previewDeliverable.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 rounded-lg bg-white/5 hover:bg-white/10 px-2.5 py-1 text-[11px] text-slate-300 hover:text-white transition"
                >
                  <span>Open Fullscreen</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Canvas Area with Pin Overlays */}
            <div
              ref={imageRef}
              onClick={handleImageClick}
              className={`relative flex-1 rounded-2xl border border-white/10 bg-slate-950/60 overflow-hidden flex items-center justify-center select-none ${
                pinMode ? 'cursor-crosshair ring-2 ring-purple-500/50' : 'cursor-default'
              }`}
            >
              <img
                src={previewDeliverable.previewUrl}
                alt={previewDeliverable.name}
                className="max-h-full max-w-full object-contain pointer-events-none rounded-xl"
              />

              {/* Render Existing Pinned Annotations */}
              {previewDeliverable.pinAnnotations?.map((pin, idx) => (
                <div
                  key={pin.id || idx}
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                >
                  <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-purple-600 text-white text-xs font-bold shadow-xl shadow-purple-900/60 ring-2 ring-white animate-bounce">
                    <span>{idx + 1}</span>
                  </div>
                  {/* Tooltip on hover */}
                  <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 hidden group-hover:block w-48 rounded-xl bg-slate-900 border border-purple-500/40 p-2.5 shadow-2xl text-[11px] text-white z-30 pointer-events-none">
                    <p className="font-bold text-purple-300 text-[10px] uppercase">{pin.author}</p>
                    <p className="mt-0.5 text-slate-200">{pin.text}</p>
                    <p className="text-[9px] text-slate-500 mt-1">{pin.timestamp}</p>
                  </div>
                </div>
              ))}

              {/* Active Pin Placement Dialog */}
              {pinPrompt && (
                <div
                  style={{ left: `${pinPrompt.x}%`, top: `${pinPrompt.y}%` }}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute z-30 -translate-x-1/2 -translate-y-1/2 w-64 rounded-2xl border border-purple-500 bg-[#121526] p-3 shadow-2xl backdrop-blur-xl animate-in zoom-in-95"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-purple-300 uppercase">Pin Note Here</span>
                    <button
                      onClick={() => setPinPrompt(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <textarea
                    autoFocus
                    value={pinCommentText}
                    onChange={(e) => setPinCommentText(e.target.value)}
                    placeholder="Describe change for this area..."
                    className="w-full h-16 rounded-lg bg-black/40 border border-white/10 p-2 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none resize-none"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => setPinPrompt(null)}
                      className="rounded-lg px-2.5 py-1 text-[11px] text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSavePin}
                      className="rounded-lg bg-purple-600 px-3 py-1 text-[11px] font-bold text-white hover:bg-purple-500"
                    >
                      Save Pin
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notes From Tenspick Team Banner */}
            <div className="mt-3 rounded-xl border border-purple-500/20 bg-purple-950/30 p-3">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-300 mb-1">
                <Info className="h-3.5 w-3.5" />
                <span>Notes from the Tenspick Team (What was done, what to check):</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {previewDeliverable.notesFromTeam}
              </p>
            </div>
          </div>

          {/* Right Column: Details, Approval Signature & Comments */}
          <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-white/10 bg-[#0c0e18] flex flex-col justify-between">
            {/* Tab navigation */}
            <div className="border-b border-white/10 p-3 bg-slate-900/40">
              <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-950/80 p-1 border border-white/5 text-xs">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`rounded-lg py-1.5 font-semibold transition ${
                    activeTab === 'preview'
                      ? 'bg-purple-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Deliverable Specs
                </button>
                <button
                  onClick={() => setActiveTab('comments')}
                  className={`rounded-lg py-1.5 font-semibold transition ${
                    activeTab === 'comments'
                      ? 'bg-purple-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Comments ({previewDeliverable.comments?.length || 0})
                </button>
              </div>
            </div>

            {/* Tab 1: Specs and Approval details */}
            {activeTab === 'preview' ? (
              <div className="p-4 space-y-4 overflow-y-auto flex-1">
                {/* Description */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Deliverable Scope
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {previewDeliverable.description}
                  </p>
                </div>

                {/* Service & Milestone */}
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Service Category:</span>
                    <span className="font-medium text-slate-200">{previewDeliverable.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target Milestone:</span>
                    <span className="font-medium text-purple-300">Phase 2: Design & Build</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Included Revisions:</span>
                    <span className="font-medium text-emerald-300">3 Major Cycles Included</span>
                  </div>
                </div>

                {/* Approval Signature Box (If approved) */}
                {previewDeliverable.status === 'Approved' ? (
                  <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-4 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Legally Approved & Recorded</span>
                    </div>
                    <div className="text-[11px] text-slate-300 space-y-1">
                      <p>
                        <strong className="text-slate-200">Approver:</strong> {previewDeliverable.approvedBy}
                      </p>
                      <p>
                        <strong className="text-slate-200">Timestamp:</strong> {previewDeliverable.approvedAt}
                      </p>
                      <p className="font-mono text-[10px] text-emerald-300/80 break-all bg-emerald-950/60 p-1.5 rounded border border-emerald-500/20">
                        Hash: {previewDeliverable.approvalSignature}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-purple-500/20 bg-purple-950/20 p-4">
                    <h5 className="text-xs font-bold text-white mb-1">Pending Approval</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                      Reviewing this deliverable promptly ensures the development schedule stays on target. Clicking approve records your sign-off and unlocks the next milestone.
                    </p>
                    {canApprove ? (
                      <button
                        onClick={() => {
                          setModalPayload(previewDeliverable);
                          setActiveActionModal('approve');
                        }}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 hover:brightness-110 transition"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Sign & Approve Deliverable</span>
                      </button>
                    ) : (
                      <p className="text-[11px] text-amber-400 font-medium bg-amber-950/40 p-2 rounded-lg border border-amber-500/20">
                        You are logged in as {currentPersona.name} ({currentPersona.title}). Approvals require main client authorization.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* Tab 2: Comments & Conversation */
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                  {previewDeliverable.comments?.length === 0 ? (
                    <div className="text-center py-10 text-slate-400">
                      <MessageSquare className="h-8 w-8 mx-auto text-slate-600 mb-2" />
                      <p className="text-xs">No comments yet.</p>
                      <p className="text-[11px]">Leave a question or note for the Tenspick team below.</p>
                    </div>
                  ) : (
                    previewDeliverable.comments?.map((comment) => (
                      <div
                        key={comment.id}
                        className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={comment.avatar}
                              alt={comment.author}
                              className="h-5 w-5 rounded-full object-cover"
                            />
                            <span className="font-semibold text-slate-200">{comment.author}</span>
                            <span className="text-[10px] text-purple-300 font-mono">
                              {comment.role}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400">{comment.timestamp}</span>
                        </div>
                        <p className="text-slate-300 text-xs leading-relaxed pl-7">
                          {comment.text}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                {/* Comment Input */}
                <form
                  onSubmit={handlePostComment}
                  className="p-3 border-t border-white/10 bg-slate-900/60 flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Type feedback or question..."
                    className="flex-1 rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-600 text-white hover:bg-purple-500 transition"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

