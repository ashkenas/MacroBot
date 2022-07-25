# About
A discord bot that enables users to store macros for later inflation in their messages.

# Interacting With the Bot

## Creating Macros
This bot operates through interactions (slash commands). To store (or update) a macro, use the `/setmacro` command.

## Using Macros
To use a macro, just type the name exactly as you put it in the `/setmacro` command in any chat message. The bot will delete any message containing macros and resend it as the user with the macros inflated.

# Hosting the Bot
In order to host this bot, you will need the following:
- A Node.js environment of at least v16.9
- A MongoDB environment

Before running the bot, the following environmental variables must be set:
- `TOKEN` - The secret authentication token of the bot user.
- `MONGO_URI` - The connection URI of the MongoDB environment.

With the above set, the bot can be started with `node index.js`.
