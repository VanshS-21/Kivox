const fs = require('fs');
const report = JSON.parse(fs.readFileSync('C:/Users/SUPER/AppData/Local/Temp/chrome-devtools-mcp-JcvZOW/report.json', 'utf8'));
const contrast = report.audits['color-contrast'];
if(contrast && contrast.details && contrast.details.items) {
    console.log("Contrast issues:");
    contrast.details.items.forEach(i => console.log(i.node.snippet));
}
