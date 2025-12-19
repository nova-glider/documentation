---
title: Self Host
---

# Self Hosting NovaGlider

::: details Table of Contents
[[toc]]
:::

## What can you self host?

All of NovaGliders source is available on GitHub but the only things you can actually self host are more limited:

Main services:

- The homepage
- The dashboard
- The backend (sort of)

Extra's:

- This documentation (coming in the future)

Self hosting the homepage is fairly simple as it is just a website where you edit the content.
The dashboard is easy to self host but here's the catch: it needs the backend, which you can self host,
but will never be updated with our data. You'd need to either have your own base station updating data
on your backend or use our backend, which is unavailable for the public.

## Docker

1. Make sure you have `git` and `docker` installed
2. Run these commands to set up all the files.

```bash
git clone https://github.com/nova-glider/website
git clone https://github.com/nova-glider/backend
git clone --branch development https://github.com/nova-glider/dashboard
mv website/docker-compose-example.yml compose.yml
```

3. Start docker

```bash
docker compose up -d
```

4. The services will be available in ports 3000, 3001 and 3002

- Homepage: `http://localhost:3000`

- Backend: `http://localhost:3001`

- Dashboard: `http://localhost:3002`

---

### Using Caddy

We currently use Caddy as our reverse-proxy and we've made it very easy for you to do so too.
Let's assume you followed the previous steps to download the project.

1. You just need to move the Caddyfile and use a different docker compose example as template:

```bash
mv website/docker-compose-example.yml compose.yml
mv website/Caddyfile Caddyfile
```

2. You will have to edit the Caddyfile to use your own domain name instead of the default `novaglider.mooo.com`.

::: details What to edit?

```Caddy {1}
novaglider.mooo.com {           # change this!

        handle_path /dashboard* {
                reverse_proxy dashboard:3002
        }

        handle_path /api* {
                reverse_proxy backend:3001
        }

        reverse_proxy homepage:3000
}
```

:::

::: tip
You can also provide your own Caddyfile, eg. when you want to use subdomains instead of paths.
:::

3. Once you did all that, all that's left is starting the compose stack.

```bash
docker compose up -d
```

4. Point the domain you put in your Caddyfile to the public IP address of the server where everything is running.

5. The services will be available on the appropriate path:

- Homepage: `https://example.com`

- Backend: `https://example.com/api`

- Dashboard: `http://example.com/dashboard`

::: warning
You still need to append an extra `/api` to actually fetch the api --> `https://example.com/api/api/sensor-data/get/latest`
:::

