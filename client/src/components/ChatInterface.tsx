import { useEffect, useRef } from "react"
import { useSocket } from "@/context/Socket"
import { usePopups } from "@/context/Popups";
import ChatMessages from "./ChatMessages";
import UserList from "./UserList";

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
        <div className="flex flex-row w-full min-h-screen text-white bg-background">
            <div className="flex flex-row w-full h-full items-center">
                <ChatMessages />
                <UserList />
            </div>
            {/* Chat input and other components will go here */}
        </div>
    )
}