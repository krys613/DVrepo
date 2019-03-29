<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="24">
                <div id="chartConnect" style="height:1000px;"></div>
            </el-col>
            <el-col :span="24">
                <div id="chartSankey" style="height:500px;"></div>
            </el-col>


        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'
    import $ from 'jquery'
    import * as dataTool from '../../api/dataTool'

    export default {
        data() {
            return {
                chartConnect:null,
                chartSankey:null,
            }
        },

        methods: {
            drawConnectChart(){
                var chartConnect = echarts.init(document.getElementById('chartConnect'));

                chartConnect.showLoading();

                $.get('../../static/les-miserables.gexf', function (xml){

                    chartConnect.hideLoading();

                    //chartConnect.hideLoading();
                    var graph = dataTool.gexf.parse(xml);
                    var categories = [{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'},{name:'G'},{name:'H'}];
                   // for (var i = 0; i < 8; i++) {
                    // categories[i] = {
                    //  name: '类目' + i
                   //    };
                 //  }

                    graph.nodes.forEach(function (node) {
                        node.itemStyle = null;
                        node.value = node.symbolSize;
                        node.symbolSize /= 1.5;
                        node.label = {
                            normal: {
                                show: node.symbolSize > 10
                            }
                        };
                        node.category = node.attributes.modularity_class;
                    });
                    var option = {

                        tooltip: {},
                        legend: [{
                            // selectedMode: 'single',
                            data: categories.map(function (a) {
                                return a.name;
                            })
                        }],
                        animationDurationUpdate: 1500,
                        animationEasingUpdate: 'quinticInOut',
                        series : [
                            {
                                name: 'Les Miserables',
                                type: 'graph',
                                layout: 'circular',
                                circular: {
                                    rotateLabel: true
                                },
                                data: graph.nodes,
                                links: graph.links,
                                categories: categories,
                                roam: true,
                                label: {
                                    normal: {
                                        position: 'right',
                                        formatter: '{b}'
                                    }
                                },
                                lineStyle: {
                                    normal: {
                                        color: 'source',
                                        curveness: 0.3
                                    }
                                }
                            }
                        ]
                    };

                    chartConnect.setOption(option, true);


                },'xml');
            },
            drawSankeyChart(){
               this.chartSankey=echarts.init(document.getElementById('chartSankey'));
               this.chartSankey.setOption({
                   color: [
                       '#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7','#23c5de', '#3393c3', '#1111ac', '#091161',
                   ],
                   tooltip: {
                       trigger: 'item',
                       triggerOn: 'mousemove'
                   },
                   series: [{
                       type: 'sankey',
                       layout:'none',
                       focusNodeAdjacency: 'allEdges',
                       data: [{name: 'A' }, {
                           name: 'B'
                       }, {
                           name: 'C'
                       }, {
                           name: 'D'
                       }, {
                           name: 'E'
                       }, {
                           name: 'F'
                       }, {
                           name: 'G'
                       }, {
                           name: 'H'
                       },
                           {
                               name: 'a'
                           }, {
                               name: 'b'
                           }, {
                               name: 'c'
                           }, {
                               name: 'd'
                           }, {
                               name: 'e'
                           }, {
                               name: 'f'
                           }, {
                               name: 'g'
                           }, {
                               name: 'h'
                           },

                       ],
                       links: [{
                           source: 'A',
                           target: 'b',
                           value: 399
                       }, {
                           source: 'A',
                           target: 'c',
                           value: 1132
                       },{
                           source: 'A',
                           target: 'd',
                           value: 37
                       },
                           {
                               source: 'A',
                               target: 'e',
                               value: 31
                           }, {
                               source: 'A',
                               target: 'f',
                               value: 170
                           }, {
                               source: 'A',
                               target: 'g',
                               value: 143
                           }, {
                               source: 'A',
                               target: 'h',
                               value: 83
                           },{
                               source: 'B',
                               target: 'a',
                               value: 399
                           }, {
                               source: 'B',
                               target: 'c',
                               value:501
                           }, {
                               source: 'B',
                               target: 'd',
                               value: 68
                           }, {
                               source: 'B',
                               target: 'e',
                               value: 100
                           }, {
                               source: 'B',
                               target: 'f',
                               value: 252
                           }, {
                               source: 'B',
                               target: 'g',
                               value: 163
                           },

                           {
                               source: 'B',
                               target: 'h',
                               value: 166
                           },

                           {
                               source: 'C',
                               target: 'a',
                               value: 1132
                           },
                           {
                               source: 'C',
                               target: 'b',
                               value: 501
                           }, {
                               source: 'C',
                               target: 'd',
                               value: 63
                           }, {
                               source: 'C',
                               target: 'e',
                               value: 43
                           }, {
                               source: 'C',
                               target: 'f',
                               value: 100
                           }, {
                               source: 'C',
                               target: 'g',
                               value: 97
                           }, {
                               source: 'C',
                               target: 'h',
                               value: 156
                           },
                           {
                               source: 'D',
                               target: 'a',
                               value: 37
                           },
                           {
                               source: 'D',
                               target: 'b',
                               value: 68
                           },{
                               source: 'D',
                               target: 'c',
                               value: 63
                           },{
                               source: 'D',
                               target: 'e',
                               value: 4
                           },{
                               source: 'D',
                               target: 'f',
                               value: 10
                           },{
                               source: 'D',
                               target: 'g',
                               value: 7
                           },{
                               source: 'D',
                               target: 'h',
                               value: 8
                           },

                           {
                               source: 'E',
                               target: 'a',
                               value:31
                           },  {
                               source: 'E',
                               target: 'b',
                               value:100
                           },
                           {
                               source: 'E',
                               target: 'c',
                               value:43
                           },
                           {
                               source: 'E',
                               target: 'd',
                               value:4
                           },
                           {
                               source: 'E',
                               target: 'f',
                               value:55
                           },
                           {
                               source: 'E',
                               target: 'g',
                               value:24
                           },
                           {
                               source: 'E',
                               target: 'h',
                               value:13
                           },


                           {
                               source: 'F',
                               target: 'a',
                               value:170
                           },  {
                               source: 'F',
                               target: 'b',
                               value:252
                           },
                           {
                               source: 'F',
                               target: 'c',
                               value:100
                           },
                           {
                               source: 'F',
                               target: 'd',
                               value:10
                           },
                           {
                               source: 'F',
                               target: 'e',
                               value:252
                           },
                           {
                               source: 'F',
                               target: 'g',
                               value:86
                           },
                           {
                               source: 'F',
                               target: 'h',
                               value:104
                           },


                           {
                               source: 'G',
                               target: '143',
                               value: 163
                           },
                           {
                               source: 'G',
                               target: 'b',
                               value: 163
                           }, {
                               source: 'G',
                               target: 'c',
                               value: 97
                           }, {
                               source: 'G',
                               target: 'd',
                               value: 7
                           }, {
                               source: 'G',
                               target: 'e',
                               value: 24
                           }, {
                               source: 'G',
                               target: 'f',
                               value: 104
                           }, {
                               source: 'G',
                               target: 'h',
                               value: 300
                           },

                           {
                               source: 'H',
                               target: 'a',
                               value: 83
                           },{
                               source: 'H',
                               target: 'b',
                               value: 166
                           },
                           {
                               source: 'H',
                               target: 'c',
                               value: 156
                           },
                           {
                               source: 'H',
                               target: 'd',
                               value: 8
                           },
                           {
                               source: 'H',
                               target: 'e',
                               value: 13
                           },
                           {
                               source: 'H',
                               target: 'f',
                               value: 104
                           },
                           {
                               source: 'H',
                               target: 'g',
                               value: 300
                           },],


                       lineStyle: {
                           normal: {
                               color: 'source',
                               curveness: 0.8
                           }
                       }
                   }
                   ]
               });
            },

            drawCharts() {
                this.drawConnectChart()
                this.drawSankeyChart()

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
