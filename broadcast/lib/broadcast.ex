defmodule Broadcast do
  def subscribe(room) do 
    Phoenix.PubSub.subscribe(Broadcast.PubSub, room)
  end
  
  def broadcast_message(room, event, payload) do
    Phoenix.PubSub.broadcast(Broadcast.PubSub, "room:#{room}", {event, payload})
  end
  
  def unsubscribe(room) do
    Phoenix.PubSub.unsubscribe(Broadcast.PubSub, room)
  end
end
