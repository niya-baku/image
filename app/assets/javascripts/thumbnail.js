
$(function() {
  $('[name="radio"]:radio').change( function() {

  });
});

$(function(){
  $('input[name="X-size-1"]').change(function(){
    $('.material_1').css('width',$(this).val() + 'px');
  });
   $('input[name="Y-size-1"]').change(function(){
    $('.material_1').css('height',$(this).val() + 'px');
  });
   $('input[name="X-position-1"]').change(function(){
    $('.material_1').css('left',$(this).val() + 'px');
  });
   $('input[name="Y-position-1"]').change(function(){
    $('.material_1').css('top',$(this).val() + 'px');
  });
   $('input[name="X-size"]').change(function(){
    $('.preview').css('width',$(this).val() + 'px');
    $('input[name="data[flame_X]"]').val($(this).val() + 'px');
  });
   $('input[name="Y-size"]').change(function(){
    $('.preview').css('height',$(this).val() + 'px');
  });

  $('li').on('click', function () {
    index = $('li.btn').index(this);
  });

  $('input[name="data[flame_X]"]').val("640px");
  //画像ファイルプレビュー表示のイベント追加 fileを選択時に発火するイベントを登録
  $('form').on('change', 'input[type="file"]', function(e) {



    var file = e.target.files[0];
        reader = new FileReader();
        preview_class = (".material_" + (index+1));
        $preview = $(preview_class);


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
                  class: "material",
                  title: file.name
              }));
      };
    })(file);

    reader.readAsDataURL(file);
  });
});
//$(this).next(".material");
