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
        <div className="flex flex-row items-center w-full min-h-screen text-white bg-background">
            <div className="flex flex-col items-center">
                {/* Chat stuff here */}
            </div>
            {/* User list here */}
        </div>
    )
}