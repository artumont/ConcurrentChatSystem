defmodule Broadcast.PubSub do
  def broadcast(topic, message) do
    Phoenix.PubSub.broadcast(Broadcast.PubSub, topic, message)
  end
  
  def subscribe(topic) do
    Phoenix.PubSub.subscribe(Broadcast.PubSub, topic)
  end
  
  def unsubscribe(topic) do
    Phoenix.PubSub.unsubscribe(Broadcast.PubSub, topic)
  end
end
