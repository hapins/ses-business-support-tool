# ses-business-support-tool
This tool supports the SMB SES companies.  
Main functions are bellow.
- create purchase order contract data from spreadsheet automatically.
- create pdf and store to the google drive.
- link created data to the CloudSign.
- link created data to the freee (in progress).

# Setup
## Operating environment
- Node.js >= v12.0

## Procedure
1. Please clone this repository.
2. Install package  
```
npm ci
```

# Usage
## Setup env & upload script
1. Create google apps script project.
2. Copy project id from url.  
```
https://script.google.com/home/projects/<ProjectId>
```
3. Paste to .clasp.json > scriptId.
4. Create a root google drive folder. (Contract data and files will be stored to this folder)
5. Copy drive id from url.  
```
https://drive.google.com/drive/folders/<FolderId>
```
6. Paste to src/env.ts > googleDrive.rootFolderId.
7. Setup src/env.ts, src/constants.ts according to your environment.
4. Push code to google apps script project with this command.  
```
npx clasp push
```

## Publish script
1. Deploy script.  
```
Deploy > New Deployment > Select Type > Library > Add Description > Deploy
```
2. Copy library id from published url.  
```
https://script.google.com/macros/library/d/<LibraryId>
```

## Use from google spread sheet
1. Create copy file from the template spread sheet.
2. Open script editor form copied spread sheet.
3. Import library.
4. Input library info.  
```
ScriptId : copied library id.
Version  : published version (initial value=1)
ID       : custom name for library. (ex. BusinessSupportTool)
```
5. Create button function and link the tool method.  
```
[sample]

function createOrderContract() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert('Start creating contract.', ui.ButtonSet.OK);
  if (response === ui.Button.OK) {
    try {
        BusinessSupportTool.createLowerOrderContract()
    } catch (error) {
        console.error(error)
        ui.alert('Error is occurred.。 Error: ' + error);
        return
    }
    ui.alert('Completed.');
  }
}
```
6. Set this function to create purchase order button.

## [Optional] Add cloud sign api client key
1. Open library script project.
2. Change to legacy editor.
3. Open project setting.  
```
File  > Project properties > Script properties
```
4. Add property.  
```
name: cloudSignClientId
value: api client key (Copy from CloudSign admin console)
```
5. Republish library.  
```
Deploy > Manage deployments > Edit > Version(New version) > Deploy
```

# Contribution
- Fork it
- Create your feature branch (git checkout -b new-feature)
- Commit your changes (git commit -am 'Add some feature')
- Push to the branch (git push origin new-feature)
- Create new Pull Request at https://github.com/hapins/ses-business-support-tool

# License
This software is released under the MIT License, see LICENSE.txt.
