define(function(require, exports, module) {
  var $ = require("jquery");
  //根据省份获得城市
  var pop = (function(){
    var userBankData,hotCities,$input,$probox,$provincebox,$citybox,$cityboxcon,$cityid,$cityTab,$hotCitiesBox,$allCityiesBox;
    //加载数据
    function getUserBankData(){
        $.ajax({
            url:"/citydb/citydb!listCitys.action",
            async:false,
            dataType:"JSON",
            success:function(data){
                userBankData=data;
            }
        });
    }
    // 热门城市数据
    hotCities = [
      {
        city: "北京市",
        id : "906"
      },
      {
        city: "上海市",
        id : "994"
      },
      {
        city: "广州市",
        id : "812"
      },
      {
        city: "深圳市",
        id : "815"
      },
      {
        city: "成都市",
        id : "1024"
      },
      {
        city: "杭州市",
        id : "886"
      },
      {
        city: "苏州市",
        id : "870"
      },
      {
        city: "南京市",
        id : "866"
      },
      {
        city: "武汉市",
        id : "949"
      },
      {
        city: "重庆市",
        id : "842"
      },
      {
        city: "天津市",
        id : "1012"
      },
      {
        city: "东莞市",
        id : "803"
      },
      {
        city: "郑州市",
        id : "973"
      },
      {
        city: "西安市",
        id : "961"
      },
      {
        city: "福州市",
        id : "877"
      },
      {
        city: "温州市",
        id : "889"
      },
      {
        city: "长沙市",
        id : "1053"
      },
      {
        city: "厦门市",
        id : "879"
      }
    ];
    //对数据进行转换，排序
    function tansData(){
        var regions = ['华北', '东北', '华东', '中南', '西南', '西北' ];
        var provinces = [];
        if(typeof(userBankData) == "undefined"){
            getUserBankData();
        }
        var myobj = userBankData;
        $.each(myobj.datas,function(k,v){
            provinces.push(v.province+"|"+ v.region);
        });

        provinces=unique(provinces,function(v1,v2){
            return v1.split("|")[0] === v2.split("|")[0];
        });
        provinces = swapCity(provinces);
        $provincebox.empty().hide();

        $.each(regions,function(k,v){
            var $areadiv= $("<div class='areadiv' data="+v+"></div>");
            $areadiv.html(v);
            $provincebox.append($areadiv);
        });
        $.each(provinces,function(k,v){
            var arr= v.split("|");
            var $span=$("<span data-province="+arr[0]+">"+ arr[0]+"</span>");
            $(".areadiv[data='"+arr[1]+"']").append($span);
        });
        $provincebox.undelegate("click").delegate("span","click",function(){
            var province=$(this).attr("data-province");
            showCity($(this),province);
        }).show();

        $probox.show();
    }

    //热门城市列表
    function hotCitiesList(){
      $.each(hotCities,function(k,v){
          var cssClass = 'citydiv';
          if( v % 5 === 4 ){
              cssClass += ' city-item-col-5';
          }
        var $cityspan = $("<a href='javascript:' class='" + cssClass + "' data-city='"+v.city+"' data-value='"+v.id+"'>"+v.city+"</a>");
        $hotCitiesBox.append($cityspan);
      });
      $hotCitiesBox.undelegate("click").delegate("a","click",function(){
        var city = $(this).attr("data-city");
        $input.val(city).trigger("blur");
        $cityid.val($(this).attr("data-value"));
        $probox.hide();
    });
    };
    //根据省份显示城市
    function showCity(obj,province){
        var myobj = userBankData;
        var city = [];
        var left = obj[0].offsetLeft;
        var top = obj[0].offsetTop;
        $cityboxcon.empty();
        $.each(myobj.datas,function(k,v){
            if(v.province == province){
                city.push({city:v.city,value:v.id});
            }
        });
        var $pro = $("<div class='city-province fn-clear'><em>省份</em></div>");
        var cityboxClose = $("<a class='J_close' href='javascript:'>"+province+" <i>X</i></a>").click(function(){
          $citybox.hide();
        }).appendTo($pro);
        $cityboxcon.prepend($pro);
        
        var $citywrap = $("<div class='city-province'><em>城市</em></div>");
        $.each(city,function(k,v){
            var $cityspan = $("<a class='citydiv' data-city='"+v.city+"' data-value='"+v.value+"'>"+v.city+"</a>");
            $citywrap.append($cityspan);
        });
        $cityboxcon.append($citywrap);
        $citybox.show();
        $cityboxcon.undelegate("click").delegate("a.citydiv","click",function(){
            var city = $(this).attr("data-city");
            $input.val(city).trigger("blur");
            $cityid.val($(this).attr("data-value"));
            $probox.hide();
        });
    }

    //对市放在最前(北京市放在最前)，把区放在最后
    function swapCity(arr){
        var tmparr1=[],tmparr2=[],tmparr3=[],tmparr4=[],backarr=[],i = 0,len = arr.length;
        for(;i<len;i++){
            if(/北京市/.test(arr[i])){
                tmparr1.push(arr[i]);
            }else if(/市/.test(arr[i])){
                tmparr2.push(arr[i]);
            }else if(/区/.test(arr[i])){
                tmparr4.push(arr[i]);
            }else{
                tmparr3.push(arr[i]);
            }
        }
        backarr= $.merge(tmparr1,tmparr2);
        backarr= $.merge(backarr,tmparr3);
        backarr= $.merge(backarr,tmparr4);
        return backarr;
    }

    //对数组中相同的元素进行去重
    function unique(source, compareFn) {
        var len = source.length, result = source.slice(0), i, datum;
        if ('function' != typeof compareFn) {
            compareFn = function(item1, item2) {
                return item1 === item2;
            };
        }
        // 从后往前双重循环比较
        // 如果两个元素相同，删除后一个
        while (--len > 0) {
            datum = result[len];
            i = len;
            while (i--) {
                if (compareFn(datum, result[i])) {
                    result.splice(len, 1);
                    break;
                }
            }
        }
        return result;
    }

    //初始化
    function init(){
        $cityid = $("#cityid");
        $input  = $("#bank_area");
        $probox = $("<div class='probox'></div>").css({top:$input[0].offsetHeight+6}).insertAfter($input);
        $hotCitiesBox = $("<div class='hotCitiesBox fn-clear' style='display:block;'></div>");
        $allCitiesBox = $("<div class='allCitiesBox'></div>");
        $provincebox = $("<div id='provincebox'></div>");
        $citybox = $("<div id='citybox'></div>");
        $cityTab = $("<ul class='city-tab J_city_tab fn-clear'><li class='active' data-name='hot'>热门城市</li><li data-name='all'>省份城市</li></ul>").appendTo($probox);
        $cityboxcon = $("<div id='cityboxcon'></div>");
        $citybox.append($cityboxcon);
        var $proboxClose = $("<span class='close'>X</span>").click(function(){
            $probox.hide();
            $citybox.hide();
        }).appendTo($probox);
        $allCitiesBox.append($provincebox).append($citybox).parent().css("position","relative");
        $probox.append($hotCitiesBox).append($allCitiesBox);
        hotCitiesList();
        $input.bind("focus",function(){
            tansData();
            $("#J_must_chooseBankArea").hide();
        }).bind("keyup",function(){
          this.value="";
        });
        
        $(".J_city_tab").on('click','li',function(){
          $(this).addClass('active').siblings().removeClass('active');
          $hotCitiesBox.hide();
          $allCitiesBox.hide();
          $("."+$(this).data('name')+"CitiesBox").show();
        });
        $(document.body).click(function(e) {
          if(e.target.id!="bank_area" && !$(e.target).closest("div.probox").length){
            $probox.hide();
          }
      });
    }

    return {
        init:function(){
            init();
        }
    };

  })();

  //对银行开户行进行搜索
  var search = (function(){
    var $bankSearch , $bankKeySearchId ,$cardDeposit ,$selBankType ,$cityid;
    function search(){
        var bankAreaName = $.trim($cardDeposit.val());
        var bank_area = $.trim($("#bank_area").val());
        var selBankType = $selBankType.val();
        if (!selBankType || 'other' == selBankType) {
            $("#J_must_chooseBank").show();
            return;
        }
        if(!bank_area){
          $("#J_must_chooseBankArea").show();
          $("#J_must_chooseBankArea").next('label').remove()
          return;
        }
        $.ajax({
            url : "/bankdb/bankdb!listBankDetails.action?t="+(new Date().getTime()),
            type : "POST",
            data : {
                "city" : $cityid.val(),
                "bank" : selBankType,
                "key" : bankAreaName
            },
            dataType : "JSON",
            error : function() {
                alert("银行数据加载失败，请刷新后重试");
            },
            beforeSend : function() {
                $bankSearch.html("<img src='/static/img/loading.gif' />").show();
            },
            success : function(data) {
                var d = data, tmpLi = "";
                if (d.datas && d.datas.length) {
                    $.each(d.datas,function(i, n) {
                        tmpLi += "<li>"+ n.name + "</li>";
                    });
                } else {
                    tmpLi += "<p>没有匹配支行信息</p>";
                }
                $bankSearch.html(tmpLi);
                $(document.body).click(function(e) {
                    if (e.target.id !== "bankKeySearchId" && e.target.id != "bankSearch") {
                        $bankSearch.hide();
                    }
                });
                $bankSearch.delegate("li","click",function(){
                    var html=$(this).html();
                    $cardDeposit.val(html).trigger("blur");
                }).delegate("li","mouseover",function(){
                    $(this).addClass("selected");
                }).delegate("li","mouseout",function(){
                    $(this).removeClass("selected");
                });
            }

        });
    }
        
        
    function init(){
        $selBankType = $("#selBankType");
        $bankKeySearchId = $("#bankKeySearchId");
        $cardDeposit = $("#cardDeposit");
        $bankSearch = $("<ul class='popBox bankSearch'></ul>").css({top:$cardDeposit[0].offsetHeight}).insertAfter($cardDeposit);
        $cityid= $("#cityid");
        $bankKeySearchId.click(function(e){
            search();
            e.stopPropagation();
            return false;
        });
        $selBankType.change(function(){
            $cardDeposit.val("");
        });
    }
    return {
        init:function(){
            init();
        }
    };
  })();

  var addcard = {
      pop:pop,
      search:search
  };
  module.exports = addcard;
});



