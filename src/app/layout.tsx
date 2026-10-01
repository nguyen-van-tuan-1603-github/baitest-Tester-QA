import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "TestPilot AI | QA workspace", description: "AI-powered test design and browser automation workspace." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
