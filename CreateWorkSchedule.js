/* メニューバー勤務表一括作成 **/

function onOpen() {
  var ui = SpreadsheetApp.getUi()
  var menu = ui.createMenu("勤務表作成")
  menu.addItem("勤務表一括作成", "myFunction")
  menu.addToUi();

}

function myFunction() {

  /* 納品フォルダを取得 **/
  var parentFolder = DriveApp.getFolderById("1khQtIYs9fTjVRCIgBZF-PseaJoAs67hK")
  /* 雛形 **/
  var driveFile = DriveApp.getFileById("189umhDpITxdl0wdbo7HvKdPsKt8ZvRGd83klftQvU-o");

  var files = parentFolder.getFiles()


  /* ファイルを複製 **/
  const fileNames = []
  while (files.hasNext()) {
    const file = files.next();
    fileNames.push(file.getName())
  }

  Values00.forEach(function (value, i) {
    const name = value[0];
    const sarchName = fileNames.indexOf(`勤務表_${name}`);
    if (sarchName == -1) {
      const fileName = `勤務表_${name}`
      const makeFile = driveFile.makeCopy(fileName, parentFolder);
      employeeList.getRange(i + rangeIndex, 3).setValue(makeFile.getUrl())
      const ss = SpreadsheetApp.openByUrl(makeFile.getUrl()).getSheetByName("作業表雛形")
      ss.getRange("AD2:AI2").setValue(`${name}`)
    }
  });

}