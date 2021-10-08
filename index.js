//client stuff
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS] });
//packages and json stuff
const config = require('./config.json');
const akinator = require("discord.js-akinator");
const { Connect4, RockPaperScissors, TicTacToe } = require('discord-gamecord')
const zoom =  require('./zoom.json')
const link = (zoom.zoomL)
var CronJob = require('cron').CronJob;
const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
	warnThreshold: 5, // Amount of messages sent in a row that will cause a warning.
	muteThreshold: 10, // Amount of messages sent in a row that will cause a mute
	kickThreshold: 10000, // Amount of messages sent in a row that will cause a kick.
	banThreshold: 100000, // Amount of messages sent in a row that will cause a ban.
	maxInterval: 3000, // Amount of time (in milliseconds) in which messages are considered spam.
	warnMessage: '{@user}, Kindly stop spamming or severe punishments will happen!', // Message that will be sent in chat upon warning a user.
	muteMessage: '**{user_tag}** has been muted for spamming uncontrollably.',// Message that will be sent in chat upon muting a user.
	maxDuplicatesWarning: 3, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesKick: 1000, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesBan: 1200, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesMute: 6, // Ammount of duplicate message that trigger a mute.
	ignoredPermissions: [ 'ADMINISTRATOR'], // Bypass users with any of these permissions.
	ignoreBots: true, // Ignore bot messages.
	verbose: true, // Extended Logs from module.
	ignoredMembers: [], // Array of User IDs that get ignored.
	muteRoleName: "Lockdown", // Name of the role that will be given to muted users!
	removeMessages: false
});




var bad = ['fuck' , 'bitch' , 'fck' , 'btch' , 'vagina', 'dick', 'shit' ,  'sht' , 'gago' , 'shet' , 'tangina' , 'putangina' , 'sh1t' , 'pakshet', 'pakyu']

client.on('messageCreate', message => antiSpam.message(message)); 
client.on("messageCreate", async message => { 
	if(bad.some(word => message.content.toLowerCase().includes(word))){
		const splitMessage = message.content.split(" ");
		if(splitMessage.some(word => message.content.toLowerCase().includes(word))){
			message.delete()
			const auhor = message.author.id
			message.channel.send({content: '<@' + auhor + '> ' + 'swearing is not allowed here :)'})
		}


	}else if(message.content.includes('https://shellshock.io/')){
		message.channel.send({content: "<@&885496383900102667> SHELL SHOCKERS LINK HAS BEEN SENT"})
	
	}else if(message.content.toLowerCase().startsWith("ignt rules")){
	message.channel.send({content: "1. No fighting, swearing, or anything that might disturb peace in our land.\n2. No ruining of other people's houses, stealing, and killing.\n3. No trespassing! Ask the people who built the place first before entering their premises.\n4. Treat Ignite's MC server as a community that helps each other! Time to apply what you've learned in Convenience"})

	}else if(message.content.toLowerCase().includes("ignt uptime")){
		let totalSeconds = (client.uptime / 1000);
		let days = Math.floor(totalSeconds / 86400);
		totalSeconds %= 86400;
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = Math.floor(totalSeconds % 60);
		let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
		message.channel.send({content: uptime})

	}else if(message.content.toLowerCase().startsWith("ignt ip")){
		message.channel.send({content: "**--IGNITE OFFICIAL MINECRAFT SERVER--**\nIP: us-01.infernalnodes.com:25642"})
	}else if(message.content.toLowerCase().startsWith("ignt aki")){
		const language = "en"; //The Language of the Game
		const childMode = true; //Whether to use Akinator's Child Mode
		const gameType = "character"; //The Type of Akinator Game to Play. ("animal", "character" or "object")
		const useButtons = true; //Whether to use Discord's Buttons

		akinator(message, {
			language: language, //Defaults to "en"
			childMode: childMode, //Defaults to "false"
			gameType: gameType, //Defaults to "character"
			useButtons: useButtons //Defaults to "false"
		});
	}else if(message.content.toLowerCase().startsWith("ignt c4")){
		if (!message.mentions.users.first()){
			message.channel.send({content: "Please specify a player to play with e.g.`ignt c4 @unjown`"})
			return
		}
		
		new Connect4({
			message: message,
			slash_command: false,
			opponent: message.mentions.users.first(),
			embed: {
			  title: 'Connect 4',
			  color: '#5865F2',
			},
			emojis: {
			  player1: '🔵',
			  player2: '🟡'
			},
			waitMessage: 'Waiting for the opponent...',
			turnMessage: '{emoji} | Its turn of player **{player}**.',
			winMessage: '{emoji} | **{winner}** won the game!',
			gameEndMessage: 'The game went unfinished :(',
			drawMessage: 'It was a draw!',
			othersMessage: 'You are not allowed to use buttons for this message!',
			askMessage: 'Hey {opponent}, {challenger} challenged you for a game of Connect 4!',
			cancelMessage: 'Looks like they refused to have a game of Connect4. \:(',
			timeEndMessage: 'Since the opponent didnt answer, i dropped the game!',
		  }).startGame()
	}else if(message.content.toLowerCase().startsWith("ignt rps")){
		if (!message.mentions.users.first()){
			message.channel.send({content: "Please specify a player to play with e.g.`ignt c4 @unjown`"})
			return
		}
		new RockPaperScissors({
			message: message,
			slash_command: false,
			opponent: message.mentions.users.first(),
			embed: {
			  title: 'Rock Paper Scissors',
			  description: 'Press a button below to make a choice!',
			  color: '#5865F2',
			},
			buttons: {
			  rock: 'Rock',
			  paper: 'Paper',
			  scissors: 'Scissors',
			},
			emojis: {
			  rock: '🌑',
			  paper: '📃',
			  scissors: '✂️',
			},
			othersMessage: 'You are not allowed to use buttons for this message!',
			chooseMessage: 'You choose {emoji}!',
			noChangeMessage: 'You cannot change your selection!',
			askMessage: 'Hey {opponent}, {challenger} challenged you for a game of Rock Paper Scissors!',
			cancelMessage: 'Looks like they refused to have a game of Rock Paper Scissors. \:(',
			timeEndMessage: 'Since the opponent didnt answer, i dropped the game!',
			drawMessage: 'It was a draw!',
			winMessage: '{winner} won the game!',
			gameEndMessage: 'The game went unfinished :(',
		  }).startGame();
	}else if(message.content.toLowerCase().startsWith("ignt ttt")){
		if (!message.mentions.users.first()){
			message.channel.send({content: "Please specify a player to play with e.g.`ignt c4 @unjown`"})
			return
		}
		new TicTacToe({
			message: message,
			slash_command: false,
			opponent: message.mentions.users.first(),
			embed: {
			  title: 'Tic Tac Toe',
			  overTitle: 'Game Over',
			  color: '#5865F2',
			},
			oEmoji: '🔵',
			xEmoji: '❌',
			blankEmoji: '➖',
			oColor: 'PRIMARY',
			xColor: 'DANGER',
			waitMessage: 'Waiting for the opponent...',
			turnMessage: '{emoji} | Its now **{player}** turn!',
			askMessage: 'Hey {opponent}, {challenger} challenged you for a game of Tic Tac Toe!',
			cancelMessage: 'Looks like they refused to have a game of Tic Tac Toe. \:(',
			timeEndMessage: 'Since the opponent didnt answer, i dropped the game!',
			drawMessage: 'It was a draw!',
			winMessage: '{emoji} | **{winner}** won the game!',
			gameEndMessage: 'The game went unfinished :(',
		  }).startGame();
		  
	}
});


client.on("guildMemberAdd", (member) => {
	console.log(member);
});
const job = new CronJob('00 55 8 * * 0', function() {
	const d = new Date();
	client.channels.cache.get('876363970108334162').send({content: "@everyone REMINDER: IGNITE SUNDAYS WILL BE OFFICIALLY STARTING IN 5 MINS\nZOOM LINK:" + link})
},
null,
true,
'Asia/Manila'
					);

const job2 = new CronJob('00 30 8 * * 0', function() {
	const d = new Date();
	client.channels.cache.get('876363970108334162').send({content: "@everyone REMINDER: IGNITE SUNDAYS WILL BE OFFICIALLY STARTING IN 30 MINS\nZOOM LINK:" + link})
},
null,
true,
'Asia/Manila'
);

const job3 = new CronJob('00 30 19 * * 5', function() {
	const d = new Date();
	client.channels.cache.get('876363970108334162').send({content: "@everyone REMINDER: FRIDAYS SUNDAYS WILL BE OFFICIALLY STARTING IN 30 MINS\nZOOM LINK:" + link})
},
null,
true,
'Asia/Manila'
);

const job4 = new CronJob('00 55 19 * * 5', function() {
	const d = new Date();
	client.channels.cache.get('876363970108334162').send({content: "@everyone REMINDER: IGNITE FRIDAYS WILL BE OFFICIALLY STARTING IN 5 MINS\nZOOM LINK:" + link})
},
null,
true,
'Asia/Manila'
);

job.start();
job2.start();
job3.start();
job4.start();



client.login(config.token);
