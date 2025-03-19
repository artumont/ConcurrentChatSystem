import Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :broadcast, BroadcastWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "g4qW8i00vYDppXxyF2L8H28MtaPXDeLlgheAz1Q+/NuAX7wvQon8nLxBWQBHt3/T",
  server: false

# Print only warnings and errors during test
config :logger, level: :warning

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
