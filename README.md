# About
A discord bot that enables users to store macros for later inflation in their messages.

# Interacting With the Bot

## Macro Management
This bot operates through interactions (slash commands).

- To store (or update) a macro, use the `/setmacro` command.
- To delete a macro, use the `/deletemacro` command.

## Using Macros
To use a macro, just send a chat message including the macro name surrounded by curly braces. For example, to expand a macro called `rules`, send a message containing `{rules}`.

Macros are expanded in place and the surrounding message content will remain intact.

Macros are user specific (but not server specific). You cannot use someone else's macros.

# Hosting the Bot
In order to host this bot, you will need the following:
- A Node.js environment of at least v16.9
- A MongoDB environment

Before running the bot, the following environmental variables must be set:
- `TOKEN` - The secret authentication token of the bot user.
- `MONGO_URI` - The connection URI of the MongoDB environment.

With the above set, the bot can be started with `node index.js`.
