define('common:widget/oui/pages/borrow/uploads', ['require', 'exports', 'module', "common:widget/oui/lib/jquery/1.9.1/jquery", "common:widget/oui/lib/plupload/1.5.7/jquery.plupload.queue"],function(require, exports, module) {
    var $ = require("common:widget/oui/lib/jquery/1.9.1/jquery");
    var fileArr=[];
    require("common:widget/oui/lib/plupload/1.5.7/jquery.plupload.queue");
    $(function(){
        var isUploaded = false,
            //path = $("form").data("path"),
       
            $obj =  $("#uploader").length > 0 ?$("#uploader"):$(".uploader");
        $obj.pluploadQueue({
            runtimes : 'html5,flash,silverlight',
            url: '/upload/uploadCreditMaterial_upload.action',
  
            max_file_size : '3mb',
            chunk_size : '1mb',
            mutlipart: true,
            unique_names : true,
            file_data_name:"upload",
            filters : [
                {title : "Image files", extensions : "jpg,gif,png,pdf"}
            ],

            flash_swf_url : '../static/js/lib/plupload/1.5.7/plupload.flash.swf',

            silverlight_xap_url : '../static/js/lib/plupload/1.5.7/plupload.silverlight.xap',
            multipart_params: {
                //'path': path
            },
            preinit: {
                FilesAdded: function(up, files){
                     for (var i = 0; i < files.length; i++) {
                       if($.inArray(files[i].name, fileArr) == -1){
                         fileArr.push(files[i].name);   
                       }  else{
                         
                              alert("不允许上传同名文件或不允许上传该类型文件");
                         return false;
                       }
                     }

                    if (up.files.length >= 30) {
                        alert("最多只能上传30个文件");
                        for ( i = 0; i < files.length; i++) {
                            up.removeFile(files[i]);
                        }
                        return false;
                    }


                    if (files.length > 30) {
                        alert("最多只能上传30个文件");
                        return false;
                    }
                

                },
            
            FilesRemoved:function(del,files){
              
               for (var i = 0; i < files.length; i++) {
              
                   fileArr.splice(files[i].name,1);   
              }
               
            }
            },
            
            init: {
                UploadComplete: function(up, file, info){
                  fileArr=[];
                    isUploaded = true;
               }
            }
                
               
        });
        
        $(".saveSettingBnt").click(function(){
            if (jQuery("#jobType").val() != "网商" && !isUploaded) {
                alert("请完成文件上传后提交审核。");
                return false;
            }
        });

    });
    
    Date.prototype.format = function(format){
        var o = {
            "M+": this.getMonth() + 1, //month 
            "d+": this.getDate(), //day 
            "h+": this.getHours(), //hour 
            "m+": this.getMinutes(), //minute 
            "s+": this.getSeconds(), //second 
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
            "S": this.getMilliseconds() //millisecond 
        };
        if (/(y+)/.test(format)) 
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        
        for (var k in o) 
            if (new RegExp("(" + k + ")").test(format)) 
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    };

    
});