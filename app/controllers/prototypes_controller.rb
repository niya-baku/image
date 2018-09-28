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
    data_1 = params[:data][:image_1].split(",").map(&:to_i)
    data_2 = params[:data][:image_2].split(",").map(&:to_i)
    data_3 = params[:data][:image_3].split(",").map(&:to_i)
    data_4 = params[:data][:image_4].split(",").map(&:to_i)

    @height_1 = data_1[0]; @width_1  = data_1[1]; @top_1 = data_1[2]; @left_1 = data_1[3]; puts(@height_1); puts(@width_1); puts(@top_1); puts(@left_1)
    @height_2 = data_2[0]; @width_2  = data_2[1]; @top_2 = data_2[2]; @left_2 = data_2[3]; puts(@height_2); puts(@width_2); puts(@top_2); puts(@left_2)
    @height_3 = data_3[0]; @width_3  = data_3[1]; @top_3 = data_3[2]; @left_3 = data_3[3]; puts(@height_3); puts(@width_3); puts(@top_3); puts(@left_3)
    @height_4 = data_4[0]; @width_4  = data_4[1]; @top_4 = data_4[2]; @left_4 = data_4[3]; puts(@height_4); puts(@width_4); puts(@top_4); puts(@left_4)

=begin
    puts("ここから下はeval")
    x = 1
    while x<=4
        puts eval("@height_#{x}")
        puts eval("@width_#{x}")
        puts eval("@top_#{x}")
        puts eval("@left_#{x}")
        x += 1
    end
=end
    y = 1
    image = Magick::Image.read('public/CorkBoard2.jpg').first
    #puts(height);puts(width);puts(top);puts(left)
    respond_to do |format|
      if @prototype.save
        @prototype.thumbnails.each do |thumbnail|
        thumb = thumbnail.image_url
        thumb.slice!(0)

        original = Magick::Image.read("public/#{thumb}").first

        w = eval("@width_#{y}")
        h = eval("@height_#{y}")
        t = eval("@top_#{y}")
        l = eval("@left_#{y}")
        y += 1
        #puts(w)
        #puts(h)
        #puts(t)
        #puts(l)
        image_size = original.resize(w,h)

        image.composite!(image_size, l, t , Magick::OverCompositeOp)

        image.write("public/#{thumb}")
        #image.write("public/resize/zesize.jpg")
        end
        image.write("public/uploads/resize/resize.jpg")
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
