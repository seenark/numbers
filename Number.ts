type TLocales = "th-TH" | 'ja-JA' | 'en-us' | 'ko' | 'zh-cn'


declare global {
    interface Number {
      currencyForm: (digit:number, locale?: TLocales) => string
      currencyFormFloor: (digit:number, locale?: TLocales) => string
      minimumDecimal: () => number
    }
  }
  
  // eslint-disable-next-line no-extend-native
  Number.prototype.currencyForm = function(digit:number, locale: TLocales = "th-TH"):string {
    const option: Intl.NumberFormatOptions = {
        maximumFractionDigits: digit
    }
    return this.toLocaleString(locale, option)
  };
  // eslint-disable-next-line no-extend-native
  Number.prototype.currencyFormFloor = function(digit:number, locale: TLocales = "th-TH"):string {
    const num = Number(this)
    if (Math.abs(num) === 0) return "0"
    const minimumDigit = num.minimumDecimal() + 1
    let decimal = digit
    if (minimumDigit > digit) {
        decimal = minimumDigit
    }
    const option: Intl.NumberFormatOptions = {
        maximumFractionDigits: decimal
    }
    const powDigit = Number(`1e${decimal}`)
    const newNum = Math.floor(num * powDigit) / powDigit
    const str = newNum.toLocaleString(locale, option)
    return str
  };

  // eslint-disable-next-line no-extend-native
  Number.prototype.minimumDecimal = function ():number {
    return -Math.floor(Math.log10(Number(this))+1) + 1
  }
  
  export {}
