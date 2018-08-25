$(function() {
   $( "#jquery-ui-resizable" ).resizable();
 } );

$(function() {
    $('#jquery-ui-draggable1').draggable();
} );



$(function() {
  $('[name="radio"]:radio').change( function() {

  });
});

$(function(){
  $('li').on('click', function () {
    index = $('li.btn').index(this);
  });

  $(function() {
      $('#jquery-ui-draggable').draggable();
  } );

  $(function() {
      $('#jquery-ui-draggable2').draggable();
  } );

  $(function() {
      $('#jquery-ui-draggable3').draggable();
  } );

  $(function() {
      $('#jquery-ui-draggable4').draggable();
  } );

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
