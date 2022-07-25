module.exports = {
    name: 'deletemacro',
    async action(interaction, client, macros) {
        const macroName = interaction.options.getString('name');
        const result = await macros.deleteOne(
            { user: interaction.user.id, name: macroName.toLowerCase() }
        );

        if (!result.acknowledged)
            throw 'Query not acknowledged by server.';

        interaction.editReply(`Macro '${macroName}' deleted successfully!`);
    }
};
