var express = require('express');
var router = express.Router();
var pool = require("../mysql/pool");
import {Patent} from '../model/patent';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/company/basic', function (req,res, next) {

}) ;

router.get('/company/list',function (req,res,next) {
   res.json(["test1","test2","test3","test4"]);
});





// router.get('/company/add',function (req,res,next) {
//
//
//     let visJson ={
//         count:null,
//         apply_trend:null,
//         publicity_trend:null,
//         patent_type:null,
//         tech_distribute:null,
//         invent_count:null,
//         radar:null,
//         patents:null
//     };
//
//     let testPatent = new Patent("test","CN200320102732.3","2016-12-01","pub123","2016-12-02"
//     ,"zju","宁波市君纬电气有限公司","G01N23/02","B","zju","zju","zju","zju","zj","abstract","main_right");
//
//     let testSql = "select * from company_copy1 where company_name= \""+testPatent.dataJson.apply_man+"\"";
//
//
//     //118
//     pool.getConnection(function (err,con) {
//
//         con.query(testSql,function (err,result) {
//
//             visJson.count = result[0].count;
//             visJson.apply_trend = JSON.parse(result[0].apply_trend);
//             visJson.publicity_trend = JSON.parse(result[0].publicity_trend);
//             visJson.patent_type = JSON.parse(result[0].patent_type);
//             visJson.tech_distribute = JSON.parse(result[0].tech_distribute);
//             visJson.invent_count = JSON.parse(result[0].invent_count);
//             visJson.radar = JSON.parse(result[0].radar);
//             visJson.patents = JSON.parse(result[0].patents);
//             testPatent.getVisJson(visJson);
//             testPatent.compute();
//             pool.releaseConnection(con);
//             res.end();
//         })
//
//     });
//
// });

router.get('/patent',function (req,res,nex) {
    let patentID = req.query.id;
    let sqlQuery = 'select * from patent where id = '+patentID;

    pool.getConnection(function (err,con) {
        let json = {
            id:0,
            patent_name:null,
            apply_number:null,
            apply_date:null,
            publicity_code:null,
            publicity_date:null,
            invente_man:null,
            apply_man:null,
            main_classify_code:null,
            classify_code:null,
            patent_agent:null,
            agent:null,
            address:null,
            priority:null,
            province_code:null,
            abstract:null,
            main_right:null,
        };
        con.query(sqlQuery,function (err,result) {
            let re = result[0];
            json.id = re.id;
            json.patent_name = re.patent_name;
            json.apply_number = re.apply_number;
            json.apply_date = re.apply_date;
            json.publicity_code = re.publicity_code;
            json.publicity_date = re.publicity_date;
            json.invente_man = re.invente_man;
            json.apply_man = re.apply_man;
            json.main_classify_code = re.main_classify_code;
            json.classify_code = re.classify_code;
            json.patent_agent = re.patent_agent;
            json.agent = re.agent;
            json.address = re.address;
            json.priority = re.priority;
            json.province_code = re.province_code;
            json.abstract = re.abstract;
            json.main_right = re.main_right;
            pool.releaseConnection(con);
            res.json(json);
        })
    })
});

router.get('/company',function (req, res, next) {
    let companyName = req.query.name;
    let sqlQuery = 'select * from company where company_name = \''+companyName+'\'';

    pool.getConnection(function (err,con) {
        let json = {
            id:0,
            company_name:null,
            count:null,
            loc:null,
            apply_trend:null,
            publicity_trend:null,
            patent_type:null,
            tech_distribute:null,
            invent_count:null,
            radar:null,
            patents:null,
            word_frequency:null,
        };
        con.query(sqlQuery,function (err,result) {
            if(err){
                console.error(err);
            }else if(result.length === 0){
                console.log("null")
            }else {
                let re = result[0];
                json.id = re.id;
                json.company_name = re.company_name;
                json.count = re.count;
                json.loc = re.loc;
                json.apply_trend = JSON.parse(re.apply_trend);
                json.publicity_trend = JSON.parse(re.publicity_trend);
                json.patent_type = JSON.parse(re.patent_type);
                json.tech_distribute = JSON.parse(re.tech_distribute);
                json.invent_count = JSON.parse(re.invent_count);
                json.radar = JSON.parse(re.radar);
                json.patents = JSON.parse(re.patents);
                json.word_frequency = JSON.parse(re.word_frequency);
            }
            pool.releaseConnection(con);

            res.json(json);
        })
    });
});


router.get('/part',function (req, res, next) {
    let companyName = req.query.name;
    let sqlQuery = 'select tech_distribute from company where company_name = \''+companyName+'\'';

    pool.getConnection(function (err,con) {
        let json = {
            tech_distribute:null
        };
        con.query(sqlQuery,function (err,result) {
            if(err){
                console.error(err);
            }else if(result.length === 0){
                console.log("null")
            }else {
                var re = result[0];
                json.tech_distribute = JSON.parse(re.tech_distribute);
                console.log(json);
            }
            pool.releaseConnection(con);
            res.json(json);
        })
    });
});




module.exports = router;
