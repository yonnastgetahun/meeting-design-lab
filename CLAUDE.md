# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Meeting Design Lab is a Next.js application that provides a two-part diagnostic assessment tool for evaluating personal productivity and team meeting effectiveness. The app uses a weighted scoring system to calculate metrics like burnout risk, productivity loss, and provides personalized insights based on user responses.

## Commands

```bash
# Development
npm run dev      # Start development server on http://localhost:3000

# Production
npm run build    # Create production build
npm run start    # Start production server

# Code Quality
npm run lint     # Run ESLint checks

# No test commands are configured
```

## Architecture

### Tech Stack

- **Framework**: Next.js 15.3.5 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with custom Pulse color theme
- **Forms**: React Hook Form
- **Analytics**: Vercel Analytics, Google Analytics, Meta Pixel

### Key Components

1. **Diagnostic Flow** (`/components/Calculator/DiagnosticFlowV2.tsx`)
   - Two-part assessment: personal productivity and team effectiveness
   - Weighted scoring system (1-3 impact weights per question)
   - Progress tracking with visual indicators
   - Mini-insights between sections

2. **Calculations** (`/lib/calculations.ts`)
   - `calculatePersonalMetrics()`: Burnout risk, deep work loss, context switching cost
   - `calculateTeamMetrics()`: Meeting ROI, collaboration effectiveness, time waste
   - `calculateWeightedScore()`: Applies impact weights to raw scores

3. **Question Structure** (`/lib/diagnosticQuestions.ts`)
   - Questions have weight property (1=low, 2=medium, 3=high impact)
   - Each option has a score (0-10 scale)
   - Two parts: personal (8 questions) and team (10 questions)

4. **Email Integration** (`/app/api/convertkit/route.ts`)
   - ConvertKit API integration for email capture
   - Tags subscribers with score ranges and categories
   - Server-side API route to protect API keys

### Important Patterns

1. **State Management**
   - Form state managed by React Hook Form
   - Answers stored as Map<questionId, score>
   - Progress tracked separately for each part

2. **Scoring System**
   - Raw scores: 0-10 per question
   - Weighted scores: raw score × question weight
   - Final percentages calculated from weighted totals

3. **Component Organization**
   - `/components/UI/`: Reusable UI primitives (Gauge, ProgressBar, etc.)
   - `/components/diagnostic/`: Assessment-specific components
   - `/components/EmailCapture/`: Email form variants

4. **Analytics Events**
   - Track diagnostic starts, completions, and scores
   - Category assignments for segmentation
   - Custom events for user interactions

## Environment Variables

Required for production:

- `NEXT_PUBLIC_CONVERTKIT_API_KEY`: ConvertKit API key
- `NEXT_PUBLIC_CONVERTKIT_FORM_ID`: ConvertKit form ID
- Analytics IDs configured in components

## Development Notes

- The project is actively being refactored (feature/two-part-diagnostic-refactor branch)
- No test framework is currently configured
- Custom fonts are loaded via next/font/google and next/font/local
- PWA support files have been added (manifest, icons)
- The app uses server-side API routes for secure third-party integrations