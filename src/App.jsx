import React, { useState } from 'react';
import { usePortal, PortalProvider } from './context/PortalContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/layout/ToastContainer';

// Views
import { DashboardView } from './components/views/DashboardView';
import { ProjectsView } from './components/views/ProjectsView';
import { DeliverablesView } from './components/views/DeliverablesView';
import { FeedbackView } from './components/views/FeedbackView';
import { MessagesView } from './components/views/MessagesView';
import { FilesView } from './components/views/FilesView';
import { InvoicesView } from './components/views/InvoicesView';
import { SupportView } from './components/views/SupportView';
import { MeetingsView } from './components/views/MeetingsView';
import { ProfileSettingsView } from './components/views/ProfileSettingsView';
import { LegalPoliciesView } from './components/views/LegalPoliciesView';
import { AdminPanelView } from './components/views/AdminPanelView';

// Modals
import { OnboardingModal } from './components/modals/OnboardingModal';
import { AuthModal } from './components/modals/AuthModal';
import { DeliverablePreviewModal } from './components/modals/DeliverablePreviewModal';
import { ApprovalModal } from './components/modals/ApprovalModal';
import { ChangeRequestModal } from './components/modals/ChangeRequestModal';
import { MilestoneCheckinModal } from './components/modals/MilestoneCheckinModal';
import { FinalFeedbackModal } from './components/modals/FinalFeedbackModal';
import { PaymentModal } from './components/modals/PaymentModal';
import { InvoicePrintModal } from './components/modals/InvoicePrintModal';
import { BookMeetingModal } from './components/modals/BookMeetingModal';
import { RaiseTicketModal } from './components/modals/RaiseTicketModal';
import { PortalFeedbackModal } from './components/modals/PortalFeedbackModal';
import { UploadDeliverableModal } from './components/modals/UploadDeliverableModal';

const PortalApp = () => {
  const { activeTab } = usePortal();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Render view corresponding to activeTab (matching 12 sections in PDF sitemap)
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'projects':
        return <ProjectsView />;
      case 'deliverables':
        return <DeliverablesView />;
      case 'feedback':
        return <FeedbackView />;
      case 'messages':
        return <MessagesView />;
      case 'files':
        return <FilesView />;
      case 'invoices':
        return <InvoicesView />;
      case 'support':
        return <SupportView />;
      case 'meetings':
        return <MeetingsView />;
      case 'profile':
        return <ProfileSettingsView />;
      case 'legal':
        return <LegalPoliciesView />;
      case 'admin':
        return <AdminPanelView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#090b13] text-slate-100 flex flex-col font-sans selection:bg-purple-600/30 selection:text-purple-200">
      {/* Navbar with Role Switcher, WhatsApp Direct, Notifications */}
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Layout Area */}
      <div className="flex flex-1 w-full">
        {/* Sidebar Navigation */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Content Pane */}
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)]">
          {renderActiveView()}
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Global Modals */}
      <OnboardingModal />
      <AuthModal />
      <DeliverablePreviewModal />
      <ApprovalModal />
      <ChangeRequestModal />
      <MilestoneCheckinModal />
      <FinalFeedbackModal />
      <PaymentModal />
      <InvoicePrintModal />
      <BookMeetingModal />
      <RaiseTicketModal />
      <PortalFeedbackModal />
      <UploadDeliverableModal />
    </div>
  );
};

export default function App() {
  return (
    <PortalProvider>
      <PortalApp />
    </PortalProvider>
  );
}
