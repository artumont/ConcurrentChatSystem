defmodule BroadcastWeb.RoomChannel do
  use Phoenix.Channel
  require Logger
  
  # @note: This handles the joining of a room
  def join("room:" <> room_id, %{"username" => username}, socket) do
    try do
      Process.flag(:trap_exit, true)
      socket = socket
        |> assign(:room_id, room_id)
        |> assign(:username, username)
      
      send(self(), :after_join)
      {:ok, socket}
    rescue
      e ->
        Logger.error("Error joining room: #{inspect(e)}")
        {:error, %{reason: "Failed to join room"}}
    end
  end
  
  def handle_info(:after_join, socket) do
    broadcast!(socket, "user_join", %{
      username: socket.assigns.username,
      room_id: socket.assigns.room_id
    })
    {:noreply, socket}
  end
  
  # @note: This handles new messages sent to the channel
  def handle_in("new_message", %{"content" => content}, socket) do
    try do
      broadcast!(socket, "new_message", %{
        username: socket.assigns.username,
        content: content,
        room_id: socket.assigns.room_id,
        timestamp: :os.system_time(:millisecond)
      })
      {:noreply, socket}
    rescue
      e ->
        Logger.error("Error broadcasting message: #{inspect(e)}")
        {:reply, {:error, %{reason: "Failed to send message"}}, socket}
    end
  end
  
  # @note: This handles typing events
  def handle_in("user_typing", %{"is_typing" => is_typing}, socket) do
    try do 
      broadcast!(socket, "user_typing", %{
        username: socket.assigns.username,
        room_id: socket.assigns.room_id,
        is_typing: is_typing
      })
      {:noreply, socket}
    rescue
      e ->
        Logger.error("Error broadcasting typing event: #{inspect(e)}")
        {:reply, {:error, %{reason: "Failed to send typing event"}}, socket}
    end
  end
  
  # @note: This handles user disconnect events
  def terminate(_reason, socket) do
    try do
      case socket.assigns do
        %{username: username, room_id: room_id} ->
          broadcast!(socket, "user_left", %{
            username: username,
            room_id: room_id
          })
        _ ->
          Logger.warning("User disconnected before properly joining")
      end
    rescue
      e ->
        Logger.error("Error in terminate: #{inspect(e)}")
    end
    :ok
  end
end
