'use client'

import ChatInterface from "@/components/ChatInterface";
import UsernamePrompt from "@/components/UserPrompt";
import Cookies from "js-cookie";

export default function Home() {
    return (
        <main className="flex flex-col items-center w-full min-h-screen text-white bg-background">
            {!Cookies.get("username") && !Cookies.get("room") && (
                <UsernamePrompt />
            )}
            <ChatInterface />
        </main>
    );
}
