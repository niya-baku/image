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
  //console.log( array );

//各ファイル選択によって画像を表示するイベント追加
$(function(){
  $('li').on('click', function () {
    index = $('li.btn').index(this);

  });

  $(function(){
    $('.material')
    .mousedown(function(){
      var h = $('.material_' + (index+1)).height();
      var w = $('.material_' + (index+1)).width();
      var t = $(".material_" + (index+1)).css("top");
      var l = $(".material_" + (index+1)).css("left");
      array[index] = {h,w,t,l}
      console.log(array);
    })
    .mouseup(function(){

    })
  });
/*
    // ボタンクリックで画像サイズを更新
  $('#size').click(function(e) {
    var h = $('.material_' + (index+1)).height();
    var w = $('.material_' + (index+1)).width();

    //console.log('画像サイズ：' + h + "×" + w);

    var t = $(".material_" + (index+1)).css("top");
    var l = $(".material_" + (index+1)).css("left");
    //console.log("top:" + t);
    //console.log("left:" + l);

    array[index] = {h,w,t,l}
    console.log(array);

  });*/
  //preview内のサイズ変更イベント
  $('input[name="X-size"]').change(function(){
   $('.preview').css('width',$(this).val() + 'px');
   $('input[name="data[flame_X]"]').val($(this).val() + 'px');
 });
  $('input[name="Y-size"]').change(function(){
   $('.preview').css('height',$(this).val() + 'px');
 });
  //画像ファイルプレビュー表示のイベント追加 fileを選択時に発火するイベントを登録
  $('form').on('change', 'input[type="file"]', function(e) {

    var file = e.target.files[0];
        reader = new FileReader();
        preview_class = (".material_" + (index+1));
        $preview = $(preview_class);
        var h = $('.material_' + (index+1)).height();
        var w = $('.material_' + (index+1)).width();
        var t = $(".material_" + (index+1)).css("top");
        var l = $(".material_" + (index+1)).css("left");
        array[index] = {h,w,t,l}
        console.log(array);

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
//$(this).next(".material");
