<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<div class="wdg-second-header">
    <div class="main-section">
        <a href="/" class="brand-logo mt15"></a>
        <ul class="site-nav">
            <li class="user-item fn-clear">
                <sec:authorize access="anonymous">
                    <div class="user-name fn-clear">
                        <a href="/loginPage.action">我的账户</a>
                    </div>
                </sec:authorize>
                <sec:authorize access="isAuthenticated()">
                    <div class="user-avatar-container fn-left">
                        <img id="he-userAvatar" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlFMzdFM0U2NTNCOTExRTVBNUM0ODE2MTc5OUFCNDBEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlFMzdFM0U3NTNCOTExRTVBNUM0ODE2MTc5OUFCNDBEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUUzN0UzRTQ1M0I5MTFFNUE1QzQ4MTYxNzk5QUI0MEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUUzN0UzRTU1M0I5MTFFNUE1QzQ4MTYxNzk5QUI0MEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7KYAvEAAAFgUlEQVR42sxYW1BbVRTdSW4SCgkEwqtChFCefTnlXUBHZ4RKtfKhU60z2o8WO2Oh+Kk//fDDjj9Wx1YdHXXaD5kydarjUKbFL6VWSqujU+Wl0AJaHgUS3hAQ97o5oRdIyA1E7Z7Zubk556y1cs65++x9NYuLi3Q/mrTOcXb2Pewl7FnsSexm0TbOfpu9lb2J/RJ7d6AEGsxYwaF3/HZs/uRVHV/2s1ex78ZYlRxYkqvsp9jrmGvBD4/6GePOj/PlPfZM3E/Puqjp52660dZLHb1D9NfdMZqcmpX7hoUa6YHocEq3xVBOpo1KHrJrNhn1RdwEP85Y1Szumw3NGIOE8OVd9pdx/+eQk85cbKHLze2yODXGoqisIINeKs+jxNgIz88fsdcw74yvGfMpjDvE8KWePW/ONU8ff/UD1Tb+RK75hXVtSr2kowOlu6iyopAMenmhWtifZO4hb8K0PmYKor6DqL5BJx168xydbbi+blEwjAUGsPoGHfgpDxyCa5VpvYgK5cvX7Bnttwep8sQ56ugZCloYAFbliTpq7xnEbQa4BOfawsSeKsC/qjl5gUbGpoIeo4BZ8/YFz8wVCE7fwsTTd3h2bp5e/6CeRsen/7UACuzX3q8ncIFTcK9+KrkBIm8iYJ4+3yTvBzUWExtHyfYUirBY5Hunw0G3urtoaHBA1fgXy3Op6lnEaWpj386+sHLGnoMobPbPL/+oCjQtPZOyc/MpyhpNOp0kO77jN7SpsVrmAqeIkfu9LeVRfJxtaKH5hb9VzVRKaprPdrShjz8D15mL1zy3VcuE8TLi7CuampmTg6caw/IFow+s8VoHgVscdSnKGXsC++3KL7dUR/TwCEtQ+niOOHCL83ePUlgxPq639gT1ydNo1PdVcBcrhW3DR2ffXdVAY06H3z54QtWagnurUphNPqTdT4cqQ0gIRh+PKbiTlMLkJG/SvQFVGeJU1++dPtvRpjaWreA2bSSDdU9/Rxs5eUmTku0cYCPF8o0GFGD9pdZIh61hIQZyTAR2DA0O9Mu+UQO3sAnlUvbiI+FeIvefm4K7RynsN/mISYz+34QpuH9VLiWqmRdysx6kL7+9qQrIbA6nuPjNFBllpTCTifR6vTshdLlocmKCRkeGaaD/Do2Pj6nCA7ewK0phKLEWi3cmo3BYM/pbeJOnZWZRFAvyZkajUfYoq5W2pKXTyPAwdba3koMfCl8WYpCIuT0V1aWlpeS0BwHn+1DegKX56V4Ha7Vayty6nQqKSnyK8mYQiDEYCwxvhmIl1L35UeZ1rcwuTuPj4N58knTLASRJopy8AjksrNcwFhjAWobNXAf35nluT3lLe+qQrKHEOlCWvWymduXkyXnWRg0YwFLO3PNcOSXGWjyJYt0qYaJCrsb3yqcLKVU8Jamc8AVDlFJcWoY7iQRHZcVuT9MxZZW+bM1EhfyZkTfjW0efIltCvOqcKrBlTZGxwYGNz/Ypczf6q5KQRTZjek8e20fmECnowoAJbLGEzZ6VWlMYK0e9to+93RYdRocfTaC4CEPQRAELmMAGB7gEp9+6kkTZ/gj7jSiTno48lkgl6RbSaTXrFoSxwAAWMIENjpWvCNYUBnvlw6solR/GCxBJp6GyHVaqLrVRjj2c9Dr1AtEXY6p4LDAk91i8VCkRHIG9uDOZzHT8iz+Qahx545kt5/Eaiv9pRkV2DJXvtFL7nSnqHpqmfucsjU7O04zLXVmF6LUUGSZRfISR7DGbKGNzKBmkpf+PpatmXHmjm8zmwN8o6g339hWAWNw2UfdVM1HhDptJw6524jwv7s4x1lJIMBiMgQvT6XTL7gVgLZxF4ggoF686EZRwAod7ygGRurSJ5KCBx3b7OubWfHF3P9o/AgwAux7qHZu7kkUAAAAASUVORK5CYII="  />
                        <div class="avatar-masking"><a href="/account/index.action"></a></div>
                        <a href="/account/comm!mail.action" class="msgcount-icon" id="header-msgcount"></a>
                    </div>
                    <div class="user-name fn-clear">
                        <a href="/account/index.action">我的账户</a>
                    </div>
                </sec:authorize>
            </li>
            <li class="channel-item"><a href="/">首页</a></li>
            <li class="channel-item"><a href="/financeplan/listPlan.action">U计划</a></li>
            <li class="channel-item"><a href="/autoinvestplan/listPlan!detailPlan.action">薪计划</a></li>
            <%--<li class="channel-item"><a href="/lend/loanList.action">散标</a></li>--%>
            <%--<li class="channel-item"><a href="/transfer/transferList.action">债权转让</a></li>--%>
            <li class="channel-item"><a href="/lend/loanList.action">债权</a></li>
            <li class="channel-item"><a href="/lend/loanList!newComerLoan.action">新手专区</a></li>
            <li class="channel-item"><a href="/about/about.action?flag=intro">关于我们</a></li>
        </ul>
    </div>
</div>
<div id="header-helper" style="display: none;">
    <span id="header-helper-authenticated">
      <sec:authorize access="isAuthenticated()">true</sec:authorize>
      <sec:authorize access="anonymous">false</sec:authorize>
    </span>
</div>
<fis:script>
    require(["common:widget/second-header/second-header"], function(header){
        header.init();
    });
</fis:script>