import express from "express";
import TelegramBot from "node-telegram-bot-api";
import pkg from "pg";

const { Pool } = pkg;

/* ===================== ENV ===================== */
const {
  TOKEN
} = process.env;


/* ===================== BOT ===================== */
const bot = new TelegramBot(TOKEN, { polling: false });

/* ===================== EXPRESS ===================== */
const app = express();
app.use(express.json());

/* ===================== WEBHOOK ===================== */
app.post("/", async (req, res) => {
  const update = req.body;

  if (update.business_message) {
    const msg = update.business_message;
    // if (msg.business_connection_id !== BUSINESS_CONNECTION_ID) {
    //   return res.send("IGNORED");
    // }

    if (msg.text?.startsWith("/")) {
      const cmd = msg.text.split(" ")[0].toLowerCase();

      if (cmd === "/gc" || cmd === "/list") {
        let out = "";
        for (const c in code_list) {
          for (const d of code_denos[c]) {
            out += `${code_list[c]} ${d}\n/${c} ${d}\n`;
          }
        }
        await bot.sendMessage(msg.chat.id, out, { parse_mode: "Markdown" });
      } else if (cmd === "/help") {
        await bot.sendMessage(msg.chat.id, "❌ Unknown command");
      } else {
        await bot.sendMessage(msg.chat.id, "❌ Unknown command");
      }
    }else{
        await bot.sendMessage(msg.chat.id, "You wrote: " + msg.text);
    }
  }

  res.status(200).send("OK");
});

export default app;
