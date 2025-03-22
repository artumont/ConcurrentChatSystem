import { useSocket } from "@/context/Socket"

export default function ChatInput() {
    const { sendMessage, setTyping } = useSocket();

    return (
        <div className="flex flex-row gap-2 p-4 bg-surface">
            <input 
                id="messageInput"
                className="flex-1 p-2 rounded bg-background text-white" 
                type="text" 
                placeholder="Type a message..." 
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        if (e.currentTarget.value.trim() === "") {
                            return;
                        }
                        sendMessage(e.currentTarget.value);
                        e.currentTarget.value = "";
                    } else {
                        setTyping(true);
                    }
                }}
            />
            <button 
                className="bg-accent text-black px-4 py-2 rounded hover:bg-accent/80 transition duration-200" 
                onClick={() => {
                    const messageInput = document.getElementById("messageInput") as HTMLInputElement;

                    if (messageInput.value.trim() === "") {
                        return;
                    }

                    sendMessage(messageInput.value);
                    messageInput.value = "";
                }}
            >
                Send
            </button>
        </div>
    )
}
