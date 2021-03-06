//各画像情報で使用する配列の作成
  var array = new Array(5);
  console.log( array );

  array[4] =[1000,1280,0,0];

//各ファイル選択によって画像を表示するイベント追加
$(document).on('turbolinks:load',function(event){
  $('li').on('click', function () {
    index = $('li.btn').index(this);
    if(index==4){
      const back_choice_x = document.getElementById("back_choice_x");
      const back_choice_y = document.getElementById("back_choice_y");
      const back_choice_w = document.getElementById("back_choice_w");
      const back_choice_h = document.getElementById("back_choice_h");

      if(back_choice_w.style.display=="inline"){
    		// noneで非表示
    		back_choice_x.style.display ="none";
        $('.preview').css("background-image","url()");
    	}else{
    		// inlineで表示
    		back_choice_w.style.display ="inline";
    	}
      if(back_choice_h.style.display=="inline"){
    		// noneで非表示
    		back_choice_y.style.display ="none";
    	}else{
    		// inlineで表示
    		back_choice_h.style.display ="inline";
    	}
    }
  });
//各画像を選択した際に画像の情報を取得
  $(function(){
    $('.material')
    .mousedown(function(){
      index = $('.material').index(this); // classの値を取得
      //console.log(index);
    })
    .mouseup(function(){
      var h = $('.material_' + (index+1)).height();
      var w = $('.material_' + (index+1)).width();
      var t = $(".material_" + (index+1)).css("top");
      var ti = parseInt( t );
      var l = $(".material_" + (index+1)).css("left");
      var li = parseInt( l );
      array[index] = [h,w,ti,li];
      console.log(array);
      parseInt($('#prototype_thumbnails_attributes_' + (index) + '_data').val(array[index]));
      //data = parseInt($('#data_' + (index+1)).val());

      //console.log(data);
    })
  });

  //preview内のサイズ変更イベント
  $('input[name="X_size"]').change(function(){
   $('.preview').css('width',$(this).val() + 'px');
   pre_w = $('.preview').css("width");
   pre_wi = parseInt( pre_w );
   console.log(pre_wi);
   parseInt($('#top').val(pre_wi));

 });
  $('input[name="Y_size"]').change(function(){
   $('.preview').css('height',$(this).val() + 'px');
   pre_h = $('.preview').css("height");
   pre_hi = parseInt( pre_h );
   console.log(pre_hi);
   parseInt($('#left').val(pre_hi));

 });

 document.getElementById("back_choice_x").style.display ="inline";
 document.getElementById("back_choice_y").style.display ="inline";
 document.getElementById("back_choice_w").style.display ="none";
 document.getElementById("back_choice_h").style.display ="none";


 $('input[name="data_w"]').change(function(){
  parseInt($('.material_5').css('width',$(this).val() + 'px'));
  w = $('.material_5').width();
  console.log(w);
  var img = $(".material_5 > img"); //画像を取得
   img.width(w);
   array[4][1] = w;
   console.log(array[4]);
   parseInt($('#data_5').val(array[4]));
});

 $('input[name="data_h"]').change(function(){
  parseInt($('.material_5').css('height',$(this).val() + 'px'));
  h = $('.material_5').height();
  console.log(h);
  var img = $(".material_5 > img"); //画像を取得
   img.height(h);
   array[4][0] = h;
   console.log(array[4]);
   parseInt($('#data_5').val(array[4]));
});




  //画像ファイルプレビュー表示のイベント追加 fileを選択時に発火するイベントを登録
  $('form').on('change', 'input[type="file"]', function(e) {

        image_width = "320px";
        image_height = "200px";

    if((index+1)== 5) {
      image_width = $('.material_' + (index+1)).css('width');
      image_height =  $('.material_' + (index+1)).css('height');
    }

    var file = e.target.files[0];
        reader = new FileReader();
        preview_class = (".material_" + (index+1));
        $preview = $(preview_class);
        data_id = ($('#prototype_thumbnails_attributes_' + (index) + '_data').val(array[index]));
        $data_in = $(data_id);
    // 画像ファイル以外の場合は何もしない
    if(file.type.indexOf("image") < 0){
      return false;
    }

    // ファイル読み込みが完了した際のイベント登録
    reader.onload = (function(file) {
      return function(e) {
        //既存のプレビューを削除
        $preview.empty();
        // .prevewの領域の中にロードした画像を表示するimageタグを追加
        if($preview.index() !=4){
        $preview.append($('<img>').attr({
                  src: e.target.result,
                  width: image_width,
                  height: image_height,
                  title: file.name,
                  class: "img"
              }));
            }else if($preview.index() ==4){
              $preview.append($('<img>').attr({
                        src: e.target.result,
                        width: image_width,
                        height: image_height,
                        title: file.name
                    }));
            }
        //画像の縦横比と位置情報を整数として取得する
        var h = $preview.height();
        var w = $preview.width();
        var t = $preview.css("top");
        var ti = parseInt( t );
        var l = $preview.css("left");
        var li = parseInt( l );
            array[index] = [h,w,ti,li]
            console.log(array);
            parseInt($data_in.val(array[index]));
            //data = parseInt($data_in.val());


            //console.log(data);
        //読み込み後に画像の移動とリサイズが可能（ただし、material_5material_5のみ適応外とする）
        $('.img').resizable({
          containment: ".preview",
        });
        if($preview.index() !=4){
        $preview.draggable({
          containment: ".preview",
        });
      }
      };
    })(file);

    reader.readAsDataURL(file);
  });
});
