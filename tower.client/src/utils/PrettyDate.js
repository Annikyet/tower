export class PrettyDate {
  constructor(isoDate) {
    this.isoDate = isoDate
    this.epochDate = new Date(isoDate)
  }

  get dateString() {
    let dateStr = ''
    switch (this.epochDate.getMonth()) {
      case 0: 
        dateStr += 'January '
        break
      case 1: 
        dateStr += 'February '
        break
      case 2: 
        dateStr += 'March '
        break
      case 3: 
        dateStr += 'April '
        break
      case 4: 
        dateStr += 'May '
        break
      case 5: 
        dateStr += 'June '
        break
      case 6: 
        dateStr += 'July '
        break
      case 7: 
        dateStr += 'August '
        break
      case 8: 
        dateStr += 'September '
        break
      case 9: 
        dateStr += 'October '
        break
      case 10: 
        dateStr += 'November '
        break
      case 11: 
        dateStr += 'December '
        break
      default:
        return 'Invalid date'
    }
    dateStr += this.epochDate.getDate()
    dateStr += ', '
    dateStr += this.epochDate.getFullYear()
    return dateStr
  }

  timeString(format) {
    // this needs work
    const hours = this.epochDate.getHours()
    let timeStr = ''
    if (hours < 10) {
      timeStr += '0'
    }
    timeStr += hours
    timeStr += ':'
    const minutes = this.epochDate.getMinutes()
    if (minutes < 10) {
      timeStr += '0'
    }
    timeStr += minutes
    return timeStr
  }
}