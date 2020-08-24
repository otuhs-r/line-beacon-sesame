function doPost(e) {
  var event = JSON.parse(e.postData.contents).events[0];
  writeLog(event.type);

  if (event.type === 'beacon' && event.beacon.type === 'enter') {
    openSesame();
  }
}

function openSesame() {
  var auth_token = PropertiesService.getScriptProperties().getProperty('AUTH_TOKEN');
  var device_id = PropertiesService.getScriptProperties().getProperty('DEVICE_ID');
  var payload = { "command": "unlock" };
  var headers = { "Authorization": auth_token };
  var options = {
    "method": "post",
    "contentType": "application/json",
    "headers": headers,
    "payload": JSON.stringify(payload)
  };
  var url = "https://api.candyhouse.co/public/sesame/" + device_id;

  UrlFetchApp.fetch(url, options);

  return ContentService.createTextOutput("successfully processed!");
}

function writeLog(event_type) {
  var spreadsheetId = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('log');
  var row = sheet.getDataRange().getValues().length + 1;
  
  sheet.getRange(row, 1).setValue(new Date());
  sheet.getRange(row, 2).setValue(event_type);
}
