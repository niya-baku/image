Rails.application.routes.draw do
  resources:prototypes, only:[:new, :create]
  get "prototypes/show" => "prototypes#show"
  post "prototypes/create" => "prototypes#create"
  get '/' => 'prototypes#new'


end
