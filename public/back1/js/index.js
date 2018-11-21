$(function () {
    var myChart1 = echarts.init(document.querySelector('.chart-1'));
    var option1 = {
        title: {
            text: '2018年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['人数', '销量']
        },
        xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [300, 420, 536, 610, 710, 820]
        }, {
            name: '销量',
            type: 'bar',
            data: [328, 120, 236, 710, 310, 420]
        }],
    };
    myChart1.setOption(option1);

    var myChart2 = echarts.init(document.querySelector('.chart-2'));
    var options2 = {
        title: {
            text: '热门品牌销售',
            subtext: '纯属虚构',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克', '阿迪', '阿迪王', '老北京', '老太太']
        },
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [{
                    value: 335,
                    name: '耐克'
                },
                {
                    value: 310,
                    name: '阿迪'
                },
                {
                    value: 234,
                    name: '阿迪王'
                },
                {
                    value: 135,
                    name: '老北京'
                },
                {
                    value: 1548,
                    name: '老太太'
                }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    myChart2.setOption(options2);
})