module.exports = {
    name: 'setmacro',
    async action(interaction, client, macros) {
        const macroName = interaction.options.getString('name');
        const result = await macros.updateOne(
            { _id: `${interaction.user.id}${macroName.trim().toLowerCase()}` },
            { $set: { macro: interaction.options.getString('macro') } },
            { upsert: true }
        );

        if (!result.acknowledged)
            throw 'Query not acknowledged by server.';

        interaction.editReply(`Macro '${macroName}' set successfully!`);
    }
};
