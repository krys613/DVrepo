
//31629	CN88103341.3	插入式湿度密度联合测量仪	G01N23/02	G01N23/02	核工业部北京核仪器厂	汲长松;夏清莲;代主得;张建国	1990.01.03	CN1038520	核工业部专利法律事务所	董同源	1988.06.09	北京8800信箱	null	北京;11	本发明公开了一种插入式湿度密度联合测量仪，用一个探头插入待测物料，可同时给出湿度、密度两个参数，具有结构简单、成本低、使用方便等优点，可用于路基的密实度测量、水坝的渗漏测量、土壤墒情测量及其他粉粒堆料的湿度密度测量。	1、一种插入式湿度密度联合测量仪，包括测量单元12、连接电缆11和测量探头仪18，测量探头18包括外壳2、射极跟随器10、光电倍增管9、探测元件8、放射源和铅屏蔽，本发明的特征在于探测元件8采用锂玻璃镶嵌式探测元件，放射源包括一个中子源6和一个γ源4，铅屏蔽包括用于屏蔽中子源6的铅屏蔽7和用于屏蔽γ源4的铅屏蔽5，测量单元12采用双单道脉冲幅度分析仪，铅屏蔽5为圆台形的，其大直径一端与中子源6相连，小直径一端与γ源4相连，γ源4放置在探头18的最前端，按γ源4、铅屏蔽5、中子源6、铅屏蔽7的顺序依次排列。	G01N23	G01N23/02	null	HBJ	null	国家	CN	8	null	booksFM19901990010388103341.3	1	1990	01	1990-01	1988	06	1988-06	G	01	N	23	02		1
export class Patent {
    constructor(patent_name,apply_number,apply_date,publicity_code,publicity_date,
                invent_man,apply_man,
                main_classify_code,classify_code,
                patent_agent,agent,address,priority,province_code,
                abstract,main_right){

        this.dataJson = {
            patent_name:patent_name,
            apply_number:apply_number,
            apply_date:apply_date,
            publicity_code:publicity_code,
            publicity_date:publicity_date,
            invent_man:invent_man,
            apply_man:apply_man,
            main_classify_code:main_classify_code,
            classify_code:classify_code,
            patent_agent:patent_agent,
            agent:agent,
            address:address,
            priority:priority,
            province_code:province_code,
            abstract:abstract,
            main_right:main_right,
        };
        this.visJson = {
        };
        this.oldVisJson = {
        };
    }

    getVisJson(json){
        this.visJson = json;
        this.oldVisJson = this.visJson;
    }

    compute(){
        this.updateCount();
        this.updateApplyTrend();
        this.updatePublicityTrend();
        this.updatePatentType();
        this.updateTechDis();
    }

    updateCount(){
        this.visJson.count = parseInt(this.visJson.count)+1;
    }

    updateApplyTrend(){
        let year = this.dataJson.apply_date.substr(0,4);
        this.visJson.apply_trend[parseInt(year)-1978]++;
    }

    updatePublicityTrend(){
        let year = this.dataJson.publicity_date.substr(0,4);
        this.visJson.publicity_trend[parseInt(year)-1978]++;
    }

    updatePatentType(){
        let appnum = this.dataJson.apply_number;
        let patentType;
        if (appnum.length === 16){
            patentType = appnum.substr(6,1);
        }else {
            patentType = appnum.substr(4,1);
        }
        if (patentType === '1'){
            this.visJson.patent_type[0]++;
        } else if(patentType === '2'){
            this.visJson.patent_type[1]++;
        } else if(patentType === '3'){
            this.visJson.patent_type[2]++;
        } else if(patentType === '8'){
            this.visJson.patent_type[3]++;
        } else {
            this.visJson.patent_type[4]++;
        }

    }

    updateTechDis(){
        let classify_node = this.dataJson.main_classify_code;
        let bigg = classify_node.substr(0,6);
        let smallg= classify_node.substr(0,9);
        // console.log(bigGroup);
        // console.log(smallGroup);
        let year = this.dataJson.apply_date.substr(0,4);

        let patentType;
        let appendBig = {

        };

        let appendSmall = {

        };

        let appnum = this.dataJson.apply_number;
        if (appnum.length === 16){
            patentType = appnum.substr(6,1);
        }else {
            patentType = appnum.substr(4,1);
        }
        if (patentType === '1' || patentType === '8'){
            appendBig[bigg] = [{"1":[year]}, {"2":[]}];
            appendSmall[smallg] = [{"1":[year]}, {"2":[]}];
        } else if(patentType === '2' || patentType === '9'){
            appendBig[bigg] = [{"1":[]}, {"2":[year]}];
            appendBig[smallg] = [{"1":[]}, {"2":[year]}];
        } else {

        }


        this.visJson.tech_distribute[0]['big'].push(appendBig);
        this.visJson.tech_distribute[0]['small'].push(appendSmall);

        console.log(this.visJson.tech_distribute);



        // console.log(tdis[0].big);


    }
}