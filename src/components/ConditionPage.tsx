import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Send,
  Download,
  Copy,
  Check,
  User,
  ArrowLeft,
  ShieldCheck,
  Wallet,
  Activity,
  Ticket,
  ExternalLink,
  X,

} from 'lucide-react';
import { SITE_LOGO_URL } from '../lib/brand';

interface ConditionPageProps {
  initialPlatform: 'paripulse' | 'megapari';
  onBack: () => void;
  onSubmit: (
    userId: string,
    platform: 'paripulse' | 'megapari',
    subPlatform: string,
    depositScreenshot: string,
    promoScreenshot: string,
  ) => void;
  addToast: (text: string, type: 'success' | 'error' | 'info') => void;
}

interface PlatformConfig {
  name: string;
  subName: string;
  logo: string;
  downloadUrl: string;
  registerUrl: string;
  registerDomain: string;
  hasRegisterStep: boolean;
}

const PLATFORM_CONFIGS: Record<'paripulse' | 'megapari', PlatformConfig> = {
  paripulse: {
    name: 'PariPulse',
    subName: 'paripulse vip',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg6-yMiToAplqRqnBnaYACm49Od_26EabD95SDPxqLgg&s=10',
    downloadUrl: 'https://refpa22168.com/L?tag=d_3638295m_99042c_&site=3638295&ad=99042',
    registerUrl: '',
    registerDomain: '',
    hasRegisterStep: false,
  },
  megapari: {
    name: 'Megapari',
    subName: 'megapari vip',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW7xleFw-FhsPX9OLzt91y0zWaLeDxos-cwVynaI-74Q&s=10',
    downloadUrl: 'https://refpazitag.top/L?tag=d_2926243m_54987c_&site=2926243&ad=54987',
    registerUrl: 'https://2787591.megapari-228091.com/',
    registerDomain: '2787591.megapari-228091.com',
    hasRegisterStep: true,
  },
};

const PROMO_CODE = 'Gooo33';

export default function ConditionPage({ initialPlatform, onBack, onSubmit }: ConditionPageProps) {
  const [platform, setPlatform] = useState<'paripulse' | 'megapari'>(initialPlatform);
  const [subPlatform, setSubPlatform] = useState<string>(initialPlatform + ' vip');
  const [userId, setUserId] = useState('');

  const currentPlatformConfig = PLATFORM_CONFIGS[platform] || PLATFORM_CONFIGS.paripulse;

  const [telegramJoined, setTelegramJoined] = useState(false);
  const [platformInstalled, setPlatformInstalled] = useState(false);
  const [registered, setRegistered] = useState(false);

  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [copied, setCopied] = useState(false);

  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyProgress, setVerifyProgress] = useState(0);
  const [verifyStatusText, setVerifyStatusText] = useState('جاري تهيئة قناة الاتصال...');

  useEffect(() => {
    setPlatform(initialPlatform);
    setSubPlatform(initialPlatform + ' vip');
  }, [initialPlatform]);

  const handleCopyPromo = () => {
    navigator.clipboard.writeText(PROMO_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim()) {
      const inputEl = document.getElementById('user-id-input');
      inputEl?.focus();
      inputEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsVerifying(true);
    setVerifyProgress(0);
    setVerifyStatusText('جاري فتح قناة التحقق الآمنة...');

    const steps = [
      { progress: 18, text: 'فحص اتصال خادم اللاعب ومطابقة الـ ID الرقمي...' },
      { progress: 38, text: 'التحقق من صحة المعطيات وسجلات قناة التليجرام...' },
      { progress: 62, text: `مزامنة كود الخصم المعتمد [${PROMO_CODE}] في قاعدة البيانات...` },
      { progress: 85, text: 'استيراد رخصة المرور وتأمين نظام تجنب الحظر لشبكة VIP...' },
      { progress: 100, text: 'تم إنشاء ترخيص VIP بنجاح! جاري تحويلك...' },
    ];

    let idx = 0;
    const timer = setInterval(() => {
      setVerifyProgress((prev) => {
        const next = prev + 1;
        if (idx < steps.length && next >= steps[idx]!.progress) {
          setVerifyStatusText(steps[idx]!.text);
          idx++;
        }
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVerifying(false);
            onSubmit(userId.trim(), platform, subPlatform, 'deposit_confirmed', 'promo_registered');
          }, 500);
          return 100;
        }
        return next;
      });
    }, 40);
  };

  const totalSteps = currentPlatformConfig.hasRegisterStep ? 6 : 5;
  const completed =
    (telegramJoined ? 1 : 0) +
    (platformInstalled ? 1 : 0) +
    (currentPlatformConfig.hasRegisterStep ? (registered ? 1 : 0) : 0) +
    (copied ? 1 : 0) +
    1 +
    (userId.trim().length >= 4 ? 1 : 0);
  const pct = Math.round((completed / totalSteps) * 100);

  const stepShell =
    'relative rounded-[1.6rem] p-[1.2px] bg-gradient-to-bl from-crimson/35 via-white/[0.05] to-transparent';
  const stepBody = 'rounded-[calc(1.6rem-2px)] glass-card-premium p-5 text-right';

  const StepHead = ({
    n,
    icon,
    title,
    desc,
    done,
    label,
  }: {
    n: string;
    icon: React.ReactNode;
    title: string;
    desc: string;
    done: boolean;
    label: string;
  }) => (
    <div className="flex items-start justify-between gap-3 mb-4">
      <span
        className={`text-[9px] font-mono font-black uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border shrink-0 ${
          done
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
            : 'bg-crimson/[0.07] text-crimson-bright border-crimson/25'
        }`}
      >
        {done ? 'done' : label}
      </span>
      <div className="flex items-center gap-3 flex-row-reverse text-right">
        <div className="w-11 h-11 rounded-2xl bg-crimson/10 border border-crimson/25 flex items-center justify-center text-crimson-bright shrink-0 shadow-[0_0_18px_-6px_rgba(255,0,51,0.7)]">
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-2 flex-row-reverse">
            <h3 className="text-[13.5px] font-black text-white">{title}</h3>
            <span className="text-[10px] font-mono font-black text-slate-600">{n}</span>
          </div>
          <p className="text-[10.5px] text-slate-400 font-medium mt-1 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div
      id="condition-main-screen"
      className="min-h-screen bg-transparent text-slate-100 flex flex-col py-6 px-4 relative overflow-y-auto select-none pb-16"
    >
      <div className="absolute inset-0 grid-fade pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[560px] h-[560px] bg-crimson/[0.06] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 vignette pointer-events-none" />

      <div className="w-full max-w-lg mx-auto relative z-10 flex-1 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between rounded-2xl px-3.5 py-2.5 glass-panel">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onBack}
              className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer border border-white/[0.06]"
              title="رجوع"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="w-8 h-8 rounded-xl overflow-hidden border border-crimson/30 shrink-0">
              <img src={currentPlatformConfig.logo} alt={currentPlatformConfig.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <span className="text-[10px] font-mono tracking-[0.22em] text-slate-300 font-extrabold uppercase">
              {currentPlatformConfig.subName}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-crimson" />
            <span className="text-[9px] font-mono font-bold text-crimson-bright uppercase tracking-[0.2em]">secure</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mt-9 mb-7">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-panel-light mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
            <span className="text-[9px] font-mono tracking-[0.24em] text-crimson-bright font-black uppercase">
              activation requirements
            </span>
          </div>
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/55">
            شروط <span className="text-crimson-bright glow-text-crimson-bright">التفعيل</span>
          </h2>
          <p className="text-[12.5px] text-slate-400 mt-3 max-w-xs mx-auto leading-relaxed font-medium">
            {currentPlatformConfig.hasRegisterStep
              ? 'أكمل الخطوات الست لربط حسابك وفتح خادم التوقعات'
              : 'أكمل الخطوات لربط حسابك وفتح خادم التوقعات'}
          </p>

          {/* Progress */}
          <div className="mt-6 rounded-2xl glass-panel-light px-4 py-3.5">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-mono font-black text-white">{pct}%</span>
              <span className="text-[10px] text-slate-400 font-bold">
                خطوات مكتملة <span className="font-mono text-crimson-bright">{completed}/{totalSteps}</span>
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-crimson-dark via-crimson to-crimson-bright shadow-[0_0_12px_rgba(255,0,51,0.55)]"
              />
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {/* 1 - telegram */}
          <div className={stepShell}>
            <div className={stepBody}>
              <StepHead
                n="01"
                icon={<Send className="w-5 h-5" />}
                title="الانضمام لقناة التليجرام"
                desc="تابع كود التفعيل اليومي والتحديثات المباشرة"
                done={telegramJoined}
                label="step 1"
              />
              <button
                type="button"
                onClick={() => {
                  window.open('https://t.me/+GqKpGbFjOaBjYTQ8', '_blank');
                  setTelegramJoined(true);
                }}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-black/60 border border-white/[0.06] hover:border-crimson/40 transition-all cursor-pointer"
              >
                <span
                  className={`text-[10px] font-black px-3.5 py-1.5 rounded-xl ${
                    telegramJoined
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                      : 'bg-crimson text-white shadow-[0_0_18px_-4px_rgba(255,0,51,0.8)]'
                  }`}
                >
                  {telegramJoined ? '✓ تم' : 'انضمام'}
                </span>
                <span className="text-[11.5px] font-bold text-slate-300">القناة الرسمية للهاك</span>
              </button>
            </div>
          </div>

          {/* 2 - download */}
          <div className={stepShell}>
            <div className={stepBody}>
              <StepHead
                n="02"
                icon={<Download className="w-5 h-5" />}
                title="تحميل تطبيق المنصة"
                desc={`حمّل ${currentPlatformConfig.name} وسجّل حساب جديد عبر الرابط الرسمي`}
                done={platformInstalled}
                label="step 2"
              />
              <button
                type="button"
                onClick={() => setShowDownloadDialog(true)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-black/60 border border-white/[0.06] hover:border-crimson/40 transition-all cursor-pointer"
              >
                <span
                  className={`text-[10px] font-black px-3.5 py-1.5 rounded-xl ${
                    platformInstalled
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                      : 'bg-crimson text-white shadow-[0_0_18px_-4px_rgba(255,0,51,0.8)]'
                  }`}
                >
                  {platformInstalled ? '✓ تم' : 'تحميل'}
                </span>
                <span className="text-[11.5px] font-bold text-slate-300">{currentPlatformConfig.name} — النسخة الرسمية</span>
              </button>
            </div>
          </div>

          {/* 3 - official registration (Megapari only) */}
          {currentPlatformConfig.hasRegisterStep && (
            <div className={stepShell}>
              <div className={stepBody}>
                <StepHead
                  n="03"
                  icon={<ExternalLink className="w-5 h-5" />}
                  title="التسجيل في الموقع الرسمي"
                  desc={`أنشئ حسابك على الموقع الرسمي لمنصة ${currentPlatformConfig.name}`}
                  done={registered}
                  label="step 3"
                />
                <button
                  type="button"
                  onClick={() => {
                    window.open(currentPlatformConfig.registerUrl, '_blank');
                    setRegistered(true);
                  }}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-black/60 border border-white/[0.06] hover:border-crimson/40 transition-all cursor-pointer"
                >
                  <span
                    className={`text-[10px] font-black px-3.5 py-1.5 rounded-xl ${
                      registered
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                        : 'bg-crimson text-white shadow-[0_0_18px_-4px_rgba(255,0,51,0.8)]'
                    }`}
                  >
                    {registered ? '✓ تم' : 'تسجيل'}
                  </span>
                  <span className="text-[11.5px] font-bold text-slate-300">{currentPlatformConfig.registerDomain} — الموقع الرسمي</span>
                </button>
              </div>
            </div>
          )}

          {/* promo */}
          <div className={stepShell}>
            <div className={stepBody}>
              <StepHead
                n={currentPlatformConfig.hasRegisterStep ? '04' : '03'}
                icon={<Ticket className="w-5 h-5" />}
                title="كود الخصم عند التسجيل"
                desc="انسخ الكود واستخدمه أثناء إنشاء الحساب"
                done={copied}
                label={currentPlatformConfig.hasRegisterStep ? 'step 4' : 'step 3'}
              />
              <button
                type="button"
                onClick={handleCopyPromo}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-black/60 border border-dashed border-crimson/30 hover:border-crimson/60 transition-all cursor-pointer"
              >
                <span className="flex items-center gap-1.5 text-[10px] font-black text-crimson-bright">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'تم النسخ' : 'نسخ'}
                </span>
                <span className="font-mono text-lg font-black text-white tracking-[0.15em] glow-text-crimson">
                  {PROMO_CODE}
                </span>
              </button>
            </div>
          </div>

          {/* deposit */}
          <div className={stepShell}>
            <div className={stepBody}>
              <StepHead
                n={currentPlatformConfig.hasRegisterStep ? '05' : '04'}
                icon={<Wallet className="w-5 h-5" />}
                title="الحد الأدنى للإيداع"
                desc="الرصيد يظل ملكك بالكامل وقابل للسحب في أي وقت"
                done={false}
                label={currentPlatformConfig.hasRegisterStep ? 'step 5' : 'step 4'}
              />

              <div className="flex items-center justify-center gap-3 px-4 py-4 rounded-2xl bg-black/60 border border-white/[0.06]">
                <span className="font-mono text-base font-black text-white bg-crimson/15 border border-crimson/35 px-3 py-1 rounded-xl">
                  200 EGP
                </span>
                <span className="text-[10px] text-slate-500 font-bold">أو</span>
                <span className="font-mono text-base font-black text-white bg-crimson px-3 py-1 rounded-xl shadow-[0_0_18px_-4px_rgba(255,0,51,0.8)]">
                  5$
                </span>
              </div>
            </div>
          </div>

          {/* id */}
          <div className={stepShell}>
            <div className={stepBody}>
              <StepHead
                n={currentPlatformConfig.hasRegisterStep ? '06' : '05'}
                icon={<User className="w-5 h-5" />}
                title="رقم حساب اللاعب (ID)"
                desc="أدخل معرفك الرقمي لمطابقة الترخيص"
                done={userId.trim().length >= 4}
                label={currentPlatformConfig.hasRegisterStep ? 'step 6' : 'step 5'}
              />

              <div className="flex items-center bg-black/70 rounded-2xl border border-white/[0.08] focus-within:border-crimson transition-all px-3">
                <User className="w-4.5 h-4.5 text-crimson/70 shrink-0" />
                <input
                  id="user-id-input"
                  type="text"
                  dir="ltr"
                  placeholder="529048322"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none py-3.5 px-3 font-mono font-black text-sm text-right"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.985 }}
            onClick={handleSubmit}
            className="w-full relative overflow-hidden py-4 rounded-2xl font-black text-sm text-white cursor-pointer border border-crimson/30 shadow-[0_20px_50px_-22px_rgba(255,0,51,0.9)]"
          >
            <span className="absolute inset-0 bg-gradient-to-l from-crimson-dark via-crimson to-crimson-bright" />
            <span className="absolute inset-0 animate-shimmer" />
            <span className="relative">تأكيد البيانات ومتابعة ⚡</span>
          </motion.button>
          <p className="text-center text-[9px] text-slate-600 font-mono tracking-[0.22em] uppercase mt-4">
            encrypted verification layer
          </p>
        </div>
      </div>

      {/* Verification overlay */}
      {isVerifying && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6">
          <div className="absolute inset-0 grid-fade pointer-events-none" />
          <div className="w-full max-w-sm text-center relative z-10 flex flex-col items-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-crimson/25 rounded-full blur-3xl animate-pulse" />
              <div className="w-24 h-24 rounded-full border border-crimson/50 flex items-center justify-center relative bg-black/90">
                <Activity className="w-11 h-11 text-crimson animate-pulse" />
                <div className="absolute -inset-2 rounded-full halo-ring animate-spin-slow" />
              </div>
            </div>
            <p className="text-[11px] text-crimson-bright font-black mb-7 h-10 flex items-center px-4">{verifyStatusText}</p>
            <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden mb-3">
              <div
                className="h-full rounded-full bg-gradient-to-r from-crimson-dark via-crimson to-crimson-bright transition-all duration-75"
                style={{ width: `${verifyProgress}%` }}
              />
            </div>
            <div className="w-full flex items-center justify-between text-[8px] font-mono tracking-widest text-slate-500 font-bold">
              <span>SECURITY LEVEL: ENCRYPTED CORE</span>
              <span className="text-white">{verifyProgress}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Download modal */}
      {showDownloadDialog && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-sm rounded-[1.75rem] p-[1.5px] bg-gradient-to-bl from-crimson/45 via-white/[0.06] to-transparent"
          >
            <div className="rounded-[calc(1.75rem-2px)] glass-card-premium p-5 text-right relative">
              <button
                onClick={() => setShowDownloadDialog(false)}
                className="absolute top-4 left-4 p-1.5 rounded-xl bg-white/[0.04] text-slate-400 hover:text-white cursor-pointer border border-white/[0.06]"
              >
                <X className="w-4 h-4" />
              </button>
              <h4 className="text-base font-black text-white mb-1">تحميل {currentPlatformConfig.name}</h4>
              <p className="text-[11px] text-slate-400 font-medium mb-5">سجّل حساب جديد عبر الرابط الرسمي لضمان التفعيل</p>

              <button
                onClick={() => {
                  window.open(currentPlatformConfig.downloadUrl, '_blank');
                  setPlatformInstalled(true);
                  setShowDownloadDialog(false);
                }}
                className="w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl bg-black/70 border border-crimson/25 hover:border-crimson/60 transition-all cursor-pointer"
              >
                <span className="text-[10px] font-black bg-crimson text-white px-3.5 py-1.5 rounded-xl">تحميل</span>
                <div className="flex items-center gap-3 flex-row-reverse">
                  <div className="w-11 h-11 rounded-xl overflow-hidden bg-black border border-crimson/25 shrink-0">
                    <img
                      src={currentPlatformConfig.logo}
                      alt={currentPlatformConfig.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[12px] font-black text-white">{currentPlatformConfig.name}</span>
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
