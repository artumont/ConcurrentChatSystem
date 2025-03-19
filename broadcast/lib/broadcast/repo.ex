defmodule Broadcast.Repo do
  use Ecto.Repo,
    otp_app: :broadcast,
    adapter: Ecto.Adapters.Postgres
end
