const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")

const settings = require("../../botconfig/settings.json");
module.exports = {
    name: "tc-gsm", //the command name for the Slash Command
    description: "tc den gsm bulma", //the command description for Slash Command Overview
    cooldown: 1.5,// Created By Zwen
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    options: [
        {
            "String":
            {// Created By Zwen
                name: "tc",
                description: "Kişinin TCKN",
                required: true,
            },
            // Created By Zwen
        },
    ],
    run: async (client, interaction) => {
        const { member, channelId, guildId, applicationId,
            commandName, deferred, replied, ephemeral,
            options, id, createdTimestamp
        } = interaction;
        const { guild } = member;
            var mysql = require('mysql');
            var con = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "gsm"
              });
            var tc = interaction.options.getString("tc")

            con.query(`SELECT * FROM gsm WHERE TC="${tc}"`, function (err, result) {
                let data = JSON.parse(JSON.stringify(result))
              if (err) throw err;
              data.map((o) => console.log(o.GSM))

              if(data.length < 1) return interaction.reply({ content: "Görünüşe Göre Bir Sonuç Bulunamadı Bunun Sebebi Aşağıdaki Maddelerden Biri Olabilir. \n ・ Sorguladığınız Kişinin Yaşı Küçükse Telefon Numarası Kişinin Anne Veya Babasına Kayıtlı Olabilir \n ・ Eğer Kişi Telefon Numarası'nı Yakın Bir Zaman'da Almış İse Sistemlerimiz'de Kayıt'lı Olmayabilir", ephemeral: true })
              if(tc.startsWith('0')) return interaction.reply(`Eksik Veya Hatalı Kullanım`)
              let arr = []
              for ( const obj of result) {
                arr.push(obj.TC)
// Created By Zwen
              }

   data.map((o) => interaction.user.send({ content: `:tada: ${tc}'Ye Ait Bilgi'yi Buldum! \n ${o.GSM}`, ephemeral: true }))
   interaction.reply({ content: "**Başarılı!** DM Adresine Gönderildi (Dm Adresiniz Kapalı İse Bot Mesaj Gönderemez!)  https://discord.gg/ef6Dy2SRaz", ephemeral: true })
              }); 
            }
}// Created By Zwen