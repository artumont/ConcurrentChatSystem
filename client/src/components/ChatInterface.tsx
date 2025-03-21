import { useEffect, useRef } from "react"
import { useSocket } from "@/context/Socket"
import { usePopups } from "@/context/Popups";

export default function ChatInterface() {
    const { joinRoom } = useSocket();
    const hasConnected = useRef(false);

    useEffect(() => {
        if (!hasConnected.current) {
            hasConnected.current = true;
            joinRoom();
        }

        return () => {};
    }, [joinRoom]);
    
    return (
        <div className="flex flex-col items-center w-full min-h-screen text-white bg-background">
            <h1 className="text-2xl font-bold">Chat Interface</h1>
        </div>
    )
}