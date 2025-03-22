'use client'

import ChatInterface from "@/components/ChatInterface";
import UsernamePrompt from "@/components/UserPrompt";
import Cookies from "js-cookie";

export default function Home() {
    return (
        <main className="flex flex-col items-center w-full min-h-screen text-white bg-background font-jetbrains-mono">
            {!Cookies.get("username") && !Cookies.get("room") && (
                <UsernamePrompt />
            )}
            {Cookies.get("username") && Cookies.get("room") && (
                <ChatInterface />
            )}
        </main>
    );
}
