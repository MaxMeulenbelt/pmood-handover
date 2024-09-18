/**
 * Defines the navigation route names, and any navigation parameters (undefined if none).
 * See https://reactnavigation.org/docs/typescript/ for more info.
 */
type RootStackParamList = {
  Onboarding: undefined
  OnboardingChat: undefined
  SplashScreen: undefined
  SignIn: undefined
  TaskSelection: undefined
  EmotionSensitivity: undefined
  EmoSensResults: { accuracy: number; arTime: number }
  MemoryRecall: undefined
  MemoryResults: { recalledWords: number }
  PanasTask: undefined
  ReinforcementLearning: undefined
  RLResults: { score: number }
  DelayDiscounting: undefined
  DelayResults: { now: number; later: number }
  EffortExpenditure: undefined
  EffortResults: { successRate: number; hardRate: number; score: number }
  SlotMachine: undefined
  Settings: undefined
  Licenses: undefined
  Profile: undefined
  PDDQuiz: undefined
}

export default RootStackParamList
