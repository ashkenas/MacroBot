const { Collection } = require('discord.js');
const fs = require('fs');

const interactions = new Collection();
fs.readdirSync('./interactions')
    .filter((file) => file.endsWith('.js'))
    .forEach((file) => {
        const interaction = require(`./interactions/${file}`);
        interactions.set(interaction.name, interaction.action);
    });

module.exports = {
    name: 'interactionCreate',
    action(interaction, client, macros) {
        (interactions.get(interaction.name))(interaction, client, macros);
    }
}
