import { motion } from 'motion/react';
import { ArrowLeft, Shield, Gamepad2, Plane, Apple, ChevronLeft } from 'lucide-react';
import { SITE_LOGO_URL } from '../lib/brand';

export type GameKind = 'apple' | 'crash';

interface ChooseGameProps {
  onSelect: (game: GameKind) => void;
  onBack: () => void;
}

const GAMES: {
  id: GameKind;
  title: string;
  subtitle: string;
  tag: string;
  icon: typeof Apple;
  logo: string;
}[] = [
  {
    id: 'apple',
    title: 'Apple of Fortune',
    subtitle: 'توقعات التفاحة الآمنة بالذكاء الاصطناعي',
    tag: 'classic engine',
    icon: Apple,
    logo: 'https://slotcatalog.com/userfiles/image/games/1xgames/39538/apple-of-fortune-7062143.webp',
  },
  {
    id: 'crash',
    title: 'Crash',
    subtitle: 'توقع معامل الطيارة قبل الانفجار',
    tag: 'live multiplier',
    icon: Plane,
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt7JiFKAx0Lqa9S1U1PgILwJ0LstyKqFjZDpqXkq8Xaw&s=10',
  },
];

export default function ChooseGame({ onSelect, onBack }: ChooseGameProps) {
  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col py-6 px-4 relative overflow-y-auto select-none pb-12">
      <div className="absolute inset-0 grid-fade pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[560px] h-[560px] bg-crimson/[0.06] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 vignette pointer-events-none" />

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
          <span className="text-[10px] font-mono tracking-[0.22em] text-slate-300 font-extrabold uppercase">
            game selection
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-crimson" />
          <span className="text-[9px] font-mono font-bold text-crimson-bright uppercase tracking-[0.2em]">secure</span>
        </div>
      </div>

      <div className="w-full max-w-lg mx-auto flex-1 flex flex-col justify-center relative z-10">
        <div className="text-center mb-9 mt-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-panel-light mb-4">
            <Gamepad2 className="w-3.5 h-3.5 text-crimson-bright" />
            <span className="text-[9px] font-mono tracking-[0.24em] text-crimson-bright font-black uppercase">
              choose your game
            </span>
          </div>
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/55">
            اختر <span className="text-crimson-bright glow-text-crimson-bright">اللعبة</span>
          </h2>
          <p className="text-[13px] text-slate-400 mt-3 max-w-xs mx-auto leading-relaxed font-medium">
            اختر اللعبة لتشغيل محرك التوقعات الخاص بها
          </p>
        </div>

        <div className="space-y-4">
          {GAMES.map((g, i) => {
            const Icon = g.icon;
            return (
              <motion.button
                key={g.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => onSelect(g.id)}
                className="w-full relative group text-right rounded-[1.75rem] p-[1.5px] bg-gradient-to-bl from-crimson/45 via-white/[0.06] to-transparent cursor-pointer shadow-[0_24px_60px_-25px_rgba(255,0,51,0.5)]"
              >
                <div className="rounded-[calc(1.75rem-2px)] px-5 py-6 glass-card-premium overflow-hidden flex items-center justify-between gap-4 transition-all group-hover:bg-crimson/[0.03]">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson/50 to-transparent" />

                  <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-crimson group-hover:border-crimson-bright group-hover:text-white transition-all shrink-0">
                    <ChevronLeft className="w-4.5 h-4.5 group-hover:-translate-x-0.5 transition-transform" />
                  </div>

                  <div className="flex items-center gap-4 flex-row-reverse text-right">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-black border border-crimson/25 shadow-lg group-hover:border-crimson/60 transition-all shrink-0 relative">
                      <img
                        src={g.logo}
                        alt={g.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0 right-0 p-1 rounded-tl-lg bg-black/70 text-crimson-bright">
                        <Icon className="w-3 h-3" />
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono tracking-[0.22em] text-crimson-bright font-extrabold uppercase">
                        {g.tag}
                      </span>
                      <h3 className="text-xl font-black text-white tracking-wide mt-0.5">{g.title}</h3>
                      <p className="text-[11.5px] text-slate-400 font-medium mt-1.5 leading-relaxed">{g.subtitle}</p>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-[9px] text-slate-600 font-mono tracking-[0.25em] uppercase">
            ai prediction engine • all sessions logged
          </p>
        </div>
      </div>
    </div>
  );
}
