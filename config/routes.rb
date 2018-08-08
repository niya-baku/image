Rails.application.routes.draw do
  resources:prototypes, only:[:new, :create]
end
