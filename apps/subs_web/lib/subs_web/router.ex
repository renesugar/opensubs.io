defmodule SubsWeb.Router do
  use SubsWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", SubsWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/api", SubsWeb, as: :api do
    pipe_through :api

    resources "/users", Api.UserController, only: [:create, :update, :delete]
    scope "/users", as: :user do
      post "/authenticate", Api.UserController, :authenticate, as: :authenticate
      post "/confirm", Api.UserController, :confirm, as: :confirm
    end
  end
end
