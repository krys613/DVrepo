<template>
    <section class="chart-container">
        <el-row>
            <!--工具条-->
            <el-col :span="24" class="toolbar" style="padding-top: 10px; padding-bottom: 0px;">
                <el-form :inline="true">
                    <el-form-item label="查找公司" class="postInfo-container-item">
                        <el-input v-model="companyName" style="width:200px" placeholder="请输入公司名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" v-on:click="drawCharts()">查询</el-button>
                    </el-form-item>
                    <el-form-item label="专利总数" class="postInfo-container-item">
                        <el-input name="count" v-model="count"  style="width:100px"></el-input>
                    </el-form-item>
                    <el-form-item label="公司地址" class="postInfo-container-item">
                        <el-input name="loc" v-model="loc" style="width:500px"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div id="chart1" style="height:500px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chart2" style="height:500px;"></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div id="chart4" style="height:500px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chart7" style="height:500px;"></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div id="chart5" style="height:500px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chart6" style="height:500px;"></div>
            </el-col>
        </el-row>
        <el-row>
            <el-form :inline="true">
                <el-form-item>
                    <el-select v-model="yearInput" placeholder="选择年份" style="width:300px;" @change="drawChartPart()">
                        <el-option v-for="item in yearsOption" :key="item.value"
                                   :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="groupInput" placeholder="小组" style="width:300px;" @change="drawChartPart()">
                        <el-option v-for="item in groupOption" :key="item.value"
                                   :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-col :span="24">
                <div id="chart3" style="height:3000px"></div>
            </el-col>
        </el-row>
        <!--专利列表-->
        <div>
            <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" @cell-click="getPatent" highlight-current-row
                      style="width: 100%; text-align: center;"
                        id="table">
            <el-table-column prop="patentName" label="专利" min-width="90" align="center" >
            </el-table-column>
        </el-table>
            <div style="text-align: center;margin-top: 30px;">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    @current-change="current_change">
            </el-pagination>
        </div>
        </div>
        <!--专利详情-->
        <el-dialog
            title="专利详情"
            :visible.sync="dialogVisible"
            width="80%"
        >
            <form id="patentText">
                    <table  style="width:750px;padding:3px"  class="table">
                        <tr>
                            <td>专利编号</td>
                            <td>
                                <input id="patentID" type="text" name="patentID" readonly class="form-control">
                            </td>
                            <td>专利名称</td>
                            <td>
                                <input type="text" name="patent_name" readonly class="form-control">
                            </td>
                        </tr>
                        <tr>
                            <td>申请编号</td>
                            <td>
                                <input type="text" name="apply_number" readonly class="form-control">
                            </td>
                            <td>申请日期</td>
                            <td>
                                <input type="text" name="apply_date" readonly class="form-control">
                            </td>
                        </tr>
                        <tr>
                            <td>公开编号</td>
                            <td>
                                <input type="text" name="publicity_code" readonly class="form-control">
                            </td>
                            <td>公开日期</td>
                            <td>
                                <input type="text" name="publicity_date" readonly class="form-control">
                            </td>
                        </tr>
                        <tr>
                            <td>发明人</td>
                            <td>
                                <input type="text" name="invente_man" readonly class="form-control">
                            </td>
                            <td>申请人</td>
                            <td>
                                <input type="text" name="apply_man" readonly class="form-control">
                            </td>
                        </tr>
                        <tr>
                            <td>主分类号</td>
                            <td>
                                <input type="text" name="main_classify_code" readonly class="form-control">
                            </td>
                            <td>分类号</td>
                            <td>
                                <input type="text" name="classify_code" readonly class="form-control">
                            </td>
                        </tr>
                        <tr>
                            <td>代理事务所</td>
                            <td>
                                <input type="text" name="patent_agent" readonly class="form-control">
                            </td>
                            <td>代理人</td>
                            <td>
                                <input type="text" name="agent" readonly class="form-control">
                            </td>
                        </tr>
                        <tr>
                            <td>地址</td>
                            <td>
                                <input type="text" name="address" readonly class="form-control">
                            </td>
                            <td>优先级</td>
                            <td>
                                <input type="text" name="priority" readonly class="form-control">
                            </td>
                        </tr>
                        <tr>
                            <td>省份代号</td>
                            <td>
                                <input type="text" name="province_code" readonly class="form-control">
                            </td>
                        </tr>
                        <tr>
                            <td>摘要</td>
                            <td>
                                <input type="text" name="abstract" readonly class="form-control" >
                            </td>
                        </tr>
                        <tr>
                            <td>主要权利</td>
                            <td>
                                <input type="text" name="main_right" readonly class="form-control">
                            </td>
                        </tr>
                    </table>
                </form>
        </el-dialog>


    </section>
</template>

<script>
    import echarts from 'echarts'
    import $ from 'jquery'
    require('echarts-wordcloud');

    export default {
        data() {
            return {
                chart1:null,
                chart2:null,
                chart3:null,
                chart4:null,
                chart5:null,
                chart6:null,
                companyName:'',
                count:'',
                loc:'',
                tableData:[],
                total:0,
                pagesize:10,
                currentPage:1,
                yearInput:0,
                yearsOption:[],
                groupInput:'',
                groupOption:[],
                dialogVisible:false
            }
        },
        methods: {
            drawCharts() {
                var name = this.companyName;
                var url = 'http://localhost:3000/company?name='+name.toString();
                var self = this;
                $.ajax({
                    type: 'get',
                    url: url,
                    success: function (data) {
                        //工具条 专利总数 公司地址
                        $('.chart-container .toolbar').find('input[name="count"]').val(data.count);
                        $('.chart-container .toolbar').find('input[name="loc"]').val(data.loc);

                        //图1 专利类别统计
                        var chart1 = echarts.init(document.getElementById('chart1'));
                        function processChart1(){
                            var valueSource = data.patent_type;
                            var nameList = ['发明专利申请','实用新型专利申请','外观设计专利申请','进入中国国家阶段的PCT发明专利申请', '进入中国国家阶段的PCT实用新型专利申请'];
                            var dataValue = [];
                            for(var i = 0 ;i < 5; i++){
                                dataValue.push({
                                    value:valueSource[i],
                                    name:nameList[i]
                                })
                            }
                            return dataValue;
                        }
                        function drawChart1(){
                            chart1.setOption({
                                title : {
                                    text: '专利类别统计',
                                    x:'center'
                                },
                                tooltip : {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                                },
                                legend: {
                                    top: '13%',
                                    data: ['发明专利申请','实用新型专利申请','外观设计专利申请','进入中国国家阶段的PCT发明专利申请','进入中国国家阶段的PCT实用新型专利申请']
                                },
                                series : [
                                    {
                                        name: '专利类别',
                                        type: 'pie',
                                        radius : '55%',
                                        center: ['50%', '60%'],
                                        data:dataValue1,
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
                        }
                        var dataValue1 = processChart1();
                        drawChart1();

                        //图2 公司技术雷达图
                        var chart2 = echarts.init(document.getElementById('chart2'));
                        var dataValue2 = data.radar;
                        function processChart2(){
                            var indicator = [];
                            var list = data.radar;
                            var max = 0;
                            for(var i = 0 ;i < list.length;i++){
                                if(list[i]>max){
                                    max = list[i]
                                }
                            }
                            var name = ['A（人类生活必需','B（作业；运输）','C（化学；冶金）','D（纺织；造纸）','E（固定建筑物）','F（机械工程；照明；加热；武器；爆破）','G（物理）','H（电学）'];
                            for(var i = 0;i < 8; i++ ){
                                indicator.push({
                                    name:name[i],
                                    max:max
                                })
                            }
                            return indicator;
                        }
                        function drawChart2(){
                            chart2.setOption({
                                title : {
                                    text: '公司技术雷达图',
                                    x:'center'
                                },
                                tooltip: {
                                    trigger: 'axis'
                                },
                                radar: {
                                    name: {
                                        textStyle: {
                                            color: '#fff',
                                            backgroundColor: '#999',
                                            borderRadius: 3,
                                            padding: [3, 5]
                                        }
                                    },
                                    indicator: processChart2()
                                },
                                series: [{
                                    name: '公司技术雷达图',
                                    type: 'radar',
                                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                    data : [
                                        {
                                            value : dataValue2,
                                            name : '公司技术雷达图',
                                            tooltip: {
                                                trigger: 'item'
                                            }
                                        }
                                    ]
                                }]
                            });
                        }
                        drawChart2();


                        //图3 技术分布统计+todo图3容器大小自适应
                        function processChart3(){
                            var valueSource = data.tech_distribute;
                            var dataSmall = valueSource[1].small;
                            var dataysmall = [];
                            var datasmall1 = [];
                            var datasmall2 = [];
                            for(var i = 0 ; i < dataSmall.length; i++ ){
                                var name = Object.keys(dataSmall[i]);
                                var value = Object.values(dataSmall[i]);//value = [{"1" : [2013,2013]},{"2" : []}]
                                var obj1 = value[0][0];//obj1 = {"1" : [2013,2013]}
                                var obj2= value[0][1];//obj2 = {"2" : []}
                                var list1 = Object.values(obj1);
                                var list2 = Object.values(obj2);
                                var count1 = list1[0].length;
                                var count2 = list2[0].length;
                                dataysmall = dataysmall.concat(name);
                                datasmall1 = datasmall1.concat(count1);
                                datasmall2 = datasmall2.concat(count2);
                            }
                            var data3 = [dataysmall,datasmall1,datasmall2];
                            return data3;
                        }
                        var data3 = processChart3();
                        var chart3 = echarts.init(document.getElementById('chart3'));
                        function drawChart3(){
                            chart3.setOption({
                                title : {
                                    text: '技术分布统计图',
                                    x:'center'
                                },
                                tooltip : {
                                    trigger: 'axis',
                                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                    }
                                },
                                legend: {
                                    y:'30px',
                                    data: ['发明专利', '实用新型']
                                },
                                xAxis:  {
                                    type: 'value'
                                },
                                yAxis: {
                                    type: 'category',
                                    data: data3[0],
                                },
                                series: [
                                    {
                                        name: '发明专利',
                                        type: 'bar',
                                        stack: '总量',
                                        data: data3[1]
                                    },
                                    {
                                        name: '实用新型',
                                        type: 'bar',
                                        stack: '总量',
                                        data: data3[2]
                                    }
                                ]
                            });
                        }
                        drawChart3();


                        //图4 研发人员数量
                        var chart4 = echarts.init(document.getElementById('chart4'));
                        var dataValue4 = data.invent_count;
                        function drawChart4(){
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
                            chart4.setOption({
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
                                    data: dataValue4,
                                    type: 'line'
                                }]
                            });
                        }
                        drawChart4();

                        //图5 专利申请趋势
                        var chart5 = echarts.init(document.getElementById('chart5'));
                        var dataValue5 = data.apply_trend;
                        function drawChart5(){
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
                            chart5.setOption({
                                title:{
                                    text: '专利申请年趋势',
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
                                    data: ['1978','1979','1980','1981','1982','1983','1984','1985','1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012',
                                        '2013','2014','2015','2016']
                                },
                                yAxis: {
                                    type: 'value'
                                },
                                series: [{
                                    name:'专利年申请量',
                                    data: dataValue5,
                                    type: 'line'
                                }]
                            });
                        }
                        drawChart5();

                        //图6 专利公开趋势
                        var chart6 = echarts.init(document.getElementById('chart6'));
                        var dataValue6 = data.publicity_trend;
                        function drawChart6(){
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
                            chart6.setOption({
                                title:{
                                    text: '专利公开年趋势',
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
                                    data: ['1978','1979','1980','1981','1982','1983','1984','1985','1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012',
                                        '2013','2014','2015','2016']
                                },
                                yAxis: {
                                    type: 'value'
                                },
                                series: [{
                                    name:'专利年公开量',
                                    data: dataValue6,
                                    type: 'line'
                                }]
                            });
                        }
                        drawChart6();

                        //图7 词云图
                        var chart7 = echarts.init(document.getElementById('chart7'));
                        var dataValue7 = data.word_frequency;
                        function drawChart7(){
                            chart7.setOption({
                                title:{
                                    text: '关键词频率统计词云图',
                                    x:'center'
                                },
                                series:[{
                                    type:'wordCloud',
                                    shape:'circle',
                                    left: 'center',
                                    top: 'center',
                                    right: null,
                                    bottom: null,
                                    sizeRange: [12, 60],
                                    rotationRange: [-90, 90],
                                    rotationStep: 45,
                                    textStyle: {
                                        normal: {
                                            fontFamily: 'sans-serif',
                                            fontWeight: 'bold',
                                            // Color can be a callback function or a color string
                                            color: function () {
                                                // Random color
                                                return 'rgb(' + [
                                                    Math.round(Math.random() * 160),
                                                    Math.round(Math.random() * 160),
                                                    Math.round(Math.random() * 160)
                                                ].join(',') + ')';
                                            }
                                        },
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowColor: '#333'
                                        }
                                    },
                                    data:dataValue7
                                }]
                            })

                        }
                        drawChart7();

                        //表格
                        var dataValueT = [];
                        for (var i = 0; i < data.patents.length; i++) {
                            dataValueT.push({
                                patentName: Object.keys(data.patents[i]),
                                patentID: Object.values(data.patents[i])
                            })
                        }
                        self.tableData = dataValueT;
                        self.total = dataValueT.length;
                    },
                    error: function (data) {
                        console.log('fail');
                    }
                })
            },
            drawChartPart(){
                //图3 技术分布统计
                var name = this.companyName;
                var yearSelected = this.yearInput;
                var groupSelected = this.groupInput;
                var url = 'http://localhost:3000/part?name='+name.toString()
                $.get(url,function(data){
                    function count(list,year){
                        var count = 0;
                        for(var i = 0;i < list.length;i++) {
                            if (list[i] == year) {
                                count = count + 1;
                            }
                        }
                        return count;
                    }
                    function processChart3(){
                        var data3Y;
                        var data3A;
                        var data3B;
                        var choose = groupSelected;
                        var year = yearSelected;
                        var valueSource = data.tech_distribute;
                        var dataBig = valueSource[0].big;
                        var dataybig = [];
                        var databig1 = [];
                        var databig2 = [];
                        for(var i = 0 ; i < dataBig.length; i++ ){
                            var name = Object.keys(dataBig[i]);
                            var value = Object.values(dataBig[i]);
                            var obj1 = value[0][0];
                            var obj2 = value[0][1];
                            var list1 = Object.values(obj1);
                            var list2 = Object.values(obj2);
                            var count1 = count(list1[0],year);
                            var count2 = count(list2[0],year);
                            if((count1+count2)!=0) {
                                dataybig = dataybig.concat(name);
                                databig1 = databig1.concat(count1);
                                databig2 = databig2.concat(count2);
                            }
                        }
                        var dataSmall = valueSource[1].small;
                        var dataysmall = [];
                        var datasmall1 = [];
                        var datasmall2 = [];
                        for(var i = 0 ; i < dataSmall.length; i++ ){
                            var name = Object.keys(dataSmall[i]);
                            var value = Object.values(dataSmall[i]);
                            var obj1 = value[0][0];
                            var obj2= value[0][1];
                            var list1 = Object.values(obj1);
                            var list2 = Object.values(obj2);
                            var count1 = count(list1[0],year);
                            var count2 = count(list2[0],year);
                            if((count1+count2)!=0){
                                dataysmall = dataysmall.concat(name);
                                datasmall1 = datasmall1.concat(count1);
                                datasmall2 = datasmall2.concat(count2);
                            }
                        }
                        if(choose == 'big'){
                            data3Y = dataybig;
                            data3A = databig1;
                            data3B = databig2;
                        } else{
                            data3Y = dataysmall;
                            data3A = datasmall1;
                            data3B = datasmall2;
                        }
                        var data3 = [data3Y,data3A,data3B];
                        return data3;
                    }
                    var data3 = processChart3();
                    var chart3 = echarts.init(document.getElementById('chart3'));
                    function drawChart3(){
                        chart3.setOption({
                            title : {
                                text: '技术分布统计图',
                                x:'center',
                            },
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            legend: {
                                y:'30px',
                                data: ['发明专利', '实用新型']
                            },
                            xAxis:  {
                                type: 'value'
                            },
                            yAxis: {
                                type: 'category',
                                data: data3[0],
                            },
                            series: [
                                {
                                    name: '发明专利',
                                    type: 'bar',
                                    stack: '总量',
                                    data: data3[1]
                                },
                                {
                                    name: '实用新型',
                                    type: 'bar',
                                    stack: '总量',
                                    data: data3[2]
                                }
                            ]
                        });
                    }
                    drawChart3();
                });
            },
            getYearsOption(){
                var years = [];
                for(var i = 1985; i < 2017;i++){
                    years.push({
                        label:i,
                        value:i
                    })
                }
                this.yearsOption = years;
            },
            getGourpOption(){
                var group = [
                    {
                        label:"大组",
                        value:"big"
                    },
                    {
                        label:"小组",
                        value:"small"
                    }
                ];
                this.groupOption = group;
            },
            getPatent(cell){
                var patentID = cell.patentID[0];
                var url = 'http://localhost:3000/patent?id='+patentID.toString();
                this.dialogVisible = true;
                $.ajax({
                    type: 'get',
                    url: url,
                    success: function (data) {
                        console.log(data.id);
                        $('.chart-container').find('input[name="patentID"]').val(data.id);
                        $('.chart-container').find('input[name="patent_name"]').val(data.patent_name);
                        $('.chart-container').find('input[name="apply_number"]').val(data.apply_number);
                        $('.chart-container').find('input[name="apply_date"]').val(data.apply_date);
                        $('.chart-container').find('input[name="publicity_code"]').val(data.publicity_code);
                        $('.chart-container').find('input[name="publicity_date"]').val(data.publicity_date);
                        $('.chart-container').find('input[name="invente_man"]').val(data.invente_man);
                        $('.chart-container').find('input[name="apply_man"]').val(data.apply_man);
                        $('.chart-container').find('input[name="main_classify_code"]').val(data.main_classify_code);
                        $('.chart-container').find('input[name="classify_code"]').val(data.classify_code);
                        $('.chart-container').find('input[name="patent_agent"]').val(data.patent_agent);
                        $('.chart-container').find('input[name="agent"]').val(data.agent);
                        $('.chart-container').find('input[name="address"]').val(data.address);
                        $('.chart-container').find('input[name="priority"]').val(data.priority);
                        $('.chart-container').find('input[name="province_code"]').val(data.province_code);
                        $('.chart-container').find('input[name="abstract"]').val(data.abstract);
                        $('.chart-container').find('input[name="main_right"]').val(data.main_right);



                    }
                })
            },
            current_change:function(currentPage){
                this.currentPage = currentPage;
            }

        },
        mounted: function () {
            this.getYearsOption();
            this.getGourpOption();
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
