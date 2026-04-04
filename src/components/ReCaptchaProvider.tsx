'use client';

import { createContext, useContext } from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

type ExecuteFn = ((action: string) => Promise<string>) | null;

// Safe context — null when reCAPTCHA is not configured
const RecaptchaContext = createContext<ExecuteFn>(null);

// Internal bridge: lives inside GoogleReCaptchaProvider, exposes executeRecaptcha via our context
function RecaptchaBridge({ children }: { children: React.ReactNode }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  return (
    <RecaptchaContext.Provider value={executeRecaptcha ?? null}>
      {children}
    </RecaptchaContext.Provider>
  );
}

/** Use this hook in forms instead of useGoogleReCaptcha directly. Returns null when unconfigured. */
export function useRecaptcha(): ExecuteFn {
  return useContext(RecaptchaContext);
}

export function ReCaptchaProvider({ children }: { children: React.ReactNode }) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    // No key configured — provide null context, forms will skip verification
    return <RecaptchaContext.Provider value={null}>{children}</RecaptchaContext.Provider>;
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey} useEnterprise={false}>
      <RecaptchaBridge>{children}</RecaptchaBridge>
    </GoogleReCaptchaProvider>
  );
}
