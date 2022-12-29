var shell = require('shelljs');
require('dotenv').config();

const REPO_PUSH_URL = process.env.REPO_PUSH_URL;
const REPO_PUSH_AUTHOR = process.env.REPO_PUSH_AUTHOR;

if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
}

shell.cd('./project');

if (shell.exec('git init').code !== 0) {
    shell.echo('Error: Git init failed');
    shell.exit(1);
}
if (shell.exec('git config user.email ' + REPO_PUSH_AUTHOR).code !== 0) {
    shell.echo('Error: Git config user.email failed');
    shell.exit(1);
}
if (shell.exec('git remote add origin ' + REPO_PUSH_URL).code !== 0) {
    shell.echo('Error: Git config add origin failed');
    shell.exit(1);
}
if (shell.exec('git add .').code !== 0) {
    shell.echo('Error: Git add . failed');
    shell.exit(1);
}
if (shell.exec('git commit -m "Auto-generated commit"').code !== 0) {
    shell.echo('Error: Git commit failed');
    shell.exit(1);
}
if (shell.exec('git push --force --set-upstream origin main').code !== 0) {
    shell.echo('Error: Git push failed');
    shell.exit(1);
}