var shell = require('shelljs');
require('dotenv').config();

const REPO_PULL_URL = process.env.REPO_PULL_URL;

if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
}

shell.rm('-rf', './project');

if (shell.exec('git clone ' + REPO_PULL_URL + ' ./project').code !== 0) {
    shell.echo('Error: Git clone failed');
    shell.exit(1);
}

shell.cd('./project');

if (shell.exec('git checkout main').code !== 0) {
    shell.echo('Error: Git checkout failed');
    shell.exit(1);
}

shell.rm('-rf','.git');
shell.cd('..');