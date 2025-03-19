defmodule Broadcast.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      BroadcastWeb.Telemetry,
      Broadcast.Repo,
      {DNSCluster, query: Application.get_env(:broadcast, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Broadcast.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: Broadcast.Finch},
      # Start a worker by calling: Broadcast.Worker.start_link(arg)
      # {Broadcast.Worker, arg},
      # Start to serve requests, typically the last entry
      BroadcastWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Broadcast.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    BroadcastWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
