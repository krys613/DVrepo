<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="24">
                <div id="chartLine" style="height:500px;"></div>
            </el-col>

        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'

    export default {
        data() {
            return {
                chartLine:null,
            }
        },

        methods: {
            drawLineChart(){
                var dataZoom = [
                    {
                        show: true,
                        realtime: true,
                        start: 30,
                        end: 70,
                        xAxisIndex: 0
                    },
                    {
                        type: 'inside',
                        realtime: true,
                        start: 30,
                        end: 70,
                        xAxisIndex: 0
                    }
                ];
                this.chartLine = echarts.init(document.getElementById('chartLine'));
                this.chartLine.setOption({
                    title:{
                        text: '专利研发人员数量变化趋势',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    dataZoom:dataZoom,
                    xAxis: {
                        type: 'category',
                        data: ['1985','1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012',
                            '2013','2014','2015','2016']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        name:'研发人员数量',
                        data: [372,1224,1244,1247,1273,1008,1067,1150,1140,1172,1152,1011,1023,1049,1085,1051,824,732,460,785,1120,1124,1174,1126,1170,1231,1213,1282,1235,1282,1251,442,],
                        type: 'line'
                    }]
                });
            },




            drawCharts() {
                this.drawLineChart()

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
