import { useSocket } from "@/context/Socket";

export default function UserList() {
    const { knownUsers } = useSocket();

    return (
        <div className="flex flex-col w-[20%] h-full p-2 bg-surface items-center min-h-screen">
            <h2 className="text-lg font-semibold">Users</h2>
            <ul className="w-full">
                {knownUsers.map((user, index) => (
                    <li
                        key={index}
                        className="flex items-center justify-between w-full p-2 my-1"
                    >
                        <span>{user.username}</span>
                        {user.isTyping && (
                            <span className="inline-block animate-pulse text-gray-500">
                                typing...
                            </span>
                        )}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-green-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <circle cx="10" cy="10" r="6" fill="currentColor" className="animate-pulse" />
                        </svg>
                    </li>
                ))}
            </ul>
        </div>
    );
}