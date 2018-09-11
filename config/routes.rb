Rails.application.routes.draw do
  resources:prototypes, only:[:new, :create]
  get "prototypes/:id" => "prototypes#show"
  post "prototypes/create" => "prototypes#create"
  get '/' => 'prototypes#new'


end
