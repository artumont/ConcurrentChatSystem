import { useSocket } from "@/context/Socket";
import { useEffect, useRef } from "react";

export default function ChatMessages() {
    const { messageHistory } = useSocket();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messageHistory]);
    
    return (
        <div className="flex flex-col w-[85%] h-full overflow-y-auto clean-scrollbar p-4 gap-2">
            {messageHistory.map((message, index) => (
                <div key={index} className="flex flex-col p-2 bg-surface rounded-lg shadow-md">
                    <span className="text-sm text-gray-400">{message.username}</span>
                    <p className="text-lg">{message.content}</p>
                    <span className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</span>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}