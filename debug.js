// function test(e) {

//   //日付を取得
//   const timeStamp = 1634010300
//   const text = "<@U026RH5CYV9>【出勤】"
//   const userName = sarchUserName2(text);
//   const employeSheet = sarchEmploye2(userName)

//   const datetime = new Date(timeStamp * 1000);
//   const year = datetime.getFullYear()
//   const month = ('0' + (datetime.getMonth() + 1)).slice(-2);
//   const day = ('0' + datetime.getDate()).slice(-2);
//   const hour = ('0' + datetime.getHours()).slice(-2);
//   const minute = ('0' + datetime.getMinutes()).slice(-2);
//   const time = hour + ":" + minute

//   //名前をテキストから取得
//   const attendance = text.includes("【出勤】")
//   const leaving = text.includes("【退勤】")
//   const flg = employeSheet ? (attendance === leaving) ? 0 : 1 : 0

//   if (flg) {
//     setTime2(jobStart, attendance, year, month, time, day, employeSheet)
//     setTime2(jobEnd, leaving, year, month, time, day, employeSheet)
//   } else {
//     logTime2(time, month, day, text)
//   }
// }

// function setTime2(index, flg, year, month, time, day, user) {
//   const setMonth = year + "年" + month + "月"

//   if (flg) {
//     //user
//     console.log(`${year}.${month}`)
//     const userSheet = SpreadsheetApp.openByUrl(user[2])
//     var monthSheet = userSheet.getSheetByName(`${year}.${month}`)
//     if (!monthSheet) {
//       const template = userSheet.getSheetByName("作業表雛形")
//       monthSheet = template.copyTo(userSheet).setName(`${year}.${month}`)
//       monthSheet.getRange("A4:D5").setValue(setMonth)
//       monthSheet.getRange("AD2:AI2").setValue(user[0])
//     }
//     monthSheet.getRange(index, 4 + Number(day)).setValue(time)
//   }
// }

// function logTime2(time, month, day, text) {

//   //user
//   const userSheet = containerSheet.getSheetByName("log");
//   const last = userSheet.getLastRow();
//   userSheet.getRange(last + 1, 1, 1, 4).setValues([[month, day, time, text]])

// }

// function sarchEmploye2(userName) {
//   for (const Value00 of Values00) {
//     const [name00, userId00, ss] = Value00
//     if (userName == userId00) {
//       return [name00, userId00, ss]
//     }
//   }
// }

// function sarchUserName2(text) {
//   const matchName = (text.match(/\<(.+)\>/))
//   if (matchName) {
//     return text = matchName[1]
//   }
// }

