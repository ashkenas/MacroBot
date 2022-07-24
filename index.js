const { REST } = require('@discordjs/rest');
const { Client, GatewayIntentBits, Routes } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds | GatewayIntentBits.GuildMessages] });
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const loadSlashCommands = async () => {
    const commands = fs.readdirSync('./commands')
        .filter(file => file.endsWith('.js'))
        .map((cmd) => require(`./commands/${cmd}`).data.toJSON());

    try {
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const loadEvents = () => {
    const events = fs.readdirSync('./events')
        .filter(file => file.endsWith('.js'))
        .map((event) => require(`./events/${event}`));

    for (const event of events) {
        if (typeof event.name === 'string')
            client.on(event.name, event.action);
        else
            for (const name of event.name)
                client.on(name, event.action);
    }
};

client.on('ready', async () => {
    console.log('Online.');
    loadEvents();
    if (!(await loadSlashCommands()))
        client.user.setPresence({ status: 'dnd', activities: [{ type: 'PLAYING', name: 'fatal error' }] });
});

client.login(process.env.TOKEN);
