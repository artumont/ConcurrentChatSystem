import { useEffect, useRef } from "react"
import { useSocket } from "@/context/Socket"
import ChatMessages from "./ChatMessages";
import UserList from "./UserList";
import ChatInput from "./ChatInput";

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
        <div className="flex flex-col w-full h-screen text-white bg-background">
            <div className="flex flex-row flex-1 overflow-hidden">
                <ChatMessages />
                <UserList />
            </div>
            <ChatInput />
        </div>
    )
}
