# calima monitor

Mobile app by [Club Calima](https://caliman.org) — an engineering-led startup incubator building good software

A dead-simple Expo app that wraps our internal monitoring dashboard in a full-screen WebView. Built so collaborators can install it on their phones and check on their services from anywhere — as long as they're connected to our magic DNS

## what's running behind it

self hosting stack:

- **[Grafana](https://grafana.com)** — dashboards for metrics and logs
- **[Loki](https://grafana.com/oss/loki/)** — log aggregation (think: lightweight ELK alternative)
- **[Prometheus](https://prometheus.io)** — metrics scraping and alerting
- **[Tailscale](https://tailscale.com)** — private overlay network with magic DNS, so `monitor.your-domain.org` just works on any enrolled device without exposing anything to the public internet

You can run this exact setup on a VPS or a Raspberry Pi. Check out [grafana/loki](https://github.com/grafana/loki) and the [Tailscale docs](https://tailscale.com/kb/1017/install) to get started.

## current access model

Right now access is via **Grafana's admin credentials** — you install the app, connect to Tailscale, and log in with the admin password. Simple, works great for a small team of collaborators who already trust each other.

## what's coming

This is intentionally minimal for now. Planned improvements:

- **Proper auth** — Grafana SSO (OAuth/OIDC) so each person has their own account, no shared passwords
- **Role-based access** — read-only viewers vs editors vs admins
- **Native feel** — bottom nav between key dashboards without going through the Grafana web UI
- **Notifications** — push alerts for critical thresholds via Grafana alerting webhooks

## use this yourself

You'll need:

1. A Tailscale account and at least one node running your monitoring stack
2. Your Grafana reachable via a magic DNS name (e.g. `monitor.your-domain.org`)
3. Node.js 18+ and Expo CLI on your dev machine

```bash
npm install
cp .env.example .env
# set EXPO_PUBLIC_MONITOR_URL=http://monitor.your-domain.org in .env
```

## running on device

This app uses `react-native-webview` (a native module) so **Expo Go won't work**. You need a development build:

```bash
# iOS
npx expo run:ios --device

# Android
npx expo run:android --device
```

After the first native build, `npx expo start` is enough for hot reload during development.

## project structure

```
app/(tabs)/index.tsx   ← the whole app, basically just a WebView
app.json               ← Expo config
.env.example           ← env var reference
```

## built with

- [Expo](https://expo.dev) + [Expo Router](https://docs.expo.dev/router/introduction/)
- [react-native-webview](https://github.com/react-native-webview/react-native-webview)
- [Tailscale](https://tailscale.com) for private networking
