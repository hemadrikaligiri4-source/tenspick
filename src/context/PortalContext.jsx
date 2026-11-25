import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ROLES,
  PERSONAS,
  INITIAL_PROJECTS,
  INITIAL_DELIVERABLES,
  SERVICE_DELIVERABLES_TEMPLATES,
  INITIAL_FEEDBACK_ITEMS,
  INITIAL_MILESTONE_CHECKINS,
  INITIAL_FINAL_FEEDBACK,
  INITIAL_MESSAGES,
  INITIAL_FILES,
  INITIAL_INVOICES,
  INITIAL_TICKETS,
  INITIAL_MEETINGS,
  LEGAL_POLICIES,
  INITIAL_ADMIN_METRICS,
  INITIAL_TESTIMONIALS,
} from '../data/initialData';

const PortalContext = createContext(null);

export const PortalProvider = ({ children }) => {
  // Active Persona / Role
  const [currentPersona, setCurrentPersona] = useState(() => {
    const saved = localStorage.getItem('tenspick_persona');
    return saved ? JSON.parse(saved) : PERSONAS[0]; // Default Sarah Jenkins (Client)
  });

  // Current selected project
  const [selectedProjectId, setSelectedProjectId] = useState('TP-2026-014');

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState('dashboard');

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem('tenspick_onboarding_done') === 'true';
  });

  // Data Stores
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('tenspick_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [deliverables, setDeliverables] = useState(() => {
    const saved = localStorage.getItem('tenspick_deliverables');
    return saved ? JSON.parse(saved) : INITIAL_DELIVERABLES;
  });

  const [feedbackItems, setFeedbackItems] = useState(() => {
    const saved = localStorage.getItem('tenspick_feedback');
    return saved ? JSON.parse(saved) : INITIAL_FEEDBACK_ITEMS;
  });

  const [milestoneCheckins, setMilestoneCheckins] = useState(() => {
    const saved = localStorage.getItem('tenspick_checkins');
    return saved ? JSON.parse(saved) : INITIAL_MILESTONE_CHECKINS;
  });

  const [finalFeedbacks, setFinalFeedbacks] = useState(() => {
    const saved = localStorage.getItem('tenspick_final_feedbacks');
    return saved ? JSON.parse(saved) : INITIAL_FINAL_FEEDBACK;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('tenspick_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [files, setFiles] = useState(() => {
    const saved = localStorage.getItem('tenspick_files');
    return saved ? JSON.parse(saved) : INITIAL_FILES;
  });

  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('tenspick_invoices');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('tenspick_tickets');
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  const [meetings, setMeetings] = useState(() => {
    const saved = localStorage.getItem('tenspick_meetings');
    return saved ? JSON.parse(saved) : INITIAL_MEETINGS;
  });

  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('tenspick_testimonials');
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [adminMetrics, setAdminMetrics] = useState(INITIAL_ADMIN_METRICS);

  // Notification Toasts
  const [toasts, setToasts] = useState([]);

  // Active Modals & Selected items for preview/action
  const [previewDeliverable, setPreviewDeliverable] = useState(null);
  const [activeActionModal, setActiveActionModal] = useState(null); // 'change_request' | 'approve' | 'checkin' | 'final_feedback' | 'payment' | 'invoice_print' | 'ticket' | 'meeting' | 'upload_deliverable' | 'portal_feedback'
  const [modalPayload, setModalPayload] = useState(null);

  // Synchronize localStorage
  useEffect(() => {
    localStorage.setItem('tenspick_persona', JSON.stringify(currentPersona));
  }, [currentPersona]);

  useEffect(() => {
    localStorage.setItem('tenspick_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('tenspick_deliverables', JSON.stringify(deliverables));
  }, [deliverables]);

  useEffect(() => {
    localStorage.setItem('tenspick_feedback', JSON.stringify(feedbackItems));
  }, [feedbackItems]);

  useEffect(() => {
    localStorage.setItem('tenspick_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('tenspick_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('tenspick_tickets', JSON.stringify(tickets));
  }, [tickets]);

  // Toast Helper
  const addToast = (title, message, type = 'info') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Celebration animation
  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6C4CC4', '#8B5CF6', '#AA3BFF', '#D4AF37', '#10B981'],
      });
    } catch {
      // fallback if canvas not available
    }
  };

  // Switch persona handler
  const switchPersona = (personaId) => {
    const found = PERSONAS.find((p) => p.id === personaId);
    if (found) {
      setCurrentPersona(found);
      addToast('Role Switched', `Now viewing portal as ${found.name} (${found.role.replace('_', ' ').toUpperCase()})`, 'info');
      if (found.role === ROLES.ADMIN && activeTab === 'dashboard') {
        // Can stay on dashboard or switch to admin
      }
    }
  };

  // Current active project object
  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  // ==========================================
  // ACTION HANDLERS
  // ==========================================

  // 1. Approve Deliverable
  const approveDeliverable = (deliverableId, approvalNotes = '') => {
    const approverName = currentPersona.name;
    const approverRole = currentPersona.title || currentPersona.role;
    const timestamp = new Date().toLocaleString();
    const signatureHash = `SIG-VERIFIED-${approverName.slice(0, 2).toUpperCase()}-${Date.now().toString().slice(-6)}`;

    setDeliverables((prev) =>
      prev.map((del) => {
        if (del.id === deliverableId) {
          return {
            ...del,
            status: 'Approved',
            approvedBy: `${approverName} (${approverRole})`,
            approvedAt: timestamp,
            approvalSignature: signatureHash,
            comments: [
              ...del.comments,
              {
                id: 'c-' + Date.now(),
                author: approverName,
                avatar: currentPersona.avatar,
                role: approverRole,
                text: `✅ Deliverable officially approved. Signature: ${signatureHash}. ${approvalNotes ? `Note: ${approvalNotes}` : ''}`,
                timestamp,
              },
            ],
          };
        }
        return del;
      })
    );

    // Update project activity log
    const targetDel = deliverables.find((d) => d.id === deliverableId);
    if (targetDel) {
      logProjectActivity(targetDel.projectId, approverName, `Approved deliverable: ${targetDel.name}`, 'approval');
    }

    triggerCelebration();
    addToast('Deliverable Approved!', `Officially approved with verifiable signature: ${signatureHash}`, 'success');
  };

  // 2. Request Changes on Deliverable
  const requestChanges = ({
    deliverableId,
    comments,
    changeType = 'Design',
    priority = 'Medium',
    attachments = [],
    pinAnnotations = [],
  }) => {
    const targetDel = deliverables.find((d) => d.id === deliverableId);
    const newTicketId = `CR-${Math.floor(100 + Math.random() * 900)}`;

    const newFeedbackItem = {
      id: newTicketId,
      type: 'change_request',
      projectId: targetDel ? targetDel.projectId : selectedProjectId,
      deliverableId,
      deliverableName: targetDel ? targetDel.name : 'Deliverable Item',
      clientName: currentPersona.name,
      clientEmail: currentPersona.email,
      decision: 'Request changes',
      comments,
      changeType,
      priority,
      status: 'Received',
      expectedResponseDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toLocaleString(),
      resolutionNotes: 'Assigned to Tenspick design & development team.',
    };

    setFeedbackItems((prev) => [newFeedbackItem, ...prev]);

    // Update deliverable status to Changes Requested and append comment
    setDeliverables((prev) =>
      prev.map((del) => {
        if (del.id === deliverableId) {
          return {
            ...del,
            status: 'Changes Requested',
            comments: [
              ...del.comments,
              {
                id: 'c-' + Date.now(),
                author: currentPersona.name,
                avatar: currentPersona.avatar,
                role: currentPersona.title || 'Client',
                text: `⚠️ Changes Requested (Ticket #${newTicketId}): ${comments}`,
                timestamp: new Date().toLocaleString(),
              },
            ],
            pinAnnotations: pinAnnotations.length > 0 ? [...del.pinAnnotations, ...pinAnnotations] : del.pinAnnotations,
          };
        }
        return del;
      })
    );

    // Increment revision counter on the project
    if (targetDel) {
      setProjects((prev) =>
        prev.map((proj) => {
          if (proj.id === targetDel.projectId) {
            const currentUsed = proj.revisions.used;
            return {
              ...proj,
              revisions: {
                ...proj.revisions,
                used: currentUsed + 1,
              },
            };
          }
          return proj;
        })
      );

      logProjectActivity(targetDel.projectId, currentPersona.name, `Requested changes on ${targetDel.name} (Ticket #${newTicketId})`, 'feedback');
    }

    addToast('Change Request Submitted', `Ticket #${newTicketId} logged. Project Manager & Designers alerted.`, 'warning');
  };

  // 3. Add Inline Comment to Deliverable
  const addDeliverableComment = (deliverableId, commentText) => {
    if (!commentText.trim()) return;
    const newComment = {
      id: 'c-' + Date.now(),
      author: currentPersona.name,
      avatar: currentPersona.avatar,
      role: currentPersona.title || currentPersona.role,
      text: commentText,
      timestamp: 'Just now',
    };

    setDeliverables((prev) =>
      prev.map((del) => {
        if (del.id === deliverableId) {
          return {
            ...del,
            comments: [...del.comments, newComment],
          };
        }
        return del;
      })
    );
    addToast('Comment Posted', 'Your feedback was attached to this deliverable.', 'info');
  };

  // 4. Add Pin Annotation to Deliverable Image Canvas
  const addPinAnnotation = (deliverableId, { x, y, text }) => {
    const newPin = {
      id: 'pin-' + Date.now(),
      x,
      y,
      author: currentPersona.name,
      text,
      timestamp: 'Just now',
    };

    setDeliverables((prev) =>
      prev.map((del) => {
        if (del.id === deliverableId) {
          return {
            ...del,
            pinAnnotations: [...del.pinAnnotations, newPin],
          };
        }
        return del;
      })
    );
    addToast('Annotation Pinned', 'Visual note placed on screen canvas.', 'info');
  };

  // 5. Submit Milestone Check-in (1-min pulse)
  const submitMilestoneCheckin = ({ projectId, milestoneName, satisfaction, communicationClear, timelineOnTrack, worryNotes }) => {
    const newCheckin = {
      id: 'chk-' + Date.now(),
      projectId,
      milestoneName,
      clientName: currentPersona.name,
      satisfaction,
      communicationClear,
      timelineOnTrack,
      worryNotes,
      createdAt: new Date().toLocaleString(),
    };

    setMilestoneCheckins((prev) => [newCheckin, ...prev]);
    logProjectActivity(projectId, currentPersona.name, `Submitted 1-minute Milestone Check-in (${satisfaction} Stars)`, 'feedback');

    triggerCelebration();
    addToast('Milestone Check-in Saved', 'Thank you! Your feedback helps us keep your project on schedule.', 'success');
  };

  // 6. Submit Final Project Feedback Form
  const submitFinalFeedback = (feedbackData) => {
    const newId = 'ff-' + Math.floor(100 + Math.random() * 900);
    const hasLowRating = Object.values(feedbackData.ratings).some((rating) => Number(rating) <= 3);

    const submission = {
      id: newId,
      projectId: feedbackData.projectId,
      projectName: feedbackData.projectName,
      serviceType: feedbackData.serviceType,
      clientName: currentPersona.name,
      company: currentPersona.company,
      projectManager: feedbackData.projectManager,
      submittedAt: new Date().toLocaleString(),
      ratings: feedbackData.ratings,
      npsScore: Number(feedbackData.npsScore),
      openAnswers: feedbackData.openAnswers,
      permissions: feedbackData.permissions,
      publishedToWebsite: false,
      alertTriggered: hasLowRating,
    };

    setFinalFeedbacks((prev) => [submission, ...prev]);

    // If testimonial permission is given and rating is 5 stars, also add to draft testimonials
    if (feedbackData.permissions.canUseAsTestimonial && feedbackData.ratings.finalWorkQuality >= 4) {
      setTestimonials((prev) => [
        {
          id: 'test-' + Date.now(),
          clientName: currentPersona.name,
          company: currentPersona.company,
          role: currentPersona.title || 'Client',
          avatar: currentPersona.avatar,
          rating: feedbackData.ratings.finalWorkQuality,
          quote: feedbackData.openAnswers.whatDidYouLikeMost || 'Exceptional experience with Tenspick!',
          service: feedbackData.serviceType,
          published: false,
          publishedAt: new Date().toISOString().split('T')[0],
        },
        ...prev,
      ]);
    }

    logProjectActivity(feedbackData.projectId, currentPersona.name, 'Submitted Final Project Feedback & NPS Rating', 'feedback');

    triggerCelebration();
    addToast('Final Feedback Received!', 'Thank you for partnering with Tenspick from Spark to Scale!', 'success');

    if (hasLowRating) {
      addToast('Alert Dispatched', 'A senior Tenspick partner will personally follow up regarding your rating.', 'warning');
    }
  };

  // 7. Pay Invoice
  const payInvoice = (invoiceId, paymentMethod = 'UPI / Online Gateway') => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === invoiceId) {
          return {
            ...inv,
            status: 'Paid',
            paidAt: new Date().toLocaleString(),
            paymentMethod,
          };
        }
        return inv;
      })
    );

    const targetInv = invoices.find((i) => i.id === invoiceId);
    if (targetInv) {
      logProjectActivity(targetInv.projectId, currentPersona.name, `Settled Invoice ${targetInv.invoiceNumber} (₹${targetInv.totalAmount.toLocaleString()})`, 'payment');
    }

    triggerCelebration();
    addToast('Payment Successful', `Invoice ${invoiceId} has been marked as Paid. Official receipt generated.`, 'success');
  };

  // 8. Create Support Ticket
  const createSupportTicket = ({ projectId, title, category, priority, description }) => {
    const newId = `TCK-${Math.floor(100 + Math.random() * 900)}`;
    const newTicket = {
      id: newId,
      projectId,
      projectName: projects.find((p) => p.id === projectId)?.name || 'Project',
      title,
      category,
      priority,
      status: 'Open',
      slaRemainingHours: 24,
      freeSupportActive: true,
      freeSupportDaysRemaining: 45,
      clientName: currentPersona.name,
      createdAt: new Date().toLocaleString(),
      description,
      assignedTo: 'Elena Rostova (Lead Dev)',
      updates: [
        {
          author: currentPersona.name,
          timestamp: 'Just now',
          message: description,
        },
      ],
    };

    setTickets((prev) => [newTicket, ...prev]);
    logProjectActivity(projectId, currentPersona.name, `Raised Support Ticket #${newId}: ${title}`, 'support');
    addToast('Support Ticket Created', `Ticket #${newId} logged under 24-hr SLA resolution guarantee.`, 'success');
  };

  // 9. Book Meeting / Call
  const bookMeeting = ({ projectId, title, date, time, meetingType, notes }) => {
    const newId = 'meet-' + Date.now();
    const newMeeting = {
      id: newId,
      title,
      projectId,
      date,
      time,
      meetingType,
      status: 'Upcoming',
      host: 'Alex Rivera (Project Manager)',
      attendees: [currentPersona.name, 'Alex Rivera'],
      meetUrl: `https://meet.google.com/tpk-${Math.random().toString(36).substring(2, 7)}`,
      notes,
    };

    setMeetings((prev) => [newMeeting, ...prev]);
    logProjectActivity(projectId, currentPersona.name, `Scheduled Call: ${title} on ${date}`, 'meeting');
    triggerCelebration();
    addToast('Call Scheduled!', `Google Meet link generated for ${date} at ${time}. Calendar invites sent.`, 'success');
  };

  // 10. Send Project Message
  const sendMessage = ({ projectId, content, attachments = [] }) => {
    if (!content.trim()) return;
    const newMsg = {
      id: 'msg-' + Date.now(),
      projectId,
      sender: `${currentPersona.name} (${currentPersona.title || currentPersona.role})`,
      senderAvatar: currentPersona.avatar,
      role: currentPersona.role === ROLES.PROJECT_MANAGER ? 'pm' : currentPersona.role === ROLES.ADMIN ? 'admin' : 'client',
      isWeeklyUpdate: false,
      content,
      timestamp: 'Just now',
      attachments,
    };

    setMessages((prev) => [...prev, newMsg]);
    addToast('Message Sent', 'Sent directly to the project channel (Email & WhatsApp alert triggered)', 'info');
  };

  // 11. Upload File
  const uploadFile = ({ projectId, name, category, size = '2.4 MB' }) => {
    const newFile = {
      id: 'f-' + Date.now(),
      projectId,
      name,
      category,
      size,
      uploadedBy: currentPersona.name,
      uploadDate: new Date().toISOString().split('T')[0],
      secureDownloadUrl: `https://tenspick.com/vault/download?token=${Date.now()}`,
    };

    setFiles((prev) => [newFile, ...prev]);
    logProjectActivity(projectId, currentPersona.name, `Uploaded document: ${name}`, 'upload');
    addToast('File Stored in Vault', `${name} uploaded with encrypted expiring links.`, 'success');
  };

  // 12. PM / Admin Upload Deliverable
  const uploadDeliverable = (deliverableData) => {
    const newId = 'del-' + Math.floor(100 + Math.random() * 900);
    const newDel = {
      id: newId,
      projectId: deliverableData.projectId,
      milestoneId: deliverableData.milestoneId || 'm2',
      name: deliverableData.name,
      service: deliverableData.service,
      version: deliverableData.version || 'v1',
      status: 'Delivered',
      uploadDate: new Date().toISOString().split('T')[0],
      dueDate: deliverableData.dueDate || new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      fileType: deliverableData.fileType || 'image_prototype',
      previewUrl: deliverableData.previewUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
      description: deliverableData.description,
      notesFromTeam: deliverableData.notesFromTeam || 'Ready for client review.',
      approvedBy: null,
      approvedAt: null,
      approvalSignature: null,
      comments: [],
      pinAnnotations: [],
    };

    setDeliverables((prev) => [newDel, ...prev]);
    logProjectActivity(deliverableData.projectId, currentPersona.name, `Uploaded new deliverable: ${deliverableData.name} (${deliverableData.version})`, 'upload');
    addToast('Deliverable Uploaded', 'Client notified via email and WhatsApp alert.', 'success');
  };

  // 13. Testimonials Management (Admin)
  const togglePublishTestimonial = (testimonialId) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === testimonialId ? { ...t, published: !t.published } : t))
    );
    addToast('Testimonial Updated', 'Status updated for tenspick.com website display.', 'info');
  };

  // Helper: Log activity to project
  const logProjectActivity = (projectId, user, action, type) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const newLog = {
            id: 'act-' + Date.now(),
            user,
            action,
            timestamp: 'Just now',
            type,
          };
          return {
            ...p,
            activityLog: [newLog, ...p.activityLog],
          };
        }
        return p;
      })
    );
  };

  // Complete onboarding
  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
    setOnboardingOpen(false);
    localStorage.setItem('tenspick_onboarding_done', 'true');
    triggerCelebration();
    addToast('Welcome aboard!', 'You are all set to track your project from Spark to Scale.', 'success');
  };

  return (
    <PortalContext.Provider
      value={{
        // Auth & Persona
        currentPersona,
        switchPersona,
        PERSONAS,
        ROLES,
        isAuthenticated,
        setIsAuthenticated,
        authModalOpen,
        setAuthModalOpen,
        onboardingOpen,
        setOnboardingOpen,
        hasCompletedOnboarding,
        completeOnboarding,

        // Navigation
        activeTab,
        setActiveTab,
        selectedProjectId,
        setSelectedProjectId,
        currentProject,

        // Data Stores
        projects,
        deliverables,
        serviceTemplates: SERVICE_DELIVERABLES_TEMPLATES,
        feedbackItems,
        milestoneCheckins,
        finalFeedbacks,
        messages,
        files,
        invoices,
        tickets,
        meetings,
        policies: LEGAL_POLICIES,
        adminMetrics,
        testimonials,

        // Actions
        approveDeliverable,
        requestChanges,
        addDeliverableComment,
        addPinAnnotation,
        submitMilestoneCheckin,
        submitFinalFeedback,
        payInvoice,
        createSupportTicket,
        bookMeeting,
        sendMessage,
        uploadFile,
        uploadDeliverable,
        togglePublishTestimonial,

        // Modals & UI Controls
        previewDeliverable,
        setPreviewDeliverable,
        activeActionModal,
        setActiveActionModal,
        modalPayload,
        setModalPayload,
        toasts,
        addToast,
        removeToast,
        triggerCelebration,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};

