const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;
const { EmbedBuilder , MessageActionRow, MessageButton} = require('discord.js')
const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: "./database/botDB.sqlite" });
module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('View your balance'),
  async execute(interaction) {
    await interaction.deferReply();
    const id = interaction.member.id
    
    let user = await db.get(`user_${id}`)
    if(user === null) {
        await interaction.editReply({content: `Please run \`/start\` inorder to create a profile`})
    } else {
        let embed = new EmbedBuilder()
        .setTitle(`${interaction.member.user.username}'s balance`)
        .addFields([{name:`Coins`, value:`${user.balance}`}])
        .setColor(`#FFA500`)
        await interaction.editReply({embeds:[embed]})
    }
  },
};