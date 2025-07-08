import { browser } from "$app/environment"

export function useIsMac(): { readonly current: boolean } {
  const isMac = $derived(browser
    ? "userAgentData" in navigator
      ? navigator.userAgentData?.platform.includes("macOS")
      : navigator?.platform.includes("Mac")
    : false
  )

  return {
    get current(): boolean {
      return isMac
    },
  }
}
