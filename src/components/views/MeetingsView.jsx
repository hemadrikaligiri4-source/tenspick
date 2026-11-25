import React from 'react';
import {
  Calendar,
  Video,
  Clock,
  Users,
  CheckCircle2,
  ExternalLink,
  Plus,
  PlayCircle,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const MeetingsView = () => {
  const { meetings, currentProject, setActiveActionModal } = usePortal();

  const projectMeetings = meetings.filter(
    (m) => m.projectId === currentProject.id
  );

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-purple-500/20 border border-purple-500/30 px-3 py-0.5 text-xs font-bold text-purple-300">
              Section 9: Meetings & Call Scheduling
            </span>
            <span className="text-xs text-slate-400">
              Google Meet & Demo Recordings
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            Book a Call, Demo & Past Recordings
          </h1>
          <p className="text-xs text-slate-300">
            Schedule strategy sessions, sprint reviews, and access past video session recordings.
          </p>
        </div>

        <button
          onClick={() => setActiveActionModal('meeting')}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6C4CC4] to-[#825de0] px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-600/30 hover:brightness-110 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Book a Call or Demo</span>
        </button>
      </div>

      {/* Meetings List */}
      <div className="space-y-4">
        {projectMeetings.map((meet) => (
          <div
            key={meet.id}
            className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-purple-500/30 transition"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border ${
                    meet.status === 'Upcoming'
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                      : 'bg-slate-800 text-slate-400 border-white/5'
                  }`}
                >
                  {meet.status}
                </span>
                <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-300 border border-white/10">
                  {meet.meetingType}
                </span>
                <span className="text-xs text-purple-300 font-semibold flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {meet.date} • {meet.time}
                </span>
              </div>

              <h3 className="text-base font-bold text-white">{meet.title}</h3>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                {meet.notes}
              </p>
              <div className="text-[11px] text-slate-400">
                Host: <strong className="text-slate-200">{meet.host}</strong> • Attendees:{' '}
                {meet.attendees?.join(', ')}
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-2">
              {meet.status === 'Upcoming' ? (
                <a
                  href={meet.meetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-purple-500 shadow-lg shadow-purple-600/30 transition"
                >
                  <Video className="h-3.5 w-3.5" />
                  <span>Join Google Meet</span>
                </a>
              ) : (
                <a
                  href={meet.recordingUrl || meet.meetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white transition"
                >
                  <PlayCircle className="h-4 w-4 text-purple-400" />
                  <span>Replay Recording & Notes</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

