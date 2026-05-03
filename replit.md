# MAKAMESCO_XMD - WhatsApp Multi-Device Bot

## Overview
A WhatsApp multi-device bot (MAKAMESCO_XMD / Babyboy) built with Node.js and the Baileys library. Provides automated features like auto-reply, anti-delete, media downloading, stickers, AI chat, and various command-based utilities for WhatsApp users.

## Architecture
- **Runtime**: Node.js 20
- **Entry Point**: `control.js` — main bot logic + Express keep-alive server
- **Config**: `set.js` — loads environment variables and exports settings
- **Plugins**: `plugins/` — modular command handlers (AI, downloader, group management, etc.)
- **Core helpers**: `fredi/` — command registry (`ezra.js`), Baileys wrappers
- **Lib**: `lib/` — middleware for anti-link, banning, welcome messages, etc.
- **Session**: `scan/` — WhatsApp auth credentials stored here

## Running the App
The workflow runs: `PORT=5000 node control.js`

The Express server starts on port 5000 serving a basic health check at `/`.
The bot connects to WhatsApp using the SESSION_ID environment variable.

## Key Environment Variables
Set these in Replit Secrets:
- `SESSION_ID` — WhatsApp session credentials (required for bot to connect)
- `OWNER_NAME` — Bot owner's name
- `NUMERO_OWNER` — Owner's phone number (with country code, no +)
- `PREFIX` — Command prefix (default: `+`)
- `PUBLIC_MODE` — `yes` for public, `no` for private
- `BOT_NAME` — Display name of the bot
- `DATABASE_URL` — PostgreSQL connection URL (optional, uses local SQLite fallback)
- `OPENAI_API_KEY` — For AI chat features

## Dependencies
Installed via `npm install --legacy-peer-deps`.

Key packages:
- `gifted-baileys` (aliased as `@whiskeysockets/baileys`) — WhatsApp Web API
- `express` — HTTP keep-alive server
- `sequelize` + `pg` — Database ORM (PostgreSQL/SQLite)
- `fluent-ffmpeg` — Media processing
- `wa-sticker-formatter` — Sticker creation
- `pino` — Logging

## Patches Applied
- Replaced removed `makeInMemoryStore` from newer baileys with a compatible in-memory store implementation
- Created `lib/fredie/` directory with initial `antibot.json` file

## Deployment
Configured as a VM deployment (always-running bot). Run command: `node control.js`
