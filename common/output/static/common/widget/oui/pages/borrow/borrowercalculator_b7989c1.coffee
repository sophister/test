define (require, exports, module)->
  $ = require('jquery')
  Widgets = require('widgets/widgets')
  Handlebars = require('handlebars')
  Components = require('components/components')
  Calculator = Components.Calculator
  Form = Widgets.Form

  Dict = window['allFeeRate'] || {}

  CACHE = {}
  Rate = 0.88
  StartRate = 5
  YearRate = 0
  UserLevel = 'HR'
  Month = 3
  Levels = 'AA A B C D E HR'

  # Calc
  Calc =
    hide:(x)->
      $(x).addClass 'hide'
    show:(x)->
      $(x).removeClass 'hide'
    formatMoney: (num, n)->
      n = 0 if not n
      num = String(Number(num).toFixed(n))
      re = /(-?\d+)(\d{3})/
      num = num.replace re, '$1,$2' while re.test num
      num
    renderResult: (d)->
      me = @
      key = 'J_tpl-loan-calc'
      if CACHE[key]
        tpl = CACHE[key]
      else
        tpl = CACHE[key] = Handlebars.compile $('#'+key).html()
      holder = $('#J_calcResult')
      data = $.extend({},
        monthPay: 0
        monthRate: 0
        totalPay: 0
        startPay: 0
        isShowTable: false
        table: []
      ,d)
      holder.html tpl data
    calc: ->
      me = @
      amount = $('#J_borrowAmount').val()
      month = $('#J_repayTime').val()
      amount = parseInt('0'+amount, 10)
      month = parseInt('0'+month, 10)
      rate = Rate
      startRate = StartRate
      payment = amount
      calcMonth = (month,rate)->
        pay = payment*100
        pay = parseInt(Math.round(pay/month + payment*rate),10)/100
        pay.toFixed(2)
      calcTotal = (month,rate)->
        pay = payment*100
        pay = parseInt(Math.round(pay + payment*rate*month),10)/100
        pay.toFixed(2)
      monthPay = calcMonth month,rate
      totalPay = monthPay * month
      data =
        monthRate: rate
        startPay: me.formatMoney amount*startRate/100,2
        monthPay: me.formatMoney monthPay,2
        totalPay: me.formatMoney totalPay,2
      #console.log amount,month,rate
      #
      #this.type         = conf.type;//借款类型 GongShang ShengYi WangShang
      #this.borrowAmount = conf.borrowAmount;//借款金额
      #this.repayDate    = conf.repayDate;//借款期限
      #this.monthlyComprehensiveFeeRate = conf.monthlyComprehensiveFeeRate; // 月综合费率
      #this.yearRate     = conf.yearRate;//年利率
      #this.mounthRate   = conf.yearRate/12; //月利率
      #this.repayType    = conf.repayType;//还款方式   "DEBX":等额本息，"FXHB"2:按月还款
      #this.isShowTable  = conf.isShowTable;//是否显示还款时间表
      #this.mgmtAmount   = conf.mgmtAmount;//管理费
      #this.model = 50;
      #
      res = Calculator 
        borrowAmount: amount
        repayDate: month
        monthlyComprehensiveFeeRate: rate
        repayType: 'DEBX'
        isShowTable: true
        yearRate: YearRate
        mgmtAmount: 0
      .calc()
      data.isShowTable = true
      data.table = res.table
      # user new calc for monthPay
      for k,v of data.table
        maintenanceFee = (parseInt(Math.round(monthPay*100),10) - parseInt(Math.round(v.yuehuankuane*100)))/100
        #console.log monthPay,v.yuehuankuane,v.mbenjin,v.mlixi
        v.mgmtfee = maintenanceFee.toFixed(2)
        v.yuehuankuane = monthPay
      me.renderResult data
    updateMonth: ->
      me = @
      month = $('#J_repayTime').val()
      Month = parseInt('0'+month, 10)
      month = Month
      dict = Dict
      for v in Levels.split(' ')
        idx = [v, '_', month].join('')
        #console.log idx
        if dict[idx] && not dict[idx].level
          _d = dict[idx]
          _d.level = v
          _d.monthRate = _d.monthlyComprehensiveFeeRate.toFixed(2)
          _d.startRate = _d.guaranteeFee
      me.updateRate()
      me.updateLevelList()
    updateRate: ->
      month = Month
      v = UserLevel
      idx = [v, '_', month].join('')
      # rate
      v = Dict[idx]
      Rate = v.monthRate 
      StartRate = v.startRate 
      YearRate = v.fixInterest
      #console.log UserLevel,Rate,StartRate
      $('#J_ipt-rate').text Rate
    updateLevelList: ->
      me = @
      key = 'J_tpl-level-list'
      if CACHE[key]
        tpl = CACHE[key]
      else
        tpl = CACHE[key] = Handlebars.compile $('#'+key).html()
      holder = $('#J_creditlevel-list-ul')
      month = Month
      dict = Dict
      list = []
      for v in Levels.split(' ')
        idx = [v, '_', month].join('')
        if dict[idx]
          list.push dict[idx]
      # render level list
      holder.html tpl list:list
      #console.log dict
      me
    _renderLabel: (key)->
      el = $('#'+key)
      if $('label.error', el.parent()).length
        return label = $('label.error', el.parent())
      label = $('<label for="'+key+'"></label>')
          .addClass 'error hide'
          .appendTo el.parent()
    validateAmount: ->
      me = @
      key = 'J_borrowAmount'
      el = $('#'+key)
      val = el.val()
      label = me._renderLabel key
      showErr = (msg)->
        label.html(msg)
          .removeClass 'hide'
        el.addClass 'error'
      hideErr = ->
        el.removeClass 'error'
        label.addClass 'hide'
      if val.length < 1
        showErr '请输入金额'
        return false
      if !/^([1-9]{1}\d*)$/.test(val) or
        val < 3000 or
        val >500000 or
        (val % 50) != 0
          showErr '金额范围3,000-500,000，且为50的倍数'
          return false
      hideErr()
      true
    validateMonth: ->
      el = $('#J_repayTime')
      val = el.val()
      label = el.parent().siblings('.noinput-p')
      #console.log val
      if val.length<1
        label.removeClass 'hide'
        return false
      label.addClass 'hide'
      true
    _bindForm: ->
      me = @
      $form = $('#calcForm')
      $amount = $('#J_borrowAmount')
      $month = $('#J_repayTime')
      $form.on 'submit', (e)->
        _bValid = true
        _bValid = _bValid && me.validateAmount()
        _bValid = _bValid && me.validateMonth()
        if _bValid
          me.calc()
        false
      $amount.on 'focus',(e)->
        Form.tipfocus $(@), '金额范围3,000-500,000'
        $(@).siblings('.error-p')
          .addClass 'hide'
      .on 'blur',(e)->
        me.validateAmount()
        Form.tipblur $(@)
    _bindCreditLevelSelect: ->
      me = @
      trigger = $('#J_select-creditlevel')
      holder = $('#J_creditlevel-list')
      ipt = $('#J_current-creditlevel')
      tip = $('#J_creditlevel-active')
      trigger.on 'click', (e)->
        holder.toggleClass 'hide'
        false
      holder.on 'mouseenter', 'li', ->
        el = $(@)
        if el.hasClass 'title'
          return
        x = el.position().left
        lv = el.data('level')
        tip.data 'level', lv
        .css left: x
      tip.on 'click',->
        el = $(@)
        lv =el.data('level')
        ipt.removeClass Levels
        .addClass lv
        .text lv
        UserLevel = lv
        me.updateMonth()
        me.hide holder
    _bindDropSelect: ->
      me = @
      isOpen = false
      $('.J_select_btn').on 'click', ->
        isOpen = true
        $('.J_popBox').addClass 'hide'
        $(this).parent().find('.J_popBox').removeClass 'hide'
      $('.J_popBox').on 'mouseenter', 'li', ->
        $(this).addClass 'selected'
      .on 'mouseleave', 'li', ->
        $(this).removeClass 'selected'
      .on 'click', 'li', ->
        el = $(this)
        holder = el.parent().parent()
        d = el.attr('datavalue')
        text= $('span', el).text()
        $('input', holder).val d
        me.updateMonth()
        $('.J_txt', holder).text text
      # hide popbox click otherwise
      $(document).on 'click', (e)->
        target = $(e.target)
        if target.parent('.arrow').length
          return
        if target.parent('.J_select_btn').length
          return
        if isOpen
          $('.J_popBox').addClass 'hide'
    bindEvent:->
      me = @
      me._bindDropSelect()
      me._bindCreditLevelSelect()
      me._bindForm()
    init:->
      me = @
      me.bindEvent()
      me.updateMonth()
      me.renderResult()

  # init
  init = ()->
    Calc.init()

  # export
  module.exports = 
    init: init