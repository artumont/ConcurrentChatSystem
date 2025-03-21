'use client'

import Cookies from "js-cookie";
import { Socket, Channel } from 'phoenix';
import React, { createContext, useContext, useState } from "react";
import { usePopups } from "./Popups";

interface SocketContextType {
    socket: Socket | null;
    channel: Channel | null;
    isTyping: boolean;
    knownUsers: { username: string; isTyping: boolean }[];
    messageHistory: { user: string; content: string }[];
    joinRoom: () => boolean;
    sendMessage: (message: string) => void;
    setTyping: (isTyping: boolean) => void;
}

export const SocketContext = createContext<SocketContextType>({
    socket: null,
    channel: null,
    isTyping: false,
    knownUsers: [],
    messageHistory: [],
    joinRoom: () => false,
    sendMessage: () => { },
    setTyping: () => { }
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [channel, setChannel] = useState<Channel | null>(null);
    const [knownUsers, setKnownUsers] = useState<{ username: string; isTyping: boolean }[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const { showError, showSuccess } = usePopups();

    const [messageHistory, setMessageHistory] = useState<{ user: string; content: string }[]>([]);
    let typingTimeout: NodeJS.Timeout | null = null;
    const typingDelay = 3000;

    const joinRoom = () => {
        const room = Cookies.get("room");
        const username = Cookies.get("username");

        if (room && username) {
            if (socket?.isConnected()) {
                showError("Already connected to a room");
                return false;
            }
    
            let newSocket = new Socket("ws://localhost:4000/socket", {
                params: { username: username }
            });
    
            try {
                newSocket.connect();
                
                newSocket.onError((error) => {
                    console.error("Socket error:", error);
                    showError("Connection error occurred");
                });
    
                newSocket.onClose(() => {
                    console.log("Socket closed");
                    showError("Connection closed");
                    setSocket(null);
                    setChannel(null);
                });
    
                newSocket.onOpen(() => {
                    console.log("Socket connected");
                    const newChannel = newSocket.channel(`room:${room}`, { 
                        username: username
                    });
                    
                    newChannel.on("new_message", (payload) => {
                        if (!knownUsers.some(user => user.username === payload.username)) {
                            setKnownUsers(prevUsers => [...prevUsers, { username: payload.username, isTyping: false }]);
                        }

                        setMessageHistory(prev => [...prev, { user: payload.username, content: payload.content }]);
                        console.log("New message received:", payload.content);
                    });
    
                    newChannel.on("typing", (payload) => {
                        setKnownUsers(prev => {
                            const userExists = prev.some(user => user.username === payload.username);
                            if (!userExists) {
                                return [...prev, { username: payload.username, isTyping: payload.is_typing }];
                            }
                            return prev.map(user => 
                                user.username === payload.username 
                                    ? { ...user, isTyping: payload.is_typing }
                                    : user
                            );
                        });
                    });
    
                    newChannel.on("user_join", (payload) => {
                        console.log("User join event received:", payload);
                        if (!knownUsers.some(user => user.username === payload.username)) {
                            setKnownUsers(prev => [...prev, { username: payload.username, isTyping: false }]);
                            console.log("User joined:", payload.username);
                            showSuccess(`${payload.username} joined the room`);
                        }
                        else {
                            console.log("User already known:", payload.username);
                        }
                    });

                    newChannel.on("user_left", (payload) => {
                        console.log("User leave event received:", payload);
                        setKnownUsers(prev => prev.filter(user => user.username !== payload.username));
                        console.log("User left:", payload.username);
                        showSuccess(`${payload.username} left the room`);
                    });

                    newChannel.join()
                        .receive("ok", (resp) => {
                            console.log("Joined successfully", resp);
                            showSuccess("Joined the room successfully");
                            setChannel(newChannel);
                        })
                        .receive("error", (resp) => { 
                            console.log("Unable to join", resp);
                            showError(resp.reason || "Unable to join the room");
                            newSocket.disconnect();
                        })
                        .receive("timeout", () => {
                            console.log("Join timeout");
                            showError("Connection timed out");
                            newSocket.disconnect();
                        });
                });
    
                setSocket(newSocket);
                return true;
            } catch (error) {
                console.error("Socket connection error:", error);
                showError("Failed to establish connection");
                return false;
            }
        } else {
            showError("Room or username not found in cookies, please reload the page and enter them");
            try {
                Cookies.remove("room");
                Cookies.remove("username");
            }
            catch (error) {
                console.error("Error removing cookies:", error);
            }
            return false;
        }
    }

    const sendMessage = (message: string) => {
        if (channel) {
            channel.push("new_message", { content: message })
                .receive("ok", (resp) => { console.log("Message sent successfully", resp) 
                    showSuccess("Message sent successfully");
                    setMessageHistory(prev => [...prev, { user: Cookies.get("username") || "Unknown", content: message }]);
                })
                .receive("error", (resp) => { console.log("Unable to send message", resp) 
                    showError("Unable to send message");
                });
        }
    }

    const setTyping = (isTyping: boolean) => {
        if (channel) {
            channel.push("typing", { typing: isTyping })
                .receive("ok", (resp) => {
                    console.log("Typing status sent successfully", resp)
                    setIsTyping(isTyping);
                    if (isTyping) {
                        if (typingTimeout) {
                            clearTimeout(typingTimeout);
                        }
                        typingTimeout = setTimeout(() => {
                            setTyping(false);
                        }, typingDelay);
                    }
                })
                .receive("error", (resp) => { console.log("Unable to send typing status", resp) 
                    showError("Unable to send typing status");
                });
        }
    }

    return (
        <SocketContext.Provider value={{
            socket,
            channel,
            isTyping,
            knownUsers,
            messageHistory,
            joinRoom,
            sendMessage,
            setTyping
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};
