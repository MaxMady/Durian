const { SlashCommandBuilder } = require("@discordjs/builders");
const wait = require("node:timers/promises").setTimeout;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const discord = require('discord.js')
const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: "./database/botDB.sqlite" });
const rarity = require('../database/mine.js');
const mine = require('../funtions/mine.js')
let msg;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mine")
    .setDescription("Mine for resources and exchange for coins and fruits"),
  async execute(interaction) {
    await interaction.deferReply();
    const id = interaction.member.id;

    let user = await db.get(`user_${id}`);
    if (user === null) {
      await interaction.editReply({
        content: `Please run \`/start\` inorder to create a profile`,
      });
    } else {
      let embed = new EmbedBuilder()
        .setTitle(`Mining`)
        .setDescription(
          `Mining resources will enable you to exchange them for coins and fruits!\n> Probe Interval: \`60s\`\n**Mining has been started!**`
        )
        .setColor(`#006400`);
      await interaction.editReply({ embeds: [embed] });
      const i = Math.floor(new Date() / 1000);
      let mine1 = new EmbedBuilder()
        .setTitle(`Mine Post`)
        .setDescription(`Next Post in: <t:${i + 60}:R>`)
        .setColor(`#006400`);
      interaction.channel.send({ embeds: [mine1] });
      let bal = 0;
      let y = 0;
      let int = setInterval(function() {
        if(y < 5) {
          
          let res = run(y, bal)
          bal+=res
          const collector = interaction.channel.createMessageComponentCollector({ time: 15000 })
          collector.on('collect', async i => {
            if(i.user.id === interaction.user.id) {
              if(i.customId === `continue`) {
                let row =  new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId(`DOGGO`).setLabel(`Mine`).setStyle(ButtonStyle.Success).setDisabled(true),new ButtonBuilder().setCustomId(`oko`).setLabel(`Stop`).setStyle(ButtonStyle.Secondary).setDisabled(true))
                await i.update({content: `Mining has been continued...`, components: [row]})
              } else {
                let row =  new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId(`DOGGO`).setLabel(`Mine`).setStyle(ButtonStyle.Success).setDisabled(true),new ButtonBuilder().setCustomId(`oko`).setLabel(`Stop`).setStyle(ButtonStyle.Secondary).setDisabled(true))
                await i.update({content: `Cashed out with ${bal} bits!`, components: [row]})
                clearInterval(int)
              }
            }
          })
          y++
          console.log(y)
        } else {
          const embed =  new EmbedBuilder()
          .setTitle(`Jackpot`)
          .setDescription(`You recieved a jackpot of x7 by mining down straight!\n> Total Earnings: ${bal*7}`)
          .setColor(`Gold`)
          interaction.channel.send({embeds: [embed]})
          clearInterval(int)
        }
      }, 5000)

      function run(x, bal) {
          let res = mine(x)
          let item = res[0]
          let total = res[1]
          let str = ``;
          item.forEach(e => {
            str+= `x${JSON.stringify(e.count)} ${e.item}, `
          })
          const embed = new EmbedBuilder()
          .setTitle(`Mine Post!`)
          .setColor(`#006400`)
          .setDescription(`**__Resources Found__**\n> ${str}\n> **Earnings: ${total}**\nTotal: ${bal+total}`)
          const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
            .setLabel(`Mine`)
            .setStyle(ButtonStyle.Success)
            .setCustomId(`continue`),
            new ButtonBuilder()
            .setCustomId(`stop`)
            .setStyle(ButtonStyle.Secondary)
            .setLabel(`Stop`)
          );
          if(msg) msg.delete()
          interaction.channel.send({embeds: [embed], components:[row]}).then(ad => {
            msg = ad
          })
        return total;
      }
    }
  },
};
