import Config

config :broadcast,
  ecto_repos: [Broadcast.Repo],
  generators: [timestamp_type: :utc_datetime]

config :broadcast, BroadcastWeb.Endpoint,
  url: [host: "localhost"],
  adapter: Bandit.PhoenixAdapter,
  render_errors: [
    formats: [json: BroadcastWeb.ErrorJSON],
    layout: false
  ],
  pubsub_server: Broadcast.PubSub

config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :phoenix, :json_library, Jason

import_config "#{config_env()}.exs"
