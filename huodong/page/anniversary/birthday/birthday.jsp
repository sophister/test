<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>

<fis:extends name="common:page/layout/no-footer.jsp">
    <fis:require id="/widget/ui//html5media/html5media.min.js" />
    <!-- 单独一个生日趴弹框的css文件 -->
    <fis:require id="/widget/ui/modal/modal.birth.css" />
    <!-- video.js -->
    <fis:require id="/widget/ui/video/video.css" />
    <fis:require id="/widget/ui/video/video.js" />
    <fis:block name="block_body">
      <div class="swiper-container swiper-container-vertical">
        <div class="swiper-wrapper">
            <div class="swiper-slide slide1">
              <img src="./assets/birth_01_word.png" class="birth_01_img" alt="">
            </div>
            <div class="swiper-slide slide2">
              <div class="video_container">
                <h3>五年，从未改变</h3>
                <p>只为成就更好的你</p>
               <video id="really-cool-video" class="video-js vjs-default-skin" controls
               preload="auto" width="400" poster=""
               data-setup='{}'>
                <source src="http://www.zhangxinxu.com/study/media/cat.mp4" type='video/mp4'>
              </video>

              </div>
            </div>
            <div class="swiper-slide slide3">
            <img src="./assets/birth_03_word.png" class="birth_03_img" alt="">
              <div class="btn_wrap">
                <span class="want">接受邀请</span>
              </div>
            </div>
        </div>
        <div class="pagination"></div>
      </div>
    </fis:block>
    <fis:script>
      require(["./birthday"], function(birthday){
          
      });
    </fis:script>

    <fis:require name="./birthday.jsp" />
</fis:extends>