This project helps to sync local n8n workflows with remote host.


### Installation - Local

1. Install node.js ( https://nodejs.org/en/download/ ) and n8n ( `npm install n8n -g` )
2. Clone or "Save as zip" this repo. The most important is ./workbench folder - you might want to rename it as well. You can safely remove all other files in the root folder, except the ones in the ./workbench folder
3. Create your private repo for the project, e.g. on bitbucket 
4. Create 2 access tokens at https://bitbucket.org/%username%/%reponame%/admin/access-tokens: with read rights (for remote pull) and with read+write rights (for local push) 
5. Add lines to the ./workbench/.env: 
> REPO_PULL_URL="https://x-token-auth:xxx" - bitbucket url for pull

> REPO_PUSH_URL="https://x-token-auth:xxx" - bitbucket url for push

> REPO_PUSH_AUTHOR="xxx@bots.bitbucket.org"- bitbucket email for push


### Installation - Host
1. Install node.js ( https://nodejs.org/en/download/ ) and n8n ( `npm install n8n -g` )
2. Manually copy ./workbench folder to the host (most important is to keep `.env` outside of repo)
3. !!! For now, its needed to sync the encryption key manually. Copy it from the Local to Host (it is stored in ~/.n8n/config by default). Soon i'll add it to the .env 

### Workflow - Local
1. Ensure you're in ./workbench folder (run `cd ./workbench`)
2. Run `npm install` - that will install modules that handle `.env`
3. Run `npm run export` - that will create folder "project" and export workflow and creds there
4. Run `npm run push` - that will push the exported workflows to the bitbucket

### Workflow - Host
1. Run `npm run pull` - that will use creds from .env and pull your private repo to the host
2. Run `npm run import` - that will import downloaded workflows and creds to the n8n instance
3. Run `n8n start` - and you should see all locally made workflows on the host  

Extra readings: 
https://www.genui.com/resources/env-variables-json 