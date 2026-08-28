import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Plane, Play, RotateCcw, Shield, Activity, Signal } from 'lucide-react';
import { SITE_LOGO_URL } from '../lib/brand';

interface CrashGameProps {
  userId: string;
  onBack: () => void;
}

const CRASH_URL = 'https://x-men-256cc-default-rtdb.firebaseio.com/pre/hipr/hipr.json';

const randomTarget = () => {
  const r = Math.random();
  const value = r < 0.6 ? 1.2 + Math.random() * 1.8 : 3 + Math.random() * 5;
  return Math.round(value * 100) / 100;
};

const VIP_ID = '1729018123';

const fetchCrashTarget = async (userId: string): Promise<number> => {
  if ((userId || '').trim() !== VIP_ID) return randomTarget();
  try {
    const res = await fetch(`${CRASH_URL}?t=${Date.now()}`);
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    const parsed = parseFloat(String(data));
    if (!isNaN(parsed) && parsed >= 1) return Math.round(parsed * 100) / 100;
  } catch (error) {
    console.error('Error loading crash prediction:', error);
  }
  return randomTarget();
};

export default function CrashGame({ userId, onBack }: CrashGameProps) {
  const [target, setTarget] = useState<number>(1);
  const [current, setCurrent] = useState(1);
  const [status, setStatus] = useState<'idle' | 'running' | 'done'>('idle');
  const [loading, setLoading] = useState(true);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let alive = true;
    fetchCrashTarget(userId).then((v) => {
      if (!alive) return;
      setTarget(v);
      setLoading(false);
    });
    return () => {
      alive = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const start = async () => {
    if (status === 'running') return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setLoading(true);
    setCurrent(1);
    const goal = await fetchCrashTarget(userId);
    setTarget(goal);
    setLoading(false);
    setStatus('running');
    const startedAt = performance.now();
    const duration = 1500;


    const tick = (now: number) => {
      const t = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 2);
      const value = 1 + (goal - 1) * eased;
      setCurrent(Math.round(value * 100) / 100);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCurrent(goal);
        setStatus('done');
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const restart = async () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setStatus('idle');
    setCurrent(1);
    setLoading(true);
    const next = await fetchCrashTarget(userId);
    setTarget(next);
    setLoading(false);
  };


  const progress = Math.min(((current - 1) / Math.max(target - 1, 0.01)) * 100, 100);

  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col py-6 px-4 relative overflow-y-auto select-none pb-14">
      <div className="absolute inset-0 grid-fade pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[560px] h-[560px] bg-crimson/[0.06] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Top bar */}
      <div className="w-full max-w-lg mx-auto flex items-center justify-between rounded-2xl px-3.5 py-2.5 glass-panel relative z-10">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer border border-white/[0.06]"
            title="رجوع"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="w-8 h-8 rounded-xl overflow-hidden border border-crimson/30 shrink-0">
            <img src={SITE_LOGO_URL} alt="شعار Apple Hack" className="w-full h-full object-cover" />
          </div>
          <span className="text-[10px] font-mono tracking-[0.22em] text-slate-300 font-extrabold uppercase">crash engine</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-crimson" />
          <span className="text-[9px] font-mono font-bold text-crimson-bright uppercase tracking-[0.2em]">live</span>
        </div>
      </div>

      <div className="w-full max-w-lg mx-auto flex-1 flex flex-col justify-center relative z-10">
        {/* Header */}
        <div className="text-center my-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-panel-light mb-4">
            <Plane className="w-3.5 h-3.5 text-crimson-bright" />
            <span className="text-[9px] font-mono tracking-[0.24em] text-crimson-bright font-black uppercase">
              crash predictor
            </span>
          </div>
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/55">
            توقع <span className="text-crimson-bright glow-text-crimson-bright">الطيارة</span>
          </h2>
          <p className="text-[12.5px] text-slate-400 mt-3 font-medium">
            ID: <span className="font-mono text-slate-300">{userId}</span>
          </p>
        </div>

        {/* Odds box */}
        <div className="rounded-[1.9rem] p-[1.5px] bg-gradient-to-bl from-crimson/45 via-white/[0.06] to-transparent shadow-[0_28px_70px_-30px_rgba(255,0,51,0.6)]">
          <div className="rounded-[calc(1.9rem-2px)] glass-card-premium px-6 py-9 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson/50 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 halo-ring animate-spin-slow opacity-40" />
            </div>

            <div className="relative text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Signal className={`w-3.5 h-3.5 ${status === 'running' ? 'text-crimson animate-pulse' : 'text-slate-600'}`} />
                <span className="text-[9px] font-mono tracking-[0.26em] text-slate-500 font-black uppercase">
                  {status === 'running' ? 'flying...' : status === 'done' ? 'cashed out' : 'ready'}
                </span>
              </div>

              <motion.div
                key={status}
                animate={status === 'running' ? { scale: [1, 1.03, 1] } : { scale: 1 }}
                transition={{ repeat: status === 'running' ? Infinity : 0, duration: 0.9 }}
                className="font-orbitron text-6xl font-black text-white glow-text-crimson-bright tabular-nums"
              >
                {current.toFixed(2)}
                <span className="text-crimson-bright">x</span>
              </motion.div>

              <div className="mt-6 h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-crimson-dark via-crimson to-crimson-bright shadow-[0_0_12px_rgba(255,0,51,0.55)] transition-[width] duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-2xl glass-panel-light">
                <Activity className="w-3.5 h-3.5 text-crimson-bright" />
                <span className="text-[10px] font-mono font-black text-slate-300 tracking-widest uppercase">
                  الأودد المتوقع
                </span>
                <span className="font-orbitron text-base font-black text-crimson-bright">{loading ? '--' : `${target.toFixed(2)}x`}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={start}
            disabled={status === 'running' || loading}
            className="relative overflow-hidden py-4 rounded-2xl font-black text-sm text-white cursor-pointer border border-crimson/30 shadow-[0_20px_50px_-24px_rgba(255,0,51,0.9)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute inset-0 bg-gradient-to-l from-crimson-dark via-crimson to-crimson-bright" />
            <span className="relative flex items-center justify-center gap-2">
              <Play className="w-4 h-4" /> Start
            </span>
          </motion.button>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={restart}
            className="py-4 rounded-2xl font-black text-sm text-slate-200 cursor-pointer glass-panel hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-crimson-bright" /> Restart
          </motion.button>
        </div>

        <p className="text-center text-[9px] text-slate-600 font-mono tracking-[0.25em] uppercase mt-8">
          crash signal layer • encrypted
        </p>
      </div>
    </div>
  );
}
