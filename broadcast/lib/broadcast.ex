defmodule Broadcast do
  def subscribe(room) do 
    Phoenix.PubSub.subscribe(Broadcast.PubSub, room)
  end
  
  def unsubscribe(room) do
    Phoenix.PubSub.unsubscribe(Broadcast.PubSub, room)
  end
end
