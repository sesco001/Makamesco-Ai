# MAKAMESCO_XMD - WhatsApp Multi-Device Bot

## Overview
A WhatsApp multi-device bot (MAKAMESCO_XMD) built with Node.js and the Baileys library. Provides automated features like auto-reply, anti-delete, media downloading, stickers, AI chat, and various command-based utilities.

## Architecture
- **Runtime**: Node.js 20
- **Entry Point**: `control.js` — main bot logic + Express keep-alive server on port 5000
- **Config**: `set.js` — loads environment variables and exports settings
- **Plugins**: `plugins/` — modular command handlers (AI, downloader, group management, etc.)
- **Core helpers**: `fredi/` — command registry (`ezra.js`), Baileys wrappers
- **Lib**: `lib/` — middleware for anti-link, banning, welcome, warn, level, etc.
- **luckydatabase/**: Re-exports from `lib/` for plugin compatibility
- **Session**: `scan/` — WhatsApp auth credentials stored here
- **Data storage**: `fredie/` — JSON files for all bot data (bans, warns, antilien, etc.)

## Running the App
The workflow runs: `PORT=5000 node control.js`

On first start (no SESSION_ID), the bot displays a QR code in the console. Scan it with WhatsApp to connect.

## Key Environment Variables (set as Replit Secrets)
- `SESSION_ID` — WhatsApp session string (prevents QR scan on restart). Get from the pairing tool.
- `OWNER_NAME` — Bot owner's display name
- `NUMERO_OWNER` — Owner phone number (with country code, no +)
- `PREFIX` — Command prefix (default: `+`)
- `PUBLIC_MODE` — `yes` for public mode, `no` for private mode (owner only)
- `BOT_NAME` — Display name of the bot
- `DATABASE_URL` — PostgreSQL URL (optional, falls back to local SQLite)
- `OPENAI_API_KEY` — For AI chat features
- `AUTO_BIO` — Set to `yes` to auto-rotate bot WhatsApp bio

## Commands Added
### Group Commands
- `groupstatus` — Shows full group status (members, admins, description, creation date)
- `antisticker on/off` — Block/allow stickers in a group (admin only)
- `antilink on/off` — Block/allow links in a group
- `antibot on/off` — Block/allow other bots in a group
- `tagall` — Tag all group members
- `promote` / `demote` — Admin management
- `remove` — Kick a member
- `group open/close` — Lock/unlock group
- `gname` / `gdesc` — Change group name/description
- `info` — Show group info with image

### General Commands
- `ping`, `alive`, `menu` — Bot status commands
- `sticker` / `steal` — Create stickers
- `tts` — Text to speech
- `warn` — Warning system
- And many more in plugins/

## Bug Fixes Applied
- Replaced removed `makeInMemoryStore` from newer baileys with compatible in-memory store
- Added try/catch around `updateProfileStatus` (was crashing when not connected)
- Fixed null reference in `loadMessage` (was crashing on store miss)
- Added graceful error handling for Express `EADDRINUSE`
- Removed dangerous self-reload `watchFile` on `control.js` that caused port conflicts
- Created `luckydatabase/` directory with all required module re-exports from `lib/`
- Created `lib/fredie/` directory with initial `antibot.json`
- Added QR code display using `qrcode-terminal` package
- Wrapped `groupAcceptInvite` / `newsletterFollow` in try/catch on connect
- Disabled deprecated `printQRInTerminal` option

## Deployment
Configured as a VM deployment (always-running bot). Run command: `node control.js`
