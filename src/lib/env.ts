export function getRequiredServerEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing server env: ${name}`);
  return v;
}

export function getOptionalPublicEnv(name: string): string | undefined {
  return process.env[name];
}

export function isAnalyticsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true";
}
