define(function (require) {

  var $ = require('jquery'),
    pc = require('new-city'),
    Dialog = require('dialog'),
    Handlebars = require('handlebars'),
    sticky = require('sticky'),
    Widgets = require('widgets/widgets');

  var form = Widgets.Form;

  var fileverify = [];
  var filearry = [];


  var $form = $("#loanAppInfoForm"),
    $submitbt = $("#submitbt"),
    $nextbt = $("#nextbt"),
    $savebt = $("#savebt"),
    $submsg = $("#submsg"),
    $sidernavspan = $(".sidernav ul li span"),
    tlen = $sidernavspan.length,
    index = 0;

  function inputInit() {
    //是否有房,是否有车逻辑处理
    var $hasHouse = $("input[name='hasHouse']"),
      $hasLoan = $("input[name='hasLoan']"),
      $hasCar = $("input[name='hasCar']"),
      $carLoan = $("input[name='carLoan']"),
      $some = $("#carBrand,#carYear,#carNumber");

    $hasHouse.click(function () {
      if (this.value == "true") {
        $hasLoan.removeAttr("disabled");
      } else {
        $hasLoan.eq(1).trigger("click");
        $hasLoan.attr("disabled", "disabled");
      }
    });

    //是否有房 默认为否时 有无房贷禁止操作
    $hasHouse.each(function () {
      if ($(this).val() == "false" && $(this).attr("checked")) {
        $hasLoan.eq(1).trigger("click");
        $hasLoan.attr("disabled", "disabled");
      }
    });

    $hasCar.click(function () {
      if (this.value == "true") {
        $carLoan.removeAttr("disabled");
        $some.removeAttr("disabled").add($carLoan).parents(".ui-form-item").show();
      } else {
        $carLoan.eq(1).trigger("click");
        $carLoan.attr("disabled", "disabled");
        $some.attr("disabled", "disabled").add($carLoan).parents(".ui-form-item").hide();
      }
    });
    if ($hasCar.filter(":checked").val() == "false") $hasCar.eq(1).trigger("click");
  }


  //获取所有用户没有填的字段

  function getEmptyArr() {
    var arr1 = [],
      arr2 = [],
      tmpArr = [];

    $form.find("input[type='radio']:checked,input[type='checkbox']:checked").each(function () {
      arr1.push(this.name);
    });

    $form.find("input[type='radio'],input[type='checkbox']").filter(function () {
      return !new RegExp(arr1.join("|")).test(this.name) && !jQuery(this).is(":disabled");
    }).each(function (k, v) {
      arr2.push(this.name);
    });
    arr2 = $.uniqueArray(arr2);
    for (var i = 0; i < arr2.length; i++) {
      tmpArr.push({
        name: arr2[i],
        value: ""
      });
    }
    return tmpArr;
  }

  //获取所有为空的字段数组emptyArr，通过验证字段数组validArr，验证出错字段数组errorArr

  function getStateObj() {
    var names = [],
      returnArr = [],
      errorArr = [],
      serializeArray = $form.serializeArray();
    $.merge(serializeArray, getEmptyArr());
    $form.find("li.listinfo").each(function (k, v) {
      var tmpnames = [];
      if ($(this).find("label.error").filter(function () {
        return $(this).css("display") == "block";
      }).length) {
        errorArr.push(k);
      } else {
        errorArr.push("");
      }
      $(this).find(".ui-form-required").each(function () {
        var $e = $(this).parents(".ui-form-item").filter(function () {
          return $(this).css("display") != "none";
        }).find("input[type='text'],input[type='password'],input[type='checkbox'],input[type='radio'],input[type='file'],select,textarea");
        $.each($e, function () {
          var name = $(this).attr("name");
          if (name) tmpnames.push(name);
        });

      });
      tmpnames = $.uniqueArray(tmpnames);
      names.push(tmpnames);
    });

    var iterator = function (arr1, arr2, item) {
      $.each(serializeArray, function (k, v) {
        if (v.name == item) {
          if (!v.value) {
            arr1.push(v.name);
          } else {
            arr2.push(v.name);
          }
          return false;
        }
      });
    };

    for (var i = 0, len = names.length; i < len; i++) {
      var emptyArr = [],
        validArr = [];
      for (var j = 0; j < names[i].length; j++) {
        iterator(emptyArr, validArr, names[i][j]);
      }
      returnArr.push({
        empty: emptyArr,
        valid: validArr,
        error: errorArr
      });
    }
    return returnArr;
  }

  //进度条

  function updateProgress() {
    var eleArr = [];
    var $label = $("#loanAppInfoForm .ui-label").filter(function () {
      var $p = $(this).parents(".ui-form-item");
      var $no = $(this).nextAll("input[type='text'],input[type='radio'],select,textarea");
      if ($no.length === 0) {
        $no = $(this).nextAll().find("input[type='hidden']");
      }
      if ($p.css("display") != "none" && $no.length) {
        return true;
      } else {
        return false;
      }
    });
    $label.each(function (k, v) {
      var $ele = $(this).parents(".ui-form-item").find("input,select,textarea").filter(function () {
        if ($(this).is(":text,:hidden") && $(this).val() && $(this).val() != "请选择") {
          return true;
        } else if ($(this).is(":radio,:checkbox")) {
          return this.checked;
        } else if ($(this).is("select")) {
          return $(this).find("option").is(":selected");
        } else {
          return false;
        }
      });
      if ($ele.val()) {
        eleArr.push($ele);
      }
    });

/*
    var pragress = parseInt(((eleArr.length / $label.length) * 100));
    for(var o=0;o<fileverify.length;o++)
      pragress = pragress - (fileverify[o])*2;
   */
    var readyComp = eleArr.length;
    var allFilesLen = $label.length + filearry.length;
    for (var i = 0; i < filearry.length; i++) {
      if (parseInt(filearry[i], 10) != 1) {
        readyComp++;
      }
    }
    var pragress = parseInt(((readyComp / allFilesLen) * 100), 10);

    $(".J_progress-txt").text(pragress + "%");
    $(".J_progressbar").css("width", pragress + "%").attr("title", pragress + "%");
    //百分比写入隐藏域
    $("#progressPercentValue").val(pragress);
  }


  function checkmyprogress() {

    var error_arr = getStateObj();

    //判断必要资料是否上传
    fileverify = [];
    filearry = [];
    $('.J_verify_Status_ul li .ver-bg-icon').each(function () {

      fileverify.push($(this).attr('data'));
      filearry.push($(this).attr('data'));
    });


    if (fileverify.length <= 2) {

      fileverify[2] = "0";
      fileverify[3] = "0";
    }


    if (fileverify[0] != "0") {
      error_arr[0].empty[0] = "idverify";
      $('#J_upload_status_em').removeClass().addClass("half");
    }

    if (fileverify[1] != "0") {
      error_arr[2].empty[0] = "company-verify";
      $('#J_upload_status_em').removeClass().addClass("half");
    }


    if (fileverify[2] != "0") { //信用认证未完成
      $('#J_upload_status_em').removeClass().addClass("half");
      $('#J_xinyong_status_em').removeClass().addClass("half");
    } else {
      $('#J_xinyong_status_em').removeClass().addClass("valid");
    }

    if (fileverify[3] != "0") {
      error_arr[2].empty[0] = "income-verify";
      $('#J_upload_status_em').removeClass().addClass("half");
    }

    if (fileverify[0] == "0" && fileverify[1] == "0" && fileverify[2] == "0" && fileverify[3] == "0") {

      $('#J_upload_status_em').removeClass().addClass("valid");
    }


/*
         if (fileverify == 1){
           if (!$submitbt.hasClass("ui-button-disabled")) {
                  $submitbt.addClass("ui-button-disabled").attr("disabled", "disabled");
                  $('#submitleft').addClass("ui-button-disabled").attr("disabled", "disabled");
                }
           $('#J_upload_status_em').removeClass().addClass("half");
         } else{

           $('#J_upload_status_em').removeClass().addClass("valid");
         }
      */


    //验证所有的自定义select
    var yzarr = ['graduation', 'homeProvince', 'homeCity', 'liveProvince', 'liveCity', 'salary', 'province', 'city', 'officeType', 'officeDomain', 'officeScale', 'workYears', 'carYear'];
    $.each(yzarr, function (key, val) {
      if ($('#' + val).attr('value') === "" || $('#' + val).attr('value') === "请选择") {
        switch (key) {
        case 0:
          error_arr[0].empty[0] = "graduation";
          break;
        case 1:
          error_arr[0].empty[0] = "homeProvince";
          break;
        case 2:
          error_arr[0].empty[0] = "homeCity";
          break;
        case 3:
          error_arr[0].empty[0] = "liveProvince";
          break;
        case 4:
          error_arr[0].empty[0] = "liveCity";
          break;
        case 5:
          error_arr[2].empty[0] = "salary";
          break;
        case 6:
          error_arr[2].empty[0] = "province";
          break;
        case 7:
          error_arr[2].empty[0] = "city";
          break;
        case 8:
          error_arr[2].empty[0] = "officeType";
          break;
        case 9:
          error_arr[2].empty[0] = "officeDomain";
          break;
        case 10:
          error_arr[2].empty[0] = "officeScale";
          break;
        case 11:
          error_arr[2].empty[0] = "workYears";
          break;
        case 12:
          if ($('input:radio[name="hasCar"]:checked').val() == 'true') {
            error_arr[3].empty[0] = "carYears";
            break;
          }

        }

        if (!$submitbt.hasClass("ui-button-disabled")) {
          $submitbt.addClass("ui-button-disabled").attr("disabled", "disabled");
          $('#submitleft').addClass("ui-button-disabled").attr("disabled", "disabled");
        }

        // if(  ($('.loanappinfo').find('.uploadinfo').hasClass('cur'))  && ($submsg.text() == ''))
        //  $submsg.html("您还有必填的下拉选项没有选择，请补全后再进行提交！");
      }

    });

    return error_arr;
  }


  //各个tab中的字段验证，状态处理

  function updateStatus(fn) {
    updateProgress();

    $.each(checkmyprogress(), function (k, v) {

      if (!$sidernavspan.eq(k).parent('li').hasClass('ig_li')) {
        if (v.error[k] || v.error[k] === 0) {
          $sidernavspan.eq(k).removeClass().addClass("error");
        } else if (v.empty.length) {
          $sidernavspan.eq(k).removeClass().addClass("half");
        } else {
          $sidernavspan.eq(k).removeClass().addClass("valid");
        }
      }
    });
    if ($sidernavspan.filter(function () {
      return $(this).hasClass("valid");
    }).length != tlen) {
      if (!$submitbt.hasClass("ui-button-disabled")) {
        $submitbt.addClass("ui-button-disabled").attr("disabled", "disabled");
        $('#submitleft').addClass("ui-button-disabled").attr("disabled", "disabled");
      }
    } else {
      $submitbt.removeClass("ui-button-disabled").removeAttr("disabled");
      $('#submitleft').removeClass("ui-button-disabled").removeAttr("disabled");
    }
    if (fn && typeof fn == "function") fn();

  }

  //对状态和进度进行事件监控
/*$form.on("focusout keyup",":text,[type='password'],[type='file'],textarea",function(){
   if(/msie 6/i.test(navigator.userAgent)) return;
   updateStatus();
   }).on("click","[type='radio'], [type='checkbox'], select, option",function(){
   updateStatus();
   })*/
  //对比了下，直接监听还好些
  setInterval(function () {
    updateStatus();
  }, 1000);

  new Dialog({
    trigger: '.auth',
    width: '600px',
    align: {
      baseXY: ['50%', 0],
      selfXY: ['50%', 0]
    },
    hasMask: {
      hideOnClick: false
    }
  }).before('show', function () {
    $savebt.trigger("click");
    index = this.activeTrigger.parents(".listinfo ").index();
    this.set('content', "/upload/uploadMaterial!uploadPage.action?" + this.activeTrigger.attr('href') + "&tab=" + index);
  }).after('hide', function () {
    location.href = "/borrow/borrow.action?tab=" + index;
  });

  $(".sidernav").on("click", "li", function () {
    $(".sidernav ul>li").removeClass("cur");
    $(this).addClass("cur");
    $(".loanappinfo>li").removeClass("cur").eq($(this).index()).addClass("cur");
    updateStatus();

    if ($(this).index() == tlen - 1) {
      var str = "";
      $nextbt.hide();
      $submitbt.show();
      $sidernavspan.each(function () {
        if ($(this).attr("class") != "valid") {
          str += $(this).parent().text() + "，";
        }
      });
      if (str) {
        $submsg.html("您的" + str + "没有填写完整，请补全后再进行提交！");
      }
    } else {
      $nextbt.show();
      $submitbt.hide();
      $submsg.empty();
    }
  });


  //对省份下拉框初始化
  // var pd = $("#pData").data("province").split(/\s/g);
  pc.init("#J_select_jiguan", "#J_select_jiguan1"); // 籍贯
  pc.init("#J_select_hukou", "#J_select_hukou1"); // 户口所在地
  pc.init("#J_select_gongzuo", "#J_select_gongzuo1"); // 工作城市
  pc.readcity();



  //初始化input
  inputInit();
  //初始化 检测状态
  updateStatus(function () {
    var tab = location.href.split(/tab=(.*)/)[1];
    if (tab) {
      //上传材料后跳到当前材料的tab页
      $sidernavspan.eq(parseInt(tab, 10)).parent().trigger("click");
      return;
    }
    $sidernavspan.each(function (i) {
      //tab页跳到没有完成填写的页面，否则跳到最后的tab页
      if (this.className != "valid") {
        $(this).parent().trigger("click");
        return false;
      } else if (i == tlen - 1 && this.className == "valid") {
        $(this).parent().trigger("click");
      }

    });
  });

  setTimeout(function () {
    $("input[type='text']:disabled,input[type='radio']:disabled,select:disabled").filter(function () {
      return this.type != "radio" || this.type == "radio" && this.checked;
    }).each(function () {
      if (this.value && this.name) {
        $submitbt.before("<input type='hidden' name='" + $(this).attr('name') + "' value='" + $(this).val() + "'/>");
      }
    });
  }, 500);

  //重置表单，去掉必填验证,保存时可以不验证必填项,注意这里不是调试代码
  //form.notRequired($form);
  var vali = form.validate({
    target: "#loanAppInfoForm",
    before: function (form, $target) {
      form.setPhone("phonepre", "phonesuf", "phone");
      form.setPhone("workPhonepre", "workPhonesuf", "workPhone");
    },
    validateData: {
      submitHandler: function (el) {
        updateStatus();
        form.ajaxSubmit($(el), {
          //debug:true,
          //  msgafter: "#savebt",
          extraData: {
            type: "save"
          },
          success: function (data) {
            this.msg(data.message);
            if ($nextbt.data("next")) {
              goNext();
            }
          }
        });
      }
    }
  });

  var getRulesAll = [];
  var getRules = function () {
    $.each(vali.settings.rules, function (k, v) {
      if (v && v.required) {
        getRulesAll.push($("[name='" + k + "']"));
      }
    });
    return getRulesAll;
  };


  var changeRequired = function (type) {
    var rules = getRulesAll.length > 0 ? getRulesAll : getRules();
    $.each(rules, function () {
      this.rules("add", {
        required: type
      });
    });
  };

  var goNext = function () {
    var index = $(".sidernav li.cur").index();
    if (index < tlen - 1) {
      $(".sidernav li").eq(index + 1).trigger("click");
      document.body.scrollTop = 230;
    }
  };


  function isChn(str) {
    var reg = /^[\u4E00-\u9FA5]+$/;
    if (!reg.test(str)) {
      return false;
    }
    return true;
  }


  $nextbt.click(function (e) {

    var index = $(".sidernav li.cur").index();

    if (index === 0) {

      if ($('#graduation').parent('div').find('.J_txt').text() == '请选择') {
        $('#graduation-error').css('display', 'block');
        return false;
      }

      if ($('#homeProvince').parent('div').find('.J_txt').text() == '请选择') {
        $('#homeProvince-error').css('display', 'block');
        return false;
      }

      if (isChn($('#homeProvince').parent('div').find('.J_txt').text()) === false) {
        $('#homeProvince-error').css('display', 'block');
        return false;
      }

      if ($('#homeCity').parent('div').find('.J_txt').text() == '请选择') {
        $('#homeCity-error').css('display', 'block');
        return false;
      }

      if (isChn($('#homeCity').parent('div').find('.J_txt').text()) === false) {
        $('#homeCity-error').css('display', 'block');
        return false;
      }

      if ($('#liveProvince').parent('div').find('.J_txt').text() == '请选择') {
        $('#liveProvince-error').css('display', 'block');
        return false;
      }

      if (isChn($('#liveProvince').parent('div').find('.J_txt').text()) === false) {
        $('#liveProvince-error').css('display', 'block');
        return false;
      }


      if ($('#liveCity').parent('div').find('.J_txt').text() == '请选择') {
        $('#liveCity-error').css('display', 'block');
        return false;
      }

      if (isChn($('#liveCity').parent('div').find('.J_txt').text()) === false) {
        $('#liveCity-error').css('display', 'block');
        return false;
      }

    }

    if (index == 2) {
      if ($('#salary').parent('div').find('.J_txt').text() == '请选择') {
        $('#salary-error').css('display', 'block');
        return false;
      }

      if ($('#province').parent('div').find('.J_txt').text() == '请选择') {
        $('#province-error').css('display', 'block');
        return false;
      }

      if ($('#city').parent('div').find('.J_txt').text() == '请选择') {
        $('#city-error').css('display', 'block');
        return false;
      }

      if ($('#officeType').parent('div').find('.J_txt').text() == '请选择') {
        $('#officeType-error').css('display', 'block');
        return false;
      }

      if ($('#officeDomain').parent('div').find('.J_txt').text() == '请选择') {
        $('#officeDomain-error').css('display', 'block');
        return false;
      }

      if ($('#officeScale').parent('div').find('.J_txt').text() == '请选择') {
        $('#officeScale-error').css('display', 'block');
        return false;
      }

      if ($('#workYears').parent('div').find('.J_txt').text() == '请选择') {
        $('#workYears-error').css('display', 'block');
        return false;
      }


      //验证公司电话
      var wp1 = $("#workPhonepre").val();
      var wp2 = $("#workPhonesuf").val();

      var p_dom = $("#workPhonepre").parent('div').find('.error');

      if (wp1 === "" || wp2 === "") {
        p_dom.text('公司电话不能为空');
        p_dom.css('display', 'block');
        return false;
      }

      if ($.isNumeric(wp1) === false || $.isNumeric(wp2) === false) {
        p_dom.text('请输入正确的公司电话');
        p_dom.css('display', 'block');
        return false;
      }


    }

    if (index == 3) {
      var li_hascar = $('input:radio[name="hasCar"]:checked').val();

      if (li_hascar == "true" && $('#carYear').parent('div').find('.J_txt').text() == '请选择') {
        $('#carYear-error').css('display', 'block');
        return false;
      }


      //判断车产是否填写
      var cb1 = $("#carBrand").val();
      if (li_hascar === "true" && cb1 === "") {
        $("#carBrand").parent('div').find('.error').css('display', 'block');
        return false;
      }


    }




    changeRequired(true);
    $(this).data("next", true);

  });

  $savebt.click(function (e) {
    changeRequired(false);
    $nextbt.data("next", false);
  });

  $('.auth').click(function (e) {
    form.ajaxSubmit($('#loanAppInfoForm'), {
      //debug:true,
      // msgafter: "#savebt",
      extraData: {
        type: "save"
      },
      success: function (data) {
        this.msg(data.message);

      }
    });
  });

  new Dialog({
    trigger: '.J_submit_btn',
    content: $('#J_conform_submit_div'),
    width: '500px',
    height: '360px',
    hasMask: true
  }).before('show', function () {

	  var amount=$('#J_m1').attr('data');
	  var month=$('#J_m2').attr('data');
	  var rate=$('#J_m3').attr('data');
	  var val = amount*100;
	  val = parseInt(Math.round(val/month + val*rate/100), 10)/100;
	  val = val.toFixed(2);
	  $('#J_monthre').text(['￥',val].join(''));

  });




  sticky("#stick", 0, function (status) {

  });

  var timer = null;
  var setTime = 5;
  var sureButton = $('#J_loan_ok');
  var oldHtml = sureButton.val();

  function showTime() {
    sureButton.attr('disabled', 'disabled');
    sureButton.addClass('ui-button-litgray');
    sureButton.removeClass('ui-button-blue');
    sureButton.html(oldHtml + '(' + setTime + ')');

    clearInterval(timer);
    timer = setInterval(function () {
      if (setTime > 0) {
        sureButton.html(oldHtml + '(' + setTime + ')');
        setTime--;
      } else {
        clearInterval(timer);
        sureButton.html(oldHtml);
        sureButton.removeClass('ui-button-litgray');
        sureButton.addClass('ui-button-blue');
        sureButton.removeAttr('disabled');
      }
    }, 1000);
  }


  $('#submitleft').on('click', function () {
    clearInterval(timer);
    setTime = 5;
    showTime();
  });

  $('#submitbt').on('click', function () {
    $('#submitleft').trigger('click');
  });

  $('#J_loan_ok').click(function (e) {
    if (!$(this).attr('disabled')) {
      if (!vali.valid()) {
        alert("信息填写有误，请返回重新填写!");
        return false;
      }

      $form[0].submit();
      //这里要return fasle，不然会把保存中的数据也提交过去，即提交两次
      return false;
    }
    return false;
  });

  $('#J_loan_cancel').click(function (e) {
    clearInterval(timer);
    $('#J_conform_submit_div').parent().parent('.ui-dialog').find('.ui-dialog-close').trigger('click');
  });



  //自定义select的按钮事件，点击显示选择
  ///////////////
  //点击其他地方的时候需要关闭弹出的select
  $(document).click(function (e) {
    var target = e.target;
    if ($(target).parent("span").hasClass("arrow")) return;
    if (!$(target).parent("div").hasClass("J_select_btn")) {
      $(".J_popBox").css("display", "none");
    }
  });

  $(".J_select_btn").click(function (e) {

    if ($(e.currentTarget).attr('disabled') == 'disabled') {
      return;
    }
    $(".J_popBox").css("display", "none");
    var ul_dom = $(e.currentTarget).parent().find("ul");
    if (ul_dom.css("display") == "block") {
      ul_dom.css("display", "none");
    } else {
      ul_dom.css("display", "block");
    }
  });
  //鼠标划过离开select时候的高亮状态
  $(".J_popBox").delegate('li', 'mouseover', function (e) {
    $(e.currentTarget).attr("class", "selected");
  });

  $(".J_popBox").delegate('li', 'mouseleave', function (e) {
    $(e.currentTarget).attr("class", "");
  });
  $(".J_popBox").delegate('li', 'click', function (e) {
    var value = ($(e.currentTarget).attr("datavalue"));
    var txt = $(e.currentTarget).find("span").text();
    var dom = $(e.currentTarget).parent().parent();
    dom.find("input").attr("value", value);
    dom.find(".J_txt").text(txt);
    if (value == 'RRGXD' || value == 'RRSYD' || value == 'RRWSD') {
      location.href = "/borrow/calculator.action?prodType=" + value;
    }

    if ($(e.currentTarget).parent('ul').attr('id') == 'repayTimeul') {
      updateRepayDetail();
      updateRateRange();
    }



    var lid = $(e.currentTarget).parent('ul').parent('div').find('input').attr('id');

    $('#' + lid + '-error').css('display', 'none');

  });

  $("div.J_select_btn").each(function () { //把所有不可选择的select置灰
    if ($(this).attr('disabled') == 'disabled') {
      $(this).css("border-color", "#e0e0e0");
      $(this).find('.arrow').css("background-color", "#e0e0e0");

    }

  });




  //自定义复选框的点击事件
  $(".J_ui_checkbox").bind('click', function (e) {
    var dom = $(e.currentTarget);
    if (dom.hasClass("uncheck")) {
      dom.removeClass("uncheck");
      dom.addClass("check");
      // $("#agree_contract").attr("value","true");
    } else {
      dom.removeClass("check");
      dom.addClass("uncheck");
      // $("#agree_contract").attr("value","false");
    }
  });

});