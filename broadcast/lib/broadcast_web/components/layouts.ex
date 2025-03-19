defmodule BroadcastWeb.Layouts do
  @moduledoc """
  This module holds different layouts used by your application.

  See the `layouts` directory for all templates available.
  The "root" layout is a skeleton rendered as part of the
  application router. The "app" layout is set as the default
  layout on both `use BroadcastWeb, :controller` and
  `use BroadcastWeb, :live_view`.
  """
  use BroadcastWeb, :html

  embed_templates "layouts/*"
end
