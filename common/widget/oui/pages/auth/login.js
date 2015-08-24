define(function (require) {
  var $ = require('jquery'),
    RSAencript = require('rsa');
  var Widgets = require('widgets/widgets');
  var Handlebars = require('handlebars');
  var MailSuggest = require('mailSuggest');


  $(function () {
    var form = Widgets.Form;
    var suggest = new MailSuggest();
    var $input = $('#j_username');
    var $pass = $('#J_pass_input');

    var $suggest = $('<div class="suggest" id="suggest"></div>').appendTo($('body'));
    if ($('#rememberme').length) {
      form.ui.init();
    }
    suggestPostion($suggest);
    var source = $('#email-suggest-template').html();
    var template = Handlebars.compile(source);
    form.validate({
      target: "#login",
      before: function () {
        form.randImage();
        $('#refreshCode').click(function () {
          $("#randImage").trigger('click');
        });
      },
      inputTheme: true,
      showSingleError: true,
      validateData: {
        onkeyup: false,
        showErrors: function (errorMap, errorList) {
          var $allError = $('#allError');
          if ($allError.length) {
            $("#login").find("input").each(function () {
              $(this).removeClass("error");
            });
            $allError.html("");
            if (errorList.length) {
              $allError.html(errorList[0].message);
              $(errorList[0].element).addClass("error");
            }
          } else {
            this.defaultShowErrors();
          }
        },
        submitHandler: function (el) {
          $pass.val(RSAencript($pass.val()));
          el.submit();
        }
      }
    });
    $input.on('keyup', function (e) {
      suggestPostion($suggest);
      var email = $(this).val();
      switch (e.keyCode) {
      case 38:
        //上方向键
        keyDownUp($(this), 'up');
        break;
      case 40:
        //下方向键
        keyDownUp($(this), 'down');
        break;
      case 13:
        //回车键
        keyDownUp($(this), 'enter');
        break;
      default:
        if (!email.length) {
          $suggest.hide();
          return;
        }
        var result = suggest.run(email);
        if (/^\d{1,}$/g.test(email)) {
          result.remove = true;
        }
        var html = template(result);
        $suggest.html(html).show().find('li').eq(0).addClass('cur');

      }
    }).on('keydown', function (e) {
      if (e.keyCode == 13) {
        e.preventDefault();
      }
    }).on('focusout', function () {
      setTimeout(function () {
        $suggest.hide();
      }, 500);
    });


    function suggestPostion(obj) {
      var $input = $('#j_username');
      var res = {};
      res.left = $input.offset().left;
      res.top = $input.offset().top+$input.innerHeight();
      obj.css({
        left: res.left,
        top: res.top,
        absolute: 'position'
      });
    }

    $(window).on('resize', function () {
      suggestPostion($suggest);
    });

    $suggest.on('mouseenter', 'li', function () {
      $(this).addClass('cur');
    }).on('mouseleave', 'li', function () {
      $(this).removeClass('cur').siblings().removeClass('cur');
    }).on('click', 'li', function () {
      keyDownUp($input, 'enter');
      //$input.focus();
      $pass.trigger("focus");
    });

    function keyDownUp(obj, type) {
      var $cur = $suggest.find('.cur');
      var index = $cur.index();
      var len = $suggest.find('li').length;

      if (type == 'down') {
        index++;
        if (index > len - 1) index = 0;
        $suggest.find('li').removeClass('cur').eq(index).addClass('cur');
      } else if (type == 'up') {
        index--;
        if (index < 0) index = len - 1;
        $suggest.find('li').removeClass('cur').eq(index).addClass('cur');
      } else if (type == 'enter') {
        obj.val($cur.text()).blur();
        $suggest.hide();
        $pass.trigger("focus");
      }
    }


    $("#randCode").keyup(function () {
      var code = $(this).val();
      if (code.length) {
        $.get('/account/checkCode.action?j_code=' + code + "&code=" + code, function (data) {
          if (data.result == "true") {
            $('.validCode').show();
            $('#allError').hide();
          } else {
            $('.validCode').hide();
            $('#allError').show();
          }
        });

      }
    });

    if ($('.partner').length) {
      $('.partner').hover(function () {
        $(this).addClass('hover');
      }, function () {
        $(this).removeClass('hover');
      });
    }

    $("body")[0].scrollTop = 0;
  });
});