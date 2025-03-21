'use client'

import Cookies from "js-cookie";
import React from "react";

export default function UsernamePrompt() {
    
    const [username, setUsername] = React.useState<string>("");
    const [room, setRoom] = React.useState<string>("");

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoom(e.target.value);
    };

    const handleSubmit = () => {
        if (username && room) {
            Cookies.set("username", username, { expires: 7 });
            Cookies.set("room", room, { expires: 7 });
            window.location.reload();
        }
    };

    return (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-50 z-50">
            <div className="bg-surface p-4 rounded shadow-lg text-accent">
                <h2 className="text-lg font-bold mb-2">Enter your username</h2>
                <input
                    type="text"
                    placeholder="Username"
                    className="border p-2 rounded w-full mb-4"
                    onChange={handleUsernameChange}
                />
                <input
                    type="text"
                    placeholder="Room"
                    className="border p-2 rounded w-full mb-4"
                    onChange={handleRoomChange}
                />
                <button
                    className="bg-accent text-black w-full px-4 py-2 rounded hover:bg-accent/80 transition duration-200 hover:cursor-pointer"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}