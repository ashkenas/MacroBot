module.exports = {
    name: 'messageCreate',
    async action(message, client, macros) {
        if (message.author.bot)
            return;

        await message.fetch();

        const matches = [...message.content.matchAll(/{(.*?)}/g)];
        if (!matches.length)
            return;

        let successes = 0;
        const replacements = {};
        for (let [fm, macroName] of matches) {
            macroName = macroName.trim().toLowerCase();
            if (!replacements[macroName]) {
                try {
                    const result = await macros.findOne({ user: message.author.id, name: macroName });
                    if (result) {
                        successes++;
                        replacements[macroName] = result.macro;
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }

        if (!successes)
            return;

        let newMessage = message.content.replaceAll(/{(.*?)}/g, (match, macroName) => {
            return replacements[macroName.trim().toLowerCase()] ?? match;
        });

        const webhooks = await message.channel.fetchWebhooks();
        let webhook = webhooks.find((webhook) => webhook.name === 'MacroBot-Webhook');
        if (!webhook)
            webhook = await message.channel.createWebhook({ name: 'MacroBot-Webhook' });

        const params = {
            content: newMessage,
            allowedMentions: { parse: ['users'] },
            username: message.member.displayName,
            avatarURL: message.member.displayAvatarURL()
        };

        if (message.hasThread)
            params.threadId = message.thread.id;

        await webhook.send(params);
        await message.delete();
    }
};
