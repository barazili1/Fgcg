export enum AppScreen {
  SPLASH = 'SPLASH',
  LOGIN = 'LOGIN',
  CONDITION = 'CONDITION',
  KEY_SCREEN = 'KEY_SCREEN',
  MAIN_PREDICTION = 'MAIN_PREDICTION',
  CHOOSE_PLATFORM = 'CHOOSE_PLATFORM',
  CHOOSE_GAME = 'CHOOSE_GAME',
  CRASH_GAME = 'CRASH_GAME',
}

export interface UserState {
  userId: string;
  activationKey: string;
  isActivated: boolean;
  platform: 'paripulse' | 'megapari';
  subPlatform?: string;
  screenshotDeposit: string | null;
  screenshotPromocode: string | null;
  tasksCompleted: {
    telegram: boolean;
    youtube: boolean;
    install: boolean;
  };
}

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'error' | 'info';
}
