import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table1 from './views/nav1/Table1.vue'
import Table2 from './views/nav1/Table2.vue'
import public1 from './views/nav2/public1.vue'
import public2 from './views/nav2/public2.vue'
import map1 from './views/nav3/map1.vue'
import map2 from './views/nav3/map2.vue'
import map3 from './views/nav3/map3.vue'
import map4 from './views/nav3/map4.vue'
import pie from './views/nav4/pie.vue'
import line from './views/nav5/line.vue'
import relation from './views/nav6/relation.vue'
import company from './views/nav7/company.vue'
let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '专利申请趋势',
        iconCls: 'fa fa-line-chart',//图标样式class
        children: [
            {path: '/Table1', component: Table1, name: '专利申请总体趋势图'},
            {path: '/Table2', component: Table2, name: '分类别专利申请趋势图'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '专利公开趋势',
        iconCls: 'fa fa-line-chart',
        children: [
            { path: '/public1', component: public1, name: '专利公开总体趋势图' },
            { path: '/public2', component: public2, name: '分类别专利公开趋势图' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '专利来源分布',
        iconCls: 'fa fa-area-chart',
        children: [
            { path: '/map1', component: map1, name: '专利来源分布国内总览' },
            { path: '/map2', component: map2, name: '专利来源分布世界总览' }
            // { path: '/map3', component: map3, name: '历年专利来源国内分布' },
            // { path: '/map4', component: map4, name: '历年专利来源世界分布' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '专利类型统计',
        iconCls: 'fa fa-pie-chart',
        children: [
            { path: '/pie', component: pie, name: '专利类型统计' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '研发人员统计',
        iconCls: 'fa fa-line-chart',
        children: [
            { path: '/line', component:line, name: '研发人员数量变化趋势' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '专利关联分析',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/relation', component:relation, name: '专利类型关联分析' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '公司专利分析',
        iconCls: 'fa fa-hand-o-right',
        children: [
            { path: '/company', component:company, name: '公司专利分析' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
