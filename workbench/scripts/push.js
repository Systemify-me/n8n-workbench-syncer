var shell = require('shelljs');
require('dotenv').config();

const REPO_PUSH_URL = process.env.REPO_PUSH_URL;
const REPO_PUSH_AUTHOR = process.env.REPO_PUSH_AUTHOR;
const REPO_PULL_URL = process.env.REPO_PULL_URL;

if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
}

shell.rm('-rf','./gitpush');

if (shell.exec('git clone ' + REPO_PULL_URL + ' ./gitpush').code !== 0) {
    shell.echo('Error: Git clone failed');
    shell.exit(1);
}

shell.cd('./gitpush');

if (shell.exec('git checkout main').code !== 0) {
    shell.echo('Error: Git checkout failed');
    shell.exit(1);
}

if (shell.exec('git config user.email ' + REPO_PUSH_AUTHOR).code !== 0) {
    shell.echo('Error: Git config user.email failed');
    shell.exit(1);
}

if (shell.exec('git remote remove origin' ).code !== 0) {
    shell.echo('Error: Git remove origin failed');
    shell.exit(1);
}

if (shell.exec('git remote add origin ' + REPO_PUSH_URL).code !== 0) {
    shell.echo('Error: Git add origin failed');
    shell.exit(1);
}

shell.cp("-ruf", "./../project/workflows", ".");
shell.cp("-ruf", "./../project/credentials", ".");

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

shell.cd("..");
shell.rm('-rf','./gitpush');
