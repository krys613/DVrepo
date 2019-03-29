<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="24">
                <div id="chartMap" style="height:600px;"></div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'
    import 'echarts/map/js/world.js';

    export default {
        data() {
            return {
                chartMap: null
            }
        },

        methods: {
            drawMapChart() {
                var datax = ['Shanghai', 'Denmark', 'Yunnan', 'Inner Mongolia', 'Liechten', 'Canada', 'Beijing', 'Yugoslav', 'Jilin', 'Sichuan', 'Tianjin', 'Austria', 'Ningxia', 'Anhui', 'Shandong', 'Shanxi', 'Guangdong', 'Guangxi', 'Germany', 'Italy', 'Norway', 'Singapore', 'Xinjiang', 'Japan', 'Belgium', 'Jiangsu', 'Jiangxi', 'Hebei', 'Henan', 'France', 'Zhejiang', 'Hubei', 'Hunan', 'Australia', 'Sweden', 'Gansu', 'Fujian', 'United States', 'United Kingdom', 'Netherlands', 'Lesotho', 'Guizhou', 'Liaoning', 'Chongqing', 'Shanxi', 'Qinghai', 'Hong Kong', 'Heilongjiang', 'Russia', 'Liberia', 'Hungary', 'Indonesia', 'Panama', 'Czech Rep.', 'Zimbabwe', 'Macau', 'Philippines', 'Taiwan', 'Hainan', 'Switzerland', 'Finland', 'Spain', 'Korea', 'Malaysia', 'Thailand', 'Portugal', 'Tibet', 'Bulgaria', 'Luxembourg', 'India', 'Turkey', 'Mexico', 'Venezuela', 'Barbados', 'Brazil', 'Greece', 'Monaco', 'Sri Lanka', 'New Zealand', 'Poland', 'Ireland', 'Bermudas', 'Peru', 'Jordan', 'British', 'Cuba', 'Cayman Islands', 'Argentina', 'Ukraine', 'Israel', 'Ecuador', 'Senegal', 'Cyprus', 'Swaziland', 'Dem. Rep. Korea', 'South Africa', 'Egypt', 'Bahamas', 'Pakistan', 'Estonia', 'Vanuatu', 'Slovenia', 'Chile', 'Virgin Islands', 'British Virgin Islands', 'Netherlands Antilles', 'Croatia', 'Colombia', 'Slovakia', 'Georgia', 'Saudi Arabia', 'Armenia', 'Belarus', 'Gibraltar', 'Romania', 'Malta', 'Uzbekistan', 'Uruguay', 'Iceland', 'Saint Vincent and the Grenadines', 'San Marino', 'Morocco', 'Kuwait', 'Lebanon', 'Kazakhstan', 'Bosnia and Herzegovina', 'Maldives', 'Madagascar' , 'Iran', 'Seychelles', 'Andorra', 'Saint Kitts and Nevis', 'Republic of Korea', 'Brunei Darussalam', 'Samoa', 'Belize', 'Cook Islands', 'Mauritius', 'Aruba', 'Kyrgyzstan', 'United Arab Emirates', 'Uganda', 'Cameroon', 'Dominican Republic', 'Bangladesh', 'Antigua and Bab', 'Nigeria', 'Latvia', 'Lithuania', 'Namibia', 'Vietnam', 'Oman', 'Anguilla', 'Fiji', 'Haiti', 'Côte d Ivoire', 'Tunisia ', 'Azerbaijan', 'Iraq', 'Guatemala', 'Paraguay', 'Burundi', 'Trinidad and Tobago', 'Bolivia', 'Mongolia', 'China', 'Yemen', ' Ghana', 'Syria', 'Moldova', 'Cambodia', 'Honduras', 'El Salvador', 'Benin', 'Afghanistan', 'Algeria', 'Mali', 'Serbia', 'Bahamas', 'Latvia', 'Jersey', 'Kenya', 'Chad', 'Nepal', 'Gernsey', 'Jamaica', 'Manx', 'Qatar', 'Costa Rica', 'Texas and Kay Kos Islands', 'Macedonia', 'Tanzania', 'Ethiopia', 'Angola', 'Guinea', 'Myanmar', 'Dem. Rep. Congo'];
                var datay = [627574, 10080, 78354, 40147, 1562, 13131, 769172, 26, 84527, 438319, 264344, 7911, 15910, 437929, 813037, 87530, 1659275, 126979, 150083, 21921, 3049, 5968, 48543, 526609, 7459, 2068335, 106744, 188433, 296716, 55419, 1501964, 281585, 247407, 10534, 24399, 48987, 309264, 380026, 29540, 42855, 1, 78765, 295745, 230899, 225702, 8287, 32298, 174361, 2034, 1, 647, 75, 236, 1046, 5, 715, 108, 262373, 14717, 41495, 14532, 5394, 128532, 1335, 505, 289, 1830, 89, 1999, 2623, 1001, 600, 44, 1072, 1680, 262, 130, 19, 1614, 587, 2025, 1035, 13, 32, 1781, 142, 4809, 127, 137, 6351, 17, 2, 288, 1, 115, 1185, 52, 116, 23, 63, 9, 281, 174, 2126, 138, 308, 105, 75, 104, 7, 857, 8, 38, 21, 39, 155, 5, 14, 193, 12, 15, 52, 14, 23, 33, 2, 4, 1, 31, 165, 12, 5, 75, 89, 230, 69, 19, 129, 2, 6, 239, 2, 1, 5, 12, 7, 12, 2, 25, 2, 57, 3, 7, 7, 8, 1, 16, 6, 9, 6, 2, 1, 2, 1, 54, 29284, 4, 14, 5, 5, 76, 1, 2, 4, 10, 6, 159, 11, 84, 34, 12, 6, 1, 3, 4, 5, 7, 14, 4, 1, 2, 2, 2, 1, 2, 4, 13];
                var data = [];
                for(var i = 0; i < datax.length; i++){
                    data.push({
                        name: datax[i],
                        value:datay[i]
                    });
                }

                var myChart = this.chartMap;
                myChart = echarts.init(document.getElementById('chartMap'));
                myChart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}<br/>{c} '
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            dataView: {readOnly: false},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    visualMap: {
                        min: 0,
                        max: 300000,
                        text:['High','Low'],
                        realtime: false,
                        calculable: true,
                    },
                    series: [
                        {
                            type: 'map',
                            map: 'world',
                            geoIndex: 0,
                            aspectScale: 0.75, //长宽比
                            showLegendSymbol: false, // 存在legend时显示
                            label: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                }
                            },
                            roam: true,
                            itemStyle: {
                                normal: {
                                    areaColor: '#c9cec7',
                                    borderColor: '#000000',
                                },
                                emphasis: {
                                    areaColor: '#eed815'
                                }
                            },
                            animation: false,
                            data: data
                        }
                    ]
                })

            },
            drawCharts() {
                this.drawMapChart()
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
