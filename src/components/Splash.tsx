import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Lock, Radar, ShieldCheck } from 'lucide-react';
import { SITE_LOGO_URL } from '../lib/brand';

interface SplashProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  'تهيئة النواة الآمنة',
  'ربط خوادم PariPulse',
  'فك تشفير مصفوفة التوقعات',
  'تجهيز محرك الطيارة',
];

export default function Splash({ onComplete }: SplashProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2600;
    const intervalTime = 20;
    const increment = (100 / duration) * intervalTime;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 220);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  const stage = Math.min(BOOT_LINES.length - 1, Math.floor((progress / 100) * BOOT_LINES.length));

  return (
    <div
      id="splash-screen"
      className="fixed inset-0 bg-black/70 backdrop-blur-[6px] flex flex-col justify-between py-14 px-6 select-none z-50 overflow-hidden"
    >
      {/* Ambience */}
      <div className="absolute inset-0 grid-fade pointer-events-none" />
      <div className="absolute top-[36%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] bg-crimson/15 rounded-full blur-[160px] pointer-events-none animate-pulse-slow" />
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Top status strip */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm mx-auto flex items-center justify-between rounded-2xl px-3.5 py-2 glass-panel relative z-10"
      >
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-ping" />
          <span className="text-[8.5px] font-mono tracking-[0.28em] text-slate-300 font-black uppercase">
            secure boot
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Lock className="w-3 h-3 text-crimson-bright" />
          <span className="text-[8.5px] font-mono tracking-[0.24em] text-crimson-bright font-black uppercase">
            encrypted
          </span>
        </div>
      </motion.div>

      {/* Center brand */}
      <div className="flex flex-col items-center relative z-10 my-auto">
        <motion.div
          initial={{ scale: 0.82, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-9"
        >
          {/* orbit rings */}
          <div className="absolute -inset-10 rounded-full opacity-70 blur-[1px] halo-ring animate-spin-slow" />
          <div className="absolute -inset-5 rounded-full border border-crimson/20" />
          <div className="absolute -inset-16 bg-crimson/20 rounded-full blur-3xl" />

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="relative w-36 h-36 rounded-[2.25rem] p-[1.5px] bg-gradient-to-br from-crimson via-crimson/25 to-transparent shadow-[0_28px_80px_-20px_rgba(255,0,51,0.65)]"
          >
            <div className="w-full h-full rounded-[calc(2.25rem-2px)] overflow-hidden bg-obsidian relative">
              <img src={SITE_LOGO_URL} alt="شعار Apple Hack" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-0 animate-shimmer" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[calc(2.25rem-2px)]" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h1 className="text-[2.7rem] font-black tracking-[0.24em] font-orbitron leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/35">
            APPLE <span className="text-crimson-bright glow-text-crimson-bright">HACK</span>
          </h1>
          <div className="mt-4 h-px w-40 mx-auto bg-gradient-to-r from-transparent via-crimson/60 to-transparent" />

          <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-light">
            <Radar className="w-3.5 h-3.5 text-crimson animate-pulse" />
            <span className="text-[9.5px] font-mono tracking-[0.3em] text-slate-300 font-bold uppercase">
              ai prediction core
            </span>
            <ShieldCheck className="w-3 h-3 text-crimson-bright" />
          </div>
        </motion.div>

        {/* mini metrics */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-8 grid grid-cols-3 gap-2.5 w-full max-w-xs"
        >
          {[
            { k: 'NODES', v: '48' },
            { k: 'LATENCY', v: '12ms' },
            { k: 'ACCURACY', v: '97%' },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl glass-panel-light px-2 py-2.5 text-center">
              <div className="text-sm font-black font-orbitron text-white glow-text-crimson">{s.v}</div>
              <div className="text-[7.5px] font-mono tracking-[0.2em] text-slate-500 font-bold mt-0.5">{s.k}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Loader */}
      <div className="w-full max-w-xs mx-auto flex flex-col items-center gap-3.5 relative z-10">
        <div className="w-full space-y-2.5">
          <div className="flex justify-between items-center text-[10px] font-mono tracking-wider text-slate-400 font-bold">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-crimson-bright animate-pulse" />
              {BOOT_LINES[stage]}
            </span>
            <span className="text-crimson-bright font-black tabular-nums">
              {Math.min(100, Math.round(progress))}%
            </span>
          </div>

          <div className="w-full h-[7px] rounded-full bg-white/[0.06] border border-white/[0.06] relative overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-75 relative bg-gradient-to-r from-crimson-dark via-crimson to-crimson-bright shadow-[0_0_18px_rgba(255,0,51,0.6)]"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 animate-shimmer rounded-full" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-crimson-bright rounded-full blur-[2px]" />
            </div>
          </div>
        </div>

        <div className="text-[9px] text-slate-600 font-mono tracking-[0.28em] uppercase">
          secure connection • by vip team
        </div>
      </div>
    </div>
  );
}
