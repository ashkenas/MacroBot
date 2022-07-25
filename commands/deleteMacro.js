const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deletemacro')
        .setDescription('Delete a macro.')
        .addStringOption((option) => 
            option.setName('name')
                .setDescription('The macro name.')
                .setRequired(true))
};
