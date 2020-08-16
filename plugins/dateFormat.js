import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

export default (_context, inject) => {
  const dateFormat = (date, formatStr) => {
    return format(new Date(date), formatStr, { locale: ja })
  }
  
  inject('dateFormat', dateFormat)
}