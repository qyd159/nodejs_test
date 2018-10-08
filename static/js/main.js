function uploadFile(fileObj){
    var url = "/upload";
    var form = new FormData();
    form.append('logo',fileObj);
    xhr = new XMLHttpRequest();
    xhr.open("post",url,true);
    xhr.onload = uploadComplete; //请求完成
    xhr.onerror =  uploadFailed; //请求失败
    xhr.upload.onprogress = progressFunction;
    xhr.send(form);
}

function progressFunction(evt){
    //do something
}
function uploadComplete(evt) {
    //服务断接收完文件返回的结果
    //    alert(evt.target.responseText);
    alert("上传成功！");
}
//上传失败
function uploadFailed(evt) {
    console.log(evt);
}

$('input:file').on('change',function(){
    var $ts = $(this);
    var fileObj = this.files[0];

    if(fileObj){
        uploadFile(fileObj);
    }else{
        alert('请选择文件');
    }
});

$('.submit').click(function(){
   var $s1 = $("#file1");
   var $s2 = $("#file2");
   var ext1 = $s1[0].files[0].name.substring($s1[0].files[0].name.lastIndexOf('.')) ;
   var ext2 = $s2[0].files[0].name.substring($s2[0].files[0].name.lastIndexOf('.'));
   var source1,source2;


    var reader = new FileReader();
    reader.onload = function(e) {
        var text = reader.result;
        //文件内容hash化处理
        source1 = encodeURIComponent(md5(text));
        var reader2 = new FileReader();
        reader2.onload = function(e) {
            var text2 = reader2.result;
            source2 = encodeURIComponent(md5(text2));

            $.ajax({
                url:'/generate',
                data:{
                    source1:source1,
                    source2:source2,
                    ext1:ext1,
                    ext2:ext2
                },
                success:function(res){
                    alert('执行成功,该文件已经可以下载');
                    $(".downloadUrl").attr("href",decodeURIComponent(res.list.downloadUrl))
                },
                always:function(){

                }
            });
        };
        reader2.readAsDataURL($s2[0].files[0]);
    };
    reader.readAsDataURL($s1[0].files[0]);

});