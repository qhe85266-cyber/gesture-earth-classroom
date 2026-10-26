/** Classroom catalog. Coordinates are approximate labels, not surveyed positions.
 * See docs/数据核验.md for coverage, sources and unresolved checks. */
export type CatalogEntry = {
  id: string; name: string; lat: number; lng: number; capital: string;
  description: string; kind: 'country' | 'region' | 'province' | 'autonomous-region' | 'municipality' | 'special-region';
  aliases: string[]; verification: 'special-case-reviewed' | 'baseline-pending-primary-review';
};
export const asiaCatalog: CatalogEntry[] = [
  {
    "id": "CHN",
    "name": "中国",
    "lat": 39.9,
    "lng": 116.4,
    "capital": "北京",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "China"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "JPN",
    "name": "日本",
    "lat": 35.68,
    "lng": 139.69,
    "capital": "东京",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Japan"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "KOR",
    "name": "韩国",
    "lat": 37.57,
    "lng": 126.98,
    "capital": "首尔",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "South Korea"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "PRK",
    "name": "朝鲜",
    "lat": 39.03,
    "lng": 125.75,
    "capital": "平壤",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "North Korea"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "MNG",
    "name": "蒙古",
    "lat": 47.92,
    "lng": 106.92,
    "capital": "乌兰巴托",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Mongolia"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "IND",
    "name": "印度",
    "lat": 28.61,
    "lng": 77.21,
    "capital": "新德里",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "India"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "PAK",
    "name": "巴基斯坦",
    "lat": 33.69,
    "lng": 73.05,
    "capital": "伊斯兰堡",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Pakistan"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "BGD",
    "name": "孟加拉国",
    "lat": 23.81,
    "lng": 90.41,
    "capital": "达卡",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Bangladesh"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "NPL",
    "name": "尼泊尔",
    "lat": 27.72,
    "lng": 85.32,
    "capital": "加德满都",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Nepal"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "BTN",
    "name": "不丹",
    "lat": 27.47,
    "lng": 89.64,
    "capital": "廷布",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Bhutan"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "LKA",
    "name": "斯里兰卡",
    "lat": 6.89,
    "lng": 79.9,
    "capital": "斯里贾亚瓦德纳普拉科特",
    "description": "科特为首都及议会所在地；科伦坡仍承载重要政府及商业职能。",
    "kind": "country",
    "aliases": [
      "Sri Lanka"
    ],
    "verification": "special-case-reviewed"
  },
  {
    "id": "MDV",
    "name": "马尔代夫",
    "lat": 4.18,
    "lng": 73.51,
    "capital": "马累",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Maldives"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "AFG",
    "name": "阿富汗",
    "lat": 34.56,
    "lng": 69.21,
    "capital": "喀布尔",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Afghanistan"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "MMR",
    "name": "缅甸",
    "lat": 19.76,
    "lng": 96.08,
    "capital": "内比都",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Myanmar"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "THA",
    "name": "泰国",
    "lat": 13.76,
    "lng": 100.5,
    "capital": "曼谷",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Thailand"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "LAO",
    "name": "老挝",
    "lat": 17.97,
    "lng": 102.63,
    "capital": "万象",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Laos"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "KHM",
    "name": "柬埔寨",
    "lat": 11.56,
    "lng": 104.93,
    "capital": "金边",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Cambodia"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "VNM",
    "name": "越南",
    "lat": 21.03,
    "lng": 105.85,
    "capital": "河内",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Vietnam"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "MYS",
    "name": "马来西亚",
    "lat": 3.14,
    "lng": 101.69,
    "capital": "吉隆坡",
    "description": "吉隆坡为首都，布城为联邦行政中心；两者不可混同。",
    "kind": "country",
    "aliases": [
      "Malaysia"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "SGP",
    "name": "新加坡",
    "lat": 1.29,
    "lng": 103.85,
    "capital": "新加坡",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Singapore"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "IDN",
    "name": "印度尼西亚",
    "lat": -6.21,
    "lng": 106.85,
    "capital": "雅加达（迁都过渡期）",
    "description": "外交部2026年6月概况仍列雅加达；努山塔拉迁都进程持续，交付前应复核。",
    "kind": "country",
    "aliases": [
      "Indonesia"
    ],
    "verification": "special-case-reviewed"
  },
  {
    "id": "PHL",
    "name": "菲律宾",
    "lat": 14.6,
    "lng": 120.98,
    "capital": "马尼拉",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Philippines"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "BRN",
    "name": "文莱",
    "lat": 4.9,
    "lng": 114.94,
    "capital": "斯里巴加湾市",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Brunei"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "TLS",
    "name": "东帝汶",
    "lat": -8.56,
    "lng": 125.57,
    "capital": "帝力",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Timor-Leste"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "KAZ",
    "name": "哈萨克斯坦",
    "lat": 51.17,
    "lng": 71.43,
    "capital": "阿斯塔纳",
    "description": "跨欧亚国家。",
    "kind": "country",
    "aliases": [
      "Kazakhstan"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "UZB",
    "name": "乌兹别克斯坦",
    "lat": 41.3,
    "lng": 69.24,
    "capital": "塔什干",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Uzbekistan"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "TKM",
    "name": "土库曼斯坦",
    "lat": 37.96,
    "lng": 58.33,
    "capital": "阿什哈巴德",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Turkmenistan"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "KGZ",
    "name": "吉尔吉斯斯坦",
    "lat": 42.87,
    "lng": 74.6,
    "capital": "比什凯克",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Kyrgyzstan"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "TJK",
    "name": "塔吉克斯坦",
    "lat": 38.56,
    "lng": 68.79,
    "capital": "杜尚别",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Tajikistan"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "IRN",
    "name": "伊朗",
    "lat": 35.69,
    "lng": 51.39,
    "capital": "德黑兰",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Iran"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "IRQ",
    "name": "伊拉克",
    "lat": 33.32,
    "lng": 44.37,
    "capital": "巴格达",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Iraq"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "SYR",
    "name": "叙利亚",
    "lat": 33.51,
    "lng": 36.29,
    "capital": "大马士革",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Syria"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "JOR",
    "name": "约旦",
    "lat": 31.95,
    "lng": 35.93,
    "capital": "安曼",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Jordan"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "LBN",
    "name": "黎巴嫩",
    "lat": 33.89,
    "lng": 35.5,
    "capital": "贝鲁特",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Lebanon"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "ISR",
    "name": "以色列",
    "lat": 31.78,
    "lng": 35.22,
    "capital": "耶路撒冷（地位存在争议）",
    "description": "以方将政府主要机构设于耶路撒冷；其首都地位未获国际社会普遍承认。",
    "kind": "country",
    "aliases": [
      "Israel"
    ],
    "verification": "special-case-reviewed"
  },
  {
    "id": "PSX",
    "name": "巴勒斯坦",
    "lat": 31.9,
    "lng": 35.2,
    "capital": "耶路撒冷（宣称）；拉马拉为主要政府驻地",
    "description": "外交部资料列宣称首都耶路撒冷，政府主要部门在拉马拉；中方支持以东耶路撒冷为首都建国。地图点设于拉马拉。",
    "kind": "country",
    "aliases": [
      "Palestine",
      "PSE"
    ],
    "verification": "special-case-reviewed"
  },
  {
    "id": "SAU",
    "name": "沙特阿拉伯",
    "lat": 24.71,
    "lng": 46.68,
    "capital": "利雅得",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Saudi Arabia"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "YEM",
    "name": "也门",
    "lat": 15.37,
    "lng": 44.19,
    "capital": "萨那",
    "description": "此处依外交部资料列萨那；实际行政与控制状况复杂，不表达实时政府驻地。",
    "kind": "country",
    "aliases": [
      "Yemen"
    ],
    "verification": "special-case-reviewed"
  },
  {
    "id": "OMN",
    "name": "阿曼",
    "lat": 23.59,
    "lng": 58.41,
    "capital": "马斯喀特",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Oman"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "ARE",
    "name": "阿联酋",
    "lat": 24.45,
    "lng": 54.38,
    "capital": "阿布扎比",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "United Arab Emirates"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "QAT",
    "name": "卡塔尔",
    "lat": 25.29,
    "lng": 51.53,
    "capital": "多哈",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Qatar"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "KWT",
    "name": "科威特",
    "lat": 29.38,
    "lng": 47.98,
    "capital": "科威特城",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Kuwait"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "BHR",
    "name": "巴林",
    "lat": 26.22,
    "lng": 50.59,
    "capital": "麦纳麦",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Bahrain"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "TUR",
    "name": "土耳其",
    "lat": 39.93,
    "lng": 32.86,
    "capital": "安卡拉",
    "description": "跨欧亚国家。",
    "kind": "country",
    "aliases": [
      "Turkey",
      "Türkiye"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "GEO",
    "name": "格鲁吉亚",
    "lat": 41.72,
    "lng": 44.83,
    "capital": "第比利斯",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Georgia"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "ARM",
    "name": "亚美尼亚",
    "lat": 40.18,
    "lng": 44.51,
    "capital": "埃里温",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Armenia"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "AZE",
    "name": "阿塞拜疆",
    "lat": 40.41,
    "lng": 49.87,
    "capital": "巴库",
    "description": "亚洲地理课堂精选条目；坐标为首都附近的示意定位点。",
    "kind": "country",
    "aliases": [
      "Azerbaijan"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "CYP",
    "name": "塞浦路斯",
    "lat": 35.19,
    "lng": 33.38,
    "capital": "尼科西亚",
    "description": "纳入西亚教学范围；岛内分治不应显示为两个获得普遍承认的主权国家。",
    "kind": "country",
    "aliases": [
      "Cyprus"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "RUS",
    "name": "俄罗斯",
    "lat": 55.75,
    "lng": 37.62,
    "capital": "莫斯科",
    "description": "跨欧亚国家；莫斯科位于欧洲。本产品作为跨洲教学补充纳入，不等同于联合国M49亚洲名单。",
    "kind": "country",
    "aliases": [
      "Russia"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "TWN",
    "name": "中国台湾",
    "capital": "台北",
    "lat": 25.03,
    "lng": 121.57,
    "kind": "region",
    "aliases": [
      "Taiwan"
    ],
    "description": "中国省级行政区；此处为地区定位信息，不使用国家首都表述。",
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "HKG",
    "name": "中国香港",
    "capital": "香港",
    "lat": 22.3,
    "lng": 114.17,
    "kind": "region",
    "aliases": [
      "Hong Kong"
    ],
    "description": "中国省级行政区；此处为地区定位信息，不使用国家首都表述。",
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "MAC",
    "name": "中国澳门",
    "capital": "澳门",
    "lat": 22.2,
    "lng": 113.55,
    "kind": "region",
    "aliases": [
      "Macao",
      "Macau"
    ],
    "description": "中国省级行政区；此处为地区定位信息，不使用国家首都表述。",
    "verification": "baseline-pending-primary-review"
  }
];

export const chinaCatalog: CatalogEntry[] = [
  {
    "id": "110000",
    "name": "北京市",
    "lat": 39.904989,
    "lng": 116.405285,
    "capital": "北京",
    "description": "直辖市，不称省会。",
    "kind": "municipality",
    "aliases": [
      "北京"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "120000",
    "name": "天津市",
    "lat": 39.125596,
    "lng": 117.190182,
    "capital": "天津",
    "description": "直辖市，不称省会。",
    "kind": "municipality",
    "aliases": [
      "天津"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "130000",
    "name": "河北省",
    "lat": 38.045474,
    "lng": 114.502461,
    "capital": "石家庄",
    "description": "省会：石家庄。",
    "kind": "province",
    "aliases": [
      "河北"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "140000",
    "name": "山西省",
    "lat": 37.857014,
    "lng": 112.549248,
    "capital": "太原",
    "description": "省会：太原。",
    "kind": "province",
    "aliases": [
      "山西"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "150000",
    "name": "内蒙古自治区",
    "lat": 40.818311,
    "lng": 111.670801,
    "capital": "呼和浩特",
    "description": "首府：呼和浩特。",
    "kind": "autonomous-region",
    "aliases": [
      "内蒙古自治区"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "210000",
    "name": "辽宁省",
    "lat": 41.796767,
    "lng": 123.429096,
    "capital": "沈阳",
    "description": "省会：沈阳。",
    "kind": "province",
    "aliases": [
      "辽宁"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "220000",
    "name": "吉林省",
    "lat": 43.886841,
    "lng": 125.3245,
    "capital": "长春",
    "description": "省会：长春。",
    "kind": "province",
    "aliases": [
      "吉林"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "230000",
    "name": "黑龙江省",
    "lat": 45.756967,
    "lng": 126.642464,
    "capital": "哈尔滨",
    "description": "省会：哈尔滨。",
    "kind": "province",
    "aliases": [
      "黑龙江"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "310000",
    "name": "上海市",
    "lat": 31.231706,
    "lng": 121.472644,
    "capital": "上海",
    "description": "直辖市，不称省会。",
    "kind": "municipality",
    "aliases": [
      "上海"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "320000",
    "name": "江苏省",
    "lat": 32.041544,
    "lng": 118.767413,
    "capital": "南京",
    "description": "省会：南京。",
    "kind": "province",
    "aliases": [
      "江苏"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "330000",
    "name": "浙江省",
    "lat": 30.287459,
    "lng": 120.153576,
    "capital": "杭州",
    "description": "省会：杭州。",
    "kind": "province",
    "aliases": [
      "浙江"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "340000",
    "name": "安徽省",
    "lat": 31.86119,
    "lng": 117.283042,
    "capital": "合肥",
    "description": "省会：合肥。",
    "kind": "province",
    "aliases": [
      "安徽"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "350000",
    "name": "福建省",
    "lat": 26.075302,
    "lng": 119.306239,
    "capital": "福州",
    "description": "省会：福州。",
    "kind": "province",
    "aliases": [
      "福建"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "360000",
    "name": "江西省",
    "lat": 28.676493,
    "lng": 115.892151,
    "capital": "南昌",
    "description": "省会：南昌。",
    "kind": "province",
    "aliases": [
      "江西"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "370000",
    "name": "山东省",
    "lat": 36.675807,
    "lng": 117.000923,
    "capital": "济南",
    "description": "省会：济南。",
    "kind": "province",
    "aliases": [
      "山东"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "410000",
    "name": "河南省",
    "lat": 34.757975,
    "lng": 113.665412,
    "capital": "郑州",
    "description": "省会：郑州。",
    "kind": "province",
    "aliases": [
      "河南"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "420000",
    "name": "湖北省",
    "lat": 30.584355,
    "lng": 114.298572,
    "capital": "武汉",
    "description": "省会：武汉。",
    "kind": "province",
    "aliases": [
      "湖北"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "430000",
    "name": "湖南省",
    "lat": 28.19409,
    "lng": 112.982279,
    "capital": "长沙",
    "description": "省会：长沙。",
    "kind": "province",
    "aliases": [
      "湖南"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "440000",
    "name": "广东省",
    "lat": 23.125178,
    "lng": 113.280637,
    "capital": "广州",
    "description": "省会：广州。",
    "kind": "province",
    "aliases": [
      "广东"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "450000",
    "name": "广西壮族自治区",
    "lat": 22.82402,
    "lng": 108.320004,
    "capital": "南宁",
    "description": "首府：南宁。",
    "kind": "autonomous-region",
    "aliases": [
      "广西壮族自治区"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "460000",
    "name": "海南省",
    "lat": 20.031971,
    "lng": 110.33119,
    "capital": "海口",
    "description": "省会：海口。",
    "kind": "province",
    "aliases": [
      "海南"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "500000",
    "name": "重庆市",
    "lat": 29.533155,
    "lng": 106.504962,
    "capital": "重庆",
    "description": "直辖市，不称省会。",
    "kind": "municipality",
    "aliases": [
      "重庆"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "510000",
    "name": "四川省",
    "lat": 30.659462,
    "lng": 104.065735,
    "capital": "成都",
    "description": "省会：成都。",
    "kind": "province",
    "aliases": [
      "四川"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "520000",
    "name": "贵州省",
    "lat": 26.578343,
    "lng": 106.713478,
    "capital": "贵阳",
    "description": "省会：贵阳。",
    "kind": "province",
    "aliases": [
      "贵州"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "530000",
    "name": "云南省",
    "lat": 25.040609,
    "lng": 102.712251,
    "capital": "昆明",
    "description": "省会：昆明。",
    "kind": "province",
    "aliases": [
      "云南"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "540000",
    "name": "西藏自治区",
    "lat": 29.660361,
    "lng": 91.132212,
    "capital": "拉萨",
    "description": "首府：拉萨。",
    "kind": "autonomous-region",
    "aliases": [
      "西藏自治区"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "610000",
    "name": "陕西省",
    "lat": 34.263161,
    "lng": 108.948024,
    "capital": "西安",
    "description": "省会：西安。",
    "kind": "province",
    "aliases": [
      "陕西"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "620000",
    "name": "甘肃省",
    "lat": 36.058039,
    "lng": 103.823557,
    "capital": "兰州",
    "description": "省会：兰州。",
    "kind": "province",
    "aliases": [
      "甘肃"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "630000",
    "name": "青海省",
    "lat": 36.623178,
    "lng": 101.778916,
    "capital": "西宁",
    "description": "省会：西宁。",
    "kind": "province",
    "aliases": [
      "青海"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "640000",
    "name": "宁夏回族自治区",
    "lat": 38.46637,
    "lng": 106.278179,
    "capital": "银川",
    "description": "首府：银川。",
    "kind": "autonomous-region",
    "aliases": [
      "宁夏回族自治区"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "650000",
    "name": "新疆维吾尔自治区",
    "lat": 43.792818,
    "lng": 87.617733,
    "capital": "乌鲁木齐",
    "description": "首府：乌鲁木齐。",
    "kind": "autonomous-region",
    "aliases": [
      "新疆维吾尔自治区"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "710000",
    "name": "台湾省",
    "lat": 25.044332,
    "lng": 121.509062,
    "capital": "台北",
    "description": "台湾省的教学行政中心标注；不表达实际管辖情况。",
    "kind": "province",
    "aliases": [
      "台湾"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "810000",
    "name": "香港特别行政区",
    "lat": 22.320048,
    "lng": 114.173355,
    "capital": "香港",
    "description": "特别行政区，不称省会。",
    "kind": "special-region",
    "aliases": [
      "香港特别行政区"
    ],
    "verification": "baseline-pending-primary-review"
  },
  {
    "id": "820000",
    "name": "澳门特别行政区",
    "lat": 22.198951,
    "lng": 113.54909,
    "capital": "澳门",
    "description": "特别行政区，不称省会。",
    "kind": "special-region",
    "aliases": [
      "澳门特别行政区"
    ],
    "verification": "baseline-pending-primary-review"
  }
];

export const findAsiaRegion = (name: string): CatalogEntry | undefined => asiaCatalog.find(entry => entry.name === name || entry.aliases.includes(name) || entry.id === name);

/** Application adapters: preserve region kinds in asiaCatalog for classification. */
export const countryCatalog = asiaCatalog.filter(entry => entry.kind === 'country');
export const provinceCatalog = chinaCatalog.map(entry => ({ ...entry, administrativeKind: entry.kind, kind: 'province' as const }));
export const provinceDetails: Record<string, { capital: string; description: string; administrativeKind: string }> = Object.fromEntries(chinaCatalog.map(entry => [entry.id, { capital: entry.capital, description: entry.description, administrativeKind: entry.kind }]));
