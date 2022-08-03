const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;
const { MessageEmbed , MessageActionRow, MessageButton} = require('discord.js')
const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: "./database/botDB.sqlite" });
const fruits = require('../database/fruits.js')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Start your career'),
  async execute(interaction) {
    await interaction.deferReply();
    const id = interaction.member.id
    
    let user = await db.get(`user_${id}`)
    if(user === null) {
        let i = Math.floor(Math.random()*fruits.length)
        let new_user = {
            level: 1,
            xp_boost: false,
            fruits: 1,
            default: fruits[i],
            balance: 0
        }
        await db.set(`user_${id}`, new_user)
        await interaction.editReply(`Welcome to the world of fruits where everything is juicy!\n You have recieved a **${fruits[i]}** as your starter fruit!`)        
    } else {
        await interaction.editReply({content:`You already have a profile!`, ephemeral: true})
    }
  },
};