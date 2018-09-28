/*$('#on').click(function(e) {
  //div要素から配列にする
  var arr = $.makeArray($('.material'));
  console.log(arr);
});*/
/*
$(function(){
$('#size').click(function(e) {
  console.log(array);
    });
});*/
$(function() {
  $( 'input[name="optionsRadios"]:radio' ).change( function() {
    var radioval = $(this).val();

  });
});

//各画像情報で使用する配列の作成
  var array = new Array(4);
  console.log( array );

//各ファイル選択によって画像を表示するイベント追加
$(function(){
  $('li').on('click', function () {
    index = $('li.btn').index(this);
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
      parseInt($('#data_' + (index+1)).val(array[index]));
      //data = parseInt($('#data_' + (index+1)).val());

      //console.log(data);
    })
  });

  //preview内のサイズ変更イベント
  $('input[name="X_size"]').change(function(){
   $('.preview').css('width',$(this).val() + 'px');
   //背景画像の幅を取得
   w_css = parseInt($('.preview').css('width'));
   ($('#top').val(w_css));
  // $('input[name="data[flame_X]"]').val($(this).val() + 'px');
 });
  $('input[name="Y_size"]').change(function(){
   $('.preview').css('height',$(this).val() + 'px');
   //背景画像の高さを取得
   h_css =  parseInt($('.preview').css('height'));
   ($('#left').val(h_css));
 });
  //画像ファイルプレビュー表示のイベント追加 fileを選択時に発火するイベントを登録
  $('form').on('change', 'input[type="file"]', function(e) {

    var file = e.target.files[0];
        reader = new FileReader();
        preview_class = (".material_" + (index+1));
        $preview = $(preview_class);
        data_id = ("#data_" + (index+1));
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
        $preview.append($('<img>').attr({
                  src: e.target.result,
                  width: "320px",
                  height: "200px",
                  class: "img",
                  title: file.name
              }));
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
        //読み込み後に画像の移動とリサイズが可能
        $('.img').resizable({
          containment: ".preview",
        });
        $preview.draggable({
          containment: ".preview",

        });
      };
    })(file);

    reader.readAsDataURL(file);
  });
});
