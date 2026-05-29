# CompliantIQ — Infrastructure & Deployment Reference

Generated: 2026-05-29

---

## GitHub Repository

- **Repo:** https://github.com/novavidagroup/compliantiq
- **Org:** novavidagroup
- **Default Branch:** main
- **Structure:**
  - `/backend` — Node.js/Express API (deployed to Render)
    - `/frontend` — React/Vite app (deployed to Vercel)

    ---

    ## Frontend — Vercel

    - **Project Name:** compliantiq-v3
    - **Team/Account:** novavida-group (mikecfurman-7283)
    - **Production URL:** https://compliantiq-v3.vercel.app
    - **Git Source:** novavidagroup/compliantiq — branch: main
    - **Latest Deployment Commit:** 36ed1ca ("Initial commit")
    - **Deployment Status:** Ready (Production)
    - **Build Duration:** ~32s
    - **Preview URLs:**
      - https://compliantiq-v3-git-main-novavida-group.vercel.app
      - **Framework:** Vite + React
      - **Vercel Dashboard:** https://vercel.com/novavida-group/compliantiq-v3

      ### Vite Config (frontend/vite.config.ts)

      ```ts
      import { defineConfig } from 'vite'
      import react from '@vitejs/plugin-react'
      import path from 'path'
      import tailwindcss from 'tailwindcss'
      import autoprefixer from 'autoprefixer'

      export default defineConfig({
        plugins: [react()],
          css: {
              postcss: {
                    plugins: [tailwindcss, autoprefixer],
                        },
                          },
                            resolve: { alias: { '@': path.resolve(__dirname, './src') } }
                            })
                            ```

                            ---

                            ## Backend — Render

                            - **Service Name:** compliantiq
                            - **Service Type:** Web Service
                            - **Service ID:** srv-d8cehokp3tds73dpuk7g
                            - **Runtime:** Node
                            - **Plan:** Free (0.1 CPU, 512 MB RAM)
                            - **Region:** Oregon (US West)
                            - **Production URL:** https://compliantiq.onrender.com
                            - **Render Subdomain:** Enabled
                            - **Git Source:** https://github.com/novavidagroup/compliantiq
                            - **Branch:** main
                            - **Root Directory:** `backend`
                            - **Build Command:** `npm install --include=dev && npm run build`
                            - **Start Command:** `npm start`
                            - **Auto-Deploy:** On Commit (enabled)
                            - **Git Credentials:** mikecfurman@gmail.com
                            - **Render Dashboard:** https://dashboard.render.com/web/srv-d8cehokp3tds73dpuk7g

                            > **Note:** Free tier spins down with inactivity — cold starts can take 50+ seconds. Upgrade instance to avoid this in production.

                            ---

                            ## Database — Supabase

                            - **Organization:** Novavida Group (Free Plan)
                            - **Org ID:** drzylntlmrrywqawvwna
                            - **GitHub Connected:** novavidagroup (mikecfurman@gmail.com)

                            ### Project: compliantiq-prod

                            - **Cloud Provider:** AWS
                            - **Region:** us-west-2
                            - **Plan:** Nano
                            - **Dashboard:** https://supabase.com/dashboard/org/drzylntlmrrywqawvwna

                            ---

                            ## Email — SendGrid

                            - **Account:** mikecfurman@gmail.com / novavidagroup

                            ### Domain Authentication (Pending)

                            | Status  | Domain                           |
                            |---------|----------------------------------|
                            | Pending | em616.www.novavidagroup.com      |
                            | Pending | em4180.www.vitalityondemand.com  |

                            ### Link Branding (Pending)

                            | Status  | Domain                          |
                            |---------|---------------------------------|
                            | Pending | url4845.www.vitalityondemand.com |

                            > **Action Required:** DNS records need to be added at your domain registrar to complete domain authentication and link branding setup. Until verified, emails may land in spam.

                            ---

                            ## Environment Variables

                            Environment variables are set per-service (not committed to repo).

                            ### Frontend (Vercel) — set in Vercel Dashboard

                            All frontend env vars must be prefixed with `VITE_` to be exposed to the browser:

                            ```
                            VITE_SUPABASE_URL=
                            VITE_SUPABASE_ANON_KEY=
                            VITE_API_URL=https://compliantiq.onrender.com
                            ```

                            ### Backend (Render) — set in Render Environment tab

                            ```
                            NODE_ENV=production
                            SUPABASE_URL=
                            SUPABASE_SERVICE_ROLE_KEY=
                            SENDGRID_API_KEY=
                            PORT=10000
                            ```

                            ---

                            ## Architecture Overview

                            ```
                            User Browser
                                |
                                    v
                                    Vercel (Frontend - React/Vite)
                                    https://compliantiq-v3.vercel.app
                                        |
                                            v
                                            Render (Backend - Node/Express)
                                            https://compliantiq.onrender.com
                                                |
                                                    v
                                                    Supabase (Database + Auth)
                                                    AWS us-west-2 — compliantiq-prod
                                                        |
                                                        SendGrid (Transactional Email)
                                                        Domain auth pending
                                                        ```

                                                        ---

                                                        ## Key Links

                                                        | Service    | URL |
                                                        |------------|-----|
                                                        | Live App   | https://compliantiq-v3.vercel.app |
                                                        | Backend API | https://compliantiq.onrender.com |
                                                        | GitHub Repo | https://github.com/novavidagroup/compliantiq |
                                                        | Vercel Dashboard | https://vercel.com/novavida-group/compliantiq-v3 |
                                                        | Render Dashboard | https://dashboard.render.com/web/srv-d8cehokp3tds73dpuk7g |
                                                        | Supabase Dashboard | https://supabase.com/dashboard/org/drzylntlmrrywqawvwna |
                                                        | SendGrid | https://app.sendgrid.com/settings/sender_auth |
