define('common:widget/oui/components/calculator', ['require', 'exports', 'module', "common:widget/oui/lib/jquery/1.9.1/jquery", 'common:widget/oui/protocol'],function(require, exports, module) {
    var $ = require("common:widget/oui/lib/jquery/1.9.1/jquery"),
        Protocol = require('common:widget/oui/protocol');

    var calc = function(obj) {
        if (obj&&$.isPlainObject(obj)) {
            return new calc.calculator(obj);
        }
    };

    calc.calculator = function(conf) {
        //不包括config中的数据验证
        this.type         = conf.type;//借款类型 GongShang ShengYi WangShang
        this.borrowAmount = conf.borrowAmount;//借款金额
        this.repayDate    = conf.repayDate;//借款期限
        this.monthlyComprehensiveFeeRate = conf.monthlyComprehensiveFeeRate; // 月综合费率
        this.yearRate     = conf.yearRate;//年利率
        this.mounthRate   = conf.yearRate/12; //月利率
        this.repayType    = conf.repayType;//还款方式   "DEBX":等额本息，"FXHB"2:按月还款
        this.isShowTable  = conf.isShowTable;//是否显示还款时间表
        this.mgmtAmount   = conf.mgmtAmount;//管理费
        this.model = 50;
        if(!this.isShowTable) {
        this.isShowTable=false;
       }

        this.init();
    };

    calc.comma = function(n,length) {
        var source = n;
        if (!length || length < 1) {
            length = 3;
        }
        source = String(source).split(".");
        source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{'+length+'})+$)','ig'),"$1,");
        return source.join(".");
    };

    calc.arrToObj = function(arr) {
        var obj={};
        for (var i= 0, len = arr.length; i<len;i++) {
            obj[arr[i].name] = arr[i].value;
        }
        return obj;
    };

    //银行家舍入法：
    //当舍去位的数值小于5时，直接舍去该位；
    // 当舍去位的数值大于等于6时，在舍去该位的同时向前位进一；
    // 当舍去位的数值等于5时，如果前位数值为奇，则在舍去该位的同时向前位进一，如果前位数值为偶，则直接舍去该位。
    calc.format = function(n) {
      return Protocol.translator._bankersRound(n);
    };

    calc.add = function(arg1,arg2) {
        var r1,r2,m;
        try{ r1 = arg1.toString().split(".")[1].length;}catch(e) { r1 = 0; }
        try{ r2 = arg2.toString().split(".")[1].length;}catch(e) { r2 = 0; }
        m = Math.pow(10,Math.max(r1,r2));
        return (arg1*m+arg2*m)/m;
    };

    calc.sub = function(arg1,arg2) {
        var r1,r2,m;
        try{r1 = arg1.toString().split(".")[1].length;}catch(e) { r1 = 0; }
        try{r2 = arg2.toString().split(".")[1].length;}catch(e) { r2 = 0; }
        m = Math.pow(10,Math.max(r1,r2));
        //动态控制精度长度
        //n = (r1>=r2)?r1:r2;
        //return ((arg1*m-arg2*m)/m).toFixed(n);
        return (arg1*m-arg2*m)/m ;
    };

    calc.mul = function(arg1,arg2) {
        var m = 0,s1 = arg1.toString(),s2 = arg2.toString();
        try{m += s1.split(".")[1].length;}catch(e) {}
        try{m += s2.split(".")[1].length;}catch(e) {}
        return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
    };

    calc.div = function(arg1,arg2) {
        var t1 = 0,t2=0,r1,r2;
        try{t1 = arg1.toString().split(".")[1].length;}catch(e) {}
        try{t2 = arg2.toString().split(".")[1].length;}catch(e) {}
        r1=Number(arg1.toString().replace(".",""));
        r2=Number(arg2.toString().replace(".",""));
        return (r1/r2)*Math.pow(10,t2-t1);
    };


    Number.prototype.sub = function(arg) {
        return calc.sub(this,arg);
    };

    Number.prototype.add = function(arg) {
        return calc.add(this,arg);
    };

    Number.prototype.mul = function(arg) {
        return calc.mul(this,arg);
    };

    Number.prototype.div = function(arg) {
        return calc.div(this,arg);
    };

    /**
     * 带月综合费率的等额本息计算
     * @param BA 每份金额
     * @param RD 还款月份
     * @param MR 月利率
     * @param MA 管理费
     * @param IS 是否显示表格
     * @param share 份数(借款金额/每份金额)
     * @param BA2 借款金额
     * @param MCF 月综合费率  monthlyComprehensiveFeeRate的缩写
     * @param SF 初期服务费  ServiceFee的缩写
     */
    calc.monthlyDEBXRepay = function(BA,RD,MR,MA,IS,share,BA2,MCF, SF) {
    	/**先按原来的方法计算出月还本金和利息，再通过使用月综合费率计算出的月还款额计算出结果*/
        var res = calc.equalRepay(BA,RD,MR,MA,IS,share,BA2);

        // 计算月还款额  月还款金额=借款本金/期数+借款本金x月综合费率
        var monthRepayFee = (BA2/RD + BA2*MCF).toFixed(2);
        alert(monthRepayFee);
        var serviceFee = BA2 * SF;
        alert(serviceFee);

        res.monthlyRepay = monthRepayFee;
        res.serviceFee = serviceFee;
        res.totalRepayFee = res.monthlyRepay * RD;
        res.monthlyComprehensiveFeeRate = MCF;

        for (var i=1;i<=RD;i++) {
            //本息余额
        	// mbenxi mlixi mbenjin qimo mgmtfee shengyu
        	var obj = res.table["row"+i];
        	obj.mtotal = monthRepayFee;
        	obj.mgmtfee = monthRepayFee - obj.mbenxi;

            res.table["row"+i].shengyu = ( tmpTotal - res.table["row"+j].mbenxi ).toFixed(2);
            tmpTotal = res.table["row"+j].shengyu;
        }
        return res;
    };

    /**
     * 等额本息计算
     * @param BA 每份金额
     * @param RD 还款月份
     * @param MR 月利率
     * @param MA 管理费
     * @param IS 是否显示表格
     * @param share 份数(借款金额/每份金额)
     * @param BA2 借款金额
     */
    calc.equalRepay = function(BA,RD,MR,MA,IS,share,BA2) {
        var res ={};
        //每月还款额=[贷款本金×月利率×（1+月利率）^还款月数]÷[（1+月利率）^还款月数－1]
        //res.monthlyRepay = ( BA * MR * Math.pow(1 + MR,RD)/(Math.pow(1+MR,RD)-1) ).toFixed(2);

        var a1 =  (BA.mul(MR)).mul(Math.pow(calc.add(1,MR),RD));
        var a2 =  calc.sub(Math.pow(calc.add(1,MR),RD),1);
        var ma = calc.format(BA.mul(MA / 100));

        res.monthlyRepay = calc.format(a1.div(a2));
            //月利率
        res.mounthRate = ( MR.mul(100));

        //还款期数
        res.repayDate = RD;

        //还款总额,下面这样计算是错的，因为最后一月数变化就对不上了
        //res.total = ( res.monthlyRepay * res.repayDate ).toFixed(2);
        res.total = 0;
        res.totaladdglf = 0;
        res.table ={};
        for (var i=1;i<=RD;i++) {
            res.table["row"+i] = {};

            //月份
            res.table["row"+i].mounth = i;

            res.table['row' + i].mgmtfee = ma;

            if (i ==1) {
                //期初未还本金
                res.table["row"+i].qichu = BA;
            } else {
                //期初未还本金
                res.table["row"+i].qichu =  ( res.table["row"+(i-1)].qimo );
            }

            //月还本息
            if (i<RD) {
                res.table["row"+i].mbenxi = res.monthlyRepay;
            } else {
                //res.table["row"+i].mbenxi =  (calc.mul(res.table["row"+i].qichu,calc.add(1.00,MR))).toFixed(2);
               // res.table["row"+i].mbenxi = (res.table["row"+i].qichu*(1.0 + MR)).toFixed(2);
                res.table["row"+i].mbenxi =  calc.format(calc.mul(res.table["row"+i].qichu,calc.add(1.00,MR)));
                //bank
            }

            res.total += parseFloat( res.table["row"+i].mbenxi );

            //月还利息
            //bank
            res.table["row"+i].mlixi = calc.format(res.table["row"+i].qichu.mul(res.mounthRate).mul(0.01));
           // res.table["row"+i].mlixi = ( res.table["row"+i].qichu * res.mounthRate*0.01 ).toFixed(2);

            //月还本金
            //不用bank
            res.table["row"+i].mbenjin =  calc.sub(res.table["row"+i].mbenxi , res.table["row"+i].mlixi );
            //res.table["row"+i].mbenjin =  res.table["row"+i].mbenxi - res.table["row"+i].mlixi;

            //期末未还本金
            res.table["row"+i].qimo =  calc.sub(res.table["row"+i].qichu,res.table["row"+i].mbenjin);
            //res.table["row"+i].qimo = res.table["row"+i].qichu - res.table["row"+i].mbenjin;
           // res.table["row"+i].qimo = (res.table["row"+i].qimo )

            res.table["row"+i].itemStyle = i % 2 === 0 ? "color-time-tr1":"color-time-tr2";

        }

        res.total = res.total.toFixed(2);
        var tmpTotal = res.total;
        for (var j=1;j<=RD;j++) {
            //本息余额
            res.table["row"+j].shengyu = ( tmpTotal - res.table["row"+j].mbenxi ).toFixed(2);
            tmpTotal = res.table["row"+j].shengyu;
        }

        //上面计算出了一份的数据，下面结果剩以份数

        //res.monthlyRepay *= share;
        res.monthlyRepay = calc.mul(res.monthlyRepay ,share);
        //res.total *= share;
        res.total = calc.mul(res.total,share);
        res.total = res.total.toFixed(2);

        res.isShowTable = IS;

        for (var k=1;k<=RD;k++) {
            /*res.table["row"+k].qichu   *= share;
            res.table["row"+k].mbenxi  *= share;
            res.table["row"+k].mlixi   *= share;
            res.table["row"+k].mbenjin *= share;
            res.table["row"+k].qimo    *= share;
            res.table["row"+k].shengyu *= share;*/

             res.table["row"+k].qichu   = calc.mul(res.table["row"+k].qichu,share);
             res.table["row"+k].mbenxi  = calc.mul(res.table["row"+k].mbenxi,share);
             res.table["row"+k].mlixi   = calc.mul( res.table["row"+k].mlixi,share);
             res.table["row"+k].mbenjin = calc.mul(res.table["row"+k].mbenjin,share);
             res.table["row"+k].qimo    = calc.mul(res.table["row"+k].qimo,share);
             res.table["row"+k].shengyu = calc.mul(res.table["row"+k].shengyu,share);
             res.table['row' + k].mgmtfee = calc.mul(res.table['row' + k].mgmtfee,share);

             res.table["row"+k].yuehuankuane =  calc.add(res.table["row"+k].mbenxi, res.table['row' + k].mgmtfee);

            //对计算结果保留2位小数
            res.table["row"+k].qichu   = res.table["row"+k].qichu.toFixed(2);
            res.table["row"+k].mbenxi  = res.table["row"+k].mbenxi.toFixed(2);
            res.table["row"+k].mlixi   = res.table["row"+k].mlixi.toFixed(2);
            res.table["row"+k].mbenjin = res.table["row"+k].mbenjin.toFixed(2);
            res.table["row"+k].qimo    = res.table["row"+k].qimo.toFixed(2);
            res.table["row"+k].shengyu = res.table["row"+k].shengyu.toFixed(2);// 原先的剩余本息计算

            res.table["row"+k].yuehuankuane = res.table["row"+k].yuehuankuane.toFixed(2);


            if(k==1){//剩余本金计算
              res.table["row"+k].shengyubenjin = BA2 -  res.table["row"+k].mbenjin;
              res.table["row"+k].shengyubenjin = res.table["row"+k].shengyubenjin.toFixed(2);
            }else{

              res.table["row"+k].shengyubenjin = res.table["row"+(k-1)].shengyubenjin -  res.table["row"+k].mbenjin;
              res.table["row"+k].shengyubenjin = res.table["row"+k].shengyubenjin.toFixed(2);
            }

            res.totaladdglf += parseFloat( res.table["row"+k].yuehuankuane);

            res.table['row' + k].mgmtfee = res.table['row' + k].mgmtfee.toFixed(2);

            res.table["row"+k].itemStyle = k % 2 === 0 ? "color-time-tr1":"color-time-tr2";
        }

        res.totaladdglf =  res.totaladdglf.toFixed(2);

        return res;
    };

    calc.mouthRepay = function(BA,RD,MR,MA,IS) {

        var ma = calc.format(BA * MA / 100);

        var res ={};
        //月利率
        res.mounthRate = calc.format( MR.mul(100));

        //还款期数
        res.repayDate = RD;
        res.monthlyRepay = calc.format(BA * MR);

        res.table ={};
        res.total = 0;
        res.isShowTable = IS;
        for (var i = 1;i <= RD; i++) {

            res.table["row"+i] = {};

            //月份
            res.table["row"+i].mounth = i;

            res.table["row"+i].mgmtfee = ma;
            //月还本息
            if (i < RD) {
                res.table["row"+i].mbenxi = res.monthlyRepay;
                res.table["row"+i].mbenjin = (0).toFixed(2);
            } else {
                res.table["row"+i].mbenxi = parseInt(BA,10) +parseFloat(res.monthlyRepay);
                res.table["row"+i].mbenjin = parseInt(BA,10).toFixed(2);
            }

            res.total += parseFloat( res.table["row"+i].mbenxi );
            //月还利息
            res.table["row"+i].mlixi = res.monthlyRepay;
            res.table["row"+i].itemStyle = i % 2 === 0 ? "color-time-tr1":"color-time-tr2";

        }

        res.total = res.total.toFixed(2);
        var tmpTotal = res.total;
        for (var j=1;j<=RD;j++) {
            //本息余额
            res.table["row"+j].shengyu = ( tmpTotal - res.table["row"+j].mbenxi ).toFixed(2);
            tmpTotal = res.table["row"+j].shengyu;
        }

        return res;

    };

    calc.calculator.prototype = {
        init:function() {
        },
        reset:function() {
        },
        calc:function() {
            this.reset();
            var BA = this.model,  //this.borrowAmount,
                BA2 = this.borrowAmount,
//                TY = this.type,
                RD = this.repayDate,
//                YR = this.yearRate*0.01,
                MR = this.mounthRate*0.01,
//                RT = this.repayType,
                IS = this.isShowTable,
                MA = this.mgmtAmount;

            var share = this.borrowAmount / this.model;
            if (this.repayType == 'DEBX') {
                return calc.equalRepay(BA,RD,MR,MA,IS,share,BA2);
            } else if (this.repayType == 'FXHB') {
                return calc.mouthRepay(BA2,RD,MR,MA,IS);
            }


        }
    };
    module.exports = calc;
});
