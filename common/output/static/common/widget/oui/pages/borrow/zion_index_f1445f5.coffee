define (require, exports, module)->
  $ = require('jquery')
  Handlebars = require('handlebars')

  UserLevel = window['userFeeRate'] || 'HR'
  RateDict = window['allFeeRate'] || {}

  CACHE = {}

  # Silder dict
  Dict =
    0: 3000
    126: 10000
    444: 10*10000
    622: 20*10000
    728: 50*10000

  # Silder
  Silder =
    def:
      offset: 55
      minoffset: 0
      maxoffset: 728
      min: 3000
      max: 500000
      step: 1000
      delay: 200
      text: '#J_text_borrow-amount'
      holder: '#J_borrow-amount-slider'
      line: '#J_borrow-slider-line'
      trigger: '#J_borrow-slider-trigger'
      up: '#J_borrow-slider-right'
      down: '#J_borrow-slider-left'
    increaseVal: ->
      me = @
      opt = me.option
      val = opt.text.val() - 0
      val = me.sanitizeVal val+opt.step
      me.setVal val
      me.money2silder()
    decreaseVal: ->
      me = @
      opt = me.option
      val = opt.text.val() - 0
      val = me.sanitizeVal val-opt.step
      me.setVal val
      me.money2silder()
    sanitizeVal: (val)->
      me = @
      opt = me.option
      originVal = val
      min = opt.min
      max = opt.max
      val = parseInt('0'+val, 10)
      val = min if val < min
      val = max if val > max
      opt.step = 1000 if val <= 10000
      opt.step = 5000 if val > 10000
      opt.step = 10000 if val > 10*10000
      opt.step = 50000 if val > 20*10000
      step = opt.step
      if (val % step) != 0
        val = (val - (val % step)) + step
      #console.log 'sanitizeVal',originVal,val
      val
    setVal: (val)->
      me = @
      me.option.text.val val
    setOffset: (val)->
      me = @
      opt = me.option
      offset = opt.offset
      offsetTrigger = 36
      max = opt.maxoffset
      min = opt.minoffset
      x = parseInt('0'+val, 10)
      x = x - offset
      x = max if x > max
      x = min if x < min
      opt.line.css width: x
      opt.trigger.css left: (x+offsetTrigger)
    silder2money: (x)->
      me = @
      opt = me.option
      offset = opt.offset
      max = opt.maxoffset
      min = opt.minoffset
      x = x - offset
      x = max if x > max
      x = min if x < min
      last = opt.min
      next = opt.max
      dict = Dict
      if x is min
        me.setVal me.sanitizeVal opt.min
      if x is max
        me.setVal me.sanitizeVal opt.max
      for k,v of dict
        last = k if x >= k
        if x<=k
          next = k
          break
      if next == last
        me.setVal me.sanitizeVal dict[next]
        me.renderTable()
        return me
      unit = (dict[next]-dict[last])/(next-last)
      val = (x - last ) * unit + dict[last]
      # console.log last, x, next, val, unit
      me.setVal me.sanitizeVal val
      me.renderTable()
      return me
    money2silder: (resetval)->
      me = @
      opt = me.option
      offset = opt.offset
      min = opt.minoffset
      max = opt.maxoffset
      dict = Dict
      val = parseInt('0'+opt.text.val(), 10)
      if resetval
        if (val % 100) != 0
          val = Math.ceil(val/100)*100
        val = 3000 if val < opt.min
        val = 500000 if val > opt.max
        me.setVal val
      val = me.sanitizeVal opt.text.val()
      for k,v of dict
        if val > v
          min = k
        if val <= v
          max = k
          break
      unit = (dict[max] - dict[min])/(max - min)
      x = min
      x = x - 0 + (val - dict[min])/unit
      x += offset
      me.setOffset x
      me.renderTable()
    renderTable: ->
      key = 'J_borrow-table-tr'
      me = @
      opt = me.option
      holder = opt.table
      dict = RateDict
      tip_tigger = $('.icon-cash', holder.parent('table'))
      tip_content= $('.ui-poptip-content', '#J_borrow-month-fee-rate')
      payment = parseInt '0'+$('#J_text_borrow-amount').val(), 10
      ret = {}
      calcMonth = (month,rate)->
        pay = payment*100
        pay = parseInt(Math.round(pay/month + payment*rate),10)/100
        pay.toFixed(2)
      calcTotal = (month,rate)->
        #pay = payment*100
        #pay = parseInt(Math.round(pay + payment*rate*month),10)/100
        #pay.toFixed(2)
        pay = calcMonth month,rate
        pay = (pay*100*month)/100
        pay.toFixed(2)
      if CACHE[key]
        tpl = CACHE[key]
      else
        tpl = CACHE[key] = Handlebars.compile $('#'+key).html()
      month = $(':radio:checked', holder).val()
      #console.log month,UserLevel
      for k,v of dict
        if k.indexOf(UserLevel+'_') != -1
          ret[v.month] = v
      # empty
      holder.html ''
      #月还款金额=借款本金/期数+借款本金x月综合费率
      #还款金额=借款本金+借款本金x月综合费率x期数
      _hasDiscount = false
      _discount = 0
      for k in [3,6,12,24]
        v = ret[k]
        if not v
          continue
        if v.discountRadio<100
          v.hasDiscount = _hasDiscount= true
        else
          v.hasDiscount = _hasDiscount = false
        v.monthFeeRate = v.finalMonthlyComprehensiveFeeRate
        v.payment = payment
        v.monthPay = calcMonth(v.month, v.monthFeeRate)
        v.totalPay = calcTotal(v.month, v.monthFeeRate)
        v.monthFeeRate = v.monthFeeRate.toFixed(2)
        tr = tpl(v)
        _discount = v.monthlyComprehensiveFeeRate
        holder.append tr
      if _hasDiscount
        #借款费率大优惠。原始月综合费率为XX。
        tip_content.html(['借款费率大优惠。原始月综合费率为', _discount, '%。'].join(''))
        tip_tigger.removeClass 'fn-hide'
      else
        tip_tigger.addClass 'fn-hide'
    _bindClickAndHold: (el, callbak, delay)->
      holdTimer = null
      holdHandler = ->
        holdTimer = setTimeout ->
          callbak()
          holdHandler()
        , delay
      el.on 'mousedown', ->
        holdHandler()
        return false
      .on 'mouseup mouseout', ->
        clearTimeout holdTimer
        return false
      .on 'click dbclick', (e)->
        callbak()
        return false
    _bindWheelEvent: ->
      me = @
      opt = me.option
      isWheel = 0
    _bindTableEvent: ->
      me = @
      opt = me.option
      table = opt.table = $('#J_borrow-table')
      table.on 'click', 'tr', (e)->
        $(':radio', @).get(0).checked = true
        $(this)
          .addClass 'active'
        .siblings()
          .removeClass 'active'
      .on 'mouseenter', 'tr', ->
        $(this).addClass 'active'
      .on 'mouseleave', 'tr', ->
        if not $(':radio', @).get(0).checked
          $(this).removeClass 'active'
    _bindDragEvent: ->
      me = @
      opt = me.option
      holder = opt.holder
      trigger = opt.trigger
      line = opt.line
      isDrag = 0
      moveingHander = (e)->
        if not isDrag
          return
        x = e.pageX - holder.offset().left
        me.setOffset x
        me.silder2money x
      trigger.on 'mousedown', (e)->
        isDrag = 1
        false
      .on 'mouseup mouseout', (e)->
        isDrag = 0
        false
      holder.on 'mousedown', (e)->
        x = e.offsetX
        me.setOffset x
        me.silder2money x
      $(document).on 'mousemove', moveingHander
    bindEvent: ->
      me = @
      opt = me.option
      me._bindClickAndHold opt.up, ->
        me.increaseVal()
      , opt.delay
      me._bindClickAndHold opt.down, ->
        me.decreaseVal()
      , opt.delay
      me._bindDragEvent()
      me._bindWheelEvent()
      me._bindTableEvent()
      opt.text.on 'keyup', ->
        me.money2silder()
      opt.text.on 'blur', ->
        me.money2silder(true)
      me
    init: (opt)->
      me = @
      me.option = $.extend({}, me.def, opt)
      # option
      for k in ['text', 'line', 'holder', 'trigger', 'up', 'down']
        me.option[k] = $ me.option[k]
      me.bindEvent()
      me.money2silder()
      me

  # step silder
  Step =
    def:
      idx: 0
      trigger: '#J_borrow-step-trigger'
      holder: '#J_borrow-step-holder'
    next: ->
      me = @
      opt = me.option
      me.switchTo ++opt.idx
    last: ->
      me = @
      opt = me.option
      me.switchTo --opt.idx
    switchTo: (idx)->
      me = @
      opt = me.option
      trigger = opt.trigger
      triggers = $('li', trigger)
      len = triggers.length
      holder = opt.holder
      panels = $('div:lt('+len+')', opt.holder)
      idx = (len-1) if idx >= len
      idx = 0 if idx <=0
      opt.idx = idx
      triggers
        .removeClass 'ui-step-active ui-step-pass'
        .filter ':lt('+idx+')'
          .addClass 'ui-step-pass'
        .end().eq(idx).addClass 'ui-step-active'
      panels
        .addClass 'hide'
        .eq(idx).removeClass 'hide'
      me
    bindEvent: ->
      me = @
      opt = me.option
      trigger = opt.trigger
      holder = opt.holder
      trigger.on 'click','li', (e)->
        me.switchTo $('li', trigger).index(@)
      holder.on 'click', '.arrow-left', ->
        me.last()
      .on 'click', '.arrow-right',->
        me.next()
    init: (opt)->
      me = @
      me.option = $.extend({}, me.def, opt)
      # option
      for k in ['trigger', 'holder']
        me.option[k] = $ me.option[k]
      me.bindEvent()
      me
  # init
  init = ()->
    Silder.init()
    Step.init()

  # export
  module.exports = 
    init: init