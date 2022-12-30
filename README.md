This project helps to sync local n8n workflows with remote host.


### Installation - Local

1. Install node.js ( https://nodejs.org/en/download/ ), n8n ( `npm run n8n-install` ) and git
2. Clone or "Save as zip" this repo. The most important is ./workbench folder - you might want to rename it as well. You can safely remove all other files in the root folder
3. Create your private repo for the project, e.g. on bitbucket 
4. Create 2 access tokens at https://bitbucket.org/%username%/%reponame%/admin/access-tokens: with read rights (for remote pull) and with read+write rights (for local push) 
5. Run `npm i` - that will install all necessary modules
6. Add lines to the ./workbench/.env: 
> REPO_PULL_URL="https://x-token-auth:xxx" - bitbucket url for pull

> REPO_PUSH_URL="https://x-token-auth:xxx" - bitbucket url for push

> REPO_PUSH_AUTHOR="xxx@bots.bitbucket.org"- bitbucket email for push

> N8N_ENCRYPTION_KEY="n8n_long_secret_key" - encryption key


### Installation - Host
1. Install node.js ( https://nodejs.org/en/download/ ), n8n ( `npm run n8n-install` ) and git
2. Manually copy *./workbench* folder to the host (most important is to keep `.env` outside of repo)
3. Run `npm i` - that will install all necessary modules

### Workflow - Local
1. Ensure you're in *./workbench* folder (run `cd ./workbench`) 
2. Run `npm run ex` - that will **clean** folder *project*, export workflow and creds, clones your private repo, commit all changes and push them to the bitbucket

### Workflow - Host
1. Run `npm run im` - that will **clean** folder *project*, pull your private repo and import downloaded workflows and creds to the n8n instance
3. Run `npm run n8n` - that will run the n8n with encryption key from the `.env` and couple of other useful exports. Feel free to modify them 

Extra readings: 
https://www.genui.com/resources/env-variables-json 