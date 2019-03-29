'use strict';

var _pool = require('../mysql/pool');

var _pool2 = _interopRequireDefault(_pool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();
// var pool = require("../mysql/pool");


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/company/basic', function (req, res, next) {});

router.get('/company/list', function (req, res, next) {
    res.json(["test1", "test2", "test3", "test4"]);
});

//31629	CN88103341.3	插入式湿度密度联合测量仪	G01N23/02	G01N23/02	核工业部北京核仪器厂	汲长松;夏清莲;代主得;张建国	1990.01.03	CN1038520	核工业部专利法律事务所	董同源	1988.06.09	北京8800信箱	null	北京;11	本发明公开了一种插入式湿度密度联合测量仪，用一个探头插入待测物料，可同时给出湿度、密度两个参数，具有结构简单、成本低、使用方便等优点，可用于路基的密实度测量、水坝的渗漏测量、土壤墒情测量及其他粉粒堆料的湿度密度测量。	1、一种插入式湿度密度联合测量仪，包括测量单元12、连接电缆11和测量探头仪18，测量探头18包括外壳2、射极跟随器10、光电倍增管9、探测元件8、放射源和铅屏蔽，本发明的特征在于探测元件8采用锂玻璃镶嵌式探测元件，放射源包括一个中子源6和一个γ源4，铅屏蔽包括用于屏蔽中子源6的铅屏蔽7和用于屏蔽γ源4的铅屏蔽5，测量单元12采用双单道脉冲幅度分析仪，铅屏蔽5为圆台形的，其大直径一端与中子源6相连，小直径一端与γ源4相连，γ源4放置在探头18的最前端，按γ源4、铅屏蔽5、中子源6、铅屏蔽7的顺序依次排列。	G01N23	G01N23/02	null	HBJ	null	国家	CN	8	null	booksFM19901990010388103341.3	1	1990	01	1990-01	1988	06	1988-06	G	01	N	23	02		1
router.post('/company/add', function (req, res, next) {});

router.get('/company', function (req, res, next) {
    var incName = req.query.name;
    var sqlQuery = 'select * from inc where inc = \'' + incName + '\'';
    console.log(incName);

    _pool2.default.getConnection(function (err, con) {
        var json = {
            id: 0,
            inc: null,
            ques3: null,
            ques4: null,
            ques5: null,
            loc: null,
            count: null,
            radar: null,
            patents: null
        };
        con.query(sqlQuery, function (err, result) {
            if (err) {
                console.error(err);
            } else if (result.length === 0) {
                console.log("null");
            } else {
                var re = result[0];
                json.id = re.id;
                json.inc = re.inc;
                json.ques3 = JSON.parse(re.ques3);
                json.ques4 = JSON.parse(re.ques4);
                json.ques5 = JSON.parse(re.ques5);
                json.loc = re.loc;
                json.count = re.count;
                json.radar = JSON.parse(re.radar);
                json.patents = JSON.parse(re.patents);
            }
            _pool2.default.releaseConnection(con);

            res.json(json);
        });
    });
});

router.get('/part', function (req, res, next) {
    var incName = req.query.name;
    var sqlQuery = 'select ques4 from inc where inc = \'' + incName + '\'';

    _pool2.default.getConnection(function (err, con) {
        var json = {
            ques4: null
        };
        con.query(sqlQuery, function (err, result) {
            if (err) {
                console.error(err);
            } else if (result.length === 0) {
                console.log("null");
            } else {
                var re = result[0];
                json.ques4 = JSON.parse(re.ques4);
                console.log(json);
            }
            _pool2.default.releaseConnection(con);
            res.json(json);
        });
    });
});

module.exports = router;