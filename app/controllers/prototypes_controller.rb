class PrototypesController < ApplicationController
  def new
    @prototype = Prototype.new
    4.times { @prototype.thumbnails.build }
  end

  def create
    @prototype = Prototype.new(create_params)

    respond_to do |format|
      if @prototype.save
        format.html { redirect_to :action => "show",:id => Prototype.last.id }
        format.json { render :show, status: :created, location: @prototype }
      else
        format.html { render :new }
        format.json { render json: @prototype.errors, status: :unprocessable_entity }
      end
    end
  end

  def show
    @prototype = Prototype.find(params[:id])
  end


  private
    def create_params
      params.require(:prototype).permit(:data,thumbnails_attributes: [:image])
    end
end
