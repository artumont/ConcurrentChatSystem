defmodule BroadcastWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :broadcast
  
  socket "/socket", BroadcastWeb.UserSocket,
    websocket: true,
    longpoll: false
  
  def init(_key, config) do
    {:ok, config}
  end
end
