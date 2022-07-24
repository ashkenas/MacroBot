const { MongoClient, ServerApiVersion } = require('mongodb');
const { REST } = require('@discordjs/rest');
const { Client, GatewayIntentBits, Routes } = require('discord.js');
const fs = require('fs');

const db = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let macros = null;
const client = new Client({ intents: [GatewayIntentBits.Guilds | GatewayIntentBits.GuildMessages] });
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const loadSlashCommands = async (clientID) => {
    const commands = fs.readdirSync('./commands')
        .filter(file => file.endsWith('.js'))
        .map((cmd) => require(`./commands/${cmd}`).data.toJSON());

    try {
        await rest.put(
            Routes.applicationCommands(clientID),
            { body: commands }
        );

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const loadEvents = (macros) => {
    const events = fs.readdirSync('./events')
        .filter(file => file.endsWith('.js'))
        .map((event) => require(`./events/${event}`));

    for (const event of events) {
        const action = (...args) => event.action(...args, client, macros);
        if (typeof event.name === 'string')
            client.on(event.name, action);
        else
            for (const name of event.name)
                client.on(name, action);
    }
};

client.on('ready', async () => {
    console.log('Online.');
    loadEvents(macros);
    if (!(await loadSlashCommands(client.user.id)))
        client.user.setPresence({ status: 'dnd', activities: [{ type: 'PLAYING', name: 'fatal error' }] });
});

db.connect((error) => {
    if (error)
        throw error;

    macros = db.db('macrobot').collection('macros');

    client.login(process.env.TOKEN);
});
