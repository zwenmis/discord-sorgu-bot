const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")

const settings = require("../../botconfig/settings.json");
module.exports = {
    name: "tc-gsm",
    description: "TC numarasından GSM bilgilerini getirir",
    cooldown: 1.5,
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: [],
    options: [
        {
            "String": {
                name: "tc",
                description: "Kişinin T.C. Kimlik Numarası",
                required: true,
            },
        },
    ],
    run: async (client, interaction) => {
        const { member, options } = interaction;
        const tc = options.getString("tc");

        if (tc.startsWith('0')) {
            return interaction.reply({ content: "T.C. Kimlik Numarası '0' ile başlamamalıdır.", ephemeral: true });
        }

        const mysql = require('mysql');
        const con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "101m"
        });

        con.query(`SELECT * FROM 101m WHERE TC="${tc}"`, (err, result) => {
            if (err) throw err;
            const data = JSON.parse(JSON.stringify(result));

            if (data.length < 1) {
                return interaction.reply({
                    content: "Belirttiğiniz T.C. Kimlik Numarası ile eşleşen kayıt bulunamadı. Bilgilerinizi kontrol edip tekrar deneyiniz.",
                    ephemeral: true
                });
            }

            data.forEach((o) => {
                const embed = new MessageEmbed()
                    .setTitle(`:tada: ${tc} Numarasına Ait GSM Bilgisi`)
                    .setDescription(`GSM: ${o.GSM || "Bilgi bulunamadı"}`)
                    .setColor("#0099ff");
                interaction.user.send({ embeds: [embed] });
            });

            interaction.reply({
                content: "**Başarılı!** Bilgileriniz DM üzerinden gönderildi. Eğer DM’niz kapalıysa mesaj ulaşmayabilir. https://discord.gg/ef6Dy2SRaz",
                ephemeral: true
            });
        });
    }
} // Created By Zwen