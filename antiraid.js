﻿const { MessageEmbedField } = require("discord.js");

request = require("request"),
Discord = require("discord.js"),
bot = new Discord.Client();
figlet = require('figlet');
colors = require('colors');
readline = require('readline');
ping = require('ping-lite');
dns = require('dns')
fs = require("fs");
sleep = require('system-sleep');
authorized = ["707957934717534371"],
COOLDOWN = new Set();
bot.commands = new Discord.Collection();
dm = ["707957934717534371"],
con = console.log
prefix = ("&");
serverid = ['738038344818229338']
bot.login("NzY2OTUyODM0OTMxMzU5ODA0.X4q2fQ.frRozy_ZsLpBj_3k7j83x5vGqpo");
function getNow(strType) {
  let strReturn = '';
  switch (strType) {
      case 'date':
          strReturn = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", day: "2-digit", month: "2-digit", year: "2-digit" });
          break;
      case 'time':
          strReturn = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
          break;
      case 'datetime':
          strReturn = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", hour12: false, day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).replace(',', '');
          break;
  }
  return strReturn;
}
 
 

var
limitedc = 1 // La lmite de suppression channels /2min
dc = 0  
limiteban = 2 // limite de bannisement/2min
ban = 0
limitecr = 1 // limite de  création des rôles/ 2min
cr = 0
limiterd = 2 // limite de suppression de role
rd = 0
limitekick = 2 // limite kick/2min )
kick = 0
limitecc = 2
cc = 0

 
bot.on('ready', () => {
  process.title = ("SProtect v1.0")
  console.clear();

            console.log(`v1.0  `.blue + `   
                                                                                                                    
                           ©️ Saiko
                           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`.white + `
                                                     
                                         [`.red+`+`.white +`]`.red+` Informations :`.red+`  
                                                        ├──`.white+` Connecté sous`.red+` ${bot.user.tag}`.white+`
                                                        ├── `.white+`Discord API :`.red+` ${Discord.version}`.white
                                 


            )

             
            var RESETBAN = setInterval (function () {
  ban = 0
  dc = 0
  cc = 0
  cr = 0
  cd = 0
  rd = 0
  kick = 0
 
  con(`${getNow('time')} - [WARNING] Les compteurs sont remis a 0 !`.blue)
  }, 1 * 100000);

  con(`Scan du serveur..`.green)

 

});

bot.on("webhookUpdate", async chan => {
  const guild = bot.guilds.get(`${serverid}`)
  const terminal = bot.channels.find(c => c.name === "SProtect-logs")
  guild.fetchWebhooks().then((webhooks) => {
    webhooks.forEach((webhook) => {
  if(webhook.owner.id == "728605551067398205") return;

  webhook.delete() && terminal.send('`' + getNow('time') + '`> :warning: Attention ' + `@everyone, une tentative de création de WebHook a été faite sur le channel ${chan} par l'utilisateur **${webhook.owner.tag}** ` + '`' + webhook.owner.id + '`' + ` [ ${webhook.owner} ]`)
    })
 })
 });

bot.on('channelDelete', async c => {

try {
  if(dc < limitedc) {
    dc++
   con(getNow('time') + '- [PROTECT CHANNEL] - Compteur de salons supprimer : ' + dc)
  } else {
    dc++
    con(getNow('time').red + '-[WARNING] [PROTECT CHANNEL] - Compteur de salons supprimer: ' + dc)
    // Vérification des audit logs
    const entry = await c.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first())
const channmember = c.guild.member(entry.executor);
// Bannisement de l'auteur
channmember.ban('SProtect - CHANNEL PROTECT').catch(e => con(`${getNow('time')} - [ERROR] Impossible de ban l'utilisateur..`.red));
// Notification
const terminal = bot.channels.find(c => c.name === "SProtect-logs")
if (!terminal) return;
 const cd = new Discord.RichEmbed()
 .setAuthor("SProtect - AntiRaid","https://images-ext-2.discordapp.net/external/NxId9cYFUMiJ8FEsguPn-guvL45havZLRAlaeMacOKs/https/images-ext-2.discordapp.net/external/xm60vPDdyrVrF_fzUBzug4BND6Ekb9CBIWddzC4xcrg/%253Fwidth%253D440%2526height%253D440/https/media.discordapp.net/attachments/773258567007469568/784856289682391060/06a15a563818f8a5931aa0805ba24a4c.png?width=437&height=437")
 .setTitle("Une tentative de raid a été détecter !")
.setColor('RED')
.addField("Action : ",'**Suppression de salons**',true)
.addField('Auteur :', `${channmember}`,true)
.addField('Conséquence : Bannissement',true)
.setTimestamp()
terminal.send(cd)

for (id of dm) bot.users.get(id).send(cd)
   

c.guild.roles.forEach(role => {
  if(role.hasPermissions('ADMINISTRATOR')) {
  con(`${role.name} - Permissions Administrateur`.green)
  role.setPermissions(0).catch(e => con(`${getNow('time')} - [ERROR] Le rôle est trop haut (${e})`.red))
  }
  // suppression des permissions de gerer les rôles a tout les roles ayant cette permissions
  if(role.hasPermissions('MANAGE_CHANNELS')) {
    con(`${role.name} - Permissions salons`.green)
    role.setPermissions(0).catch(e => con(`${getNow('time')} - [ERROR] Le rôle est trop haut (${e})`.red))
    }
  });
  }
}
catch(error) {
  console.error(error);
}
  });
  bot.on('channelCreate', async c => {

    try {
      if(cc < limitecc) {
        cc++
       con(getNow('time') + '- [PROTECT CHANNEL] - Compteur de salons créer : ' + cc)
      } else {
        cc++
        con(getNow('time').red + '-[WARNING] [PROTECT CHANNEL] - Compteur de salons créer: ' + cc)
        // Vérification des audit logs
        const entry = await c.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first())
    const channmember = c.guild.member(entry.executor);
    // Bannisement de l'auteur
    channmember.ban('SProtect - CHANNEL PROTECT').catch(e => con(`${getNow('time')} - [ERROR] Impossible de ban l'utilisateur..`.red));
    // Notification
    const terminal = bot.channels.find(c => c.name === "SProtect-logs")
    if (!terminal) return;
     const cd = new Discord.RichEmbed()
     .setAuthor("SProtect - AntiRaid","https://images-ext-2.discordapp.net/external/NxId9cYFUMiJ8FEsguPn-guvL45havZLRAlaeMacOKs/https/images-ext-2.discordapp.net/external/xm60vPDdyrVrF_fzUBzug4BND6Ekb9CBIWddzC4xcrg/%253Fwidth%253D440%2526height%253D440/https/media.discordapp.net/attachments/773258567007469568/784856289682391060/06a15a563818f8a5931aa0805ba24a4c.png?width=437&height=437")
     .setTitle("Une tentative de raid a été détecter !")
    .setColor('RED')
    .addField('Action : ','**Ajout de salons**')
    .addField('Auteur :', `${channmember}`)
    .addField('Conséquence : Bannissement',true)
.setTimestamp()
    terminal.send(cd)
    
    for (id of dm) bot.users.get(id).send(cd)
       
    
    c.guild.roles.forEach(role => {
      if(role.hasPermissions('ADMINISTRATOR')) {
      con(`${role.name} - Permissions administrateur`.green)
      role.setPermissions(0).catch(e => con(`${getNow('time')} - [ERROR] Le rôle est trop haut (${e})`.red))
      }
      // suppression des permissions de gerer les rôles a tout les roles ayant cette permissions
      if(role.hasPermissions('MANAGE_CHANNELS')) {
        con(`${role.name} - Permissions salons`.green)
        role.setPermissions(0).catch(e => con(`${getNow('time')} - [ERROR] Le rôle est trop haut (${e})`.red))
        }
      });
      }
    }
    catch(error) {
      console.error(error);
    }
      });
bot.on("guildBanAdd", async guild => {

try {
// Verifie si les bannisement en moins de 15 minutes sont inférieur de la limitation
if (ban < limiteban) {
  // Compter le bannisement
  ban++
  con(getNow('time')+ '- [PROTECT BAN] - Compteur de bannisement :' + ban)
} else {
  // Compter le banisement
  ban++
  con(getNow('time').red + '- [WARNING] [PROTECT BAN] - Compteur de bannisement :' + ban)
// Notification d'une activité non régulière
 
// Recherche dans les logs l'auteur des bannisement
const entry = await guild.fetchAuditLogs({type: 'BAN_MEMBERS'}).then(audit => audit.entries.first())
const banmember = guild.member(entry.executor);
// Bannir l'auteur des bannisement
banmember.ban('SProtect - ANTI BAN').catch(e => con(`[ERROR] Impossible de ban l'utilisatuer..`.red));
const terminal = bot.channels.find(c => c.name === "SProtect-logs")
if (!terminal) return;
 const bann = new Discord.RichEmbed()
 .setAuthor("SProtect - AntiRaid","https://images-ext-2.discordapp.net/external/NxId9cYFUMiJ8FEsguPn-guvL45havZLRAlaeMacOKs/https/images-ext-2.discordapp.net/external/xm60vPDdyrVrF_fzUBzug4BND6Ekb9CBIWddzC4xcrg/%253Fwidth%253D440%2526height%253D440/https/media.discordapp.net/attachments/773258567007469568/784856289682391060/06a15a563818f8a5931aa0805ba24a4c.png?width=437&height=437")
     .setTitle("Une tentative de raid a été détecter !")
    .setColor('RED')
.addField('Action : ','**Bannisement massif**')
.addField('Auteur :', `${banmember}`)
.addField('Conséquence : Bannissement',true)
.setTimestamp()
terminal.send(bann)

for (id of dm) bot.users.get(id).send(bann)
   
// suppression des permissions administrateur a tout les roles ayant cette permissions
guild.roles.forEach(role => {
if(role.hasPermission('ADMINISTRATOR')) {
con(`${role.name} - Permissions administrateur`.green)
role.setPermissions(0).catch(e => con(`[ERROR] Le rôle est trop haut (${e})`.red))
}
// suppression des permissions de bannir des membres a tout les roles ayant cette permissions
if(role.hasPermission('BAN_MEMBERS')) {
  con(`${role.name} - Permissions bannisement`.green)
  role.setPermissions(0).catch(e => con(`[ERROR] Le rôle est trop haut (${e})`.red))
  }
 
});
}
}
catch(error) {
  console.error(error);
}
  });
  bot.on('guildMemberRemove', async (member) => {
  let guild = bot.guilds.get(`${serverid}`)
try {
// Verifie si les bannisement en moins de 15 minutes sont inférieur de la limitation
if (kick < limitekick) {
  // Compter le bannisement
  kick++
  con(getNow('time')+ '- [PROTECT KICK] - Compteur de Kick :' + kick)
} else {
  // Compter le banisement
  kick++
  con(getNow('time').red + '- [PROTECT KICK] - Compteur de Kick :' + kick)
// Notification d'une activité non régulière
 
// Recherche dans les logs l'auteur des bannisement
const entry = await member.guild.fetchAuditLogs({type: 'KICK_MEMBERS'}).then(audit => audit.entries.first())
const kickm = guild.member(entry.executor);
if(guild.member(entry.executor) == "707957934717534371") return; //ID DU MEC QUI PEUT FuLL KICK
 
// Bannir l'auteur des raid qui a kick
kickm.ban('ANTIKICKALL FILSDEPUTE').catch(e => con(`[ERROR] Impossible de ban l'utilisatuer..`.red.rainbow));
const terminal = bot.channels.find(c => c.name === "SProtect-logs")
if (!terminal) return;
 const bann = new Discord.RichEmbed()
 .setAuthor("SProtect - AntiRaid","https://images-ext-2.discordapp.net/external/NxId9cYFUMiJ8FEsguPn-guvL45havZLRAlaeMacOKs/https/images-ext-2.discordapp.net/external/xm60vPDdyrVrF_fzUBzug4BND6Ekb9CBIWddzC4xcrg/%253Fwidth%253D440%2526height%253D440/https/media.discordapp.net/attachments/773258567007469568/784856289682391060/06a15a563818f8a5931aa0805ba24a4c.png?width=437&height=437")
 .setTitle("Une tentative de raid a été détecter !")
.setColor('RED')
.addField('Action : ','**Kick massif**')
.addField('Auteur :', `${kickm}`)
.addField('Conséquence : Bannissement',true)
.setTimestamp()
terminal.send(bann)

for (id of dm) bot.users.get(id).send(bann)
   
// suppression des permissions administrateur a tout les roles ayant cette permissions
guild.roles.forEach(role => {
if(role.hasPermission('ADMINISTRATOR')) {
con(`${role.name} - Permissions administrateur`.green)
role.setPermissions(0).catch(e => con(`[ERROR] Le rôle est trop haut (${e})`.red))
}
// suppression des permissions de bannir des membres a tout les roles ayant cette permissions
if(role.hasPermission('KICK_MEMBERS')) {
  con(`${role.name} - Permissions explusions`.green)
  role.setPermissions(0).catch(e => con(`[ERROR] Le rôle est trop haut (${e})`.red))
  }
 
});
}
}
catch(error) {
  console.error(error);
}
  });

   //---------------------------------------------------------------------ANTIPING------------------------------------------------------------------//
  bot.on('roleUpdate', async (oldRole, newRole) => {
    const guild = bot.guilds.get(`${serverid}`)
    if(newRole.hasPermission('ADMINISTRATOR' || newRole.hasPermission('MANAGE_CHANNELS') || newRole.hasPermission('MANAGE_ROLES') || newRole.hasPermission('MANAGE_WEBHOOKS'))) {
      const entry = await guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first())
      const adminmec = guild.member(entry.executor);
      if(guild.member(entry.executor) == `${authorized}`) return;

      adminmec.ban(`A mit les permissions admin à ${newRole.name} `).catch(console.error);
      newRole.setPermissions(0).catch(console.error);
      const terminal = bot.channels.find(c => c.name === "SProtect-logs")
 if(!terminal) return;
 terminal.send('`' + getNow('time') + '`> :warning: Attention ' + `@everyone, une tentative d'ajout des permissions sur le rôle ${newRole.name} par l'utilisateur **${adminmec.username}** ` + '`' + adminmec.id + '`' + ` [ ${adminmec} ]`)
      
    }
  });
  bot.on('roleUpdate', async (oldRole, newRole) => {
    const guild = bot.guilds.get(`${serverid}`)
    if(newRole.hasPermission('MANAGE_CHANNELS')) {
      const entry = await guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first())
      const adminmec = guild.member(entry.executor);
      if(guild.member(entry.executor) == `${authorized}`) return;

      adminmec.ban(`A mit les permissions admin à ${newRole.name} `).catch(console.error);
      newRole.setPermissions(0).catch(console.error);
      const terminal = bot.channels.find(c => c.name === "SProtect-logs")
 if(!terminal) return;
 terminal.send('`' + getNow('time') + '`> :warning: Attention ' + `@everyone, une tentative d'ajout des permissions sur le rôle ${newRole.name} par l'utilisateur **${adminmec.username}** ` + '`' + adminmec.id + '`' + ` [ ${adminmec} ]`)
      
    }
  });
  bot.on('roleUpdate', async (oldRole, newRole) => {
    const guild = bot.guilds.get(`${serverid}`)
    if(newRole.hasPermission('MANAGE_ROLES')) {
      const entry = await guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first())
      const adminmec = guild.member(entry.executor);
      if(guild.member(entry.executor) == `${authorized}`) return;
      adminmec.ban(`A mit les permissions admin à ${newRole.name} `).catch(console.error);
      newRole.setPermissions(0).catch(console.error);
      const terminal = bot.channels.find(c => c.name === "SProtect-logs")
 if(!terminal) return;
 terminal.send('`' + getNow('time') + '`> :warning: Attention ' + `@everyone, une tentative d'ajout des permissions sur le rôle ${newRole.name} par l'utilisateur **${adminmec.username}** ` + '`' + adminmec.id + '`' + ` [ ${adminmec} ]`)
      
    }
  });
  bot.on('roleUpdate', async (oldRole, newRole) => {
    const guild = bot.guilds.get(`${serverid}`)
    if(newRole.hasPermission('MANAGE_WEBHOOKS')) {
      const entry = await guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first())
      const adminmec = guild.member(entry.executor);
      if(guild.member(entry.executor) == `${authorized}`) return;
      adminmec.ban(`A mit les permissions admin à ${newRole.name} `).catch(console.error);
      newRole.setPermissions(0).catch(console.error);
      const terminal = bot.channels.find(c => c.name === "SProtect-logs")
 if(!terminal) return;
 terminal.send('`' + getNow('time') + '`> :warning: Attention ' + `@everyone, une tentative d'ajout des permissions sur le rôle ${newRole.name} par l'utilisateur **${adminmec.username}** ` + '`' + adminmec.id + '`' + ` [ ${adminmec} ]`)
      
    }
  });
  bot.on('roleUpdate', async (oldRole, newRole) => {
    const guild = bot.guilds.get(`${serverid}`)
    if(newRole.hasPermission('MANAGE_GUILD')) {
      const entry = await guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first())
      const adminmec = guild.member(entry.executor);
      if(guild.member(entry.executor) == `${authorized}`) return;
      adminmec.ban(`A mit les permissions admin à ${newRole.name} `).catch(console.error);
      newRole.setPermissions(0).catch(console.error);
      const terminal = bot.channels.find(c => c.name === "SProtect-logs")
 if(!terminal) return;
 terminal.send('`' + getNow('time') + '`> :warning: Attention ' + `@everyone, une tentative d'ajout des permissions sur le rôle ${newRole.name} par l'utilisateur **${adminmec.username}** ` + '`' + adminmec.id + '`' + ` [ ${adminmec} ]`)
      
    }
  });
 bot.on('roleUpdate', async (oldRole, newRole) => {
        if (newRole.mentionable) {
            // --
            newRole.setMentionable(false).catch(console.error);
            // --
            const auditLogs = await newRole.guild.fetchAuditLogs({
                type: 31
            });
            const entrie = auditLogs.entries.find(e => e.target == newRole && !e.executor.bot && e.changes[0].key == "mentionable" && e.changes[0].new == true);
            if (!entrie) return;
            // --
            const member = newRole.guild.members.get(entrie.executor.id);
            if (!member || !member.kickable || member.deleted) return;
            member.kick(`A rendu(e) le rôle ${newRole.name} mentionable.`).catch(console.error);
        }
    });






//---------------------------------------------------------------------ANTIPURGE------------------------------------------------------------------//

 



bot.on("roleDelete", async r => {
    const entry = await r.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
    const terminal = bot.channels.find(c => c.name === "SProtect-logs");
    if (!terminal) return;
    if (r.id == "753998349186629792") {
        r.guild.member(entry.executor).ban("Suppression role Membre").catch();
        terminal.send('`' + getNow('time') + '` ⚠️ Activité irréguliere detecté (`suppression du rôle membre`), suppressions des permissions a tout le monde! @everyone ');
        for (id of dm) bot.users.get(id).send(`> ⚠️ Activité irréguliere detecté **__suppression DU ROLE MEMBRE__**`)
       
        r.guild.roles.forEach(role => {
            if(role.hasPermissions('ADMINISTRATOR')) { 
                con(`${role.name} - Permissions administrateur`.green)
                role.setPermissions(0).catch(e => con(`${getNow('time')} - [ERROR] Le rôle est trop haut (${e})`.red))
            }
            // suppression des permissions de gerer les rôles a tout les roles ayant cette permissions
            if(role.hasPermissions('MANAGE_ROLES')) { 
                con(`${role.name} - Permissions Roles`.green)
                role.setPermissions(0).catch(e => con(`${getNow('time')} - [ERROR] Le rôle est trop haut (${e})`.red))
            }
        });
    }
});
 
  //----------------------------------------------------------------ANTI DEL ROLE-------------------------------------------------------------------//

// Détection des suppression/création des roles
bot.on("roleDelete", async r => {
try {
  if (rd < limiterd) {
    rd++
    con(getNow('time') + '- [PROTECT ROLES] - Compteur de rôles supprimé : ' + rd)
  } else {
    rd++
    con(getNow('time').red + '- [WARNING] [PROTECT ROLES] - Compteur de rôles supprimé : ' + rd)
// Vérification des audit logs
    const entry = await r.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first())
const chanmember = r.guild.member(entry.executor);
// Bannisement de l'auteur
chanmember.ban('antiraid rôles').catch(e => con(`${getNow('time')} - [ERROR] Impossible de ban l'utilisatuer..`.red));
// Notification
const terminal = bot.channels.find(c => c.name === "SProtect-logs")
if (!terminal) return;
const red = new Discord.RichEmbed()

.setAuthor("SProtect - AntiRaid","https://images-ext-2.discordapp.net/external/NxId9cYFUMiJ8FEsguPn-guvL45havZLRAlaeMacOKs/https/images-ext-2.discordapp.net/external/xm60vPDdyrVrF_fzUBzug4BND6Ekb9CBIWddzC4xcrg/%253Fwidth%253D440%2526height%253D440/https/media.discordapp.net/attachments/773258567007469568/784856289682391060/06a15a563818f8a5931aa0805ba24a4c.png?width=437&height=437")
     .setTitle("Une tentative de raid a été détecter !")
    .setColor('RED')
.addField('Action : ','**Suppression de rôles**')
.addField('Auteur :', `${chanmember}`)
.addField('Conséquence : Bannissement',true)
.setTimestamp()
terminal.send(red)
 
for (id of dm) bot.users.get(id).send(red)
   
r.guild.roles.forEach(role => {
  if(role.hasPermissions('ADMINISTRATOR')) {
  con(`${role.name} - Permissions administrateur`.green)
  role.setPermissions(0).catch(e => con(`${getNow('time')} - [ERROR] Le rôle est trop haut (${e})`.red))
  }
  // suppression des permissions de gerer les rôles a tout les roles ayant cette permissions
  if(role.hasPermissions('MANAGE_ROLES')) {
    con(`${role.name} - Permissions Roles`.green)
    role.setPermissions(0).catch(e => con(`${getNow('time')} - [ERROR] Le rôle est trop haut (${e})`.red))
    }
  });
  }
}
catch(error) {
  console.error(error);
}
  });
  bot.on("roleCreate", async r => {
    try {
      if (cr < limitecr) {
        cr++
        con(getNow('time') + '- [PROTECT ROLES] - Compteur de rôles créer : ' + cr)
      } else {
        cr++
        con(getNow('time').red + '- [WARNING] [PROTECT ROLES] - Compteur de rôles créer : ' + cr)
    // Vérification des audit logs
        const entry = await r.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first())
    const chanmember = r.guild.member(entry.executor);
    // Bannisement de l'auteur
    chanmember.ban('antiraid rôles').catch(e => con(`${getNow('time')} - [ERROR] Impossible de ban l'utilisatuer..`.red));
    // Notification
    const terminal = bot.channels.find(c => c.name === "SProtect-logs")
    if (!terminal) return;
    const red = new Discord.RichEmbed()
    
    .setAuthor("SProtect - AntiRaid","https://images-ext-2.discordapp.net/external/NxId9cYFUMiJ8FEsguPn-guvL45havZLRAlaeMacOKs/https/images-ext-2.discordapp.net/external/xm60vPDdyrVrF_fzUBzug4BND6Ekb9CBIWddzC4xcrg/%253Fwidth%253D440%2526height%253D440/https/media.discordapp.net/attachments/773258567007469568/784856289682391060/06a15a563818f8a5931aa0805ba24a4c.png?width=437&height=437")
     .setTitle("Une tentative de raid a été détecter !")
    .setColor('RED')
    .addField('Action : ','**création de rôles**')
    .addField('Auteur :', `${chanmember}`)
    .addField('Conséquence : Bannissement',true)
.setTimestamp()
    terminal.send(red)
     
    for (id of dm) bot.users.get(id).send(red)
       
    r.guild.roles.forEach(role => {
      if(role.hasPermissions('ADMINISTRATOR')) {
      con(`${role.name} - Permissions administrateur`.green)
      role.setPermissions(0).catch(e => con(`${getNow('time')} - [ERROR] Le rôle est trop haut (${e})`.red))
      }
      // suppression des permissions de gerer les rôles a tout les roles ayant cette permissions
      if(role.hasPermissions('MANAGE_ROLES')) {
        con(`${role.name} - Permissions Roles`.green)
        role.setPermissions(0).catch(e => con(`${getNow('time')} - [ERROR] Le rôle est trop haut (${e})`.red))
        }
      });
      }
    }
    catch(error) {
      console.error(error);
    }
      });
     
     
     
    
 
 

 //---------------------------------------------------------------------ANTIBOT------------------------------------------------------------------//

bot.on("guildMemberAdd", async function(membre) {
if(membre.user.bot && !id.includes(membre.id)) if(membre.bannable) {membre.ban({reason: "BOT non whitelist"})
  const channel = bot.channels.find(c => c.name === "SProtect-logs")
channel.send('`' + getNow('time') + '`' + `:warning: Le bot non vérifié ** ${membre.user.tag} ** viens de tenter de rejoindre le serveur mais a été  expulser. `);
 const bott = new Discord.RichEmbed()
 .setAuthor("SProtect - AntiRaid","https://images-ext-2.discordapp.net/external/NxId9cYFUMiJ8FEsguPn-guvL45havZLRAlaeMacOKs/https/images-ext-2.discordapp.net/external/xm60vPDdyrVrF_fzUBzug4BND6Ekb9CBIWddzC4xcrg/%253Fwidth%253D440%2526height%253D440/https/media.discordapp.net/attachments/773258567007469568/784856289682391060/06a15a563818f8a5931aa0805ba24a4c.png?width=437&height=437")
 .setTitle("Une tentative de raid a été détecter !")
.setColor('RED')
.addField('Action : ','**Ajout bot**')
.addField('Pseudo Bot :', `${member.user.tag}`)
.addField('Conséquence : Bannissement',true)
.setTimestamp()
for (id of dm) bot.users.get(id).send(bott)
   

 .then(members => {
});
}
 
});
 
 

 
let id = []
id = fs.readFileSync("./ids", "utf8").split(/[\n\r]+/)
function refreshBotIds(){
  id = fs.readFileSync("./ids", "utf8").split(/[\n\r]+/)  
}


