class PrototypesController < ApplicationController
  def new
    @prototype = Prototype.new(create_params)
    3.times { @prototype.thumbnails.build }
  end

  def create
    @prototype = Prototype.create(create_params)
    redirect_to '/'
  end

  private
    def create_params
      params.require(:prototype).permit(thumbnails_attributes: [:image])
    end
end
