# n8n-workbench-syncer
This project helps to sync local n8n workflows with remote host. It uses private bitbucket repo (it is the only option atm) as a storage, so as a bonus you receive a full history of your workflows changes.

### Installation - Local

1. Install node.js ( https://nodejs.org/en/download/ ), n8n ( `npm run n8n-install` ) and git
2. Clone or "Save as zip" this repo
3. Create your private repo to store your workflows and creds, e.g. on the bitbucket 
4. Create 2 access tokens at https://bitbucket.org/%username%/%reponame%/admin/access-tokens: with read rights (for remote pull) and with read+write rights (for local push) 
5. Run `npm i` - it will install all necessary modules
6. Create file ./.env and add lines: 
```
REPO_PULL_URL="https://x-token-auth:xxx" - bitbucket url for pull
REPO_PUSH_URL="https://x-token-auth:xxx" - bitbucket url for push
REPO_PUSH_AUTHOR="xxx@bots.bitbucket.org"- bitbucket email for push
N8N_ENCRYPTION_KEY="n8n_long_secret_key" - encryption key
```
7. Optonally, you can add more settings in order to configure n8n instance:
```
N8N_TEMPLATES_ENABLED=false
N8N_USER_MANAGEMENT_DISABLED=true
N8N_METRICS=true
EXECUTIONS_DATA_PRUNE=true
EXECUTIONS_DATA_MAX_AGE=168
```

### Installation - Host
1. Install node.js ( https://nodejs.org/en/download/ ), n8n ( `npm run n8n-install` ) and git
2. Manually copy root folder to the host (most important is to keep `.env` outside of repo)
3. Run `npm i` - it will install all necessary modules

### Workflow - Local
1. Run `npm run ex` - (*export*) it will create new folder *project*, export your current workflow and creds, clones your private repo, commit all changes and push them to the bitbucket

### Workflow - Host
1. Run `npm run imr` - (*import* + *run*) it will create folder *project*, pull your private repo, import downloaded workflows and creds to the n8n instance, and run n8n with envs variables

## Known issues
1. Sometimes there’s an error “resource is busy” during the n8n run. Just re-run "npm run imr" (or "npm run n8n"), it will fix the issue.
2. Workflows statuses are exported as well. So before the export, it’s important to enable the ones you wish to run on the host. Or enable them manually on the host afterwards, whatever you prefer.
3. Sometimes i note "sql update" issues. Mostly probably, it is caused by newer n8n version usage. I just wipe the database (*%username%\.n8n* folder), as all workflows are going to be imported anyways.