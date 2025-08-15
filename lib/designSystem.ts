// lib/designSystem.ts
export interface StatusResult {
  emoji: string
  text: string
  subtitle: string
  color: string
  actionText: string
}

export function getStatus(score: number, type: 'personal' | 'team'): StatusResult {
  if (type === 'personal') {
    if (score >= 75) {
      return { 
        emoji: '🚀', 
        text: 'Peak Performance', 
        subtitle: 'You\'re optimizing your energy effectively and maintaining high productivity levels.',
        color: 'green',
        actionText: 'Maintain this momentum with advanced strategies'
      }
    }
    
    if (score >= 50) {
      return { 
        emoji: '⚠️', 
        text: 'Energy Improvement Needed', 
        subtitle: 'Small adjustments to your meeting habits can unlock significant productivity gains.',
        color: 'yellow',
        actionText: 'Get personalized recommendations to boost performance'
      }
    }
    
    return { 
      emoji: '🔥', 
      text: 'Burnout Risk Detected', 
      subtitle: 'Your current meeting load is unsustainable and requires immediate attention.',
      color: 'red',
      actionText: 'Get urgent action plan to prevent burnout'
    }
  }

  // Team variant
  if (score >= 75) {
    return { 
      emoji: '🏆', 
      text: 'High-Velocity Team', 
      subtitle: 'Your team is operating at peak performance with excellent meeting culture.',
      color: 'green',
      actionText: 'Scale these practices across your organization'
    }
  }
  
  if (score >= 50) {
    return { 
      emoji: '🚧', 
      text: 'Momentum Blocked', 
      subtitle: 'Your team\'s potential is being limited by inefficient meeting practices.',
      color: 'yellow',
      actionText: 'Unlock your team\'s full potential'
    }
  }
  
  return { 
    emoji: '🐌', 
    text: 'Significant Barriers', 
    subtitle: 'Major meeting inefficiencies are severely hampering team performance.',
    color: 'red',
    actionText: 'Transform your meeting culture immediately'
  }
}

// Color system for consistent theming
export const pulseColors = {
  coral: '#FF6B47',
  cream: '#FDF7F4',
  charcoal: '#2D3748',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827'
  },
  status: {
    green: '#10B981',
    yellow: '#F59E0B',
    red: '#EF4444',
    blue: '#3B82F6',
    purple: '#8B5CF6',
    orange: '#F97316'
  }
}

// Typography scale
export const typography = {
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem'   // 36px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75'
  }
}

// Spacing system
export const spacing = {
  px: '1px',
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem'      // 96px
}

// Component styles
export const componentStyles = {
  button: {
    primary: `
      bg-pulse-coral 
      text-white 
      font-semibold 
      py-3 
      px-4 
      rounded-lg 
      hover:bg-pulse-coral/90 
      transition-colors 
      disabled:opacity-50 
      disabled:cursor-not-allowed
      focus:outline-none 
      focus:ring-2 
      focus:ring-pulse-coral 
      focus:ring-offset-2
    `,
    secondary: `
      bg-white 
      text-pulse-coral 
      border 
      border-pulse-coral 
      font-semibold 
      py-3 
      px-4 
      rounded-lg 
      hover:bg-pulse-coral/5 
      transition-colors
      focus:outline-none 
      focus:ring-2 
      focus:ring-pulse-coral 
      focus:ring-offset-2
    `,
    ghost: `
      bg-transparent 
      text-gray-600 
      font-medium 
      py-2 
      px-3 
      rounded-lg 
      hover:text-gray-800 
      hover:bg-gray-50 
      transition-colors
      focus:outline-none 
      focus:ring-2 
      focus:ring-gray-300 
      focus:ring-offset-1
    `
  },
  card: {
    default: `
      bg-white 
      rounded-lg 
      border 
      border-gray-200 
      shadow-sm 
      p-4
    `,
    elevated: `
      bg-white 
      rounded-lg 
      border 
      border-gray-200 
      shadow-md 
      p-4
    `,
    status: (color: string) => `
      bg-${color}-50 
      border-${color}-200 
      text-${color}-600 
      rounded-lg 
      border 
      p-4
    `
  },
  input: {
    default: `
      w-full 
      px-3 
      py-2 
      border 
      border-gray-300 
      rounded-lg 
      focus:outline-none 
      focus:ring-2 
      focus:ring-pulse-coral 
      focus:border-transparent 
      disabled:bg-gray-50 
      disabled:cursor-not-allowed
    `,
    error: `
      w-full 
      px-3 
      py-2 
      border 
      border-red-300 
      rounded-lg 
      focus:outline-none 
      focus:ring-2 
      focus:ring-red-500 
      focus:border-transparent
    `
  }
}

// Accessibility helpers
export const a11y = {
  // Screen reader only content
  srOnly: 'sr-only',
  
  // Focus visible styles
  focusVisible: 'focus:outline-none focus:ring-2 focus:ring-offset-2',
  
  // Minimum touch target size (44px)
  touchTarget: 'min-h-[44px] min-w-[44px]',
  
  // Color contrast helpers
  highContrast: {
    text: 'text-gray-900',
    background: 'bg-white',
    border: 'border-gray-900'
  }
}

// Animation utilities
export const animations = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  pulse: 'animate-pulse',
  spin: 'animate-spin',
  
  // Custom timing functions
  easing: {
    default: 'transition-all duration-200 ease-in-out',
    fast: 'transition-all duration-150 ease-in-out',
    slow: 'transition-all duration-300 ease-in-out'
  }
}

// Responsive breakpoints
export const breakpoints = {
  sm: '640px',   // Small devices
  md: '768px',   // Medium devices
  lg: '1024px',  // Large devices
  xl: '1280px',  // Extra large devices
  '2xl': '1536px' // 2X Large devices
}

// Layout utilities
export const layout = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-12 sm:py-16 lg:py-20',
  grid: {
    cols1: 'grid grid-cols-1',
    cols2: 'grid grid-cols-1 md:grid-cols-2',
    cols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    cols4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  },
  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    start: 'flex items-start',
    column: 'flex flex-col'
  }
}

// Helper functions
export const designHelpers = {
  // Get score-based color
  getScoreColor: (score: number): string => {
    if (score >= 75) return 'green'
    if (score >= 50) return 'yellow'
    if (score >= 25) return 'orange'
    return 'red'
  },
  
  // Format score for display
  formatScore: (score: number): string => {
    return `${Math.round(score)}%`
  },
  
  // Get contrast text color for background
  getContrastText: (backgroundColor: string): string => {
    // Simple implementation - in production, use a proper contrast calculation
    const darkBackgrounds = ['red', 'blue', 'purple', 'gray-800', 'gray-900']
    return darkBackgrounds.includes(backgroundColor) ? 'white' : 'black'
  },
  
  // Truncate text with ellipsis
  truncate: (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength - 3) + '...'
  }
}

export default {
  colors: pulseColors,
  typography,
  spacing,
  componentStyles,
  a11y,
  animations,
  breakpoints,
  layout,
  helpers: designHelpers,
  getStatus
}