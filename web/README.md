# Learning Assistant AI Tool

A web-based learning assistant tool built with Next.js that uses Supabase for backend services and authentication.

## Overview

This learning assistant helps users track their progress through educational modules and provides interactive features like quizzes and milestones.

## Technology Stack

- **Frontend**: Next.js
- **Backend Services**: Supabase
- **Styling**: Tailwind CSS
- **Deployment Options**: Local and Rahti environments

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Configure environment variables by creating a `.env.local` file based on the template
4. Run the development server:
   ```bash
   pnpm dev
   ```

## Environment Configuration

The application uses environment variables for configuration. See `.env.local` for a template with the required variables.

## Feature Flags

The application uses a feature flag system to enable or disable specific features. These can be configured through environment variables:

### Module Access Flags

| Flag     | Environment Variable | Default | Description                              |
| -------- | -------------------- | ------- | ---------------------------------------- |
| Module 1 | `ENABLE_MODULE_1`    | `true`  | First module (always enabled by default) |
| Module 2 | `ENABLE_MODULE_2`    | `false` | Second module                            |
| Module 3 | `ENABLE_MODULE_3`    | `false` | Third module                             |
| Module 4 | `ENABLE_MODULE_4`    | `false` | Fourth module                            |

### Component Flags

| Flag           | Environment Variable    | Default | Description                           |
| -------------- | ----------------------- | ------- | ------------------------------------- |
| Chat Assistant | `ENABLE_CHAT_ASSISTANT` | `false` | Enables the AI chat assistant feature |
| Options Menu   | `ENABLE_OPTIONS_MENU`   | `false` | Enables the advanced options menu     |

### Feature Flags

| Flag | Environment Variable | Default | Description                    |
| ---- | -------------------- | ------- | ------------------------------ |
| Quiz | `ENABLE_QUIZ`        | `true`  | Enables the quiz functionality |

## Accessing Feature Flags in Code

Feature flags can be accessed in the code using the helper functions from the `lib/features.ts` file:

```typescript
import {
  isModuleEnabled,
  isChatAssistantEnabled,
  isQuizEnabled,
} from "@/lib/features";

// Check if a specific module is enabled
if (isModuleEnabled(1)) {
  // Module 1 specific code
}

// Check if the chat assistant is enabled
if (isChatAssistantEnabled()) {
  // Render chat assistant
}

// Check if quizzes are enabled
if (isQuizEnabled()) {
  // Show quiz functionality
}
```

## Deployment

The application can be deployed in different environments:

- **Local**: For development purposes
- **Rahti**: For production deployment

Set the `DEPLOYMENT_ENV` environment variable accordingly.
