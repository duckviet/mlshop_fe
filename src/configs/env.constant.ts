export const ENV = {
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_SERVER,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
};

export const ENV_TEST = {
  NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN ?? "google.com",
};
