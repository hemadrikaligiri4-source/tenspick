import React, { useState } from 'react';
import {
  CreditCard,
  QrCode,
  Building2,
  CheckCircle2,
  ShieldCheck,
  X,
  Copy,
  Check,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const PaymentModal = () => {
  const {
    activeActionModal,
    setActiveActionModal,
    modalPayload,
    payInvoice,
  } = usePortal();

  const [paymentTab, setPaymentTab] = useState('upi'); // 'upi' | 'bank' | 'card'
  const [copiedField, setCopiedField] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (activeActionModal !== 'payment' || !modalPayload) return null;

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleExecutePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      payInvoice(modalPayload.id, paymentTab === 'upi' ? 'UPI Instant Transfer' : paymentTab === 'bank' ? 'NEFT / RTGS Bank Transfer' : 'Online Credit Card Gateway');
      setActiveActionModal(null);
    }, 1200);
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

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CreditCard className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Settlement & Invoice Clearance</h3>
            <p className="text-xs text-emerald-400 font-medium">
              Invoice #{modalPayload.invoiceNumber}
            </p>
          </div>
        </div>

        {/* Invoice Summary Box */}
        <div className="rounded-2xl bg-slate-950/80 border border-white/10 p-4 mb-5 text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-400">Milestone / Description:</span>
            <span className="font-semibold text-slate-200 truncate max-w-[220px]">
              {modalPayload.type}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Subtotal:</span>
            <span className="font-mono text-slate-300">₹{modalPayload.amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">GST (18% CGST + SGST):</span>
            <span className="font-mono text-slate-300">₹{modalPayload.gstAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-white/10 text-sm">
            <span className="font-bold text-white">Total Payable Amount:</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              ₹{modalPayload.totalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Payment Methods Tabs */}
        <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-950 p-1 border border-white/10 mb-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setPaymentTab('upi')}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-lg transition ${
              paymentTab === 'upi'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <QrCode className="h-3.5 w-3.5" />
            <span>UPI / QR</span>
          </button>
          <button
            type="button"
            onClick={() => setPaymentTab('bank')}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-lg transition ${
              paymentTab === 'bank'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="h-3.5 w-3.5" />
            <span>Bank Transfer</span>
          </button>
          <button
            type="button"
            onClick={() => setPaymentTab('card')}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-lg transition ${
              paymentTab === 'card'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="h-3.5 w-3.5" />
            <span>Card / Netbanking</span>
          </button>
        </div>

        {/* Tab 1: UPI QR Code */}
        {paymentTab === 'upi' && (
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/[0.02] border border-white/5 mb-4 text-center">
            {/* SVG generated UPI QR Code graphic */}
            <div className="p-3 bg-white rounded-2xl shadow-xl ring-4 ring-purple-500/20 mb-3">
              <svg className="w-36 h-36 text-slate-900" viewBox="0 0 100 100">
                <rect x="0" y="0" width="30" height="30" fill="currentColor" />
                <rect x="5" y="5" width="20" height="20" fill="white" />
                <rect x="9" y="9" width="12" height="12" fill="currentColor" />
                <rect x="70" y="0" width="30" height="30" fill="currentColor" />
                <rect x="75" y="5" width="20" height="20" fill="white" />
                <rect x="79" y="9" width="12" height="12" fill="currentColor" />
                <rect x="0" y="70" width="30" height="30" fill="currentColor" />
                <rect x="5" y="75" width="20" height="20" fill="white" />
                <rect x="9" y="79" width="12" height="12" fill="currentColor" />
                <rect x="40" y="10" width="10" height="20" fill="currentColor" />
                <rect x="10" y="40" width="20" height="10" fill="currentColor" />
                <rect x="40" y="40" width="20" height="20" fill="#6C4CC4" />
                <rect x="70" y="40" width="15" height="15" fill="currentColor" />
                <rect x="40" y="70" width="15" height="20" fill="currentColor" />
                <rect x="70" y="70" width="25" height="25" fill="currentColor" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-slate-200">
              Scan with Google Pay, PhonePe, Paytm, or BHIM
            </p>
            <div className="mt-2 flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-white/10 text-xs">
              <span className="text-purple-300 font-mono">tenspick@icici</span>
              <button
                type="button"
                onClick={() => copyToClipboard('tenspick@icici', 'vpa')}
                className="text-slate-400 hover:text-white"
              >
                {copiedField === 'vpa' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Bank Transfer Details */}
        {paymentTab === 'bank' && (
          <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-4 mb-4 text-xs space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Account Name:</span>
              <span className="font-semibold text-white">Tenspick Technologies LLP</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Bank Name:</span>
              <span className="font-medium text-slate-200">HDFC Bank Limited</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Account Number:</span>
              <div className="flex items-center gap-1.5 font-mono text-purple-300 font-bold">
                <span>50200088921443</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard('50200088921443', 'acc')}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedField === 'acc' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">IFSC Code:</span>
              <div className="flex items-center gap-1.5 font-mono text-purple-300 font-bold">
                <span>HDFC0001234</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard('HDFC0001234', 'ifsc')}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedField === 'ifsc' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Account Type:</span>
              <span className="text-slate-300">Current Account</span>
            </div>
          </div>
        )}

        {/* Tab 3: Online Gateway Card */}
        {paymentTab === 'card' && (
          <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-4 mb-4 text-xs space-y-3">
            <div>
              <label className="block text-slate-400 mb-1">Card Number</label>
              <input
                type="text"
                defaultValue="4242 •••• •••• 9842"
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-white font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Expiry Date</label>
                <input
                  type="text"
                  defaultValue="12/28"
                  className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">CVV / CVC</label>
                <input
                  type="password"
                  defaultValue="•••"
                  className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-white font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          disabled={isProcessing}
          onClick={handleExecutePayment}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3 text-xs font-bold text-white shadow-xl shadow-emerald-600/30 hover:brightness-110 disabled:opacity-50 transition"
        >
          {isProcessing ? (
            <span>Authorizing Payment Transaction...</span>
          ) : (
            <>
              <ShieldCheck className="h-4 w-4" />
              <span>Simulate Instant Payment (₹{modalPayload.totalAmount.toLocaleString()})</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

