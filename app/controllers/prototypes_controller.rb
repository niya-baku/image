class PrototypesController < ApplicationController
  require "RMagick"
  #include CarrierWave::RMagick
  #def store_dir
  #{}"uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  #end


  def new
    @prototype = Prototype.new
    4.times { @prototype.thumbnails.build }
  end

  def create
    @prototype = Prototype.new(create_params)


    puts("ここにputsしたものが表示されるよ！！")
    puts(params[:data])
    #test = (params[:data][:image][0]) + (params[:data][:image][1]) + (params[:data][:image][2])
    a = params[:data][:image_1].split(",").map(&:to_i)
    #a = params[:data][:image].split(",").map!(&:to_i)
    #a = params[:data][:image].split(",").to_i

    height = a[0]
    width  = a[1]
    top = a[2]
    left = a[3]

    puts(height)
    puts(width)
    puts(top)
    puts(left)
    respond_to do |format|
      if @prototype.save
        image_data = []

        @prototype.thumbnails.each do |thumbnail|
        thumb = thumbnail.image_url
        thumb.slice!(0)
        puts(thumb)
        original = Magick::Image.read("public/#{thumb}").first
        image = original.resize(320, 500)
        image_data.push(image)
        #image.write('resize3.jpg')  #=> 横320×縦200のサイズに
        end

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
