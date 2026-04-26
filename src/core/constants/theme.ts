import type { Theme } from '../types/common'

type ThemeClasses = {
  app: string
  header: string
  shellCard: string
  mutedText: string
  titleText: string
  control: string
  controlActive: string
}

export const themeClasses: Record<Theme, ThemeClasses> = {
  light: {
    app: 'bg-[#E5E5E5] text-[#4A4A4A]',
    header: 'border-[#C9C9C9] bg-[#D1D1D1]/90',
    shellCard: 'border-[#C9C9C9] bg-[#D1D1D1]',
    mutedText: 'text-[#4A4A4A]',
    titleText: 'text-[#000000]',
    control: 'border-[#C9C9C9] bg-[#E5E5E5] text-[#000000]',
    controlActive: 'border-[#98C379] bg-[#98C379]/20 text-[#000000]',
  },
  dark: {
    app: 'bg-[#212121] text-[#9E9E9E]',
    header: 'border-[#2B2B2B] bg-[#212121]/90',
    shellCard: 'border-[#2B2B2B] bg-[#212121]',
    mutedText: 'text-[#9E9E9E]',
    titleText: 'text-[#E0E0E0]',
    control: 'border-[#3A3A3A] bg-[#2A2A2A] text-[#E0E0E0]',
    controlActive: 'border-[#7DA369] bg-[#7DA369]/20 text-[#E0E0E0]',
  },
}
