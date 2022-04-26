/* メニューバー勤務表一括作成 **/

// function onOpen() {
//   var ui = SpreadsheetApp.getUi()
//   var menu = ui.createMenu("勤務表作成")
//   menu.addItem("勤務表一括作成", "myFunction")
//   menu.addToUi();

// }

function myFunction() {

  /* 納品フォルダを取得 **/
  const parentFolder = DriveApp.getFolderById("1khQtIYs9fTjVRCIgBZF-PseaJoAs67hK");
  /* 雛形 **/
  var driveFile = DriveApp.getFileById("1yLrEpatANvFqlIcCopD_kq6Z2k9DKXwRz6y5cKkSIwE");

  /**社員一覧 */
  const employeeListSheet = containerSheet.getSheetByName("社員一覧_2021年度");

  const [header00, ...Values] = employeeListSheet.getDataRange().getValues();

  var files = parentFolder.getFiles()


  /* ファイルを複製 **/
  const fileNames = []
  while (files.hasNext()) {
    const file = files.next();
    fileNames.push(file.getName())
  }

  // 初期値
  const rangeIndex = 1;

  Values.forEach(function (value, i) {
    const name = value[0];
    const sarchName = fileNames.indexOf(`2022年度勤務表_${name}`);
    i++
    // if (sarchName === -1) {
    //   const fileName = `2022年度勤務表_${name}`
    //   const makeFile = driveFile.makeCopy(fileName, parentFolder);
    //   employeeListSheet.getRange('C' + (rangeIndex + i)).setValue(makeFile.getUrl());
    //   const ss = SpreadsheetApp.openByUrl(makeFile.getUrl()).getSheetByName("作業表雛形")
    //   ss.getRange("AD2:AI2").setValue(`${name}`);
    // }
    chownIfNeeded(value[2])
  });
}

function chownIfNeeded(fileOrFolder) {
  const ss = SpreadsheetApp.openByUrl(fileOrFolder)
  const ssOpen = DriveApp.getFileById(ss.getId())
  // if (ssOpen.getOwner().getEmail() === me) {
    ssOpen.setOwner("tanimoto@kurasino.jp");
  // }
}
