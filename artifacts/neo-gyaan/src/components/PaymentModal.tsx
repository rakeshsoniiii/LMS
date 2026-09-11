import React, { useState, useEffect } from 'react';
import { 
  X, CheckCircle2, ShieldCheck, CreditCard, QrCode, Building2, 
  ArrowRight, Lock, Sparkles, Smartphone, Download, Check
} from 'lucide-react';

export interface PaymentItem {
  title: string;
  price: number;
  type: 'course' | 'plan';
  courseId?: string;
  badge?: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: PaymentItem | null;
  onSuccess: (courseId?: string) => void;
}

export function PaymentModal({ isOpen, onClose, item, onSuccess }: PaymentModalProps) {
  const [method, setMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [bank, setBank] = useState('HDFC Bank');
  const [txnId, setTxnId] = useState('');
  const [activeUpiApp, setActiveUpiApp] = useState<string | null>('gpay');

  useEffect(() => {
    if (isOpen) {
      setStep('details');
      setTxnId(`TXN-NG-${Math.floor(100000 + Math.random() * 900000)}`);
    }
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setExpiry(`${raw.slice(0, 2)}/${raw.slice(2, 4)}`);
    } else {
      setExpiry(raw);
    }
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 1600);
  };

  const handleFinish = () => {
    onSuccess(item.courseId);
    onClose();
  };

  const detectCardType = () => {
    const clean = cardNumber.replace(/\s/g, '');
    if (clean.startsWith('4')) return 'Visa';
    if (/^5[1-5]/.test(clean)) return 'Mastercard';
    if (/^(60|65|81|82)/.test(clean)) return 'RuPay';
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071a33]/70 p-4 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-[540px] overflow-hidden rounded-3xl border border-[#071a33]/15 bg-[#fffefa] shadow-2xl transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-modal-title"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#071a33]/10 bg-[#071a33] px-6 py-4 text-[#f7f6f1]">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Neo Gyaan" className="h-7 w-7 rounded-lg object-contain bg-white/10 p-0.5" />
            <div>
              <span className="font-display text-base font-bold tracking-tight">Neo Gyaan Checkout</span>
              <span className="ml-2 rounded-full bg-[#c7f000] px-2 py-0.5 text-[9px] font-bold text-[#071a33]">TEST GATEWAY</span>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="grid h-8 w-8 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close payment modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Step: Processing */}
        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="relative mb-6">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#c7f000] border-t-transparent" />
              <div className="absolute inset-0 grid place-items-center">
                <Lock size={20} className="text-[#071a33]" />
              </div>
            </div>
            <h3 className="font-display text-2xl font-bold text-[#071a33]">Processing Payment</h3>
            <p className="mt-2 text-sm text-[#66727a]">
              Securely connecting with simulated gateway...
            </p>
            <div className="mt-6 flex items-center gap-2 rounded-full bg-[#f0efe9] px-4 py-2 text-xs font-medium text-[#071a33]">
              <ShieldCheck size={16} className="text-[#728500]" />
              256-bit SSL Encrypted Transaction
            </div>
          </div>
        )}

        {/* Step: Success */}
        {step === 'success' && (
          <div className="p-6 sm:p-8 text-center">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-[#c7f000] text-[#071a33] shadow-lg">
              <CheckCircle2 size={36} />
            </div>
            <p className="eyebrow text-[#728500]">ENROLLMENT CONFIRMED</p>
            <h3 className="mt-2 font-display text-3xl font-bold text-[#071a33]">Payment Successful!</h3>
            <p className="mt-2 text-sm text-[#5d6870]">
              You now have full, unlimited access to <strong className="text-[#071a33]">{item.title}</strong>.
            </p>

            <div className="mt-6 rounded-2xl border border-[#071a33]/10 bg-[#f7f6f1] p-4 text-left text-xs space-y-2.5">
              <div className="flex justify-between">
                <span className="text-[#727d85]">Transaction Reference:</span>
                <span className="font-mono-custom font-bold text-[#071a33]">{txnId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#727d85]">Amount Paid:</span>
                <span className="font-bold text-[#071a33]">₹{item.price.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#727d85]">Payment Method:</span>
                <span className="capitalize font-semibold text-[#071a33]">{method.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#727d85]">Status:</span>
                <span className="rounded-full bg-[#c7f000] px-2 py-0.5 font-bold text-[#071a33]">Completed</span>
              </div>
            </div>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleFinish}
                className="flex-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#071a33] px-6 text-sm font-bold text-[#f7f6f1] transition-transform hover:-translate-y-0.5 shadow-md"
              >
                <span>Start Learning Now</span>
                <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => alert(`Invoice receipt for ${txnId} downloaded successfully.`)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#071a33]/20 px-4 text-xs font-bold text-[#071a33] hover:bg-[#f0efe9]"
              >
                <Download size={14} /> Receipt
              </button>
            </div>
          </div>
        )}

        {/* Step: Details Form */}
        {step === 'details' && (
          <div className="p-6 sm:p-7">
            {/* Order Preview Bar */}
            <div className="mb-6 flex items-center justify-between rounded-2xl bg-[#f0efe9] p-4">
              <div>
                <span className="eyebrow text-[#728500]">{item.type.toUpperCase()}</span>
                <h4 className="font-display text-base font-bold text-[#071a33] truncate max-w-[260px] sm:max-w-[320px]">
                  {item.title}
                </h4>
              </div>
              <div className="text-right">
                <span className="font-display text-2xl font-bold text-[#071a33]">
                  ₹{item.price.toLocaleString('en-IN')}
                </span>
                <span className="block text-[10px] text-[#717b83]">All taxes included</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="mb-6">
              <label className="eyebrow mb-2.5 block text-[#69747c]">SELECT PAYMENT METHOD</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setMethod('upi')}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-bold transition-all ${
                    method === 'upi' 
                      ? 'border-[#071a33] bg-[#071a33] text-[#f7f6f1] shadow-md' 
                      : 'border-[#071a33]/15 bg-[#fffefa] text-[#071a33] hover:bg-[#f7f6f1]'
                  }`}
                >
                  <QrCode size={18} />
                  <span>UPI / QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('card')}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-bold transition-all ${
                    method === 'card' 
                      ? 'border-[#071a33] bg-[#071a33] text-[#f7f6f1] shadow-md' 
                      : 'border-[#071a33]/15 bg-[#fffefa] text-[#071a33] hover:bg-[#f7f6f1]'
                  }`}
                >
                  <CreditCard size={18} />
                  <span>Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('netbanking')}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-bold transition-all ${
                    method === 'netbanking' 
                      ? 'border-[#071a33] bg-[#071a33] text-[#f7f6f1] shadow-md' 
                      : 'border-[#071a33]/15 bg-[#fffefa] text-[#071a33] hover:bg-[#f7f6f1]'
                  }`}
                >
                  <Building2 size={18} />
                  <span>NetBanking</span>
                </button>
              </div>
            </div>

            {/* Tab: UPI */}
            {method === 'upi' && (
              <form onSubmit={handlePay} className="space-y-4">
                <div className="rounded-2xl border border-[#071a33]/10 bg-[#fffefa] p-4 text-center">
                  <p className="text-xs font-semibold text-[#546067] mb-3">Scan QR code using any UPI App</p>
                  
                  {/* Dynamic QR Box */}
                  <div className="mx-auto relative flex h-40 w-40 items-center justify-center rounded-xl border-2 border-dashed border-[#071a33]/30 bg-[#f7f6f1] p-3 shadow-inner">
                    <svg viewBox="0 0 100 100" className="h-full w-full">
                      {/* Corner markers */}
                      <rect x="5" y="5" width="28" height="28" fill="#071a33" rx="4" />
                      <rect x="9" y="9" width="20" height="20" fill="#fffefa" rx="2" />
                      <rect x="13" y="13" width="12" height="12" fill="#071a33" rx="1" />
                      
                      <rect x="67" y="5" width="28" height="28" fill="#071a33" rx="4" />
                      <rect x="71" y="9" width="20" height="20" fill="#fffefa" rx="2" />
                      <rect x="75" y="13" width="12" height="12" fill="#071a33" rx="1" />
                      
                      <rect x="5" y="67" width="28" height="28" fill="#071a33" rx="4" />
                      <rect x="9" y="71" width="20" height="20" fill="#fffefa" rx="2" />
                      <rect x="13" y="75" width="12" height="12" fill="#071a33" rx="1" />

                      {/* Data dots */}
                      <rect x="38" y="10" width="8" height="8" fill="#071a33" />
                      <rect x="50" y="10" width="8" height="8" fill="#071a33" />
                      <rect x="38" y="24" width="8" height="8" fill="#071a33" />
                      <rect x="50" y="24" width="8" height="8" fill="#071a33" />
                      <rect x="10" y="38" width="8" height="8" fill="#071a33" />
                      <rect x="24" y="38" width="8" height="8" fill="#071a33" />
                      <rect x="38" y="38" width="8" height="8" fill="#071a33" />
                      <rect x="52" y="38" width="8" height="8" fill="#071a33" />
                      <rect x="66" y="38" width="8" height="8" fill="#071a33" />
                      <rect x="80" y="38" width="8" height="8" fill="#071a33" />
                      <rect x="38" y="52" width="8" height="8" fill="#071a33" />
                      <rect x="52" y="52" width="8" height="8" fill="#071a33" />
                      <rect x="66" y="52" width="8" height="8" fill="#071a33" />
                      <rect x="80" y="52" width="8" height="8" fill="#071a33" />
                      <rect x="38" y="66" width="8" height="8" fill="#071a33" />
                      <rect x="52" y="66" width="8" height="8" fill="#071a33" />
                      <rect x="66" y="66" width="8" height="8" fill="#071a33" />
                      <rect x="80" y="66" width="8" height="8" fill="#071a33" />
                      <rect x="38" y="80" width="8" height="8" fill="#071a33" />
                      <rect x="52" y="80" width="8" height="8" fill="#071a33" />
                    </svg>
                    <div className="absolute grid h-8 w-8 place-items-center rounded-full bg-[#c7f000] shadow-md border border-[#071a33]">
                      <span className="font-display font-bold text-[9px] text-[#071a33]">NG</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-center gap-2">
                    {['gpay', 'phonepe', 'paytm', 'bhim'].map((app) => (
                      <button
                        key={app}
                        type="button"
                        onClick={() => setActiveUpiApp(app)}
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase transition-all ${
                          activeUpiApp === app 
                            ? 'bg-[#071a33] text-[#c7f000]' 
                            : 'bg-[#f0efe9] text-[#69747c] hover:bg-[#e4e2d8]'
                        }`}
                      >
                        {app}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#071a33]/10" /></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#fffefa] px-2 text-[#79838b]">or pay with VPA / UPI ID</span></div>
                </div>

                <div>
                  <div className="relative flex items-center">
                    <Smartphone size={16} className="absolute left-3 text-[#79838b]" />
                    <input 
                      type="text" 
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="mobile-number@upi or name@okaxis" 
                      className="h-11 w-full rounded-xl border border-[#071a33]/15 bg-[#fffefa] pl-9 pr-20 text-xs font-mono-custom outline-none focus:border-[#728500]"
                    />
                    <span className="absolute right-3 text-[11px] font-bold text-[#728500]">VERIFIED</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#c7f000] text-sm font-bold text-[#071a33] transition-transform hover:-translate-y-0.5 shadow-md"
                >
                  <Lock size={15} />
                  <span>Pay ₹{item.price.toLocaleString('en-IN')} Instantly</span>
                </button>
              </form>
            )}

            {/* Tab: Card */}
            {method === 'card' && (
              <form onSubmit={handlePay} className="space-y-3.5">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#546067]">Card Number</label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="4532 0123 4567 8910"
                      maxLength={19}
                      className="h-11 w-full rounded-xl border border-[#071a33]/15 bg-[#fffefa] px-3 font-mono-custom text-xs outline-none focus:border-[#728500]"
                      required
                    />
                    {detectCardType() && (
                      <span className="absolute right-3 rounded bg-[#071a33] px-2 py-0.5 text-[10px] font-bold text-[#c7f000]">
                        {detectCardType()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-[#546067]">Expiry Date</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="h-11 w-full rounded-xl border border-[#071a33]/15 bg-[#fffefa] px-3 font-mono-custom text-xs outline-none focus:border-[#728500]"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-[#546067]">CVV</label>
                    <input
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.slice(0, 4))}
                      placeholder="•••"
                      maxLength={4}
                      className="h-11 w-full rounded-xl border border-[#071a33]/15 bg-[#fffefa] px-3 font-mono-custom text-xs outline-none focus:border-[#728500]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#546067]">Cardholder Name</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Riya Sharma"
                    className="h-11 w-full rounded-xl border border-[#071a33]/15 bg-[#fffefa] px-3 text-xs outline-none focus:border-[#728500]"
                    required
                  />
                </div>

                <label className="flex items-center gap-2 text-xs text-[#636f78] cursor-pointer pt-1">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 accent-[#071a33]" />
                  <span>Securely save this card for future fast checkouts</span>
                </label>

                <button
                  type="submit"
                  className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#071a33] text-sm font-bold text-[#f7f6f1] transition-transform hover:-translate-y-0.5 shadow-md"
                >
                  <Lock size={15} className="text-[#c7f000]" />
                  <span>Pay ₹{item.price.toLocaleString('en-IN')}</span>
                </button>
              </form>
            )}

            {/* Tab: NetBanking */}
            {method === 'netbanking' && (
              <form onSubmit={handlePay} className="space-y-4">
                <label className="block text-xs font-semibold text-[#546067]">Popular Indian Banks</label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {[
                    'HDFC Bank', 'State Bank of India', 'ICICI Bank', 
                    'Axis Bank', 'Kotak Bank', 'Punjab National Bank'
                  ].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBank(b)}
                      className={`flex items-center gap-2 rounded-xl border p-2.5 text-left text-xs font-semibold transition-all ${
                        bank === b 
                          ? 'border-[#071a33] bg-[#071a33] text-[#f7f6f1]' 
                          : 'border-[#071a33]/10 bg-[#f7f6f1] text-[#071a33] hover:bg-[#eae8e0]'
                      }`}
                    >
                      <Building2 size={14} className={bank === b ? 'text-[#c7f000]' : 'text-[#728500]'} />
                      <span className="truncate">{b}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="mb-1 block text-xs font-semibold text-[#546067]">Or select another bank</label>
                  <select 
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="h-11 w-full rounded-xl border border-[#071a33]/15 bg-[#fffefa] px-3 text-xs outline-none"
                  >
                    <option>Bank of Baroda</option>
                    <option>Canara Bank</option>
                    <option>Union Bank of India</option>
                    <option>IndusInd Bank</option>
                    <option>IDFC FIRST Bank</option>
                    <option>Yes Bank</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#071a33] text-sm font-bold text-[#f7f6f1] transition-transform hover:-translate-y-0.5 shadow-md"
                >
                  <Lock size={15} className="text-[#c7f000]" />
                  <span>Proceed with {bank} (₹{item.price.toLocaleString('en-IN')})</span>
                </button>
              </form>
            )}

            {/* Footer Trust Guarantee */}
            <div className="mt-5 border-t border-[#071a33]/10 pt-4 flex items-center justify-between text-[11px] text-[#717b83]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#728500]" />
                100% Secure Simulated Checkout
              </span>
              <span>7-Day Money-Back Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
