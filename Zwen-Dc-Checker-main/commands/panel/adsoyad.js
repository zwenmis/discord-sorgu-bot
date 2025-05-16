const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")

const settings = require("../../botconfig/settings.json");
module.exports = {
    name: "adsoyad",
    description: "NEFER FLEXS",
    cooldown: 1.5,
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: [],
    options: [
        {
            "String": {
                name: "isim",
                description: "Oyuncunun id",
                required: true,
            },
        },
        {
            "String": {
                name: "soyisim",
                description: "Oyuncunun id",
                required: true,
            },
        },
        {
            "String": {
                name: "il",
                description: "Kişi'nin Oturduğu İl (Listeleme'yi Azaltır)",
                required: false,
            },
        },
    ],
    run: async (client, interaction) => {
        const { member, channelId, guildId, applicationId,
            commandName, deferred, replied, ephemeral,
            options, id, createdTimestamp
        } = interaction;
        const { guild } = member;
        try {
            var mysql = require('mysql');
            var con = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : '',
              database : '101m'
            });

            var isim = interaction.options.getString("isim")
            var soyisim = interaction.options.getString("soyisim")
            var il = interaction.options.getString("il")

            if (il) {
                con.query(`SELECT * FROM 101m WHERE ADI="${isim}" AND SOYADI="${soyisim}" AND NUFUSIL="${il}"`, function (err, result) {
                    if (err) throw err;
                    let data = JSON.parse(JSON.stringify(result))

                    let as31 = data.map((o) => `${o.TC} ${o.ADI} ${o.SOYADI} ${o.DOGUMTARIHI} ${o.NUFUSIL} ${o.NUFUSILCE} ${o.ANNEADI} ${o.ANNETC} ${o.BABAADI} ${o.BABATC} ${o.UYRUK}`).join('\n')
                    let dosyahazırla = new Discord.MessageAttachment(Buffer.from(as31), `RelaX Services.txt`);
                    interaction.user.send({ 
                        content: `:tada: ${isim} ${soyisim} İsminde **${data.length}** Kişi Bulundu.`, 
                        files: [ dosyahazırla ]
                    })
                    interaction.reply({ content: "**Başarılı!** DM Adresine Gönderildi (Dm Adresiniz Kapalı İse Bot Mesaj Gönderemez!)  https://discord.gg/ef6Dy2SRaz", ephemeral: true })
                })  
            } else { 
                con.query(`SELECT * FROM 101m WHERE ADI="${isim}" AND SOYADI="${soyisim}"`, function (err, result) {
                    if (err) throw err;
                    let data = JSON.parse(JSON.stringify(result))

                    let as31 = data.map((o) => `${o.TC} ${o.ADI} ${o.SOYADI} ${o.DOGUMTARIHI} ${o.NUFUSIL} ${o.NUFUSILCE} ${o.ANNEADI} ${o.ANNETC} ${o.BABAADI} ${o.BABATC} ${o.UYRUK}`).join('\n')
                    let dosyahazırla = new Discord.MessageAttachment(Buffer.from(as31), `RelaX Services.txt`);
                    interaction.user.send({ 
                        content: `:tada: ${isim} ${soyisim} İsminde **${data.length}** Kişi Bulundu.`, 
                        files: [ dosyahazırla ]
                    })
                    interaction.reply({ content: "**Başarılı!** DM Adresine Gönderildi (Dm Adresiniz Kapalı İse Bot Mesaj Gönderemez!)  https://discord.gg/ef6Dy2SRaz", ephemeral: true })
                }); 
            }
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    }
} // Created By Zwen
