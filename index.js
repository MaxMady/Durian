const { Client, MessageActionRow, Collection, MessageButton,  } = require("discord.js");
const Discord = require(`discord.js`)
const fs = require('node:fs');
const path = require('node:path');
const app = require('express')();
const config = require('./.gitignore/config.json')
const { joinVoiceChannel } = require('@discordjs/voice');
const { QuickDB } = require("quick.db");

const client = (global.client = new Client({
    intents: 32767,
    allowedMentions: { parse: ["users"] },
    partials: ["CHANNEL"],
  }));  
const db = new QuickDB({ filePath: "./database/botDB.sqlite" });

app.get('/', async (req, res) => {
  res.send('Hello');
});

app.listen(3000, async () => {
  console.log('Listening on port 3000');
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}
process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  const admins = config.admins
  if (!admins.includes(interaction.member.id)) return await interaction.reply({ ephemeral: true, content: `You are not allowed to perform this!` })
  const command = client.commands.get(interaction.commandName);
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });

  }
});

client.on('ready', async () => {
  console.log(`Bot is running!`)
  const channel = await client.channels.cache.get(`1003869133026361364`)
  try {
    const connection = joinVoiceChannel({
	channelId: channel.id,
	guildId: channel.guild.id,
	adapterCreator: channel.guild.voiceAdapterCreator,
})
    console.log(`Joined VC!`)
  } catch(err) {
    console.log(err)
  }
})

client.on('messageCreate', async message => {
    let prefix = `d.`;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
})

client.login(config.token)

module.exports = client;