const Discord = require('discord.js');
const db = require('../../database').afk;

exports.run = async (client, message, args) => {
    try {

        const afk = await db.fetch(message.author.id);
        //ignore AFK
        const reason = args.join(' ');

        if (!afk) {
            message.channel.send(`**${message.author.tag}** telah AFK! \n**Alasan:** ${reason ? reason : "AFK"}`, { disableMentions: 'all' })
            setTimeout(() => {
                db.set(message.author.id, { alasan: reason || 'AFK', time: Date.now() });
            }, 7000);
        } else {
            db.delete(message.author.id);
        };


    } catch (error) {
        return message.channel.send(`Something went wrong: ${error.message}`);
        // Restart the bot as usual.
    };
};



exports.conf = {
    aliases: ["away"],
    cooldown: 10
}

exports.help = {
    name: 'afk',
    description: 'menambahkan status afk pada user',
    usage: 'k!afk [reason]',
    example: 'k!afk YNTKTS'
}
