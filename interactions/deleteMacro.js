module.exports = {
    name: 'deletemacro',
    async action(interaction, client, macros) {
        const macroName = interaction.options.getString('name');
        const result = await macros.deleteOne(
            { _id: `${interaction.user.id}${macroName.trim().toLowerCase()}` }
        );

        if (!result.acknowledged)
            throw 'Query not acknowledged by server.';

        interaction.editReply(`Macro '${macroName}' deleted successfully!`);
    }
};
