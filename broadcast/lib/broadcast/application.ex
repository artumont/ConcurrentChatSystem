defmodule Broadcast.Application do
  use Application
  
  @impl true
  def start(_type, _args) do
    children = [
      {Phoenix.PubSub, name: Broadcast.PubSub},
      # @note: This is the endpoint that will be used to broadcast messages
      BroadcastWeb.Endpoint
    ]
    opts = [strategy: :one_for_one, name: Broadcast.Supervisor]
    Supervisor.start_link(children, opts)
  end
  
  @impl true
  def config_change(changed, _new, removed) do
    BroadcastWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
