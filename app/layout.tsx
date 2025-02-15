import { createProfileAction, getProfileByUserIdAction } from "@/actions/profiles-actions";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/utilities/providers";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notes App",
  description: "A full-stack template for a notes app."
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();

  if (userId) {
    try {
      const res = await getProfileByUserIdAction(userId);
      if (!res.data) {
        await createProfileAction({ 
          userId,
          membership: "free" 
        });
      }
    } catch (error) {
      console.error("Error in profile setup:", error);
    }
  }

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Providers
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Toaster />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
