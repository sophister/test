define('common:widget/oui/protocol', ['require', 'exports', 'module', 'common:widget/oui/lib/jquery/1.9.1/jquery'],function (require, exports, module) {

  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery');

  /* APIs */

  var _API_PARAM = {
    REQ: 'req',
    OPT: 'opt',
    COND: 'cond'
  };

  var _API_CONF = {
    /* News */
    getNews: {
      url: '/about/about!json.action?flag=news',
      type: 'GET',
      dataType: 'json',
      _list: 'news'
    },

    /* Notices */
    getNotices: {
      url: '/about/about!json.action?flag=notices',
      type: 'GET',
      dataType: 'json',
      _list: 'notices'
    },

    /*新手的散标列表API*/
    getNewbeeLoans : {
      url : '/lend/loanList!newComerLoanJson.action',
      type: 'GET',
      dataType: 'json',
      _list: 'loans'
    },
    /*首页的 新手散标列表API*/
    getIndexNewbeeLoans : {
      url : '/lend/loanList!newComerLoanJson.action',
      type: 'GET',
      dataType: 'json',
      _list: 'newComerLoans'
    },

    /* Loans */
    getLoans: {
      url: '/lend/loanList!json.action',
      type: 'GET',
      dataType: 'json',
      _list: 'loans'
    },
    getLoansTransfer: {
      url: '/transfer/transferList!json.action',
      type: 'GET',
      dataType: 'json',
      _list: 'transferList'
    },
    getLoanInvestmentRecords: {
      url: '/lend/getborrowerandlenderinfo.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'loanId': _API_PARAM.REQ
      },
      _params: {
        'id': 'lenderRecords'
      },
      _list: 'lenderRecords'
    },
    getLoanLenderRecords: {
      url: '/lend/getborrowerandlenderinfo.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'loanId': _API_PARAM.REQ
      },
      _params: {
        'id': 'lenderInfo'
      },
      _list: 'lenders'
    },
    getLoanTransferRecords: {
      url: '/transfer/transactionList.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'loanId': _API_PARAM.REQ
      },
      _list: 'loanTransferLogList'
    },
    getLoanRepaymentRecords: {
      url: '/lend/getborrowerandlenderinfo.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'loanId': _API_PARAM.REQ
      },
      _params: {
        'id': 'repayDetail'
      },
      _list: 'phases'
    },
    getLoanCollectionRecords: {
      url: '/lend/dunDetail.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'loanId': _API_PARAM.REQ
      },
      _list: 'dunInfoList'
    },
    getCreditInfo: null,

    /* Loans - Comments */
    getCommentsOnLoan: {
      url: '/lend/loanCommentList.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'loanId': _API_PARAM.REQ,
        'pageIndex': _API_PARAM.OPT
      }
    },
    postCommentOnLoan: {
      url: '/lend/commentLoan.action',
      type: 'POST',
      dataType: 'json',
      params: {
        'id': _API_PARAM.REQ,
        'threadId': _API_PARAM.REQ,
        'comment': _API_PARAM.REQ
      }
    },

    /* Financial Plans */
    getPlans: {
      url: '/financeplan/listPlan!listPlanJson.action',
      type: 'GET',
      dataType: 'json',
      params: {
          'category': _API_PARAM.REQ
        },
      _list: 'plans'
    },
    getAutoinvestPlans: {
      url: '/autoinvestplan/listPlan!listPlanJson.action',
      type: 'GET',
      dataType: 'json',
      _list: 'plans'
    },
    getPlanReserveRecords: {
      url: '/financeplan/getFinancePlanLenders!reserveRecord.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'financePlanStr': _API_PARAM.REQ
      },
      _list: 'rsvList'
    },
    getAutoinvestPlanBidLoans: {
      url: '/account/invest!autoInvestPlanBidLoanJson.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'subPointId': _API_PARAM.REQ
      },
      _list: 'subPointLoanLenderVoList'
    },
    getPlanJoinedRecords: {
      url: '/financeplan/getFinancePlanLenders.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'financePlanStr': _API_PARAM.REQ
      },
      _list: 'jsonList'
    },
    getPlanPerformance: {
      url: '/financeplan/listPlan!planResults.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'financePlanId': _API_PARAM.REQ
      }
    },
    /* autoinvest plan */
    getAutoinvestJoinedRecords: {
      url: '/autoinvestplan/listPlan!getAutoInvestPlanBuyerRecords.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'autoInvestPlanId': _API_PARAM.REQ
      },
      _list: 'jsonList'
    },
    /* Account */
    getUnreadMsgCount: {
      url: '/getUnreadMailsCount.action',
      type: 'GET',
      dataType: 'json'
    },
    getUnreadNewTask: {
        url: '/event/newTask!isDisplayNewTaskMark.action',
        type: 'GET',
        dataType: 'json'
      },
    /*头部用户下拉菜单 */
    getHomePageUserInfoHttp: {
        url: '/getHomePageUserInfo.action',
        type: 'GET',
        dataType: 'json'
    },
    getHomePageUserInfoHttps: {
        url: '/account/getHomePageUserInfo.action',
        type: 'GET',
        dataType: 'json'
    },
    getUserBankInfo: null,
    /* Account - Capital */
    getUserTransactions: {
      url: '/account/capital!transactionJson.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'type': _API_PARAM.REQ,
        'year': _API_PARAM.COND,
        'startMonth': _API_PARAM.COND,
        'endMonth': _API_PARAM.COND,
        'time': _API_PARAM.COND
      },
      _list: 'pointLogs'
    },
    /* Account - Borrow */
    getUserRepayingRecords: {
      url: '/account/borrow!listInProgress.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'pageIndex': _API_PARAM.OPT
      },
      _list: 'data'
    },
    getUserRepaidRecords: {
      url: '/account/borrow!listDoneLoans.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'pageIndex': _API_PARAM.OPT
      },
      _list: 'data'
    },
    getUserLoanRepaymentRecords: {
      url: '/account/borrow!listRecord.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'loanId': _API_PARAM.REQ
      }
    },
    getUserLoanApplicationRecords: {
      url: '/account/borrow!listAll.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'pageIndex': _API_PARAM.OPT
      },
      _list: 'data'
    },
    /* Account - Invest - Loans */
    getUserLoansRepaying: {
      url: '/account/invest!loanPreJson.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'pageIndex': _API_PARAM.OPT
      },
      _params: {
        'loanType': 'REPAYING_LOAN'
      },
      _list: 'loanList'
    },
    getUserLoansRepaid: {
      url: '/account/invest!loanJson.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'pageIndex': _API_PARAM.OPT
      },
      _params: {
        'loanType': 'FINISH_LOAN'
      },
      _list: 'loanList'
    },
    getUserLoansInProgress: {
      url: '/account/invest!loanJson.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'pageIndex': _API_PARAM.OPT
      },
      _params: {
        'loanType': 'BID_LOAN'
      },
      _list: 'loanList'
    },
    getUserLoansReturnRecords: {
      url: '/account/invest!backAccountJson.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'pageIndex': _API_PARAM.OPT,
        'backStatus': _API_PARAM.OPT,
        'backStartTime': _API_PARAM.OPT,
        'backEndTime': _API_PARAM.OPT
      },
      _list: 'backAccountVo'
    },
    /* Account - Invest - Transfer */
    getUserTransferringLoans: {
      url: '/account/invest!transferJson.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'pageIndex': _API_PARAM.OPT
      },
      _params: {
        'transferType': 'OF_TRANSFERRED'
      },
      _list: 'transferList'
    },
    getUserTransferableLoans: {
      url: '/account/invest!transferJson.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'pageIndex': _API_PARAM.OPT
      },
      _params: {
        'transferType': 'PRE_TRANSFERRED'
      },
      _list: 'transferList'
    },
    getUserTransferredInLoans: {
      url: '/account/invest!transferJson.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'pageIndex': _API_PARAM.OPT
      },
      _params: {
        'transferType': 'INTO_TRANSFERRED'
      },
      _list: 'transferList'
    },
    getUserTransferredOutLoans: {
      url: '/account/invest!transferJson.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'pageIndex': _API_PARAM.OPT
      },
      _params: {
        'transferType': 'OUT_TRANSFERRED'
      },
      _list: 'transferList'
    },
    getUserTransferredOutRecords: {
      url: '/account/invest!getTranfsferLogJson.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'tranfsferId': _API_PARAM.REQ,
        'pageIndex': _API_PARAM.OPT
      },
      _list: 'transferLogList'
    },
    getUserTransferredInRecords: {
      url: '/account/invest!getTranfsferInLogJson.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'tranfsferId': _API_PARAM.REQ,
        'pageIndex': _API_PARAM.OPT
      },
      _list: 'transferLogList'
    },
    getUserTransferredLogJsonRecords: {
      url: '/account/invest!getTranfsferLogJson.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'tranfsferId': _API_PARAM.REQ,
        'pageIndex': _API_PARAM.OPT
      },
      _list: 'transferLogList'
    },
    /* Account - Invest - Financial Plan */
    getUserHoldingPlans: {
      url: '/account/invest!planJson.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'pageIndex': _API_PARAM.OPT
      },
      _params: {
        'planType': 'HOLD_PLAN'
      },
      _list: 'financePlanList'
    },
    getUserExitingPlans: {
      url: '/account/invest!planJson.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'pageIndex': _API_PARAM.OPT
      },
      _params: {
        'planType': 'EXITING_PLAN'
      },
      _list: 'financePlanList'
    },
    getUserExitedPlans: {
      url: '/account/invest!planJson.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'planType': _API_PARAM.OPT
      },
      _params: {
        'planType': 'EXIT_PLAN'
      },
      _list: 'financePlanList'
    },
    getUserReservePlans: {
      url: '/account/invest!planJson.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'planType': _API_PARAM.OPT
      },
      _params: {
        'planType': 'RESERVE_PLAN'
      },
      _list: 'financePlanList'
    },
    getUserPlanRecords: {
      url: '/account/invest!planInfoJson.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'financeId': _API_PARAM.REQ,
        'subPointId': _API_PARAM.REQ,
        'pageIndex': _API_PARAM.OPT
      },
      _list: 'financePlanList'
    },
    getUserInfo: {
      url: '/account/myInfo!userDetailLoanList.action',
      type: 'GET',
      params: {
        userId: _API_PARAM.REQ
      },
      dataType: 'json',
      _list: 'loanList'
    },
    getExpectedAmountsForPlanExiting: {
      url: '/account/invest!planInfoForExitingJson.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'subPointId': _API_PARAM.REQ
      }
    },
    getUserReversPlanPay:{
      url: '/account/invest!detailPlanRsv.action',
      type: 'GET',
      dataType: 'json',
      params: {
        'financeId': _API_PARAM.REQ
      }
    },
    /* 我的优惠券  */
    getUnuseCoupon : {
      url: '/account/coupon!couponJson.action',
      type: 'GET',
      dataType: 'json',
      _params: {
        'couponType': 'HOLD_UNUSE'
      },
      _list: 'couponList'
    },
    getUsedCoupon : {
      url: '/account/coupon!couponJson.action',
      type: 'GET',
      dataType: 'json',
      _params: {
        'couponType': 'HOLD_USED'
      },
      _list: 'couponList'
    },
    getExpiredCoupon : {
      url: '/account/coupon!couponJson.action',
      type: 'GET',
      dataType: 'json',
      _params: {
        'couponType': 'HOLD_EXPIRE'
      },
      _list: 'couponList'
    }


  };


  /* Translator */

  var _Translator = function (protocol) {
    $.extend(this, {
      CREDITINFO_MAPPING: [
        { key: 'credit', name: '信用报告' },
        { key: 'identificationScanning', name: '身份认证' },
        { key: 'graduation', name: '学历认证' },
        { key: 'work', name: '工作认证' },
        { key: 'titles', name: '职称认证' },
        { key: 'incomeDuty', name: '收入认证' },
        { key: 'house', name: '房产认证' },
        { key: 'car', name: '车产认证' },
        { key: 'marriage', name: '婚姻认证' },
        { key: 'residence', name: '居住地证明' },
        { key: 'fieldAudit', name: '实地认证' },
        { key: 'organization', name: '机构担保' },
        { key: 'video', name: '视频认证' },
        { key: 'mobileReceipt', name: '手机认证' },
        { key: 'kaixin', name: '微博认证' },
        { key: 'other', name: '其他认证' }
      ],
      URL: {
        userHome: '/account/myInfo.action?userId=',
        planDetails: '/financeplan/listPlan!detailPlan.action?financePlanId=',
        loanDetails: '/lend/detailPage.action?loanId=',
        loanApplication: '/borrow/borrow.action',
        loanTransferDetails: '/transfer/loanTransferDetail.action?transferId=',
        userPlan: '/account/invest!planInfo.action?financeId=',
        helpForBorrower: '/help/borrow/borrow!borrowProduct.action#',
        autoinvestDeatils: '/autoinvestplan/listPlan!detailPlan.action?autoInvestPlanId='
      },
      protocol: protocol
    });
  };

  $.extend(_Translator.prototype, {

    /* ** Utilities ** */
    //new getDateTime just keep hour&minute
    _getDatehour: function (raw, type) {
      var iso = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/i;
      if (isNaN(Date.parse(raw)) || iso.test(raw)) {
        if (type == 'date') {
          return raw ? raw.substring(11, 16) : '';
        } else {
          return "";
          //return raw ? raw.substring(0, 16).replace('T', ' ') : '';
        }
       } else {
        var date = new Date(raw),
          hr = date.getHours(),
          min = date.getMinutes();

        hr = hr < 10 ? '0' + hr : hr;
        min = min < 10 ? '0' + min : min;

        return hr + ':' + min;   
       }
    },

    _getDatemonth: function (raw, type) {
      var iso = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/i;
      if (isNaN(Date.parse(raw)) || iso.test(raw)) {
        if (type == 'date') {
          if(raw){
            var month = Number(raw.substring(5, 7)),
                day = Number(raw.substring(8, 10));
                day = day < 10 ? '0' + day : day;
                month = month < 10 ? '0' + month : month;
                return month + '.' + day; 
          }else{
            return '';
          }
        } else {
          return "";
          //return raw ? raw.substring(0, 16).replace('T', ' ') : '';
        }
       } else {
        var date = new Date(raw),
          month = date.getMonth() + 1,
          day = date.getDate();
          day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;

        return month + '.' + day;   
       }
    },
    _getDateyear: function (raw, type) {
      var iso = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/i;
      if (isNaN(Date.parse(raw)) || iso.test(raw)) {
        if (type == 'date') {
          var month = Number(raw.substring(5, 7)),
              year = raw.substring(0, 4);
              month = month < 10 ? '0' + month : month;
              return year + '年' + month + '月'; 
          return raw ? raw.substring(11, 16) : '';
        } else {
          return "";
          //return raw ? raw.substring(0, 16).replace('T', ' ') : '';
        }
       } else {
        var date = new Date(raw),
          month = date.getMonth() + 1,
          year = date.getFullYear();

        return year + '年' + month + '月';   
       }
    },
    _getDateTime: function (raw, type) {
      var iso = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/i;
      if (isNaN(Date.parse(raw)) || iso.test(raw)) {
        if (type == 'date') {
          return raw ? raw.substring(0, 10) : '';
        } else {
          return raw ? raw.substring(0, 16).replace('T', ' ') : '';
        }
      } else {
        var date = new Date(raw),
          year = date.getFullYear(),
          day = date.getDate(),
          month = date.getMonth() + 1;
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        if (type == 'date') {
          return year + '-' + month + '-' + day;
        } else {
          var hr = date.getHours(), min = date.getMinutes();
          hr = hr < 10 ? '0' + hr : hr;
          min = min < 10 ? '0' + min : min;
          return year + '-' + month + '-' + day + ' ' + hr + ':' + min;
        }
      }
    },

    _bankersRound: function (n, d) {
      if (typeof n == 'string') {
        n = parseFloat(n);
      }
      var e = 0.00000001,
        s = n !== 0.0 ? Math.floor(n / Math.abs(n)) : 1;
      d = d === null || d === undefined ? 2 : d;
      n = Math.abs(n) * Math.pow(10, d);
      i = Math.floor(n);
      f = n - i;
      if (Math.abs(f - 0.5) < e) {
        n = (i & 1) == 1 ? i + 1 : i;
      } else {
        n = Math.round(n);
      }
      return (s * n / Math.pow(10, d)).toFixed(2);
    },

    _fixedFloat2: function (floatNumber) {
      if (typeof floatNumber == 'string') {
        floatNumber = parseFloat(floatNumber, 10);
      }
      return parseFloat(Math.round(floatNumber * 100) / 100, 10).toFixed(2);
    },

    _commaInteger: function (number) {
      number = parseInt(number, 10);
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    _commaFloat: function (number) {
      return this._fixedFloat2(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    _loanRepaidStatus: function (status) {
      if (typeof status !== 'string') {
        status = parseInt(status, 10);
      }
      if (status == 5 || status == 'BAD_DEBT') {
        return '垫付结清';
      } else if (status == 6 || status == 'CLOSED') {
        return '正常结清';
      } else {
        return '';
      }
    },

    _loanStatus: function (status) {
      if (typeof status !== 'string') {
        status = parseInt(status, 10);
      }
      if (status === 0 || status == 'OPEN') {
        return '招标中';
      } else if (status == 1 || status == 'READY') {
        return '已满标';
      } else if (status == 2 || status == 'FAILED') {
        return '已流标';
      } else if (status == 3 || status == 'IN_PROGRESS') {
        return '还款中';
      } else if (status == 4 || status == 'OVER_DUE') {
        return '逾期';
      } else if (status == 5 || status == 'BAD_DEBT') {
        return '坏账';
      } else if (status == 6 || status == 'CLOSED') {
        return '已还清';
      } else if (status == 7 || status == 'FIRST_APPLY') {
        return '申请中';
      } else if (status == 8 || status == 'FIRST_READY') {
        return '已满标';
      } else if (status == 9 || status == 'PRE_SALES') {
        return '预售中';
      } else {
        return '';
      }
    },

    _planStatus: function (isPurcharge,category,status,day,canRollOver) {

     if(isPurcharge && isPurcharge  == 'true'){
           return '申请期';
          }else{
             if(category != 'OLD' ){
                 if(canRollOver=="true"){
                   return '收益中';
                 }else{
                   return '收益中（'+day+'天）';
                 }
               }else{
                  if(status == 'REDEMPTION_PERIOD'){
                return '开放期';
                  }else if(status == 'REDEMPTION_PERIOD'){
                return '已结束';
                  } else{  return '收益中（'+day+'天）';}
               }
           }
    },

    _returnStatus: function (status) {
      if (status === 0 || status == 'REPAID') {
        return '已收';
      } else if (status == 1 || status == 'UNREPAID') {
        return '待收';
      } else if (status == 2 || status == 'OVER_DUE') {
        return '逾期';
      } else {
        return '';
      }
    },

    _loanType: function (loanType) {
      if (loanType == 'XYRZ') {
        return '信用认证标';
      } else if (loanType == 'SDRZ') {
        return '实地认证标';
      } else if (loanType == 'JGDB') {
        return '机构担保标';
      } else if (loanType == 'ZNLC') {
        return '智能理财标';
      } else {
        return '';
      }
    },

    _jobType: function (jobType) {
      if (jobType == '工薪阶层') {
        return {
          name: '工薪阶层',
          anchor: 'prod-work'
        };
      } else if (jobType == '私营企业主') {
        return {
          name: '私营企业主',
          anchor: 'prod-biz'
        };
      } else if (jobType == '网商' || jobType == '网络商家') {
        return {
          name: '网商',
          anchor: 'prod-ecomm'
        };
      } else {
        return null;
      }
    },


    /* ** Item Translating Functions ** */

    /* News */

    news: function (item, i) {
      return {
        title: item.title,
        content: item.description,
        date: this._getDateTime(item.time, 'date'),
        noticeId: item.noticeId
      };
    },

    /* Notices */

    notices: function (item, i) {
      return {
        title: item.title,
        content: item.description,
        date: this._getDateTime(item.time, 'date'),
        noticeId: item.noticeId
      };
    },

    /* Loans */

    loan: function (item, i) {
      var progress = parseInt(this._bankersRound(item.finishedRatio / 100) * 100, 10);
      if (progress == 100 && item.finishedRatio < 100 && item.finishedRatio > 99) {
        progress = 99;
      }
      var ret = {
        title: item.title,
        loanType: item.displayLoanType,
        loanTypeText: this._loanType(item.displayLoanType),
        creditLevel: item.borrowerLevel,
        investor: item.nickName,
        interest: this._fixedFloat2(item.interest),
        amount: this._commaFloat(item.amount),
        term: item.months,
        progress: progress,
        link: this.URL.loanDetails + item.loanId,
        status: item.status,
        itemStyle: i % 2 === 0 ? '' : 'dark'
      };
      if (ret.status == 'OPEN') {
        ret.buttonLink = this.URL.loanDetails + item.loanId;
      }
      return ret;
    },

    loansTransfer: function (item, i) {
      return {
        title: item.title,
        loanType: item.displayLoanType,
        loanTypeText: this._loanType(item.displayLoanType),
        creditLevel: item.borrowerLevel,
        interest: this._fixedFloat2(item.interest),
        link: this.URL.loanTransferDetails + item.id,
        hasTransfered: item.hasTransfered == 'true' ? true:false,
        term: item.leftPhaseCount,
        cost: item.minInvestShares != 1 ? this._fixedFloat2(item.minInvestShares * item.pricePerShare) : this._fixedFloat2(item.pricePerShare),
        share: item.minInvestShares != 1 ?  item.share/item.minInvestShares : item.share,
        discount: item.discountRatio <= 1 ? item.discountRatio * 100 : item.discountRatio,
        price: item.minInvestShares != 1 ? this._fixedFloat2(item.resultPice * item.minInvestShares) : this._fixedFloat2(item.resultPice),
        itemStyle: i % 2 === 0 ? '' : 'dark'
      };
    },

    loanInvestmentRecord: function (item, i) {
      return {
        id: i + 1,
        investorShort: item.userNickName.length <= 6 ? item.userNickName : (item.userNickName).substring(0, 6) + '...',
        investor: item.userNickName,
        mobileUsed: item.tradeMethod === 'MOBILE',
        isPlan: item.lenderType == 'FINANCEPLAN_BID',
        isAutoInvest: item.lenderType == 'AUTOINVESTPLAN_BID',
        autoInvestId: item.financePlanId,
        financeold:item.financeCategory == 'OLD',
        financeU:item.financeCategory != 'OLD',
        financeCategoryStr:item.financeCategory,
        isAuto: item.lenderType == 'AUTO_BID',
        planId: item.financePlanId,
        userId: item.userId,
        planLink: this.URL.planDetails + item.financePlanId,
        amount: this._fixedFloat2(item.amount),
        time: this._getDateTime(item.lendTime),
        itemStyle: i % 2 === 0 ? '' : 'dark'
      };
    },
//散标债权信息
    loanLenderRecord: function (item, i) {
      return {
        id: i + 1,
        investorShort: item.nickName.length <= 6 ? item.nickName : (item.nickName).substring(0, 6) + '...',
        investor: item.nickName,
        userId: item.userId,
        isPlan: item.financePlanId !== null && item.autoInvestPlanId == '0',
        financeold:item.financePlanCategory == 'OLD',
        financeU:item.financePlanCategory != 'OLD',
        isAutoInvest: item.autoInvestPlanId != '0',
        autoInvestId: item.financePlanId,
        financeCategoryStr:item.financePlanCategory,
        planId: item.financePlanId,
        planLink: this.URL.planDetails + item.financePlanId,
        amount: this._fixedFloat2(item.leftAmount),
        shares: item.minInvestShares != 1 ? item.share/item.minInvestShares: item.share,
        itemStyle: i % 2 === 0 ? '' : 'dark'
      };
    },
//散标转让记录
    loanTransferRecord: function (item, i) {
      return {
        buyerShort: item.toUserId.length <= 4 ? item.toUserId : (item.toUserId).substring(0, 4) + '...',
        buyer: item.toUserId,
        buyerId: item.toNickName,
        toPlanId: item.financePlanId,
        toisPlan: item.financePlanId != null && item.toFinanceCategory != 'AUTO_INVEST_PLAN',
        fromisPlan: item.fromFinancePlanId != null && item.fromFinanceCategory != 'AUTO_INVEST_PLAN',

        toPlanLink: this.URL.planDetails + item.financePlanId,
        sellerShort: item.fromUserId.length <= 4 ? item.fromUserId : (item.fromUserId).substring(0, 4) + '...',
        seller: item.fromUserId,
        sellerId: item.fromNickName,
        fromPlanId: item.fromFinancePlanId,
        fromPlanLink: this.URL.planDetails + item.fromFinancePlanId,
        amount: item.price,
        shares: item.minInvestShares != 1 ? item.share/item.minInvestShares : item.share,

        fromfinanceold:item.fromFinanceCategory == 'OLD',
        fromfinanceU:item.fromFinanceCategory != 'OLD',
        fromfinanceCategoryStr:item.fromFinanceCategory,
        fromautoInvest: item.fromFinanceCategory == 'AUTO_INVEST_PLAN',

        tofinanceold:item.toFinanceCategory == 'OLD',
        tofinanceU:item.toFinanceCategory != 'OLD',
        tofinanceCategoryStr:item.toFinanceCategory,
        toautoInvest: item.toFinanceCategory == 'AUTO_INVEST_PLAN',

        time: this._getDateTime(item.createTime),
        itemStyle: i % 2 === 0 ? '' : 'dark'
      };
    },

    loanRepaymentRecord: function (item, i) {
      return {
        repaidAmount: this._fixedFloat2(item.repaidAmount),
        unrepaidAmount: this._fixedFloat2(item.unRepaidAmount),
        repaidFee: this._fixedFloat2(item.repaidFee),
        unrepaidFee: this._fixedFloat2(item.unRepaidFee),
        allFee: this._fixedFloat2(item.repaidFee + item.unRepaidFee),
        status: item.repayType,
        date: item.repayTime === "" ? "--" : this._getDateTime(item.repayTime, 'date'),
        actualRepaydate: this._getDateTime(item.actualRepayTime, 'date'),
        itemStyle: i % 2 === 0 ? '' : 'dark'
      };
    },

    loanCollectionRecord: function (item, i) {
      return {
        contact: item.contact,
        contactShort: item.contact.length <= 6 ? item.contact : (item.contact).substring(0, 6) + '...',
        description: item.description,
        date: this._getDateTime(item.createTime, 'date'),
        itemStyle: i % 2 === 0 ? '' : 'dark'
      };
    },

    loanComment: function (item, i) {
      var repliedComents = [];
      var me = this;
      if (item.repliedComments && item.repliedComments.length) {
        $.each(item.repliedComments, function (k, v) {
          if (v.commentTime) {
            v.commentTime = me._getDateTime(v.commentTime);
          }

          v.avatar = v.avatar === null || v.avatar === '' ? (v.gender && v.gender === 1 ? '/static/img/account/default-avatar-girl-56.png' : '/static/img/account/default-avatar-56.png') : v.avatar;
          repliedComents.push(v);
        });
      }
      return {
        id: item.commentId,
        userName: item.displayName,
        userLink: this.URL.userHome + item.byUserId,
        postTime: this._getDateTime(item.commentTime),
        content: item.content,
        avatar: item.avatar === null || item.avatar === '' ? (item.gender && item.gender === 1 ? '/static/img/account/default-avatar-girl-56.png' : '/static/img/account/default-avatar-56.png') : item.avatar,
        byUserId: item.byUserId,
        commentId: item.commentId,
        repliedComments: repliedComents
      };
    },

    /* Financial Plans */

    plan: function (item, i) {
      var link = this.URL.planDetails + item.id;
      /*    if (item.joined) {
       link = this.URL.userPlan + item.id + '&subPointId=' + item.subPointId;
       }*/

      var statusinfo ="" ;

      var alink = 0;
      var blink = 0;

      var timestr = function formatSeconds(value) {
       var theTime = parseInt(value,10);// 秒
       var theTime1 = 0;// 分
       var theTime2 = 0;// 小时
       var theTime3 = 0;// 小时

       if(theTime > 60) {
       theTime1 = parseInt(theTime/60,10);
       theTime = parseInt(theTime%60,10);
       if(theTime1 > 60) {
       theTime2 = parseInt(theTime1/60,10);
       theTime1 = parseInt(theTime1%60,10);
       }
       if(theTime2 > 24) {
           theTime3 = parseInt(theTime2/24,10);
           theTime2 = parseInt(theTime2%24,10);
           }
       }
      // var result = ""+parseInt(theTime)+"秒";
       var result ="";

       if(theTime3 > 0) {
               result = ""+parseInt(theTime3,10)+"天"+parseInt(theTime2,10)+"小时";
           } else{
            result = ""+parseInt(theTime2,10)+"时"+parseInt(theTime1,10)+"分";
           }

           return result;
       };

      switch(item.status){

         case "0":statusinfo = '等待预定';
              alink = 1;
              blink = 1;
        break;
       case "1":statusinfo ='预定';
           alink = 1;
        break;
       case "2":statusinfo = "预定满额";
        break;
       case "3":statusinfo ='等待加入';
           blink = 1;
           alink = 1;
        break;
       case "4":statusinfo = '开放加入';
           alink = 1;
        break;
       case "5":statusinfo = "计划满额";
        break;
       case "6":statusinfo = "收益中";
        break;
       case "7":statusinfo = "开放期";
        break;
       case "8":statusinfo = "已退出";
        break;
       case "-1":statusinfo = "状态错误";
        break;
      }



      return {
        name: item.name,
        amount: this._commaInteger(item.amount),
        headCount: item.subPointCount,
        averageBidCount: item.averageBidCount,
        fundsUseRate: this._fixedFloat2(item.fundsUseRate),
        averageBidInterest: this._fixedFloat2(item.averageBidInterest),
        earnInterest: this._commaFloat(this._fixedFloat2(item.earnInterest < 0 ? 0 : item.earnInterest)),
        createDate: item.createTime,
        expectedYearRate:item.expectedYearRate,
        itemStyle: i % 2 === 0 ? '' : 'dark',
        statusinfo:statusinfo,
        status:item.status,
        alink:alink,
        blink:blink,
        link: link
      };
    },
    autoinvestPlan: function (item,i){
      var link = this.URL.autoinvestDeatils + item.id;

      var statusinfo ="" ;

       switch(item.status){

         case "0":statusinfo = '等待加入';
           break;
         case "1":statusinfo ="<a href='"+link+"'>立即加入</a>";
           break;
         case "2":statusinfo = "收益中";
           break;
         case "3":statusinfo ='退出中';
           break;
         case "4":statusinfo = '已退出';
           break;
         case "-1":statusinfo = "状态错误";
           break;
      }
       return {
         name: item.name,
         amount: this._commaInteger(item.amount),
         subpointCountActual: item.subpointCountActual,
         expectedYearRate:this._commaFloat(item.expectedYearRate),
         earnInterest: this._commaFloat(item.earnInterest),
         itemStyle: i % 2 === 0 ? '' : 'dark',
         statusinfo:statusinfo,
         link: link
       };
    },
    planReserveRecord: function (item, i) {

      if(item.ucodeId !== null && item.nickName.length>8){

        item.nickName = item.nickName.substr(0,8)+'...';
      }

      return {
        id: i + 1,
        userId:item.userId,
        investor: item.nickName,
        ucodeUsed: item.ucodeId !== null,
        mobileUsed: item.tradeMethod === 'MOBILE',
        webUsed: (item.ucodeId === null) && (item.tradeMethod ===null),
        planAmount: this._commaInteger(item.planAmount),
        planAmountNotComma:item.planAmount,
        reserveAmount:item.reserveAmount,
        date: this._getDateTime(item.createTime),
        status:item.reserveType,
        itemStyle: i % 2 === 0 ? 'dark' : ''
      };
    },

    planJoinedRecord: function (item, i) {
      return {
        id:i+1,
        userId:item.userId,
        investor: item.nickName,
        mobileUsed: item.tradeMethod === 'MOBILE',
        amount: this._commaInteger(item.amount),
        date: this._getDateTime(item.createTime),
        itemStyle: i % 2 === 0 ? 'dark' : ''
      };
    },

    /*autoinvest*/
    autoinvestJoinedRecord: function(item,i){
      return {
        id: i+1,
        userId: item.userId,
        investor: item.nickName,
        MobileOrPC: item.tradeMethod === 'PC' ? 'PC' : 'PHONE',
        mobileUsed: item.tradeMethod === 'PC' ? false : true,
        webUsed:item.tradeMethod === 'PC' ? true : false,
        amount: this._commaInteger(item.amount),
        finalAmount: this._commaInteger(item.finalAmount),
        date: this._getDateTime(item.createTime),
        itemStyle: i % 2 === 0 ? '' : 'dark'
      }
    },

    autoinvestPlanBidLoan: function(item,i){
      var self = this;
      return {
        loanId: item.loanId,
        lendAmount: item.lendAmount,
        lendShare: item.lendShare,
        status: this._loanStatus(item.statusOrdinal),
        lendTime: this._getDateTime(item.lendTime, 'date'),
        hasContract: function(){
          if (self._loanStatus(item.statusOrdinal) == '还款中' || self._loanStatus(item.statusOrdinal) == '逾期' || self._loanStatus(item.statusOrdinal) == '坏账' || self._loanStatus(item.statusOrdinal) == '已还清') {
            return true;
          }else{
            return false;
          }
        },
        itemStyle: i % 2 === 1 ? 'dark' : ''
      }

    },
    /* Account - Capital */

    userTransaction: function (item, i) {
      var credit = item.income ? this._fixedFloat2(item.income) : undefined;
      var debit = item.pay ? this._fixedFloat2(item.pay) : undefined;
      if (item.operation == '服务费' && debit === undefined) {
        debit = '0.00';
      }
      return {
        date: this._getDateTime(item.time, 'date'),
        time: this._getDatehour(item.time, 'date'),
        type: item.operation,
        credit: credit,
        debit: debit,
        balance: this._fixedFloat2(item.banlance),
        note: item.notes,
        loanId: item.loanId,
        loanLink: this.URL.loanDetails + item.loanId,
        itemStyle: i % 2 === 0 ? '' : 'dark'
      };
    },

    /* Account - Borrow */

    userRepayingRecord: function (item, i) {
      ret = {
        /* item */
        loanId: item.id,
        loanLink: this.URL.loanDetails + item.id,
        title: item.name,
        amount: this._fixedFloat2(item.amount),
        interest: this._fixedFloat2(item.interest_year),
        termsLeft: item.left,
        termsInTotal: item.months,
        nextDueDate: item.nextDate,
        toRepayAmount: this._fixedFloat2(item.repaid),
        status: item.status,
        notOutsourceClose: item.status!="已结标",
        itemStyle: i % 2 === 0 ? 'dark' : '',
        /* repay all section */
        toRepayPrincipal: this._fixedFloat2(item.principal),
        interestForTerm: this._fixedFloat2(item.interest),
        mgmtFee: this._fixedFloat2(item.mgmtFee),
        overdueFee: this._fixedFloat2(item.overDueAmount),
        ratio: item.ratio,
        toRepayInTotal: this._fixedFloat2(item.total),
        feeName : item.feeRateName,
        feeValue : this._fixedFloat2(item.feeRateValue)
      };
      ret.repayAllDisabled = '';
      if (ret.status == '逾期' || ret.status == '坏账') {
        ret.repayAllDisabled = 'disabled';
      }
      return ret;
    },

    userRepaidRecord: function (item, i) {
      return {
        loanId: item.id,
        loanLink: this.URL.loanDetails + item.id,
        title: item.name,
        amount: this._fixedFloat2(item.amount),
        interest: this._fixedFloat2(item.interest),
        termsInTotal: item.months,
        repaidInTotal: this._fixedFloat2(item.total),
        endDate: item.enddate,
        itemStyle: i % 2 === 0 ? 'dark' : ''
      };
    },

    userLoanRepaymentRecord: function (item, i) {
      var statusText = '';
      if (item.status == 'REPAID') {
        if (item.repaidType == 'IN_REPAY') {
          statusText = '提前还款';
        } else if (item.repaidType == 'COMMON_REPAY') {
          statusText = '正常还款';
        } else if (item.repaidType == 'OVER_DUE_REPAY') {
          statusText = '逾期还款';
        } else if (item.repaidType == 'BAD_REPAY') {
          statusText = '坏账还款';
        } else {
          statusText = '';
        }
      } else if (item.status == 'UNREPAID') {
        statusText = '待还';
      } else {
        statusText = '逾期';
      }
      return {
        loanId: item.id,
        repaymentDate: item.date,
        toRepayAmount: this._fixedFloat2(item.repayAmount),
        toRepayPrincipal: this._fixedFloat2(item.principal),
        toRepayInterest: this._fixedFloat2(item.interest),
        mgmtFee: this._fixedFloat2(item.mgmt),
        overdueFee: item.fee ? this._fixedFloat2(item.fee) : this._fixedFloat2(0),
        status: statusText,
        shouldRepay: item.status != 'REPAID',
        termId: i + 1,
        itemStyle: i % 2 === 0 ? 'dark' : ''
      };
    },

    userLoanApplicationRecord: function (item, i) {
      ret = {
        loanId: item.id,
        loanLink: this.URL.loanDetails + item.id,
        title: item.name,
        amount: this._fixedFloat2(item.amount),
        interest: this._fixedFloat2(item.interest),
        termsInTotal: item.months,
        status: item.status,
        itemStyle: i % 2 === 0 ? 'dark' : ''
      };
      if (ret.status == '首次申请' || ret.status == '草稿') {
        ret.status = '申请中';
        ret.loanLink = this.URL.loanApplication;
      }
      return ret;
    },

    /* Account - Invest */

    userTransferringLoan: function (item, i) {
      item.loanTranfsferVo = item.loanTranfsferVo || {};
      return {
        transferId: item.id,
        transferLink: this.URL.loanTransferDetails + item.id,
        loanId: item.loanId,
        loanLink: this.URL.loanDetails + item.loanId,
        loanType: item.displayLoanType,
        loanTypeName: this._loanType(item.displayLoanType),
        amount: this._fixedFloat2(item.amount),
        termsLeft: item.leftPhaseCount,
        termsInTotal: item.months,
        interest: this._fixedFloat2(item.interest),
        value: item.minInvestShares!=1 ? this._fixedFloat2(item.totalPricePershare*item.minInvestShares):this._fixedFloat2(item.totalPricePershare),
        price: item.minInvestShares!=1 ? this._fixedFloat2(item.resultPice*item.minInvestShares):this._fixedFloat2(item.resultPice),
        discount: this._fixedFloat2(item.discountRatio <= 1 ? item.discountRatio * 100 : item.discountRatio),
        shares: item.minInvestShares!=1 ?  item.share/item.minInvestShares : item.share,
        sharesInTotal: item.minInvestShares!=1 ?  item.initialShare/item.minInvestShares : item.initialShare,
        investShares: item.initialShare,
        fee: this._fixedFloat2(item.loanTranfsferVo.fee || 0),
        income: this._fixedFloat2(item.loanTranfsferVo.income || 0),
        itemStyle: i % 2 === 0 ? 'dark' : ''
      };
    },

    userTransferableLoan: function (item, i) {
      return {
        loanId: item.id,
        loanLink: this.URL.loanDetails + item.id,
        loanType: item.displayLoanType,
        loanTypeName: this._loanType(item.displayLoanType),
        nextDueDate: this._getDateTime(item.nextRepayDay, 'date'),
        amount: this._fixedFloat2(item.amount),
        investShares: item.minInvestShares!=1 ? item.initialShare/item.minInvestShares : item.initialShare,
        termsLeft: item.leftPhaseCount,
        termsInTotal: item.months,
        interest: this._fixedFloat2(item.interest),
        repayments: this._fixedFloat2(item.interestAndCorpus * item.share),
        value:  item.minInvestShares!=1 ? this._fixedFloat2(item.resultPice * item.share * item.minInvestShares) : this._fixedFloat2(item.resultPice * item.share),
        shares: item.minInvestShares!=1 ?  item.share/item.minInvestShares : item.share,
        lenderId: item.loanVo.lenderId,
        interestGained: this._fixedFloat2(item.loanVo.recoveryAmount),
        valuePerShare:  item.minInvestShares!=1 ? this._fixedFloat2(item.resultPice * item.minInvestShares):this._fixedFloat2(item.resultPice),
        repaymentsPerShare: item.minInvestShares!=1 ? this._fixedFloat2(item.interestAndCorpus * item.minInvestShares) :this._fixedFloat2(item.interestAndCorpus),
        interestPerShare: item.minInvestShares!=1 ? this._fixedFloat2(item.loanVo.pricePerShare *item.minInvestShares) :this._fixedFloat2(item.loanVo.pricePerShare), // FIX~ME
        principalPerShare: this._fixedFloat2(item.loanVo.principalPerShareNow), // FIX~ME
        fee: item.fee,
        itemStyle: i % 2 === 0 ? 'dark' : ''
      };
    },

    userTransferredInLoan: function (item, i) {
      return {
        loanId: item.id,
        loanLink: this.URL.loanDetails + item.id,
        loanType: item.displayLoanType,
        loanTypeName: this._loanType(item.displayLoanType),
        termsLeft: item.leftPhaseCount,
        termsInTotal: '',
        interest: this._fixedFloat2(item.interest),
        principal: this._fixedFloat2(item.inCorpus),
        value:  item.minInvestShares!=1 ? this._fixedFloat2(item.inPrice * item.minInvestShares):this._fixedFloat2(item.inPrice),
        shares: item.minInvestShares!=1 ? item.inShare / item.minInvestShares:item.inShare,
        amount: item.minInvestShares!=1 ? this._fixedFloat2(item.income  * item.minInvestShares):this._fixedFloat2(item.income),
        pnl:    item.minInvestShares!=1 ? this._fixedFloat2(item.profit  * item.minInvestShares):this._fixedFloat2(item.profit),
        date: this._getDateTime(item.createTime, 'date'),
        itemStyle: i % 2 === 0 ? 'dark' : '',
        loantransferlogId: item.loantransferlogId
      };
    },

    userTransferredOutLoan: function (item, i) {
      return {
        loanId: item.id,
        loanLink: this.URL.loanDetails + item.id,
        loanType: item.displayLoanType,
        loanTypeName: this._loanType(item.displayLoanType),
        transferId: item.tranfsferId,
        shares: item.minInvestShares!=1 ? item.outShare/item.minInvestShares : item.outShare,
        value:  item.minInvestShares!=1 ? this._fixedFloat2(item.outSumPrice * item.minInvestShares):this._fixedFloat2(item.outSumPrice),
        price:  item.minInvestShares!=1 ? this._fixedFloat2(item.outPrice * item.minInvestShares):this._fixedFloat2(item.outPrice),
        fee: this._fixedFloat2(item.fee),
        income: this._fixedFloat2(item.income),
        pnl: this._fixedFloat2(item.profit),
        itemStyle: i % 2 === 0 ? 'dark' : ''
      };
    },
//账户详情页转让明细列表
    userTransferredOutRecord: function (item, i) {
      return {
        user:  item.toNickName.length >6 ? item.toNickName.substr(0,6)+'...' : item.toNickName,
        userfullname:item.toNickName,
        isPlan: item.lenderType == "FINANCEPLAN_BID",
        isAutoinvest: item.lenderType =="AUTOINVESTPLAN_BID",
        financeold:item.toFinanceCategory == 'OLD',
        financeU:item.toFinanceCategory != 'OLD',
        financeCategoryStr:item.toFinanceCategory,
        planId: item.financePlanId,
        loanTypeName: this._loanType(item.displayLoanType),
        transferId: item.logId,
        planLink: this.URL.planDetails + item.financePlanId,
        userLink: this.URL.userHome + item.buyerId,
        value: this._fixedFloat2(item.pricePerShare),
        price: this._fixedFloat2(item.price),
        shares: item.share,
        fee: this._fixedFloat2(item.fee),
        income: this._fixedFloat2(item.income),
        pnl: this._fixedFloat2(item.profit),
        date: this._getDateTime(item.tranfsferDate, 'date'),
        itemStyle: i % 2 === 0 ? 'dark' : ''
      };
    },
//账户详情页债权持有中明细列表
    userTransferredInRecord: function (item, i) {
      return {
        leftPhaseCount:item.leftPhaseCount,
        planId: item.transferId,
        value: this._fixedFloat2(item.pricePerShare),
        shares: item.share,
        fee: this._fixedFloat2(item.fee),
        income: this._fixedFloat2(item.income),
        pnl: this._fixedFloat2(item.profit),
        date: this._getDateTime(item.tranfsferDate, 'date'),
        itemStyle: i % 2 === 0 ? 'dark' : ''
      };
    },
  //账户详情页债权已完成明细列表
    userTransferredLogJsonRecord: function (item, i) {
      return {
        user:  item.toNickName.length >10 ? item.toNickName.substr(0,10)+'...' : item.toNickName,
        userfullname:item.toNickName,
        isPlan: item.lenderType == "FINANCEPLAN_BID",
        isAutoinvest: item.lenderType =="AUTOINVESTPLAN_BID",
        financeold:item.toFinanceCategory == 'OLD',
        financeU:item.toFinanceCategory != 'OLD',
        financeCategoryStr:item.toFinanceCategory,
        planId: item.financePlanId,
        loanTypeName: this._loanType(item.displayLoanType),
        transferId: item.logId,
        planLink: this.URL.planDetails + item.financePlanId,
        userLink: this.URL.userHome + item.buyerId,
        value: this._fixedFloat2(item.pricePerShare),
        price: this._fixedFloat2(item.price),
        shares: item.share,
        fee: this._fixedFloat2(item.fee),
        income: this._fixedFloat2(item.income),
        pnl: this._fixedFloat2(item.profit),
        date: this._getDateTime(item.tranfsferDate, 'date'),
        itemStyle: i % 2 === 0 ? 'dark' : ''
      };
    },
    //用户持有中理财计划
    userHoldingPlan: function (item, i) {
      ret = {
          name: item.name,
          link: this.URL.userPlan + item.id + '&subPointId=' + item.financeSubPointId,
          subPointId: item.financeSubPointId,
          amount: this._fixedFloat2(item.finalAmount),
          formatAmount: this._commaFloat(this._fixedFloat2(item.finalAmount)),
          profit: this._commaFloat(this._fixedFloat2(item.earnAmount)),
          interest: this._fixedFloat2(item.aveLoanRate),
          loans: item.loanBidCount,
          available: this._fixedFloat2(item.availablePrice),
          fee: this._fixedFloat2(item.serviceFee),
          joinFee: this._fixedFloat2(item.joinFee),
          status: this._planStatus(item.isPurcharge,item.category,item.status,item.endLockingTime,item.canRollOver),
          itemStyle: i % 2 === 0 ? 'dark' : ''
      };
      if (item.status == 'PURCHASE_END') {
        ret.leftLockingDays = item.endLockingTime;
      }
      if (item.status == 'REDEMPTION_PERIOD') {
        ret.hasQuitButton = true;
      }
      if (item.canRollOver == 'true') {
        ret.hasRollOverButton = true;
      }
      if(item.rollOverAlready =='true' ){
        ret.rollOverAlready = true;
      }
      if(item.status != 'REDEMPTION_PERIOD' && item.canRollOver != 'true' && item.rollOverAlready !='true') {
        ret.forbidRollOverButton = true;
      }
      return ret;
    },

    userExitingPlan: function (item, i) {
      ret = {
          name: item.name,
          link: this.URL.userPlan + item.id + '&subPointId=' + item.financeSubPointId,
          amount: this._commaFloat(item.finalAmount),
          withdrawnInterest: this._commaFloat(item.totalCashDrawInterest),
          transferredAmount: this._commaFloat(item.redProgress),
          availableAmount: this._commaFloat(item.availablePrice),
          remainedValue: this._fixedFloat2(item.remainingAmount),
          transferringCount: parseInt(item.transferringLoanCount, 10),
          disabledCount: parseInt(item.disabledLoanCount, 10),
          quitBeforeAmount : this._commaFloat(this._fixedFloat2((this._fixedFloat2(item.redProgress)*100 + this._fixedFloat2(item.availablePrice)*100)/100)),
          toBeTransferredAmount : this._commaFloat((this._fixedFloat2(item.remainingAmount)*100 + parseInt(item.disabledLoanCount, 10)*100)/100),
          itemStyle: i % 2 === 0 ? 'dark' : ''
      };
      return ret;
    },

    userExitedPlan: function (item, i) {
      ret = {
          name: item.name,
          link: this.URL.userPlan + item.id + '&subPointId=' + item.financeSubPointId,
          amount: this._commaFloat(item.finalAmount),
          profit: this._commaFloat(item.earnAmount),
          interest: this._fixedFloat2(item.aveLoanRate),
          loans: item.loanBidCount,
          fee: this._fixedFloat2(item.serviceFee),
          joinFee: this._fixedFloat2(item.joinFee),
          quitFee: this._fixedFloat2(item.quitFee),
          exitWay:item.exitWay,
          actualIncome: this._fixedFloat2(
            parseFloat(item.redProgress) + parseFloat(item.totalCashDrawInterest)
          ),
          finishedDate: this._getDateTime(item.redFinishTime, 'date'),
          itemStyle: i % 2 === 0 ? 'dark' : ''
        };
        ret.interest = this._fixedFloat2(100 * (this._fixedFloat2(item.earnAmount) / this._fixedFloat2(item.finalAmount)));
        return ret;
    },

    userReservePlan: function (item, i) {
      ret = {
        planId: item.id,
        name: item.name,
        amount: this._commaFloat(item.planAmount),
        depositAmount: this._commaFloat(item.depositAmount),
        unRepayAmount:this._commaFloat(item.unRepayAmount),
        endPayMentTime: this._getDateTime(item.endPayMentTime),
        rsvStatus:item.rsvStatus == "UNPAID" ? "等待支付":"支付超时",
        isNotOverDue:item.rsvStatus == "OVERDUE" ? false:true,
        itemStyle: i % 2 === 0 ? 'dark' : ''
      };
      return ret;
    },

    userPlanRecord: function (item, i) {
      ret = {
        loanId: item.loanId,
        loanLink: this.URL.loanDetails + item.loanId,
        loanType: item.displayLoanType,
        loanTypeName: this._loanType(item.displayLoanType),
        name: item.title,
        amount: this._fixedFloat2(item.lendAmount),
        shares: item.lendShare,
        interest: this._fixedFloat2(item.interest),
        status: this._loanStatus(item.statusOrdinal),
        hasContract: true,
        date: this._getDateTime(item.lendTime, 'date'),
        itemStyle: i % 2 === 0 ? '' : 'dark'
      };
      if (ret.status == '招标中' || ret.status == '已满标' || ret.status == '已流标') {
        ret.hasContract = false;
      }
      if (item.lendShare > 0 && item.transferShare > 0) {
        ret.status = '转让中';
        ret.transferring = true;
      } else if (item.lendShare === 0) {
        ret.status = '转让完成';
        ret.transferring = true;
      }
      return ret;
    },

    userLoansRepaying: function (item, i) {
      ret = {
        loanId: item.loanId,
        loanLink: this.URL.loanDetails + item.loanId,
        loanType: item.productType,
        loanTypeName: this._loanType(item.displayLoanType),
        amount: this._fixedFloat2(item.share * item.amountPershare),
        indirect: item.indirect,
        shares: item.minInvestShares != 1 ? item.share/item.minInvestShares: item.share,
        termsLeft: item.leftPhases,
        termsInTotal: item.mouths,
        interest: this._fixedFloat2(item.interest),
        toRepay: this._fixedFloat2(item.recoveryAmount),
        monthlyRepay: this._fixedFloat2(item.monthlyRepay),
        status: this._loanStatus(item.status),
        repaidInterest: this._fixedFloat2(item.earnInterest),
        nextDueDate: item.nextRepayDate ? this._getDateTime(item.nextRepayDate, 'date') : '-',
        toRepayPrincipal: this._fixedFloat2(item.recoveryPrincipal),
        toRepayInterest: this._fixedFloat2(item.recoveryInterest),
        holdAmount : item.share,
        lenderId: item.loanLenderId,
        availableShares: item.minInvestShares != 1 ? item.share / item.minInvestShares: item.share,
        interestGained: this._fixedFloat2(item.recoveryAmount),
        valuePerShare: item.minInvestShares != 1 ? this._fixedFloat2(item.currentValuePerShare * item.minInvestShares) : this._fixedFloat2(item.currentValuePerShare),
        repaymentsPerShare: item.minInvestShares != 1 ? this._fixedFloat2(item.recoveryAmountPerShare * item.minInvestShares) : this._fixedFloat2(item.recoveryAmountPerShare),
        interestPerShare:   item.minInvestShares != 1 ? this._fixedFloat2(item.loanVo.pricePerShare* item.minInvestShares) :  this._fixedFloat2(item.loanVo.pricePerShare),
        principalPerShare: this._fixedFloat2(item.loanVo.principalPerShareNow),
        fee: item.fee || 0.01,
        //坏账或者预期显示借款人信息
        showlender: (item.status==='OVER_DUE' || item.status==='BAD_DEBT')?true:false,
        itemStyle: i % 2 === 0 ? 'dark' : ''
      };
      ret.status = item.transferShare > 0 ? '转让中' : ret.status;
      ret.operationType = 'TRANSFER_DISABLED';
      if (item.isTransferable == '0') {
        ret.operationType = 'TRANSFER';
      }
      if (ret.status == '逾期') {
        ret.statusStyle = 'rrdcolor-red-text';
      }
      ret.overdue = ret.status == '逾期' ? true : false;
      ret.isCheckbox = item.isTransferable == '0' ? true : false;
      return ret;
    },

    userLoansRepaid: function (item, i) {
      var clearType;
      if (item.finishType == 'transfer') {
        clearType = '债权转让';
      } else if (item.finishType == 'in_repay') {
        clearType = '提前结清 ';
      } else {
        clearType = this._loanRepaidStatus(item.finishType);
      }
      return {
        loanId: item.loanId,
        loanLink: this.URL.loanDetails + item.loanId,
        loanType: item.displayLoanType,
        loanTypeName: this._loanType(item.displayLoanType),
        amount: this._fixedFloat2(item.amount),
        interest: this._fixedFloat2(item.interest),
        repaid: item.repayMoney,
        profit: item.earnMoney,
        clearDate: this._getDateTime(item.finishDate, 'date'),
        clearType: clearType,
        isTransfer : item.finishType == 'transfer' ? true : false,
        itemStyle: i % 2 === 0 ? 'dark' : ''
      };
    },

    userLoansInProgress: function (item, i) {
      var progress = parseInt(this._bankersRound(item.finishedRatio / 100) * 100, 10);
      return {
        loanId: item.loanId,
        loanLink: this.URL.loanDetails + item.loanId,
        loanType: item.displayLoanType,
        loanTypeName: this._loanType(item.displayLoanType),
        amount: this._fixedFloat2(item.amount),
        shares: parseInt(item.nowShare, 10),
        interest: this._fixedFloat2(item.interest),
        terms: item.months,
        creditLevel: item.creditLevel,
        timeLeft: progress == 100 ? '--' : item.remainderTime,
        progress: progress,
        itemStyle: i % 2 === 0 ? 'dark' : ''
      };
    },

    userLoansReturnRecord: function (item, i) {
      return {
        loanId: item.loanId,
        loanType: item.type,
        loanLink: this.URL.loanDetails + item.loanId,
        //loanTypeName: this._loanType(item.displayLoanType),
        //loanLink: this.URL.loanDetails + item.loanId,
        date: item.date == 'null' ? '--' : this._getDatemonth(item.date, 'date'),
        note:item.note,
        isFirst:item.first,
        month:item.date == 'null' ? '--' : this._getDateyear(item.date, 'date'),
        //amount: this._fixedFloat2(item.amount),
        //borrower: item.nickName,
        //borrowerLink: this.URL.userHome + item.userId,
        //returnType: item.backTypeName || '--',
        //status: this._returnStatus(item.stauts),
        itemStyle: i % 2 === 0 ? '' : 'dark'
      };
    },

    userInfo: function (item, i) {
      return {
        amount: this._commaInteger(item.amount),
        interest: this._fixedFloat2(item.interest),
        loanId: item.loanId,
        months: item.months,
        date: item.openTime == 'null' ? '--' : this._getDateTime(item.openTime, 'date'),
        overDued: item.overDued === false ? '未发生过逾期' : '曾有过逾期记录',
        title: item.title,
        name :item.productAliasName,
        type: this._getProductTypeByName(item.productAliasName),
        status: item.status
      };
    },


    /* **myCoupon** */
    unuseCoupon: function (item,i) {
      if(item.couponTypeEng=="UCODE"){
        ret = {//u-code
            ucode : 'true',
            className: 'ucode-coupon',
            couponId : item.couponId,
            minInvestAmount : parseInt(item.minInvestAmount,10),
            usedBusinessCategoryList : function (){
              var usedbHTML = [];
              usedbHTML.push('限');
              for(var i=0;i<item.usedBusinessCategoryList.length;i++){
                var sPoint = '';
                if(i!=item.usedBusinessCategoryList.length-1){
                  sPoint = '/';
                }
                usedbHTML.push(
                    item.usedBusinessCategoryList[i].name+sPoint
                );
              }
              usedbHTML.push('使用');
              return usedbHTML.join('');
            },
            validDateFrom : this._getDateTime(item.validDateFrom, 'date').replace(/-/g,"/"),
            validDateEnd : this._getDateTime(item.validDateEnd, 'date').replace(/-/g,"/"),
            usedurl : function(){
              return "/account/coupon!useUcodeReserve.action?fromMyCoupons=fromCoupon&couponId="+item.couponId;
            },
            itemStyle: i % 4 === 3 ? 'last' : '',
            expireRemind : item.expireRemind == '' ? '': item.expireRemind,
            bookmarkClass: item.expireRemind == '' ? 'fn-hide' : ''
        };
      }else if (item.couponTypeEng=="VOUCHER"){
        ret = {//现金券
            cash : 'true',
            className: 'cash-coupon',
            couponId : item.couponId,
            couponValue : parseInt(item.couponValue,10),
            minInvestAmount : parseInt(item.minInvestAmount,10),
            usedBusinessCategoryList : function (){
              var usedbHTML = [];
              usedbHTML.push('限');
              for(var i=0;i<item.usedBusinessCategoryList.length;i++){
                var sPoint = '';
                if(i!=item.usedBusinessCategoryList.length-1){
                  sPoint = '/';
                }
                usedbHTML.push(
                    item.usedBusinessCategoryList[i].name+sPoint
                );
              }
              usedbHTML.push('使用');
              return usedbHTML.join('');
            },
            validDateFrom : this._getDateTime(item.validDateFrom, 'date').replace(/-/g,"/"),
            validDateEnd : this._getDateTime(item.validDateEnd, 'date').replace(/-/g,"/"),
            itemStyle: i % 4 === 3 ? 'last' : '',
            expireRemind : item.expireRemind == '' ? '': item.expireRemind,
            bookmarkClass: item.expireRemind == '' ? 'fn-hide' : ''
        };
      }else if (item.couponTypeEng=="DISCOUNT"){
        ret = { //红包
            redPacket : 'true',
            className: 'redPacket-coupon',
            couponId : item.couponId,
            couponValue : parseInt(item.couponValue,10),
            discountRate: item.discountRate,
            usedBusinessCategoryList : function (){
              var usedbHTML = [];
              usedbHTML.push('限');
              for(var i=0;i<item.usedBusinessCategoryList.length;i++){
                var sPoint = '';
                if(i!=item.usedBusinessCategoryList.length-1){
                  sPoint = '/';
                }
                usedbHTML.push(
                    item.usedBusinessCategoryList[i].name+sPoint
                );
              }
              usedbHTML.push('使用');
              return usedbHTML.join('');
            },
            validDateFrom : this._getDateTime(item.validDateFrom, 'date').replace(/-/g,"/"),
            validDateEnd : this._getDateTime(item.validDateEnd, 'date').replace(/-/g,"/"),
            itemStyle: i % 4 === 3 ? 'last' : '',
            expireRemind : item.expireRemind == '' ? '': item.expireRemind,
            bookmarkClass: item.expireRemind == '' ? 'fn-hide' : ''
        }
      }
      else {
        ret = {//充值券
            free : 'true',
            className: 'free-coupon',
            couponId : item.couponId,
            validDateFrom : this._getDateTime(item.validDateFrom, 'date').replace(/-/g,"/"),
            validDateEnd : this._getDateTime(item.validDateEnd, 'date').replace(/-/g,"/"),
            itemStyle: i % 4 === 3 ? 'last' : '',
            expireRemind : item.expireRemind == '' ? '': item.expireRemind,
            bookmarkClass: item.expireRemind == '' ? 'fn-hide' : ''
        };
      }

      var totalRow =  Math.ceil(item.__listLength / 4) ;
      var currentRow = Math.ceil( (i + 1 ) / 4 );
      if( currentRow === totalRow ){
        ret.className += ' coupon-row-last';
      }

      return ret;
    },
    usedCoupon : function (item,i) {
      if(item.couponTypeEng=="UCODE"){
        ret = {//u-code
            ucode : 'true',
            className: 'ucode-coupon',
            couponId : item.couponId,
            investAmount : item.investAmount,
            consumeMemo: item.consumeMemo,
            consumeTime : this._getDateTime(item.consumeTime, 'date').replace(/-/g,"/"),
            itemStyle: i % 4 === 3 ? 'last' : ''
        };
      }else if (item.couponTypeEng=="VOUCHER"){
        ret = {//现金券
            cash : 'true',
            className: 'cash-coupon',
            couponId : item.couponId,
            couponValue : parseInt(item.couponValue,10),
            investAmount : item.investAmount,
            consumeMemo: item.consumeMemo,
            consumeTime : this._getDateTime(item.consumeTime, 'date').replace(/-/g,"/"),
            itemStyle: i % 4 === 3 ? 'last' : ''
        };
      }else if (item.couponTypeEng=="DISCOUNT"){
        ret = {//红包
            cash : 'true',
            className: 'redPacket-coupon',
            couponId : item.couponId,
            couponValue : parseInt(item.couponValue,10),
            investAmount : item.investAmount,
            consumeMemo: item.consumeMemo,
            consumeTime : this._getDateTime(item.consumeTime, 'date').replace(/-/g,"/"),
            itemStyle: i % 4 === 3 ? 'last' : ''
        };
      }
      else {
        ret = {//充值券
            redPacket : 'true',
            className: 'free-coupon',
            couponId : item.couponId,
            investAmount : item.investAmount,
            consumeTime : this._getDateTime(item.consumeTime, 'date').replace(/-/g,"/"),
            itemStyle: i % 4 === 3 ? 'last' : ''
        };
      }

      var totalRow =  Math.ceil(item.__listLength / 4) ;
      var currentRow = Math.ceil( (i + 1 ) / 4 );
      if( currentRow === totalRow ){
        ret.className += ' coupon-row-last';
      }

      return ret;
    },
    expiredCoupon : function (item,i) {
      if(item.couponTypeEng=="UCODE"){
        ret = {//u-code
            ucode : 'true',
            className: 'ucode-coupon',
            couponId : item.couponId,
            minInvestAmount : parseInt(item.minInvestAmount,10),
            usedBusinessCategoryList : function (){
              var usedbHTML = [];
              usedbHTML.push('限');
              for(var i=0;i<item.usedBusinessCategoryList.length;i++){
                var sPoint = '';
                if(i!=item.usedBusinessCategoryList.length-1){
                  sPoint = '/';
                }
                usedbHTML.push(
                    item.usedBusinessCategoryList[i].name+sPoint
                );
              }
              usedbHTML.push('使用');
              return usedbHTML.join('');
            },
            validDateFrom : this._getDateTime(item.validDateFrom, 'date').replace(/-/g,"/"),
            validDateEnd : this._getDateTime(item.validDateEnd, 'date').replace(/-/g,"/"),
            itemStyle: i % 4 === 3 ? 'last' : ''
        };
      }else if (item.couponTypeEng=="VOUCHER"){
        ret = {//现金券
            cash : 'true',
            className: 'cash-coupon',
            couponId : item.couponId,
            couponValue : parseInt(item.couponValue,10),
            minInvestAmount : parseInt(item.minInvestAmount,10),
            usedBusinessCategoryList : function (){
              var usedbHTML = [];
              usedbHTML.push('限');
              for(var i=0;i<item.usedBusinessCategoryList.length;i++){
                var sPoint = '';
                if(i!=item.usedBusinessCategoryList.length-1){
                  sPoint = '/';
                }
                usedbHTML.push(
                    item.usedBusinessCategoryList[i].name+sPoint
                );
              }
              usedbHTML.push('使用');
              return usedbHTML.join('');
            },
            validDateFrom : this._getDateTime(item.validDateFrom, 'date').replace(/-/g,"/"),
            validDateEnd : this._getDateTime(item.validDateEnd, 'date').replace(/-/g,"/"),
            itemStyle: i % 4 === 3 ? 'last' : ''
        };
      }else if (item.couponTypeEng=="DISCOUNT"){
        ret = { //红包
            redPacket : 'true',
            className: 'redPacket-coupon',
            couponId : item.couponId,
            couponValue : parseInt(item.couponValue,10),
            discountRate: item.discountRate,
            usedBusinessCategoryList : function (){
              var usedbHTML = [];
              usedbHTML.push('限');
              for(var i=0;i<item.usedBusinessCategoryList.length;i++){
                var sPoint = '';
                if(i!=item.usedBusinessCategoryList.length-1){
                  sPoint = '/';
                }
                usedbHTML.push(
                    item.usedBusinessCategoryList[i].name+sPoint
                );
              }
              usedbHTML.push('使用');
              return usedbHTML.join('');
            },
            validDateFrom : this._getDateTime(item.validDateFrom, 'date').replace(/-/g,"/"),
            validDateEnd : this._getDateTime(item.validDateEnd, 'date').replace(/-/g,"/"),
            itemStyle: i % 4 === 3 ? 'last' : '',
            expireRemind : item.expireRemind == '' ? '': item.expireRemind,
            bookmarkClass: item.expireRemind == '' ? 'fn-hide' : ''
        }
      }
      else {
        ret = {//充值券
            free : 'true',
            className: 'free-coupon',
            couponId : item.couponId,
            validDateFrom : this._getDateTime(item.validDateFrom, 'date').replace(/-/g,"/"),
            validDateEnd : this._getDateTime(item.validDateEnd, 'date').replace(/-/g,"/"),
            itemStyle: i % 4 === 3 ? 'last' : ''
        };
      }

      var totalRow =  Math.ceil(item.__listLength / 4) ;
      var currentRow = Math.ceil( (i + 1 ) / 4 );
      if( currentRow === totalRow ){
        ret.className += ' coupon-row-last';
      }

      return ret;
    },
    /* ** Translation ** */

    _getProductTypeByName: function (name) {
      var result;
      switch (name) {
        case '信用认证标':
          result = 'XYRZ';
          break;
        case '机构担保标':
          result = 'JGDB';
          break;
        case '实地认证标':
          result = 'SDRZ';
          break;
        case '智能理财标':
          result = 'ZNLC';
          break;
      }
      return result;
    },

    _itemName: function (api) {
      var ret = api.substring(3);
      ret = ret.charAt(0).toLowerCase() + ret.substring(1);
      if (ret.match(/Plans$|plans$|Loans$|loans$|Records$|records$|Transactions$|transactions$|Comments$|comments$/)) {
        ret = ret.substring(0, ret.length - 1);
      }
      return ret;
    },

    _listName: function (api) {
      var apiConf = _API_CONF[api];
      if (apiConf && apiConf._list) {
        return apiConf._list;
      }
    },

    _list: function (api, data, fieldName, handlerName) {
      var list = [], items = data[fieldName];
      handlerName = handlerName || this._itemName(api);

      if (items) {
        var len = items.length;
        for (var i = 0; i < items.length; i++) {
          items[i].__listLength = len;
          var item = this[handlerName](items[i], i);
          item.itemLast = i == items.length - 1 ? 'last' : '';
          list.push(item);
        }
      }
      var ret = $.extend({}, data);
      ret[fieldName] = list;
      ret.pageCount = ret.totalPage;
      return ret;
    },

    translate: function (api, data) {
      var o = this;
      var p = this.protocol;
      var ret;

      /* For list APIs */
      var listName = this._listName(api);
      if (listName) {
        return this._list(api, data, listName);
      }

      /* For non-list APIs */
      else if (api == p.API.getCreditInfo) {
        // FIX~ME: this is ugly!
        var info = data.creditInfo, time = data.creditPassedTime, loan = data.loan;
        var info2 = [], item;
        $.each(this.CREDITINFO_MAPPING, function (i, v) {
          if (info[v.key] !== undefined && info[v.key] != 'INVALID' && v.key != 'fieldAudit') {
            var status = 'checked';
            if (info[v.key] != 'VALID') {
              status = null; //unchecked
            }
            var date = null;
            if (v.key in time) {
              date = o._getDateTime(time[v.key], 'date');
            }
            item = {
              key: v.key,
              name: v.name,
              status: status,
              date: date,
              itemStyle: null
            };
            if(data.borrowerCategory=='ENTERPRISE' && item.name =="身份认证"){
              item.name = "公司认证";
            }
            var job = o._jobType(loan.jobType);

            if (v.key == 'work' && job !== null) {
              item.note = '<a href="' + o.URL.helpForBorrower + job.anchor + '" target="_blank">' + job.name + '</a>';
              item.itemStyle = 'two-line';
            }
            info2.push(item);
          }
        });
        if (loan.utmSource == 'debx-zaxy') {
          info2.push({
            key: loan.utmSource,
            name: '机构担保',
            note: '<a href="/event/zaccn/index.jsp" target="_blank" title="深圳市中安信业创业投资有限公司">中安信业</a>',
            itemStyle: 'two-line',
            status: 'checked',
            date: null
          });
        }
        if (loan.utmSource == 'debx-zdsd') {
          info2.push({
            key: loan.utmSource,
            name: '机构担保',
            note: '<a href="/event/zdsd/index.jsp" target="_blank" title="深圳市证大速贷小额贷款股份有限公司">证大速贷</a>',
            itemStyle: 'two-line',
            status: 'checked',
            date: null
          });
        }
        if (loan.utmSource == 'debx-as') {
            info2.push({
              key: loan.utmSource,
              name: '机构担保',
              note: '<a href="/event/as/index.jsp" target="_blank" title="深圳安盛互联网金融服务有限公司">安盛</a>',
              itemStyle: 'two-line',
              status: 'checked',
              date: null
            });
          }
        if (loan.utmSource == 'debx-yx') {
          info2.push({
            key: loan.utmSource,
            name: '实地认证',
            note: '<a href="/event/youxin/index.jsp" target="_blank" title="友众信业商务顾问（北京）有限公司">友众信业</a>',
            itemStyle: 'two-line',
            status: 'checked',
            date: null
          });
        }
        if (loan.utmSource == 'debx-cf') {
          info2.push({
            key: loan.utmSource,
            name: '机构担保',
            note: '<a href="/event/cf/cf_intro.jsp" target="_blank" title="创富">创富</a>',
            itemStyle: 'two-line',
            status: 'checked',
            date: null
          });
        }
        if (loan.utmSource == 'debx-projectx') {//黑卡伪装成安盛
//            info2.push({
//              key: loan.utmSource,
//              name: '项目来源',
//              note: '<a title="黑卡">黑卡</a>',
//              itemStyle: 'two-line',
//              status: 'checked',
//              date: null
//            });

            info2.push({
                key: loan.utmSource,
                name: '机构担保',
                note: '<a href="/event/as/index.jsp" target="_blank" title="深圳安盛互联网金融服务有限公司">安盛</a>',
                itemStyle: 'two-line',
                status: 'checked',
                date: null
              });
          }
        if (info2.length > 0) {
          var style = info2[info2.length - 1].itemStyle;
          if (style) {
            style = style + ' last';
          } else {
            style = 'last';
          }
          info2[info2.length - 1].itemStyle = style;
        }
        $.each(info2, function (k, v) {
          if (k % 2 === 0) {
            v.itemStyle2 = "dark";
          }
        });
        return { creditInfo: info2 };
      }
      else if (api == p.API.getCommentsOnLoan) {
        ret = this._list(api, data, 'loanComments', 'loanComment');
        if (ret.loanComments.length > 0) {
          ret.loanComments[ret.loanComments.length - 1].last = 'last';
        }
        return ret;
      }
      else if (api == p.API.postCommentOnLoan) {
        return { comment: this.loanComment(data.comment) };
      }
      else if (api == p.API.getPlanPerformance) {
        return { performance: data.financePlanVos[0] };
      }
      else if (api == p.API.getUnreadMsgCount) {
        return {
          count: parseInt(data.totalCount, 10)
        };
      }
      else if (api == p.API. getUnreadNewTask) {
          return {
            count: parseInt(data.hasNewTask, 10)
          };
        }
     
      else if (api == p.API.getUserBankInfo) {
        return { accounts: data.userBankVoList };
      }
      else if (api == p.API.getUserLoanRepaymentRecords) {
        ret = this._list(api, data, 'data', 'userLoanRepaymentRecord');
        var metFirst = false;
        for (var i = 0; i < ret.data.length; i++) {
          if (metFirst && ret.data[i].status == '待还') {
            ret.data[i].shouldRepay = false;
          }
          if (!metFirst && ret.data[i].status == '待还') {
            metFirst = true;
          }
        }
        return ret;
      }
      else if (api == p.API.getExpectedAmountsForPlanExiting) {
        var d = data.planInfoForExiting;
        return {
          expectedExitAmount: this._fixedFloat2(d.expectedExitAmount),
          expectedTotalIncome: this._fixedFloat2(d.expectedTotalIncome),
          subPointId: d.subPointId,
          planId: d.planId
        };
      }

      /* Undefined */
      else {
        return data;
      }
    }
  });


  _Translator.prototype.newbeeLoan = _Translator.prototype.loan;
  _Translator.prototype.indexNewbeeLoan = _Translator.prototype.loan;


  /* Protocol */

  var _Protocol = function () {
    $.extend(this, {
      API: {},
      CONF: _API_CONF,
      status: {
        XHR_ERROR: -1,
        OLD_RSP: -2
      },
      translator: new _Translator(this)
    });

    var self = this;
    $.each(_API_CONF, function (k, v) {
      self.API[k] = k;
    });
  };

  $.extend(_Protocol.prototype, {

    _request: function (api, params, callback) {
      var o = this,
          conf = this.CONF[api],
          extra = ['timeout'],
          data, option;

      if (!conf) {
        throw 'Protocol._request: API is not ready';
      }


      data = $.extend({}, conf._params, params);

      option = {
        url: conf.url,
        data: data,
        type: conf.type,
        cache: false,
        dataType: conf.dataType,
        error: function (xhr, msg, err) {
          if (!callback) {
            return;
          }
          callback(o.status.XHR_ERROR, msg, err);
        },
        success: function (rsp) {
          if (!callback) {
            return;
          }
          var status = rsp.status === undefined ? o.OLD_RSP : rsp.status,
            message = rsp.message === undefined ? '' : rsp.message,
            data = rsp.data === undefined ? rsp : rsp.data;
          if (status == o.OLD_RSP || status === 0) {
            data = o.translator.translate(api, data);
          }
          callback(status, message, data);
        }
      };
      // timeout
      //$.extend(option, params);
      if ( params ) {
        //option['timeout'] = params['timeout'];
        $.each(extra, function(idx, key){
          if ( params[key] ) {
            params[key] = params[key];
          }
        });
      }
      $.ajax(option);
    }

  });

  $.each(_API_CONF, function (k, v) {
    if (_Protocol.prototype[k] === undefined) {
      _Protocol.prototype[k] = function (params, callback) {
        this._request(k, params, callback);
      };
    }
  });

  var Protocol = new _Protocol();
  module.exports = Protocol;

});
