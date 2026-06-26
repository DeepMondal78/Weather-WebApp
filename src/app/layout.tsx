import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Weather Matrix App",
  description: "Next-gen Hyper Creative Weather Dashboard App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-neutral-950 selection:bg-cyan-500/30 selection:text-cyan-400">
      <body className="h-full text-white antialiased antialiased-none">{children}</body>
    </html>
  );
}