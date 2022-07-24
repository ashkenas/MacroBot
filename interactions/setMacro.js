module.exports = {
    name: 'setmacro',
    async action(interaction, client, macros) {
        const macroName = interaction.options.getString('name');
        const result = await macros.updateOne(
            { user: interaction.user.id, name: macroName.toLowerCase() },
            { $set: { macro: interaction.options.getString('macro') } },
            { upsert: true }
        );

        if (!result.acknowledged)
            throw error;

        interaction.editReply(`Macro '${macroName}' set successfully!`);
    }
};
