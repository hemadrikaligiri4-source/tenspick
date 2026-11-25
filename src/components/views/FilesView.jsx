import React, { useState } from 'react';
import {
  Files,
  UploadCloud,
  Download,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ExternalLink,
  Plus,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const FilesView = () => {
  const { files, uploadFile, currentProject, currentPersona } = usePortal();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileCategory, setFileCategory] = useState('Client Assets');

  const categories = [
    'All',
    'Contracts & NDA',
    'Requirement Docs & Notes',
    'Client Assets',
  ];

  const projectFiles = files.filter(
    (f) => f.projectId === currentProject.id
  );

  const filteredFiles = projectFiles.filter((f) => {
    if (selectedCategory === 'All') return true;
    return f.category === selectedCategory;
  });

  const handleUpload = (e) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    uploadFile({
      projectId: currentProject.id,
      name: fileName,
      category: fileCategory,
    });
    setFileName('');
    setShowUploadForm(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-purple-500/20 border border-purple-500/30 px-3 py-0.5 text-xs font-bold text-purple-300">
              Section 9: Files & Documents Vault
            </span>
            <span className="text-xs text-slate-400">
              AES-256 Encrypted Cloud Repository
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            Documents, Proposals & Client Assets
          </h1>
          <p className="text-xs text-slate-300">
            Proposals, signed agreements, meeting notes, and uploaded brand assets with expiring download links.
          </p>
        </div>

        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-600/30 hover:bg-purple-500 transition"
        >
          <UploadCloud className="h-4 w-4" />
          <span>Upload Asset / Document</span>
        </button>
      </div>

      {/* Upload Dropdown Form */}
      {showUploadForm && (
        <form
          onSubmit={handleUpload}
          className="rounded-3xl border border-purple-500/30 bg-purple-950/20 p-5 shadow-xl text-xs space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white">Upload New Asset into Project Vault</h3>
            <span className="text-[11px] text-purple-300 font-mono">
              Max file size 500 MB (Videos supported)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 mb-1">Document / Asset Name:</label>
              <input
                type="text"
                required
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="e.g., Acme_Product_Catalog_HiRes.zip"
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1">Target Vault Category:</label>
              <select
                value={fileCategory}
                onChange={(e) => setFileCategory(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="Client Assets">Client Assets (Logo, photos, brand colors)</option>
                <option value="Requirement Docs & Notes">Requirement Docs & Meeting Notes</option>
                <option value="Contracts & NDA">Proposal, Agreement & NDA</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowUploadForm(false)}
              className="rounded-xl px-4 py-2 text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-purple-600 px-5 py-2 font-bold text-white hover:bg-purple-500"
            >
              Confirm Upload
            </button>
          </div>
        </form>
      )}

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 text-xs overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-xl px-4 py-2 font-semibold transition ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFiles.map((file) => (
          <div
            key={file.id}
            className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md flex flex-col justify-between hover:border-purple-500/30 transition"
          >
            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30 shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-purple-300 font-bold border border-white/10">
                  {file.category}
                </span>
                <h4 className="text-xs font-bold text-white truncate mt-1">
                  {file.name}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Uploaded by {file.uploadedBy} on {file.uploadDate} • Size: {file.size}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-[11px] text-slate-500">
                <Lock className="h-3 w-3 text-emerald-400" />
                <span>Expiring Token Encryption</span>
              </span>

              <a
                href={file.secureDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl bg-white/5 hover:bg-purple-600 hover:text-white px-3 py-1.5 text-slate-300 font-semibold transition"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download File</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

