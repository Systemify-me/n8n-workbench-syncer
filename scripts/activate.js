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
    const workflowId = jsonContent.id;

    const shouldBeActive = workflowName.startsWith("[A]");

    shell.exec("n8n update:workflow --id=" + workflowId + " --active=" + shouldBeActive);
    
    // Old approach, before n8n v0.226
    //jsonContent.active = shouldBeActive;
    //fs.writeFileSync(fullFilename, JSON.stringify(jsonContent, null, 2), 'utf8');

    console.log(file + " - '" + workflowName + "' with id '" + workflowId + "' - Active is set to: " + shouldBeActive); 
});
    
