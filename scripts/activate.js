const shell = require('shelljs'),
    fs = require('fs'),
    path = require('path');

const workflowsPath = path.join(__dirname, '..', 'project', 'workflows'),
    files = fs.readdirSync(workflowsPath);

files.forEach(function (file) {
    const fullFilename = path.join(workflowsPath, file);
    const content = fs.readFileSync(fullFilename, 'utf8');
    const jsonContent = JSON.parse(content);
    const workflowName = jsonContent.name;

    jsonContent.active = workflowName.startsWith("[A]");

    fs.writeFileSync(fullFilename, JSON.stringify(jsonContent, null, 2), 'utf8');

    console.log(file + " - '" + workflowName + "' - Active is set to: " + jsonContent.active); 
});
    
