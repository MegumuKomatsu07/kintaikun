// function test(e) {
//   var startTime = new Date();
//   // Utilities.sleep(3000);

//   //日付を取得
//   const timeStamp = 1637485524
//   const text = "<@U026RH5CYV9>【着席】"
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

//   const leaveSeat = text.includes("【離席】")
//   const rest = text.includes("【休憩】")
//   const sitDown = text.includes("【着席】")

//   const startFlg = employeSheet ? attendance ? 1 : 0 : 0
//   const endFlg = employeSheet ? leaving ? 1 : 0 : 0
//   const restFlg = employeSheet ? rest || leaveSeat || sitDown ? 1 : 0 : 0

//   if (startFlg) {
//     setTime2(jobStart, attendance, year, month, time, day, employeSheet)

//   } else if (endFlg) {
//     setTime2(jobEnd, leaving, year, month, time, day, employeSheet)

//   } else if (restFlg) {
//     setRest2(restIndex, year, month, time, day, employeSheet)

//   } else {
//     logTime2(time, month, day, text)
//   }
//   var endTime = new Date();
//   console.log(endTime - startTime + "ms");

// }

// function setTime2(index, flg, year, month, time, day, user) {

//   if (flg) {
//     //user
//     const userSheet = SpreadsheetApp.openByUrl(user[2])
//     let monthSheet = userSheet.getSheetByName(`${year}.${month}`)
//     if (!monthSheet) {
//       const template = userSheet.getSheetByName("作業表雛形")
//       monthSheet = template.copyTo(userSheet).setName(`${year}.${month}`)
//       const setMonth = year + "年" + month + "月"
//       monthSheet.getRange("A4:D5").setValue(setMonth)
//       monthSheet.getRange("AD2:AI2").setValue(user[0])
//       console.log(setMonth)
//     }
//     monthSheet.getRange(index, 4 + Number(day)).setValue(time)
//   }
// }

// function setRest2(index, year, month, time_1, day, user) {


//   const userSheet = SpreadsheetApp.openByUrl(user[2])
//   const monthSheet = userSheet.getSheetByName(`${year}.${month}`)

//   const dspTimeList = monthSheet.getRange(index, 4 + Number(day), monthSheet.getLastRow()).getDisplayValues().filter(String).flat()

//   if (!dspTimeList.includes(time_1)) {

//     const setTimeIndex = monthSheet.getRange(index, 4 + Number(day), monthSheet.getLastRow()).getValues().filter(String).length + index

//     monthSheet.getRange(setTimeIndex, 4 + Number(day)).setValue(time_1)


//     const getIndex = setTimeIndex - index + 1
//     const restTimeList = monthSheet.getRange(index, 4 + Number(day), getIndex, 1).getValues()
//     console.log(restTimeList)

//     let restTime = 0
//     for (let i = 0, j = 1; i < restTimeList.length; i += 2, j += 2) {
//       if (restTimeList[j] && restTimeList[i]) {
//         const diff = restTimeList[j][0] - restTimeList[i][0];
//         restTime = diff + restTime
//         console.log(restTime);
//       }
//     }
//     const hour = Math.floor(restTime / 1000 / 60 / 60);
//     const minute = Math.floor(restTime / 1000 / 60) % 60;

//     console.log(hour + ":" + minute)
//     monthSheet.getRange(restTimeWidth, 4 + Number(day)).setValue(hour + ":" + minute + ":00")
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

