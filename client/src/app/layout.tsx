import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { SocketProvider } from "@/context/Socket";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { PopupsProvider } from "@/context/Popups";

const jetBrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
    title: "ConcurrentChatSytem",
    description: "A chat system built with Next.js and Elixir",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${jetBrainsMono.variable} antialiased`}
            >
                <PopupsProvider>
                    <SocketProvider>
                        {children}
                        <Toaster />
                    </SocketProvider>
                </PopupsProvider>
            </body>
        </html>
    );
}
