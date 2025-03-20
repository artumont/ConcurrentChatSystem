defmodule BroadcastWeb.RoomChannel do
  use Phoenix.Channel
  
  # @note: This handles the joining of a room
  def join("room:" <> room_id, %{"username" => username}, socket) do
    socket = socket
      |> assign(:room_id, room_id)
      |> assign(:username, username)
      
    broadcast!(socket, "user_join", %{
      username: username,
      room_id: room_id
    })
    {:ok, socket}
  end
  
  # @note: This handles new messages sent to the channel
  def handle_in("new_message", %{"content" => content}, socket) do
    broadcast!(socket, "new_message", %{
      username: socket.assign.username,
      content: content,
      room_id: socket.assigns.room_id,
      timestamp: :os.system_time(:millisecond)
    })
    {:noreply, socket}
  end
  
  # @note: This handles typing events
  def handle_in("typing", %{"is_typing" => is_typing}, socket) do
    broadcast!(socket, "user_typing", %{
      username: socket.assigns.username,
      room_id: socket.assigns.room_id,
      is_typing: is_typing
    })
    {:noreply, socket}
  end
  
  # @note: This handles user disconnect events
  def terminate(_reason, socket) do
    broadcast!(socket, "user_left", %{
      username: socket.assigns.username,
      room_id: socket.assigns.room_id
    })
    :ok
  end
end
