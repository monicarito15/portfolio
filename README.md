# carolina-mera.com — Portfolio

Personal portfolio website for Carolina Mera, full-stack and mobile developer based in Trondheim, Norway.

Live at: [www.carolina-mera.com](https://www.carolina-mera.com)

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** — build tool
- **Tailwind CSS v4** — utility-first styling
- **Azure Static Web Apps** — hosting + CI/CD
- **Azure Functions** — serverless API proxy for the chatbot
- **Claude API (Anthropic)** — AI assistant
- **Cloudflare** — DNS + CDN

## Features

- Aurora background animation with bento grid layout
- Animated skill bars with IntersectionObserver
- Floating AI chatbot powered by Claude API (secured via Azure Functions)
- Fully responsive design
- Automatic deployment via GitHub Actions on push to `main`

## Project Structure

```
src/
  components/       # React components (Hero, About, Projects, Skills, Contact, Chatbot)
  data/
    portfolio.ts    # All content data (projects, skills, experience, etc.)
  index.css         # Global styles, animations, design tokens
  App.tsx           # Root component

api/
  src/functions/
    chat.ts         # Azure Function — Claude API proxy
```

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

### Running the API locally

Requires [Azure Functions Core Tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local).

```bash
cd api
npm install
func start
```

Set `ANTHROPIC_API_KEY` as an environment variable before starting the function.

## Environment Variables

| Variable | Where | Description |
|----------|-------|-------------|
| `ANTHROPIC_API_KEY` | Azure Static Web Apps → Configuration | Anthropic API key for the chatbot |

## Deployment

Deployment is automatic via GitHub Actions. Every push to `main` triggers a build and deploy to Azure Static Web Apps.

The workflow file is at `.github/workflows/azure-static-web-apps-*.yml`.
