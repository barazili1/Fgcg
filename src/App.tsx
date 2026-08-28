import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AppScreen, type ToastMessage } from "./types";
import Splash from "./components/Splash";
import ChoosePlatform from "./components/ChoosePlatform";
import ConditionPage from "./components/ConditionPage";
import ChooseGame, { type GameKind } from "./components/ChooseGame";
import CrashGame from "./components/CrashGame";
import PredictionScreen from "./components/PredictionScreen";
import ToastContainer from "./components/Toast";

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.SPLASH);
  const [userId, setUserId] = useState<string>("");
  const [platform, setPlatform] = useState<"paripulse" | "megapari">("paripulse");
  const [subPlatform, setSubPlatform] = useState<string>("paripulse vip");
  const [, setGeneratedKey] = useState<string>("");
  const [, setPrefilledPassword] = useState<string>("");
  const [, setIsLoggedIn] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch((err) => {
          console.warn("Video play was prevented by browser security.", err);
        });
      }
    };

    playVideo();

    const handleInteraction = () => {
      playVideo();
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  const addToast = (_text: string, _type: "success" | "error" | "info" = "success") => {};

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSplashComplete = () => {
    setCurrentScreen(AppScreen.CHOOSE_PLATFORM);
  };

  const handleSelectPlatform = (selectedPlatform: "paripulse" | "megapari") => {
    setPlatform(selectedPlatform);
    setSubPlatform(selectedPlatform + " vip");
    setCurrentScreen(AppScreen.CONDITION);
  };

  const handleConditionSubmit = (
    enteredUserId: string,
    chosenPlatform: "paripulse" | "megapari",
    chosenSubPlatform: string,
    _depositImg: string,
    _promoImg: string,
  ) => {
    setUserId(enteredUserId);
    setPlatform(chosenPlatform);
    setSubPlatform(chosenSubPlatform);
    setIsLoggedIn(true);
    setCurrentScreen(AppScreen.CHOOSE_GAME);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setGeneratedKey("");
    setPrefilledPassword("");
    setUserId("");
    setCurrentScreen(AppScreen.CHOOSE_PLATFORM);
  };

  return (
    <div className="sleek-app-bg min-h-screen text-slate-100 font-sans select-none overflow-x-hidden relative">
      <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden bg-black">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60 animate-fade-in"
        >
          <source
            src="https://www.image2url.com/r2/default/videos/1783966636085-b5e564d8-3dbe-4413-973f-6486eba32365.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <AnimatePresence mode="wait">
        {currentScreen === AppScreen.SPLASH && (
          <motion.div key="splash" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <Splash onComplete={handleSplashComplete} />
          </motion.div>
        )}

        {currentScreen === AppScreen.CHOOSE_PLATFORM && (
          <motion.div
            key="choose-platform"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <ChoosePlatform onSelect={handleSelectPlatform} onBack={() => setCurrentScreen(AppScreen.SPLASH)} />
          </motion.div>
        )}

        {currentScreen === AppScreen.CONDITION && (
          <motion.div
            key="condition"
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.4 }}
          >
            <ConditionPage
              initialPlatform={platform}
              onBack={() => setCurrentScreen(AppScreen.CHOOSE_PLATFORM)}
              onSubmit={handleConditionSubmit}
              addToast={addToast}
            />
          </motion.div>
        )}

        {currentScreen === AppScreen.CHOOSE_GAME && (
          <motion.div
            key="choose-game"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <ChooseGame
              onSelect={(game: GameKind) =>
                setCurrentScreen(game === "crash" ? AppScreen.CRASH_GAME : AppScreen.MAIN_PREDICTION)
              }
              onBack={() => setCurrentScreen(AppScreen.CONDITION)}
            />
          </motion.div>
        )}

        {currentScreen === AppScreen.CRASH_GAME && (
          <motion.div
            key="crash"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <CrashGame
              userId={userId || "GUEST_VIP_USER"}
              onBack={() => setCurrentScreen(AppScreen.CHOOSE_GAME)}
            />
          </motion.div>
        )}

        {currentScreen === AppScreen.MAIN_PREDICTION && (
          <motion.div
            key="prediction"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <PredictionScreen
              userId={userId || "GUEST_VIP_USER"}
              platform={platform}
              subPlatform={subPlatform}
              onLogout={() => setCurrentScreen(AppScreen.CHOOSE_GAME)}
              addToast={addToast}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

