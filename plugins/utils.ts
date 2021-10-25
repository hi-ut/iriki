// /plugins/logger.ts
export class Utils {
  formatArrayValue(arr: string[], delimiter: string = ', '): any {
    if (typeof arr !== 'object') {
      arr = [arr]
    }
    if (arr == null) {
      return ''
    }
    if (arr.length === 1) {
      return arr[0]
    } else {
      const value: string = arr.join(delimiter)
      return value
    }
  }

  getProjectFooter(lang: string) {
    const value =
      lang === 'ja' ? process.env.projectFooterJa : process.env.projectFooterEn
    return value
  }

  getProjectName(lang: string) {
    const value =
      lang === 'ja' ? process.env.projectNameJa : process.env.projectNameEn
    return value
  }

  getProjectDescription(lang: string) {
    const value =
      lang === 'ja'
        ? process.env.projectDescriptionJa
        : process.env.projectDescriptionEn
    return value
  }

  truncate(str: any, length: number): string {
    if (str && str['@id']) {
      return ''
    }
    str = String(str)
    return str.length <= length ? str : str.substring(0, length) + '...'
  }

  convTei2Html(value: string) {
    value = value.split('<lb/>').join('<br/>')
    value = value
      .split('placeName')
      .join("placeName style='background-color: #c8e6c9;' ")
    value = value
      .split('persName')
      .join("persName style='background-color: #ffccbc;' ")
    value = value.split('date').join("date style='background-color: #bbdefb' ")
    value = value.split('note').join("note style='background-color: #fff9c4;' ")
    return value
  }
}

export default (_: any, inject: any) => {
  inject('utils', new Utils())
}
