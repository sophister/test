/**
 * Created by jess on 15/8/16.
 */

var Chart = require('common:widget/ui/lib/Chart.js');



var data = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    }
];


var singleton = {

    init : function(){
        var con1 = document.getElementById('test-1');
        var ctx1 = con1.getContext('2d');

        var myPieChart = new Chart(ctx1).Doughnut(data,{
            animateScale: true
        });

        con1.onclick = function(e){
            var frags = myPieChart. getSegmentsAtEvent(e);
            console.log( frags );
        };

    }
};


module.exports = singleton;