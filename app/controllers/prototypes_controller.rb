class PrototypesController < ApplicationController
  def new
    @prototype = Prototype.new
    4.times { @prototype.thumbnails.build }
  end

  def create
    @prototype = Prototype.new(create_params)
    puts(@prototype)

    respond_to do |format|
      if @prototype.save
        format.html { redirect_to :action => "show" }
        format.json { render :show, status: :created, location: @prototype }
      else
        format.html { render :new }
        format.json { render json: @prototype.errors, status: :unprocessable_entity }
      end
    end
  end

  def show
  end

  private
    def create_params
      params.require(:prototype).permit(thumbnails_attributes: [:image],:data)
    end
end
