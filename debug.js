// function testdoPost() {
//   const timeStamp = 1638284400
//   const text = "<@U026RH5CYV9>【勤務表を提出】"
//   const userName = sarchUserName(text);
//   const employeSheet = sarchEmploye(userName)
//   const channel = "C02CF2HMB19"


//   if (channel == "C02CF2HMB19") {
//     testGeneralChannel(employeSheet, timeStamp, text)
//   }
//   if (channel == "C02CF2HMB19" && text.includes("【勤務表を提出】")) {
//     testToKurasinoChannel(employeSheet, timeStamp, text)
//   }
// }

// /**
//  * #0-0_to_kurasinoチャンネル
//  */

// function testToKurasinoChannel(employeSheet, timeStamp, text) {

//   const datetime = new Date(timeStamp * 1000);
//   datetime.setMonth(datetime.getMonth() - 1)
//   const year = datetime.getFullYear()
//   // const month = datetime.getMonth() + 1
//   var month = ('0' + (datetime.getMonth() + 1)).slice(-2);
//   const day = ('0' + datetime.getDate()).slice(-2);
//   const hour = ('0' + datetime.getHours()).slice(-2);
//   const minute = ('0' + datetime.getMinutes()).slice(-2);
//   const time = hour + ":" + minute

//   if (employeSheet) {

//     const userSheet = SpreadsheetApp.openByUrl(employeSheet[2])
//     var list = userSheet.getSheetByName(`${year}.${month}`)

//     let protections = list.protect();
//     protections.removeEditors(protections.getEditors());
//     protections.setDescription("オーナー権限");

//     const doc = DriveApp.getFileById(userSheet.getId())
//     access = DriveApp.Access.PRIVATE;
//     permission = DriveApp.Permission.EDIT;
//     doc.setSharing(access, permission);


//   } else {
//     logTime2(time, month, day, text)
//   }
// }


// /**
//  * #0-1総務_勤怠チャンネル
//  */

// function testGeneralChannel(employeSheet, timeStamp, text) {

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

// }

// function setTime2(index, flg, year, month, time, day, user) {

//   if (flg) {
//     //user
//     const userSheet = SpreadsheetApp.openByUrl(user[2])
//     let monthSheet = userSheet.getSheetByName(`${year}.${month}`)
//     if (!monthSheet) {
//       const ss = SpreadsheetApp.openById("1K_PSeBuE-gx5dQcayYFee9zSYSGfBfzaM90CVf7y6eU")
//       const template = ss.getSheetByName("作業表雛形")
//       monthSheet = template.copyTo(userSheet).setName(`${year}.${month}`)
//       const setMonth = year + "年" + month + "月"
//       monthSheet.getRange("A4:D5").setValue(setMonth)
//       monthSheet.getRange("AD2:AI2").setValue(user[0])
//       console.log(setMonth)
//     }
//     monthSheet.getRange(index, columnNum + Number(day)).setValue(time)
//   }
// }

// function setRest2(index, year, month, time_1, day, user) {

//   // 個人スプレッドシートURL
//   const userSheet = SpreadsheetApp.openByUrl(user[2])
//   const monthSheet = userSheet.getSheetByName(`${year}.${month}`)

//   const restTimeValues = monthSheet.getRange(index, columnNum + Number(day), monthSheet.getLastRow())

//   let dspTimeList = restTimeValues.getDisplayValues().filter(String).flat()
//   const setTimeIndex = restTimeValues.getValues().filter(String).length + index

//   const setVal = dspTimeList.indexOf(time_1) == -1 ? dspTimeList.push(monthSheet.getRange(setTimeIndex, columnNum + Number(day)).setValue(time_1).getDisplayValue()) : false

//   //時間をセットした場合true・計算する
//   if (setVal) {
//     const getIndex = setTimeIndex - index + 1
//     const restTimeList = monthSheet.getRange(index, columnNum + Number(day), getIndex, 1).getValues()
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
//     monthSheet.getRange(restTimeWidth, columnNum + Number(day)).setValue(hour + ":" + minute + ":00")
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

