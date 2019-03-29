<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="24">
                <div id="chartPie" style="height:500px;"></div>
            </el-col>
            <el-col :span="24">
                <div id="chartRing" style="height:500px;"></div>
            </el-col>
            <el-col :span="24">
                <div id="chartStack" style="height:500px;"></div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'

    export default {
        data() {
            return {
                chartPie:null,
                chartRing:null,
                chartStack:null,
            }
        },

        methods: {
            drawPieChart(){
                this.chartPie = echarts.init(document.getElementById('chartPie'));
                this.chartPie.setOption({
                    title : {
                        text: '专利类别统计',
                        //subtext: '纯属虚构',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['发明专利申请','实用新型专利申请','外观设计专利申请','进入中国国家阶段的PCT发明专利申请','进入中国国家阶段的PCT实用新型专利申请']
                    },
                    series : [
                        {
                            name: '专利类别',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:4569892, name:'发明专利申请'},
                                {value:4940849, name:'实用新型专利申请'},
                                {value:3186951, name:'外观设计专利申请'},
                                {value:724342, name:'进入中国国家阶段的PCT发明专利申请'},
                                {value:3652, name:'进入中国国家阶段的PCT实用新型专利申请'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
            drawRingChart(){
                this.chartRing=echarts.init(document.getElementById('chartRing'));
                this.chartRing.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:['发明专利申请','实用新型专利申请','外观设计专利申请','进入中国国家阶段的PCT发明专利申请','进入中国国家阶段的PCT实用新型专利申请']
                    },
                    series: [
                        {
                            name:'专利类型',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:4569892, name:'发明专利申请'},
                                {value:4940849, name:'实用新型专利申请'},
                                {value:3186951, name:'外观设计专利申请'},
                                {value:724342, name:'进入中国国家阶段的PCT发明专利申请'},
                                {value:3652, name:'进入中国国家阶段的PCT实用新型专利申请'}
                            ]
                        }
                    ]

                });

            },
            drawStackChart(){
                this.chartStack = echarts.init(document.getElementById('chartStack'));
                this.chartStack.setOption({
                    angleAxis: {
                    },
                    radiusAxis: {
                        type: 'category',
                        data: ['85-89', '90-94', '95-99', '00-04','05-09','10-14','15-16'],
                        z: 10
                    },
                    polar: {
                    },
                    series: [{
                        type: 'bar',
                        data: [8,58533,200373,255252,1039516,3330169,4569892],
                        coordinateSystem: 'polar',
                        name: '发明专利申请',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [48926,185147,355132,421598,1122847,3815550,4940849],
                        coordinateSystem: 'polar',
                        name: '实用新型专利申请',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [4397,28981,132781,132828,629681,2590554,3186951],
                        coordinateSystem: 'polar',
                        name: '外观设计专利申请',
                        stack: 'a'
                    },{
                        type: 'bar',
                        data: [0,0,1340,28063,252075,598848,724342],
                        coordinateSystem: 'polar',
                        name: '进入中国国家阶段的PCT发明专利申请',
                        stack: 'a'
                    },{
                        type: 'bar',
                        data: [0,0,0,0,316,2344,3652],
                        coordinateSystem: 'polar',
                        name: '进入中国国家阶段的PCT实用新型专利申请',
                        stack: 'a'
                    },
                        {
                            type: 'bar',
                            data: [53331,272661,689626,837741,3044435,10337465,13425686],
                            coordinateSystem: 'polar',
                            name: '总量',
                            stack: 'a'
                        },



                    ],
                    legend: {
                        show: true,
                        data: ['发明专利申请', '实用新型专利申请', '外观设计专利申请','进入中国国家阶段的PCT发明专利申请','进入中国国家阶段的PCT实用新型专利申请','总量']
                    }
                });

            },

            drawCharts() {
                this.drawPieChart()
                this.drawRingChart()
                this.drawStackChart()
            },
        },

        mounted: function () {
            this.drawCharts()
        },
        updated: function () {
            this.drawCharts()
        }
    }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/

    .el-col {
        padding: 30px 20px;
    }
</style>
