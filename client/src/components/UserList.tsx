import { useSocket } from "@/context/Socket";
import { Pencil } from "lucide-react";

export default function UserList() {
    const { knownUsers } = useSocket();

    return (
        <div className="flex flex-col w-[15%] h-full bg-surface">
            <h2 className="text-lg font-semibold p-2 text-center">Users</h2>
            <ul className="w-full overflow-y-auto flex-1 p-2">
                {knownUsers.map((user, index) => (
                    <li
                        key={index}
                        className="flex items-center justify-between w-full p-2 my-1"
                    >
                        <span>{user.username}</span>
                        <div className="flex items-center">
                            {user.isTyping && (
                                <span className="inline-block animate-pulse text-gray-500">
                                    <Pencil className="inline-block mr-1" size={16} />
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
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
