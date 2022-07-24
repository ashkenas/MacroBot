const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setmacro')
        .setDescription('Create or update a macro.')
        .addStringOption((option) => 
            option.setName('name')
                .setDescription('The macro name.')
                .setRequired(true))
        .addStringOption((option) =>
            option.setName('macro')
                .setDescription('The macro value.')
                .setRequired(true))
};
