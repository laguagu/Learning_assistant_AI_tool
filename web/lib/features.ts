// lib/features.ts
export interface FeatureFlags {
  modules: {
    module1: boolean;
    module2: boolean;
    module3: boolean;
    module4: boolean;
    module5: boolean;
  };
  components: {
    chatAssistant: boolean;
    optionsMenu: boolean;
  };
  quiz: {
    enabled: boolean;
  };
}

/**
 * Returns the current feature flag configuration based on environment variables
 */
export function getFeatureFlags(): FeatureFlags {
  // When on server side
  if (typeof window === "undefined") {
    return {
      modules: {
        module1: process.env.ENABLE_MODULE_1 !== "false", // Enabled by default
        module2: process.env.ENABLE_MODULE_2 === "true",
        module3: process.env.ENABLE_MODULE_3 === "true",
        module4: process.env.ENABLE_MODULE_4 === "true",
        module5: process.env.ENABLE_MODULE_5 === "true",
      },
      components: {
        chatAssistant: process.env.ENABLE_CHAT_ASSISTANT !== "false", // Enabled by default
        optionsMenu: process.env.ENABLE_OPTIONS_MENU !== "false", // Enabled by default
      },
      quiz: {
        enabled: process.env.ENABLE_QUIZ !== "false", // Enabled by default
      },
    };
  }

  // On client side, use window object if available (set during SSR)
  if (typeof window !== "undefined" && window.__FEATURE_FLAGS__) {
    return window.__FEATURE_FLAGS__;
  }

  // Default fallback for client-side if window object is not set
  return {
    modules: {
      module1: true, // Module 1 is always enabled by default
      module2: false,
      module3: false,
      module4: false,
      module5: false,
    },
    components: {
      chatAssistant: false, // Disabled by default as requested
      optionsMenu: false, // Disabled by default as requested
    },
    quiz: {
      enabled: true,
    },
  };
}

// For client-side access to feature flags
declare global {
  interface Window {
    __FEATURE_FLAGS__?: FeatureFlags;
  }
}

/**
 * Helper functions to check specific features
 */
export function isModuleEnabled(moduleNumber: number): boolean {
  const flags = getFeatureFlags();

  switch (moduleNumber) {
    case 1:
      return flags.modules.module1;
    case 2:
      return flags.modules.module2;
    case 3:
      return flags.modules.module3;
    case 4:
      return flags.modules.module4;
    case 5:
      return flags.modules.module5;
    default:
      return false;
  }
}

export function isChatAssistantEnabled(): boolean {
  return getFeatureFlags().components.chatAssistant;
}

export function isOptionsMenuEnabled(): boolean {
  return getFeatureFlags().components.optionsMenu;
}

export function isQuizEnabled(): boolean {
  return getFeatureFlags().quiz.enabled;
}
