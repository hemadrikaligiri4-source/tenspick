import React, { useState } from 'react';
import { Calendar, Clock, Video, Users, CheckCircle2, X } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const BookMeetingModal = () => {
  const {
    activeActionModal,
    setActiveActionModal,
    bookMeeting,
    selectedProjectId,
    currentProject,
  } = usePortal();

  const [meetingType, setMeetingType] = useState('Sprint Review & Demo');
  const [date, setDate] = useState('2026-11-27');
  const [time, setTime] = useState('04:00 PM - 04:45 PM IST');
  const [notes, setNotes] = useState('');

  if (activeActionModal !== 'meeting') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    bookMeeting({
      projectId: selectedProjectId,
      title: `${meetingType} (${currentProject?.name})`,
      date,
      time,
      meetingType,
      notes,
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

        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <Video className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Schedule a Call or Demo</h3>
            <p className="text-xs text-purple-300 font-medium">
              Direct video sync with Project Manager Alex Rivera
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Meeting Purpose */}
          <div>
            <label className="block font-semibold text-slate-200 mb-1.5">Meeting Purpose / Agenda:</label>
            <select
              value={meetingType}
              onChange={(e) => setMeetingType(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="Sprint Review & Demo">Sprint Review & Prototype Walkthrough</option>
              <option value="Requirements & Scope Sync">Requirements & Scope Clarification</option>
              <option value="Staging Deployment QA">Staging Deployment & QA Sign-off</option>
              <option value="Final Handover & Training">Final Handover & Staff Training</option>
              <option value="Emergency Support">Emergency Technical Support</option>
            </select>
          </div>

          {/* Date & Time Picker */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-200 mb-1.5">Select Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-200 mb-1.5">Select Time Slot:</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="11:30 AM - 12:15 PM IST">11:30 AM - 12:15 PM IST</option>
                <option value="02:30 PM - 03:15 PM IST">02:30 PM - 03:15 PM IST</option>
                <option value="04:00 PM - 04:45 PM IST">04:00 PM - 04:45 PM IST</option>
                <option value="06:00 PM - 06:45 PM IST">06:00 PM - 06:45 PM IST</option>
              </select>
            </div>
          </div>

          {/* Agenda Notes */}
          <div>
            <label className="block font-semibold text-slate-200 mb-1.5">
              Specific Questions or Agenda Items (Optional):
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., We want to review the mobile test build and discuss the payment gateway credentials."
              className="w-full rounded-xl bg-slate-950 border border-white/10 p-2.5 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none resize-none"
            />
          </div>

          <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 text-[11px] text-purple-200">
            A Google Meet calendar invite will be generated instantly and dispatched to your email and WhatsApp.
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
              <span>Confirm Booking</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

