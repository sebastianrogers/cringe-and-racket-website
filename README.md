# cringe-and-racket-website
The web site for Cringe and racket

A static website (plain HTML/CSS, no build step) with Home, About Us, Events, Electronic Press Kit and Blog pages.
Deploy the repository root to Azure Static Web Apps (app location `/`, no API, no build).

## Deployment (Azure Static Web Apps)

The workflow `.github/workflows/azure-static-web-apps.yml` deploys the site on every push to `main`. Pull requests get a temporary preview environment, which is removed when the PR is closed (previews are skipped for PRs from forks).

### 1. Create the Static Web App

Azure portal:

1. Go to **Create a resource > Static Web App**.
2. Choose a subscription and resource group, enter a name, and select the **Free** plan.
3. Under **Deployment details**, select **Other** as the source. The workflow in this repo handles deployment.
4. Select **Review + create**, then **Create**.

Or with the Azure CLI:

```bash
az login
az group create --name cringe-and-racket-rg --location westeurope
az staticwebapp create --name cringe-and-racket --resource-group cringe-and-racket-rg --location westeurope --sku Free
```

### 2. Get the deployment token

Portal: open the Static Web App, select **Overview > Manage deployment token**, and copy the token.

CLI:

```bash
az staticwebapp secrets list --name cringe-and-racket --resource-group cringe-and-racket-rg --query "properties.apiKey" -o tsv
```

### 3. Add the GitHub secret

In the GitHub repository go to **Settings > Secrets and variables > Actions > New repository secret** and add:

| Name | Value |
|------|-------|
| `AZURE_STATIC_WEB_APPS_API_TOKEN` | The deployment token from step 2 |

`GITHUB_TOKEN` is provided automatically by GitHub Actions and needs no setup.

### 4. Deploy

Push to `main` (or re-run the workflow from the **Actions** tab). The site URL is shown on the Static Web App **Overview** page. Treat the deployment token as a password. If it leaks, reset it under **Manage deployment token** and update the secret.
