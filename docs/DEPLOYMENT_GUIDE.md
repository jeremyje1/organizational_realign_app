# Deployment Guide

## Environments
| Env | Host | Branch | Notes |
|-----|------|--------|-------|
| **Dev** | Vercel Preview | any PR | Ephemeral preview |
| **Staging** | Vercel – `northpath‑stg` | `develop` | Mirrors production settings |
| **Prod** | Vercel – `northpath‑prod` | `main` | Protected branch |

### Steps

1. Push to `main` → GitHub Action runs:  
   * `pnpm install`  
   * `pnpm test`  
   * `pnpm build`  
2. When tests pass, action triggers Vercel production deployment.  
3. Fly.io app (`ora‑api`) redeploys via `fly deploy --detach`.  

Rollback: redeploy previous Vercel build from dashboard → triggers UI version pin.
