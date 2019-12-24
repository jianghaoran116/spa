const express = require('express');

const Router = express.Router();

Router.get('/reportAnalysis/queryVoucherInfo', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://www.curlyhair.cn');
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8383');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  res.json({
    success: true,
    message: '数据查询成功.',
    data: {
      total: {
        billcode: '记-116',
        period: '2019-10',
        fileurl: [{
          urlName: '百度',
          url: 'https://www.baidu.com/',
        }],
      },
      details: [
        {
          accsubject: '应付单据',
          description: '发票生成凭证2019-10-18',
          debit_org: 0.00, // 借方金额
          credit_org: 2330.00, // 贷方金额
        },
        {
          accsubject: '应收单据',
          description: '发票生成凭证2019-10-19',
          debit_org: 1220.30, // 借方金额
          credit_org: 0.00, // 贷方金额
        },
        {
          accsubject: '应收单据',
          description: '发票生成凭证2019-10-20',
          debit_org: 0.00, // 借方金额
          credit_org: 0.00, // 贷方金额
        },
      ],
    },
    code: 1,
    total: 0,
  });
});

Router.get('/reportAnalysis/queryBillInfo', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://www.curlyhair.cn');
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8383');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  res.json({
    success: true,
    message: '数据查询成功.',
    data: {
      total: [
        {
          name: '编号',
          value: 'NO1234556',
        },
        {
          name: '客户',
          value: '格力电器',
        },
        {
          name: '日期',
          value: '2019-12-12',
        },
        {
          name: '金额',
          value: '2000000000',
        },
        {
          name: '币种',
          value: '人民币',
        },
      ],
      details: [
        {
          material: '显示器301',
          oriTaxUnitPrice: '22', // 单价
          priceQty: '22', // 数量
          oriSum: '20000', // 金额
        },
        {
          material: '显示器302',
          oriTaxUnitPrice: '22', // 单价
          priceQty: '22', // 数量
          oriSum: '11567', // 金额
        },
        {
          material: '显示器303',
          oriTaxUnitPrice: '22', // 单价
          priceQty: '22', // 数量
          oriSum: '78909', // 金额
        },
        {
          material: '显示器304',
          oriTaxUnitPrice: '22', // 单价
          priceQty: '22', // 数量
          oriSum: '83456', // 金额
        },
      ],
      creater: '张三', // 创建人
      createTime: '2019-10-10 10:10:10', // 创建时间
      auditor: '李四', // 审核人
      auditTime: '2019-10-10 10:10:10', // 审核时间
    },
    code: 1,
    total: 0,
  });
});

module.exports = Router;
