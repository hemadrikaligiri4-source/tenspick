import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, X } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const UploadDeliverableModal = () => {
  const {
    activeActionModal,
    setActiveActionModal,
    uploadDeliverable,
    selectedProjectId,
    currentProject,
    currentPersona,
  } = usePortal();

  const [name, setName] = useState('');
  const [version, setVersion] = useState('v1');
  const [service, setService] = useState(currentProject?.serviceType || 'Web Development and E-commerce');
  const [description, setDescription] = useState('');
  const [notesFromTeam, setNotesFromTeam] = useState('');
  const [fileType, setFileType] = useState('image_prototype');
  const [previewUrl, setPreviewUrl] = useState('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80');

  if (activeActionModal !== 'upload_deliverable') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    uploadDeliverable({
      projectId: selectedProjectId,
      name,
      version,
      service,
      description,
      notesFromTeam,
      fileType,
      previewUrl,
    });
    setActiveActionModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-3xl border border-purple-500/30 bg-[#0f121e] p-6 shadow-2xl">
        <button
          onClick={() => setActiveActionModal(null)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <UploadCloud className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Upload New Deliverable</h3>
            <p className="text-xs text-purple-300 font-medium">
              Tenspick Staff Tool (Section 7.3 Step 1)
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-200 mb-1">Deliverable Name:</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Staging E-commerce Store & Payment Gateway"
              className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Version:</label>
              <select
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="v1">v1 (Initial Draft)</option>
                <option value="v2">v2 (Revised)</option>
                <option value="Final">Final (Release Ready)</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Format / Type:</label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="image_prototype">Figma Prototype / Screens</option>
                <option value="staging_link">Staging Website Link</option>
                <option value="test_build">APK / TestFlight App Build</option>
                <option value="doc">SRS / PDF Specification</option>
                <option value="source_handover">Source Code Handover</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-200 mb-1">Scope & Description:</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Summary of agreed features included in this delivery..."
              className="w-full rounded-xl bg-slate-950 border border-white/10 p-2.5 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-200 mb-1">
              Notes From Tenspick Team (What was done, what to check):
            </label>
            <textarea
              rows={2}
              value={notesFromTeam}
              onChange={(e) => setNotesFromTeam(e.target.value)}
              placeholder="e.g., Please test the checkout flow using dummy card 4242... and let us know if the font hierarchy looks sharp."
              className="w-full rounded-xl bg-slate-950 border border-white/10 p-2.5 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setActiveActionModal(null)}
              className="rounded-xl px-4 py-2 font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 font-bold text-white shadow-lg shadow-purple-600/30 hover:brightness-110"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Publish Deliverable</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

