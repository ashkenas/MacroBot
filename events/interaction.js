const { Collection } = require('discord.js');
const fs = require('fs');

const interactions = new Collection();
fs.readdirSync('./interactions')
    .filter((file) => file.endsWith('.js'))
    .forEach((file) => {
        const interaction = require(`../interactions/${file}`);
        interactions.set(interaction.name, interaction.action);
    });

module.exports = {
    name: 'interactionCreate',
    async action(interaction, client, macros) {
        await interaction.reply({ content: 'Processing...', ephemeral: true });
        try {
            await (interactions.get(interaction.commandName))(interaction, client, macros);
        } catch (error) {
            console.error(error);
            await interaction.editReply('An error occured! Please try again.');
        }
    }
};
