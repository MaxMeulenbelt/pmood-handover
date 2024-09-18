type NavigationContextActions = {
  signIn: (username: string) => Promise<void>
  signOut: () => Promise<void>
  completedOnboarding: () => Promise<void>
}

export default NavigationContextActions
