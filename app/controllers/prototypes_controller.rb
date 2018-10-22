class PrototypesController < ApplicationController
  require "RMagick"
  #include CarrierWave::RMagick
  #def store_dir
  #{}"uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  #end


  def new
    @prototype = Prototype.new
    5.times { @prototype.thumbnails.build }
  end

  def create
    @prototype = Prototype.new(create_params)

    #背景画像の情報
    data_5 = params[:data][:image_5].split(",").map(&:to_i)
    data_w = data_5[1]
    data_h = data_5[0]

    #class="preview"の高さと横幅を取得
    data_x = params[:data][:image_x].to_i
    data_y = params[:data][:image_y].to_i





    @height_5 = data_5[0]; @width_5  = data_5[1];

    y = 1
    if data_5.empty?
    puts("data_5に背景画像が選択されていないため、デフォルト画像を使用します。")
    #デフォルトの背景画像を読み込む処理
    image = Magick::Image.read('public/CorkBoard.jpg').first
    back_image = image.resize(data_x,data_y)
    back_image.write('public/resize_backimage.jpg')
    back_image = Magick::Image.read('public/resize_backimage.jpg').first

      respond_to do |format|
        if @prototype.save
          #背景画像以外の処理
          #@prototype.thumbnails.where(background:true).each do |thumbnail|を使用して先に背景画像を処理する
          @prototype.thumbnails.each do |thumbnail|
          datas = thumbnail.data.split(",").map(&:to_i)
          height = datas[0]; width  = datas[1]; top = datas[2]; left = datas[3];

          thumb = thumbnail.image_url
          thumb.slice!(0)

          original = Magick::Image.read("public/#{thumb}").first

          w = eval("width")
          h = eval("height")
          t = eval("top")
          l = eval("left")
          #puts(w)
          #puts(h)
          #puts(t)
          #puts(l)
          image_size = original.resize(w,h)

          back_image.composite!(image_size, l, t , Magick::OverCompositeOp)
          #back_image.write("public/#{thumb}")
          #image.write("public/resize/zesize.jpg")

          end
          back_image.write("public/uploads/resize/resize.jpg")
          format.html { redirect_to :action => "show",:id => Prototype.last.id }
          format.json { render :show, status: :created, location: @prototype }
        else
          format.html { render :new }
          format.json { render json: @prototype.errors, status: :unprocessable_entity }
        end #if @prototype.save
      end #respond_to do |format|
      else
          #背景画像が選択された場合
          respond_to do |format|
            if @prototype.save
              #背景画像が選択された場合の処理
              @prototype.thumbnails.last
              thumb_last = @prototype.thumbnails.last.image_url
              thumb_last.slice!(0)

              puts("この下はthumb_last")
              puts(thumb_last)
              back_change = Magick::Image.read("public/#{thumb_last}").first
              #背景画像の情報を取得できればOK
              wid = data_w
              hei = data_h
              background_image= back_change.resize(wid,hei)
              background_image.write("public/background_image.jpg")
              #背景画像以外の処理
              @prototype.thumbnails.each do |thumbnail|
              #もし、最後の要素かつ背景画像が選択されている場合
              thumb = thumbnail.image_url
              thumb.slice!(0)

              puts("この下はthumb")
              puts(thumb)

                if(thumb)
                  original = Magick::Image.read("public/#{thumb}").first

                  w = eval("@width_#{y}")
                  h = eval("@height_#{y}")
                  t = eval("@top_#{y}")
                  l = eval("@left_#{y}")
                  y += 1
                  puts(w)
                  puts(h)
                  puts(t)
                  puts(l)
                  puts(y)
                  image_size = original.resize(w,h)
                  background_image.composite!(image_size, l, t , Magick::OverCompositeOp)

                elsif(thumb_last)
                  puts("data_5は背景画像のため読み込みの必要はない")
                  puts("背景画像と4つの画像を結合します。")
                else
                end
              end
              puts("画像を結合します")
              background_image.write("public/uploads/changeimage/change.jpg")
          flash[:notice] = "画像が合体しました！"

          format.html { redirect_to :action => "show",:id => Prototype.last.id }
          format.json { render :show, status: :created, location: @prototype }
        else
          format.html { render :new }
          format.json { render json: @prototype.errors, status: :unprocessable_entity }
        end #if @prototype.save
      end #respond_to do |format|
    end #data_5.empty?
  end #def create

  def show
    @prototype = Prototype.find(params[:id])
  end

  private
    def create_params
      params.require(:prototype).permit(:data,thumbnails_attributes: [:image,:background,:data])
    end
end
