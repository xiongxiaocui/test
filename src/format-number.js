/*
数字类型数据的格式化,比如格式化为某种货币金额
基于formatterName，编制的转义工具。
数字格式化要处理内容包含：
           四舍六入五成双  Banker's Rounding --> bankerRounding
全局       百分数，对数值 * 100，并尾部加 %
全局       千分号
非全局     货币符号 头部加
默认2位    弹性精度
           倍数符号，尾部加 x
全局       金额为负数  金额为负数（红色）
           数字样式扩展，比如返回红色的文字
*/
import {isObject, merge, trimEnd, isString} from 'lodash'
import accounting from 'accounting'
// import { currencySymbol } from './formatter-widget'
function currencySymbol(currencyName){
  // let symbol = currencyMap[_.toUpper(currencyName)]
  if(currencyName){
    return currencyName
  }
  return null
}
// 四舍六入五成双
// from https://stackoverflow.com/questions/3108986/gaussian-bankers-rounding-in-javascript
function bankers_round (num, precision) {
  // console.log('---------num',num)
  // console.log('---------precision',precision)
  var d = precision || 0
  var m = Math.pow(10, d)
  var n = +(d ? num * m : num).toFixed(8) // Avoid rounding errors
  var i = Math.floor(n),
    f = n - i
  var e = 1e-8 // Allow for rounding errors in f
  var r = f > 0.499999999 - e && f < 0.500000001 + e ? (i % 2 == 0 ? i : i + 1) : Math.round(n)
  return d ? r / m : r
}

/*
处理数值为空，0，无定义 NaN的情况，且做简单参数映射？？？
*/
function preCheck (data, formatter, returnValue) {
  // console.log('data：',data);
  // console.log('formatter：',formatter);
  // console.log('returnValue：',returnValue);

  // 空值情况格式化配置，因为多了个empty
  if (isObject(formatter)) {
    if (formatter.format) {
      if (isObject(formatter.format)) {
        if (formatter.format.empty) {
          formatter.format.zero = formatter.format.empty
        }
        if (!formatter.format.zero) {
          formatter.format.zero = '0'
        }
      } else {
        // 如果是字符串的场景
        let pos = formatter.format
        formatter.format = {
          pos: pos,
          neg: pos,
          zero: '0'
        }
      }
    } else {
      formatter.format = { zero: '0' }
    }
  }

  // 空值处理
  if (data === undefined || data === null || data === 0 || data === '') {
    returnValue.empty = ''
    // data是0的情况特殊处理
    if (typeof formatter === 'object') {
        if (data === 0 && formatter.format
            && formatter.format.zero != null
            && formatter.format.zero != undefined) {
            returnValue.empty = formatter.format.zero
        }
    }
  } else if (isNaN(data)) {
    returnValue.empty = data
  } else if (typeof formatter === 'object') {
    //
    let precision = formatter.precision || 2
    if (returnValue.name == 'percent') {
      precision = precision + 2
    }
    if (!bankers_round(new Number(data), precision)) {
      returnValue.empty = formatter.format.zero
    } else {
      return true
    }
  } else {
    return true
  }

  return false
}

/*
  默认数字格式化，只加千分号,精确到个位
  数字格式化：默认带千分号，精度为0, 配置参数为：
    optionNumber = {
            precision : 0,  // 精度，默认是0
            thousand: ",", //千分号
            decimal : "."  //小数分割号
            sortPrecision:true, // 弹性精度 12.10 ---> 12.1;(12.20) ---> (12.2) [optional]
        }
*/
export function number (val, option) {
  if (!val &&val !== 0 && option && option.format && option.format.empty) {
    return option.format.empty
  }

  var emptyValue = {}
  if (!preCheck(val, option, emptyValue)) {
    return emptyValue.empty
  }

  let formatStr
    let optionDefault = {
    precision: 0, // default precision on numbers is 0
    thousand: ',',
    decimal: '.',
    beforeFormat:null
    // sortPrecision:true, // 弹性精度 12.10 ---> 12.1;(12.20) ---> (12.2) [optional]
  }
  if (option != null) {
    // optionDefault = Object.assign(optionDefault, option)
    optionDefault = merge(optionDefault, option)
  }
// 前置数组处理
    if (optionDefault.beforeFormat instanceof Function) {
        val = optionDefault.beforeFormat(val, optionDefault)
    }
  formatStr = accounting.formatNumber(val, optionDefault)
  // 短弹性精度，12.10 ---> 12.1;(12.20) ---> (12.2)
  if (optionDefault.sortPrecision) {
    formatStr = trimEnd(formatStr, '0')
  }
  return formatStr
}

/*
  默认货币格式化，加千分号，保留2位小数，带币种符号
  金额格式化：
        optionMoney = {
            symbol : " ",   //货币符号，默认是 ' ', 支持 ￥|CNY $|USD  €|EUR
            format: {    格式化配置，见accounting
                pos : "%s %v",   // for positive values, eg. "$ 1.00" (required)
                neg : "%s (%v)" // for negative values, eg. "$ (1.00)" [optional]
            }, // controls output: %s = symbol, %v = value/number (can be object: see below)
            decimal : ".",  // decimal point separator
            thousand: ",",  // thousands separator
            precision : 2 ,  // 精度，默认是2
            negColor:"red"   // default negative values return as red color
            sortPrecision:true, //默认不启用， 弹性精度 12.10 ---> 12.1;(12.20) ---> (12.2) [optional]
            bankersRound:true // 默认不启用  。如是true :支持四舍六入五成双 [optional]
            beforeFormat:Function //默认是空，可以配置一个回调函数，在格式化前对val做简单处理，必须返回一个数字
        }
*/
export function money (val, option) {
  if (!val && val !== 0 && option && option.format && option.format.empty) {
    return option.format.empty;
  }
  const replaceType = isString(val)
  val = (replaceType && val && val.replace(/,/g, '')) || val

  // console.log('----------------data：',val);
  // console.log('----------------option:',JSON.stringify(option));

  var emptyValue = {}
  if (!preCheck(val, option, emptyValue)) {
    return emptyValue.empty
  }

  let optionDefault = {
    symbol: '', // default currency symbol is ' '
    format: {
      pos: '%s %v', // for positive values, eg. "$ 1.00" (required)
      neg: '%s (%v)',
      zero: "" // for negative values, eg. "$ (1.00)" [optional]
    }, // controls output: %s = symbol, %v = value/number (can be object: see below)
    decimal: '.', // decimal point separator
    thousand: ',', // thousands separator
    precision: 2, // decimal places
    isTenMillion:false,  //IDG百万级
    negColor: '#AE1129', // '#AE1129' default negative values return as red color,如果设置为null则不显示
    beforeFormat:null
    // sortPrecision:true, // 弹性精度 12.10 ---> 12.1;(12.20) ---> (12.2) [optional]
    // bankersRound:true // true :支持四舍六入五成双 [optional]
  }

  if (option != null) {
    // optionDefault = Object.assign(optionDefault, option)
    optionDefault = merge(optionDefault, option)
  }

  // 前置数组处理
  if (optionDefault.beforeFormat instanceof Function) {
    val = optionDefault.beforeFormat(val, optionDefault)
  }

  // 货币符号转换
  if (currencySymbol(optionDefault.symbol)) {
    optionDefault.symbol = currencySymbol(optionDefault.symbol)
  }

  // 关闭 formatMoney 对null处理为 $的默认行为
  if (optionDefault.symbol == null) {
    optionDefault.symbol = ''
  }

  // 四舍六入五成双处理
  if (optionDefault.bankersRound) {
    val = bankers_round(val, optionDefault.precision)
  }

  var formatStr = accounting.formatMoney(val, optionDefault)

  // 短弹性精度，12.10 ---> 12.1;(12.20) ---> (12.2)
  // (23.200%) ---> (23.2%)
  if (optionDefault.sortPrecision) {
    if (val < 0) {
      let symbolRight = optionDefault.symbol + ')'
      formatStr = trimEnd(formatStr, symbolRight)
      formatStr = trimEnd(formatStr, '0') + symbolRight
    } else {
      formatStr = trimEnd(formatStr, '0')
    }
  }
  if (val < 0 && optionDefault.negColor) {
    formatStr = "<span style='color:" + optionDefault.negColor + ";font-weight:bold;'>" + formatStr + '</span>'
  }
  return formatStr
}

/*
为数字加后缀
后缀格式化：suffix:(val[required,被处理数据], suffix[required,后缀], option[optional,同金额格式化配置])
默认后缀 为  x
*/
export function suffix (val, suffix, option) {
  if (!val &&val !== 0 && option && option.format && option.format.empty) {
    return option.format.empty
  }

  var emptyValue = {}
  if (!preCheck(val, option, emptyValue)) {
    return emptyValue.empty
  }
  // 默认不显示为红色
  let optionDefault = {
    negColor: null,
    symbol: 'x',
    format: {
      pos: '%v%s', // s 在后面
      neg: '(%v%s)' // s 在后面，负数带括号
    }
  }

  if (option != null) {
    optionDefault = merge(optionDefault, option)
  }

  // 配置symbol
  if (suffix) {
    optionDefault.symbol = suffix
  } else {
    // 默认是x
    optionDefault.symbol = 'x'
  }

  let num = money(val, optionDefault)
  return num
}

/*
默认百分号格式化，自动加 %;val为原始值
负数的情况 带括号,加红色
百分数格式化, percent:(val[required,被处理数据], option[optional,同金额格式化配置])
*/
export function percent (val, option) {
  if (!val &&val !== 0 && option && option.format && option.format.empty) {
    return option.format.empty
  }

  // 对于百分数的情况，空值检验时，需要考虑将精度后移2位
  var emptyValue = { name: 'percent' }
  if (!preCheck(val, option, emptyValue)) {
    return emptyValue.empty
  }
  // 默认显示为红色
  if (option == null) {
    option = {
      negColor: '#AE1129'
    }
  }
  let num = val * 100
  return suffix(num, '%', option)
}
