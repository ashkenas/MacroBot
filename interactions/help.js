const { EmbedBuilder } = require("@discordjs/builders");

module.exports = {
    name: 'help',
    async action(interaction, client, macros) {
        await interaction.editReply({
            content: '',
            embeds: [
                new EmbedBuilder()
                    .setTitle('Macro Help')
                    .setDescription('This bot allows you to set macros you can use in your messages.')
                    .setColor(16748800)
                    .addFields(
                        { name: 'Macro Management', value: '`/setmacro` - Create or edit a macro.\n`/deletemacro` - Delete a macro.' },
                        { name: 'Using Your Macros', value: 'Just send a message with the name of one of your macros in curly braces. For example, if you have a macro called `rules`, include `{rules}` in your message and it will be replaced with the macro.' }
                    )
            ] 
        });
    }
};
