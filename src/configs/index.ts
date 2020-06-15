export const honors = [
  '学业优秀奖',
  '学习进步奖',
  '社会工作优秀奖',
  '科技创新优秀奖',
  '社会实践优秀奖',
  '志愿公益优秀奖',
  '体育优秀奖',
  '文艺优秀奖',
  '综合优秀奖',
  '无校级荣誉',
  '好读书奖'
] as const;

export const scholarships = {
  '清华之友——华为奖学金': [
    {
      code: 'J2022050',
      amount: 5000,
      type: '校管校分',
      salutation: '尊敬的华为技术有限公司有关人士'
    }
  ],
  '清华之友——张明为奖学金': [
    {
      code: 'J2072040',
      amount: 4000,
      type: '校管校分',
      salutation: '尊敬的张爷爷家属'
    }
  ],
  '中国宋庆龄基金会·中芯国际孟宁奖助学金': [
    {
      code: 'J2102100',
      amount: 10000,
      type: '校管校分',
      salutation: '尊敬的捐赠人'
    }
  ],
  '清华之友——董氏东方奖学金': [
    {
      code: 'J2162050',
      amount: 5000,
      type: '校管校分',
      salutation: '尊敬的香港董氏慈善基金会及东方海外货柜航运有限公司有关人士'
    }
  ],
  '清华之友——周惠琪奖学金': [
    {
      code: 'J2202050',
      amount: 5000,
      type: '校管校分',
      salutation: '尊敬的周惠琪基金会有关人士'
    }
  ],
  '清华之友——POSCO奖学金': [
    {
      code: 'J2282070',
      amount: 7000,
      type: '校管校分',
      salutation: '尊敬的POSCO青岩财团有关人士'
    }
  ],
  '清华之友——黄乾亨奖学金': [
    {
      code: 'J2362020',
      amount: 2000,
      type: '校管校分',
      salutation: '尊敬的黄乾亨基金会有关人士'
    }
  ],
  '清华之友——苏州工业园区奖学金': [
    {
      code: 'J2462080',
      amount: 8000,
      type: '校管校分',
      salutation: '尊敬的苏州工业园区有关人士'
    }
  ],
  '清华之友——恒大奖学金': [
    {
      code: 'J2532050',
      amount: 5000,
      type: '校管校分',
      salutation: '尊敬的恒大集团相关人士'
    }
  ],
  工商银行奖学金: [
    {
      code: 'J2542100',
      amount: 10000,
      type: '校管校分',
      salutation: '尊敬的工商银行有关领导'
    }
  ],
  '清华之友——深交所奖学金': [
    {
      code: 'J2562050',
      amount: 5000,
      type: '校管校分',
      salutation: '尊敬的深交所有关领导'
    }
  ],
  国家奖学金: [{ code: 'J2602080', amount: 8000, type: '校管校分' }],
  '清华之友——丰田奖学金': [
    {
      code: 'J2612030',
      amount: 3000,
      type: '校管校分',
      salutation: '尊敬的丰田汽车公司有关领导'
    },
    {
      code: 'J2612050',
      amount: 5000,
      type: '校管校分',
      salutation: '尊敬的丰田汽车公司有关领导'
    }
  ],
  '清华之友——SK奖学金': [
    {
      code: 'J2622060',
      amount: 6000,
      type: '校管校分',
      salutation: '尊敬的SK集团有关人士'
    }
  ],
  '清华之友——三星奖学金': [
    {
      code: 'J2652050',
      amount: 5000,
      type: '校管校分',
      salutation: '尊敬的三星(中国)投资有限公司有关人士'
    }
  ],
  '清华之友——郑格如奖学金': [
    {
      code: 'J2722020',
      amount: 2000,
      type: '校管校分',
      salutation: '尊敬的郑格如基金会有关人士'
    }
  ],
  '清华之友——广药集团奖学金': [
    {
      code: 'J2782030',
      amount: 3000,
      type: '校管校分',
      salutation: '尊敬的广州王老吉大健康产业有限公司领导'
    },
    {
      code: 'J2782050',
      amount: 5000,
      type: '校管校分',
      salutation: '尊敬的广州王老吉大健康产业有限公司领导'
    }
  ],
  '清华之友——黄奕聪伉俪奖助学金': [
    {
      code: 'J2802040',
      amount: 4000,
      type: '校管校分',
      salutation: '尊敬的黄荣年先生及夫人'
    }
  ],
  国家励志奖学金: [{ code: 'J2892050', amount: 5000, type: '校管校分' }],
  '清华之友——渠玉芝奖学金': [
    {
      code: 'J2902020',
      amount: 2000,
      type: '校管校分',
      salutation: '尊敬的渠玉芝教授'
    }
  ],
  蒋南翔奖学金: [
    {
      code: 'J3012150',
      amount: 15000,
      type: '校管校分',
      salutation: '尊敬的蒋南翔奖学金捐赠学长们'
    }
  ],
  '一二·九奖学金': [{ code: 'J3022150', amount: 15000, type: '校管校分' }],
  好读书奖学金: [
    { code: 'J3032030', amount: 3000, type: '校管校分' },
    { code: 'J3032080', amount: 8000, type: '校管校分' }
  ],
  '清华校友——孟昭英奖学金': [
    { code: 'J3122030', amount: 3000, type: '校管校分' }
  ],
  电子系97级校友奖学金: [{ code: 'J7237030', amount: 1800, type: '院管院分' }],
  电子系1998级校友奖学基金: [
    { code: 'J7232020', amount: 1800, type: '院管院分' }
  ],
  常锋奖学金: [{ code: 'J7234020', amount: 2000, type: '院管院分' }],
  校设奖学金: [
    { code: 'J1022000', amount: 0, type: '校管院分' },
    { code: 'J1022010', amount: 1000, type: '校管院分' },
    { code: 'J1022020', amount: 2000, type: '校管院分' },
    { code: 'J1022030', amount: 3000, type: '校管院分' },
    { code: 'J1022040', amount: 4000, type: '校管院分' },
    { code: 'J1022050', amount: 5000, type: '校管院分' }
  ],
  '2018级新生一等奖学金': [
    { code: 'J1142125', amount: 12500, type: '校管校分' }
  ],
  '2018级新生二等奖学金': [
    { code: 'J1142050', amount: 5000, type: '校管校分' }
  ],
  '2017级新生一等奖学金': [
    { code: 'J1152125', amount: 12500, type: '校管校分' }
  ],
  '2017级新生二等奖学金': [
    { code: 'J1152050', amount: 5000, type: '校管校分' }
  ],
  '2016级新生一等奖学金': [
    { code: 'J1162125', amount: 12500, type: '校管校分' }
  ],
  '2016级新生二等奖学金': [
    { code: 'J1162050', amount: 5000, type: '校管校分' }
  ],
  '2019级新生一等奖学金': [
    { code: 'J1172125', amount: 12500, type: '校管校分' }
  ],
  '2019级新生二等奖学金': [{ code: 'J1172050', amount: 5000, type: '校管校分' }]
} as const;

export const aids = {
  '清华之友——怀庄助学金': [
    {
      code: 'Z2052032',
      amount: 3200,
      type: '校管校分',
      salutation: '庄人川先生、陈友忠先生等爱心人士'
    }
  ],
  清华大学生活费助学金: [{ code: 'Z2062020', amount: 2000, type: '校管校分' }],
  '清华之友——励志助学金': [
    {
      code: 'Z2072040',
      amount: 4000,
      type: '校管校分',
      salutation: '尊敬的陈伯佐先生'
    }
  ],
  '恒大集团助学基金(一)': [
    { code: 'Z2122065', amount: 6500, type: '校管校分', salutation: '恒大集团' }
  ],
  恒大集团助学基金: [
    { code: 'Z2132065', amount: 6500, type: '校管校分', salutation: '恒大集团' }
  ],
  '清华之友——黄俞助学金': [
    {
      code: 'Z2152120',
      amount: 12000,
      type: '校管校分',
      salutation: '尊敬的黄俞先生'
    }
  ],
  龙门希望工程助学金: [
    {
      code: 'Z2322050',
      amount: 5000,
      type: '校管校分',
      salutation: '尊敬的伦景光教授、伦景雄先生、伦景良先生'
    }
  ],
  清华伟新励学金: [
    {
      code: 'Z2352040',
      amount: 4000,
      type: '校管校分',
      salutation: '尊敬的香港伟新教育基金会爱心人士'
    }
  ],
  '清华之友——赵敏意助学金': [
    {
      code: 'Z2432100',
      amount: 10000,
      type: '校管校分',
      salutation: '尊敬的赵敏意女士'
    }
  ],
  '清华之友——咏芳助学金': [
    {
      code: 'Z2492040',
      amount: 4000,
      type: '校管校分',
      salutation: '尊敬的杨蔡咏芳女士'
    }
  ],
  '清华大学——昱鸿助学金': [
    {
      code: 'Z2552050',
      amount: 5000,
      type: '校管校分',
      salutation: '尊敬的吴官正学长'
    },
    {
      code: 'Z2552100',
      amount: 10000,
      type: '校管校分',
      salutation: '尊敬的吴官正学长'
    }
  ],
  '清华之友——张明为助学金': [
    {
      code: 'Z2612050',
      amount: 5000,
      type: '校管校分',
      salutation: '尊敬的张爷爷家属'
    }
  ],
  '清华之友——一汽丰田助学金': [
    {
      code: 'Z2682050',
      amount: 5000,
      type: '校管校分',
      salutation: '尊敬的捐助人'
    }
  ],
  '清华校友——河南校友会励学金': [
    {
      code: 'Z4262130',
      amount: 13000,
      type: '校管校分',
      salutation: '尊敬的河南校友会的学长们'
    }
  ],
  '清华校友——传信励学基金': [
    {
      code: 'Z4312010',
      amount: 1000,
      type: '校管校分',
      salutation: '尊敬的学长们'
    },
    {
      code: 'Z4312020',
      amount: 2000,
      type: '校管校分',
      salutation: '尊敬的学长们'
    },
    {
      code: 'Z4312030',
      amount: 3000,
      type: '校管校分',
      salutation: '尊敬的学长们'
    }
  ],
  '清华校友——德强励学金': [
    {
      code: 'Z4372050',
      amount: 5000,
      type: '校管校分',
      salutation: '尊敬的李小龙学长'
    }
  ],
  '清华校友——孟昭英励学基金': [
    {
      code: 'Z4492010',
      amount: 1000,
      type: '校管校分',
      salutation: '尊敬的赵伟国学长'
    },
    {
      code: 'Z4492020',
      amount: 2000,
      type: '校管校分',
      salutation: '尊敬的赵伟国学长'
    },
    {
      code: 'Z4492030',
      amount: 3000,
      type: '校管校分',
      salutation: '尊敬的赵伟国学长'
    },
    {
      code: 'Z4492060',
      amount: 6000,
      type: '校管校分',
      salutation: '尊敬的赵伟国学长'
    }
  ],
  '清华校友——常迵励学基金': [
    {
      code: 'Z4502005',
      amount: 500,
      type: '校管校分',
      salutation: '尊敬的赵伟国学长'
    },
    {
      code: 'Z4502010',
      amount: 1000,
      type: '校管校分',
      salutation: '尊敬的赵伟国学长'
    },
    {
      code: 'Z4502015',
      amount: 1500,
      type: '校管校分',
      salutation: '尊敬的赵伟国学长'
    },
    {
      code: 'Z4502020',
      amount: 2000,
      type: '校管校分',
      salutation: '尊敬的赵伟国学长'
    },
    {
      code: 'Z4502050',
      amount: 5000,
      type: '校管校分',
      salutation: '尊敬的赵伟国学长'
    }
  ],
  '清华校友——张维国励学基金': [
    {
      code: 'Z4612010',
      amount: 1000,
      type: '校管校分',
      salutation: '尊敬的张维国学长'
    },
    {
      code: 'Z4612060',
      amount: 6000,
      type: '校管校分',
      salutation: '尊敬的张维国学长'
    },
    {
      code: 'Z4612080',
      amount: 8000,
      type: '校管校分',
      salutation: '尊敬的张维国学长'
    },
    {
      code: 'Z4612100',
      amount: 10000,
      type: '校管校分',
      salutation: '尊敬的张维国学长'
    }
  ],
  '清华校友——凌复云·马晓云励学基金': [
    {
      code: 'Z4642060',
      amount: 6000,
      type: '校管校分',
      salutation: '尊敬的凌复云、马晓云学长'
    }
  ],
  '清华之友——华硕励学基金': [
    {
      code: 'Z4922030',
      amount: 3000,
      type: '校管校分',
      salutation: '华硕集团公司'
    },
    {
      code: 'Z4922050',
      amount: 5000,
      type: '校管校分',
      salutation: '华硕集团公司'
    }
  ],
  清华江西校友励学基金: [
    {
      code: 'Z5392030',
      amount: 3000,
      type: '校管校分',
      salutation: '泰豪集团有限公司'
    },
    {
      code: 'Z5392060',
      amount: 6000,
      type: '校管校分',
      salutation: '泰豪集团有限公司'
    }
  ],
  清华校友零零励学基金: [
    {
      code: 'Z5412060',
      amount: 6000,
      type: '校管校分',
      salutation: '尊敬的零零字班学长们'
    }
  ],
  清华校友励学金: [
    {
      code: 'Z5562100',
      amount: 10000,
      type: '校管校分',
      salutation: '尊敬的学长'
    }
  ],
  '清华校友——吴道怀史常忻励学基金': [
    {
      code: 'Z5712040',
      amount: 4000,
      type: '校管校分',
      salutation: '尊敬的史常忻学长'
    }
  ],
  '清华校友——广州校友会励学金（周进波）': [
    {
      code: 'Z5819060',
      amount: 6000,
      type: '校管校分',
      salutation: '尊敬的周进波学长'
    }
  ],
  '清华校友——代贻榘励学基金': [
    {
      code: 'Z6002060',
      amount: 6000,
      type: '校管校分',
      salutation: '尊敬的王秉钦学长'
    }
  ],
  '清华校友——山西校友会励学基金': [
    {
      code: 'Z6022060',
      amount: 6000,
      type: '校管校分',
      salutation: '尊敬的山西校友会的学长们'
    }
  ],
  '清华校友——李志坚励学基金': [
    {
      code: 'Z6102050',
      amount: 5000,
      type: '校管校分',
      salutation: '尊敬的学长们'
    },
    {
      code: 'Z6102100',
      amount: 10000,
      type: '校管校分',
      salutation: '尊敬的学长们'
    }
  ],
  珠海市得理慈善基金会清华励学金: [
    {
      code: 'Z6142050',
      amount: 5000,
      type: '校管校分',
      salutation: '珠海市得理慈善基金会'
    },
    {
      code: 'Z6152100',
      amount: 10000,
      type: '校管校分',
      salutation: '珠海市得理慈善基金会'
    }
  ],
  清华78届雷四班校友及苏宁电器励学基金: [
    {
      code: 'Z6182050',
      amount: 5000,
      type: '校管校分',
      salutation: '尊敬的1978届雷4班的学长们及苏宁电器股份有限公司领导'
    }
  ],
  '清华校友励学金（任向军）': [
    {
      code: 'Z6242120',
      amount: 12000,
      type: '校管校分',
      salutation: '尊敬的任向军学长'
    }
  ],
  国家助学金: [
    { code: 'Z2012020', amount: 2000, type: '校管院分' },
    { code: 'Z2012030', amount: 3000, type: '校管院分' },
    { code: 'Z2012050', amount: 5000, type: '校管院分' }
  ]
} as const;
