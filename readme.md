# Automatically download mockdata via script

## Introduction
If you test your Fiori app using [Qunit][2] or [One Page Acceptancetests (OPA5)][3] then you *must* (in case of [OPA5][3]) or *may* (in case of [Qunit][2]) use mockdata. Mockdata comprises `metadata.xml` and `*.json` data files. Changes to the `metadata.xml` makes it necessary to update these files in your Fiori project folder. This may happen often while the project is under development. This script automates the download of those files and edits the `*.json` files so that they can be consumed by the mockserver.

## How to install the script:
1. download and install [npm][1]
2. in this directory execute `npm install`

## How to run the download:
in this directory execute `grunt`

## How to configure the script:
Edit the file `Gruntfile.js`. The URL to the odata service must be entered directly in `Gruntfile.js` (currently defined as an odata service in UXT-928 - overwrite it with your odata service URL). User and password can be entered when the script is run. If you want to further enhance the script see [Grunt][4] on how to configure tasks.


[1]: https://nodejs.org/en/
[2]: https://qunitjs.com/
[3]: http://vesapui5.dhcp.wdf.sap.corp:1080/trac/sapui5/wiki/Documentation/AdvancedTopics/Opa
[4]: http://gruntjs.com/configuring-tasks
