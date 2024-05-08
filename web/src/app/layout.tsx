import { fetchSettingsSS } from "@/components/settings/lib";
import "./globals.css";

import { Montserrat } from "next/font/google";
import { SettingsProvider } from "@/components/settings/SettingsProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Danswer",
  description: "Question answering for your documents",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const combinedSettings = await fetchSettingsSS();

  return (
    <html lang="en">
      <body
        className={`${
          montserrat.variable
        } font-sans text-default bg-background dark:bg-background-dark dark:text-default-dark ${
          // TODO: remove this once proper dark mode exists
          process.env.THEME_IS_DARK?.toLowerCase() === "true" ? "dark" : ""
        }`}
      >
        <SettingsProvider settings={combinedSettings}>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
