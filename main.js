
/**業務開始 */
const jobStart = 6

/**業務終了 */
const jobEnd = 7

/**シート名 */
const user = "社員一覧"

/**シート名 */
const setMonthBlock = "A4:D5"

/**シート名 */
const setUserBlock = "AD2:AI2"

/**スプシ */
const containerSheet = SpreadsheetApp.getActiveSpreadsheet()

/**社員一覧 */
const employeeList = containerSheet.getSheetByName("社員一覧");
const [header00, ...Values00] = employeeList.getDataRange().getValues();
const rangeIndex = employeeList.getIndex()


function doPost(e) {

  const params = JSON.parse(e.postData.getDataAsString());
  const timeStamp = params.event.ts
  const text = params.event.text

  const userName = sarchUserName(text);
  const employeSheet = sarchEmploye(userName)

  const datetime = new Date(timeStamp * 1000);
  const year = datetime.getFullYear()
  const month = ('0' + (datetime.getMonth() + 1)).slice(-2);
  const day = ('0' + datetime.getDate()).slice(-2);
  const hour = ('0' + datetime.getHours()).slice(-2);
  const minute = ('0' + datetime.getMinutes()).slice(-2);
  const time = hour + ":" + minute


  const attendance = text.includes("【出勤】")
  const leaving = text.includes("【退勤】")
  const flg = employeSheet ? (attendance === leaving) ? 0 : 1 : 0

  if (flg) {
    setTime(jobStart, attendance, year, month, time, day, employeSheet)
    setTime(jobEnd, leaving, year, month, time, day, employeSheet)
  } else {
    logTime(time, month, day, text)
  }
}

function setTime(index, flg, year, month, time, day, user) {
  const setMonth = year + "年" + month + "月"

  if (flg) {
    const userSheet = SpreadsheetApp.openByUrl(user[2])
    var monthSheet = userSheet.getSheetByName(`${year}.${month}`)
    if (!monthSheet) {
      const template = userSheet.getSheetByName("作業表雛形")
      monthSheet = template.copyTo(userSheet).setName(`${year}.${month}`)
      monthSheet.getRange(setMonthBlock).setValue(setMonth)
      monthSheet.getRange(setUserBlock).setValue(user[0])
    }
    monthSheet.getRange(index, 4 + Number(day)).setValue(time)
  }
}

function logTime(time, month, day, text) {

  const userSheet = containerSheet.getSheetByName("log");
  const last = userSheet.getLastRow();
  userSheet.getRange(last + 1, 1, 1, 4).setValues([[month, day, time, text]])

}

function sarchEmploye(userName) {
  for (const Value00 of Values00) {
    const [name00, userId00, ss] = Value00
    if (userName == userId00) {
      return [name00, userId00, ss]
    }
  }
}

function sarchUserName(text) {
  const matchName = (text.match(/\<(.+)\>/))
  if (matchName) {
    return text = matchName[1]
  }
}