import { motion } from 'motion/react';
import { ArrowLeft, Shield, Sparkles, Zap, ChevronLeft } from 'lucide-react';
import { SITE_LOGO_URL } from '../lib/brand';

interface ChoosePlatformProps {
  onSelect: (platform: 'paripulse' | 'megapari') => void;
  onBack?: () => void;
}

export default function ChoosePlatform({ onSelect, onBack }: ChoosePlatformProps) {
  return (
    <div
      id="choose-platform-screen"
      className="min-h-screen bg-transparent text-slate-100 flex flex-col py-6 px-4 relative overflow-y-auto select-none pb-12"
    >
      {/* Ambience */}
      <div className="absolute inset-0 grid-fade pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[560px] h-[560px] bg-crimson/[0.06] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Top bar */}
      <div className="w-full max-w-lg mx-auto flex items-center justify-between rounded-2xl px-3.5 py-2.5 glass-panel relative z-10">
        <div className="flex items-center gap-2.5">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer border border-white/[0.06]"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div className="w-8 h-8 rounded-xl overflow-hidden border border-crimson/30 shrink-0">
            <img src={SITE_LOGO_URL} alt="شعار Apple Hack" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.22em] text-slate-300 font-extrabold uppercase">
              apple hack vip
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-crimson" />
          <span className="text-[9px] font-mono font-bold text-crimson-bright uppercase tracking-[0.2em]">
            secure
          </span>
        </div>
      </div>

      <div className="w-full max-w-lg mx-auto flex-1 flex flex-col justify-center relative z-10">
        {/* Header */}
        <div className="text-center mb-9 mt-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-panel-light mb-4">
            <Sparkles className="w-3.5 h-3.5 text-crimson-bright" />
            <span className="text-[9px] font-mono tracking-[0.24em] text-crimson-bright font-black uppercase">
              platform configuration
            </span>
          </div>
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/55">
            اختر <span className="text-crimson-bright glow-text-crimson-bright">المنصة</span>
          </h2>
          <p className="text-[13px] text-slate-400 mt-3 max-w-xs mx-auto leading-relaxed font-medium">
            اضغط على المنصة لربط السيرفر وتوليد التوقعات
          </p>
        </div>

        {/* Platforms list */}
        <div className="space-y-4">
          {/* PariPulse card */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => onSelect('paripulse')}
            className="w-full relative group text-right rounded-[1.75rem] p-[1.5px] bg-gradient-to-bl from-crimson/45 via-white/[0.06] to-transparent cursor-pointer shadow-[0_24px_60px_-25px_rgba(255,0,51,0.5)]"
          >
            <div className="rounded-[calc(1.75rem-2px)] px-5 py-5 glass-card-premium overflow-hidden flex items-center justify-between gap-4 transition-all group-hover:bg-crimson/[0.03]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson/50 to-transparent" />

              <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-crimson group-hover:border-crimson-bright group-hover:text-white transition-all shrink-0">
                <ChevronLeft className="w-4.5 h-4.5 group-hover:-translate-x-0.5 transition-transform" />
              </div>

              <div className="flex items-center gap-4 flex-row-reverse text-right">
                <div className="w-15 h-15 rounded-2xl overflow-hidden bg-black border border-crimson/25 shadow-lg group-hover:border-crimson/60 transition-all shrink-0">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg6-yMiToAplqRqnBnaYACm49Od_26EabD95SDPxqLgg&s=10"
                    alt="PariPulse"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono tracking-[0.22em] text-crimson-bright font-extrabold uppercase mb-1">
                    <Zap className="w-3 h-3" /> elite network
                  </span>
                  <h3 className="text-lg font-black text-white tracking-wide">PariPulse</h3>
                  <p className="text-[11.5px] text-slate-400 font-medium mt-1 leading-relaxed">
                    تفعيل الخادم المباشر وتوقعات PariPulse بالذكاء الاصطناعي
                  </p>
                </div>
              </div>
            </div>
          </motion.button>

          {/* Megapari card */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => onSelect('megapari')}
            className="w-full relative group text-right rounded-[1.75rem] p-[1.5px] bg-gradient-to-bl from-rose-500/45 via-white/[0.06] to-transparent cursor-pointer shadow-[0_24px_60px_-25px_rgba(244,63,94,0.5)]"
          >
            <div className="rounded-[calc(1.75rem-2px)] px-5 py-5 glass-card-premium overflow-hidden flex items-center justify-between gap-4 transition-all group-hover:bg-rose-500/[0.04]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-500/60 to-transparent" />

              <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-rose-600 group-hover:border-rose-400 group-hover:text-white transition-all shrink-0">
                <ChevronLeft className="w-4.5 h-4.5 group-hover:-translate-x-0.5 transition-transform" />
              </div>

              <div className="flex items-center gap-4 flex-row-reverse text-right">
                <div className="w-15 h-15 rounded-2xl overflow-hidden bg-black border border-rose-500/30 shadow-lg group-hover:border-rose-400/70 transition-all shrink-0">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW7xleFw-FhsPX9OLzt91y0zWaLeDxos-cwVynaI-74Q&s=10"
                    alt="Megapari"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono tracking-[0.22em] text-rose-400 font-extrabold uppercase mb-1">
                    <Zap className="w-3 h-3" /> high-speed core
                  </span>
                  <h3 className="text-lg font-black text-white tracking-wide">Megapari</h3>
                  <p className="text-[11.5px] text-slate-400 font-medium mt-1 leading-relaxed">
                    تفعيل الخادم المباشر وتوقعات Megapari بالذكاء الاصطناعي
                  </p>
                </div>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Trust row */}
        <div className="mt-8 grid grid-cols-3 gap-3">
          {[
            { k: 'ACCURACY', v: '97%' },
            { k: 'UPTIME', v: '24/7' },
            { k: 'USERS', v: '12K+' },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl glass-panel-light px-3 py-3 text-center">
              <div className="text-base font-black font-orbitron text-white glow-text-crimson">{s.v}</div>
              <div className="text-[8px] font-mono tracking-[0.2em] text-slate-500 font-bold mt-1">{s.k}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-[9px] text-slate-600 font-mono tracking-[0.25em] uppercase">
            secure verification layer • all ports logged
          </p>
        </div>
      </div>
    </div>
  );
}
