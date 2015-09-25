define('common:widget/oui/components/plan-performance', ['require', 'exports', 'module', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/protocol', 'common:widget/oui/lib/highcharts/3.0.5/highcharts'],function (require, exports, module) {

  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery'),
    Protocol = require('common:widget/oui/protocol');

  require('common:widget/oui/lib/highcharts/3.0.5/highcharts');

  var CASH_H = 40,
    ARROW_H = 115,
    DIST_COUNT = 5;

  var PlanPerformance = function (conf) {

    $.extend(this, {
      name: conf.name,
      container: conf.container || $('#' + conf.name),
      planId: conf.planId
    });

    this._ui = {
      boxCashIn: this._elem('input-cash'),
      boxCashOut: this._elem('output-cash'),
      boxArrow: this._elem('arrow'),
      numTotalAmount: this._elem('total-amount'),
      numAvgInterest: this._elem('avg-interest-rate'),
      numTotalInterest: this._elem('total-interest'),
      numUsage: this._elem('usage'),
      numBidCount: this._elem('bid-count'),
      boxInvestors: this._elem('investors'),
      boxBorrowers: this._elem('borrowers'),
      numInvestorCount: this._elem('investor-count'),
      numBorrowerCount: this._elem('borrower-count'),
      boxDist: this._elem('borrowers-dist')
    };

    this._tpl = {
      cash: '<div class="cash fn-left"></div>',
      investor: '<div class="ppl-solid fn-left"></div>',
      borrower: '<div class="ppl-trans fn-left"></div>',
      error: '<div class="plan-performance-error">加载失败，请稍后再试</div>'
    };
  };

  $.extend(PlanPerformance.prototype, {
    init: function () {
      var self = this,
        p = {
          financePlanId: this.planId
        };
      Protocol.getPlanPerformance(p, function (status, message, data) {
        $('.plan-performance-loading').hide();
        if ($('#J_NEW_PRO_DIV').length > 0) {

          $('#J_PER_FBSJ').html(data.performance.reserveDate);
          $('#J_PER_ZDTB').html(data.performance.bidCount);
          $('#J_PER_BZJKYH').html(data.performance.borrowCount);
          $('#J_PER_WYHZQ').html(data.performance.earnInterest);
          $('#J_PER_JRRS').html(data.performance.subPointCount);

          $('#J_PER_MEYSJW').html(data.performance.useTime === '' ? '&nbsp;' : data.performance.useTime);

          if (data.performance.provinceDist !== null) {
            var obj = data.performance.provinceDist;
            var dom = "", x;
            var total = 0, index = 0, shengyu = 0;
            for (x in eval(obj)) {
              total += Number(obj[x]);
            }
            for (x in eval(obj)) {
              index++;
              if (index > 6) {
                break;
              }
              shengyu += Math.floor(Number(obj[x]) / total * 100);
              dom += '<p>' + '<span class="mr10">' + x + '</span>' + '<span class="mr10">' + Math.floor(Number(obj[x]) / total * 100) + '%</span>' + '<span class="addr-progress"><b style="width:' + Math.floor(Number(obj[x]) / total * 100) + '%"></b></span>' + '</p>';
            }
            shengyu = 100 - shengyu;

            if (index > 6) {
              dom += '<p>' + '<span class="mr10">其他</span>' + '<span class="mr10">' + shengyu + '%</span>' + '<span class="addr-progress"><b style="width:' + shengyu + '%"></b></span>' + '</p>';
            }


            $('#J_PER_DYFB').html(dom);
          }

        } else {
          self.render(status, message, data);
        }
      });
      return this;
    },

    render: function (status, message, data) {

      var ui = this._ui,
        tpl = this._tpl,
        i, m;
      if (status !== 0) {
        this.container.parent().append(tpl.error);
        return;
      }

      this.container.show();
      var p = data.performance,
        t = Protocol.translator;

      if (p.earnInterest < 0) {
        p.earnInterest = 0;
      }
      ui.numTotalAmount.text(t._commaInteger(p.amount));
      ui.numAvgInterest.text(t._fixedFloat2(p.averageBidInterest));
      ui.numTotalInterest.text(t._commaFloat(p.earnInterest));
      ui.numUsage.text(t._fixedFloat2(p.fundsUseRate));
      ui.numBidCount.text(t._commaInteger(p.bidCount));

      var inCash = Math.ceil(p.amount / 1000000, 10);
      var outCash = Math.ceil(p.earnInterest / 1000000, 10);
      for (i = 0; i < inCash; i++) {
        ui.boxCashIn.append(tpl.cash);
      }
      for (i = 0; i < outCash; i++) {
        ui.boxCashOut.append(tpl.cash);
      }

      var inBoxH = Math.ceil(inCash / 5) * CASH_H;
      var outBoxH = Math.ceil(outCash / 5) * CASH_H;
      var maxH = ARROW_H;

      if (inBoxH > ARROW_H) {
        ui.boxArrow.css('margin-top', Math.floor((inBoxH - ARROW_H) / 2));
        maxH = inBoxH;
      }
      else {
        m = Math.floor((ARROW_H - inBoxH) / 2);
        ui.boxCashIn.css('margin-top', m).css('margin-bottom', m);
      }

      if (outBoxH !== 0) {
        m = Math.floor((maxH - outBoxH) / 2);
        ui.boxCashOut.css('margin-top', m).css('margin-bottom', m);
      }
      else {
        ui.boxCashOut.css('height', maxH);
      }

      ui.numInvestorCount.text(t._commaInteger(p.subPointCount));
      ui.numBorrowerCount.text(t._commaInteger(p.borrowCount));

      var maxCount = p.subPointCount > p.borrowCount ? p.subPointCount : p.borrowCount;
      var unitCount = Math.ceil(maxCount / 10);
      var investors = Math.ceil(p.subPointCount / unitCount);
      var borrowers = Math.ceil(p.borrowCount / unitCount);
      for (i = 0; i < investors; i++) {
        ui.boxInvestors.append(tpl.investor);
      }
      for (i = 0; i < borrowers; i++) {
        ui.boxBorrowers.append(tpl.borrower);
      }

      var dist = p.provinceDist,
        dist2 = [],
        dist3 = [];
      $.each(dist, function (k, v) {
        dist2.push({
          name: k,
          y: v
        });
      });
      dist2.sort(function (a, b) {
        return b.y - a.y;
      });

      var colors = ['#52ac4e', '#67b664', '#86c583', '#a8d5a6', '#a8d5a6', '#dceedc'];
      var total = 0,
        others = 0,
        cp = 0;
      for (i = 0; i < dist2.length; i++) {
        total += dist2[i].y;
        if (i < DIST_COUNT) {
          dist2[i].color = colors[cp];
          dist3.push(dist2[i]);
          cp += 1;
        }
        else {
          others += dist2[i].y;
        }
      }
      if (others > 0) {
        dist3.push({
          name: '其它',
          y: others,
          color: colors[cp]
        });
      }

      if (total > 0) {
        ui.boxDist.highcharts({
          chart: {
            type: 'pie'
          },
          title: {
            text: '借款人地域分布'
          },
          legend: false,
          plotOptions: {
            pie: {
              shadow: false,
              center: ['50%', '50%']
            }
          },
          tooltip: {
            valueSuffix: '位'
          },
          series: [{
            name: '借款人',
            data: dist3,
            size: '100%',
            innerSize: '50%',
            dataLabels: {
              color: '#fff',
              distance: -25
            }
          }],
          credits: {
            enabled: false
          }
        });
      }
    },

    _elem: function (name) {
      return this.container.find('[data-name="' + name + '"]');
    }
  });

  module.exports = PlanPerformance;

});