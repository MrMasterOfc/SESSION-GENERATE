const {
  makeid
} = require("./id");
const express = require("express");
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
function removeFile(_0x1b0d3f) {
  if (!fs.existsSync(_0x1b0d3f)) {
    return false;
  }
  fs.rmSync(_0x1b0d3f, {
    'recursive': true,
    'force': true
  });
}
;
router.get('/', async (_0x222830, _0x3fa642) => {
  const _0x5cfa04 = makeid();
  let _0xdf5af6 = _0x222830.query.number;
  async function _0x5b1b30() {
    const {
      state: _0xb5e5f1,
      saveCreds: _0x3a8c7e
    } = await useMultiFileAuthState("./temp/" + _0x5cfa04);
    try {
      let _0x393125 = Maher_Zubair({
        'auth': {
          'creds': _0xb5e5f1.creds,
          'keys': makeCacheableSignalKeyStore(_0xb5e5f1.keys, pino({
            'level': "fatal"
          }).child({
            'level': "fatal"
          }))
        },
        'printQRInTerminal': false,
        'logger': pino({
          'level': "fatal"
        }).child({
          'level': "fatal"
        }),
        'browser': ["Chrome (Linux)", '', '']
      });
      if (!_0x393125.authState.creds.registered) {
        await delay(1500);
        _0xdf5af6 = _0xdf5af6.replace(/[^0-9]/g, '');
        const _0x3724d2 = await _0x393125.requestPairingCode(_0xdf5af6);
        if (!_0x3fa642.headersSent) {
          await _0x3fa642.send({
            'code': _0x3724d2
          });
        }
      }
      _0x393125.ev.on("creds.update", _0x3a8c7e);
      _0x393125.ev.on("connection.update", async _0x1ed5c2 => {
        const {
          connection: _0x23d5d7,
          lastDisconnect: _0x1b6bd6
        } = _0x1ed5c2;
        if (_0x23d5d7 == "open") {
          await delay(5000);
          let _0x4e3a6b = fs.readFileSync(__dirname + ("/temp/" + _0x5cfa04 + "/creds.json"));
          await delay(800);
          let _0xe449fa = Buffer.from(_0x4e3a6b).toString("base64");
          let _0x52b822 = await _0x393125.sendMessage(_0x393125.user.id, {
            'text': "MASTER-MD" + _0xe449fa
          });
          await _0x393125.sendMessage(_0x393125.user.id, {
            'text': "\n┏━━━━━━━━━━━━━━\n┃MASTER MD SESSION IS \n┃SUCCESSFULLY\n┃CONNECTED ✅🔥\n┗━━━━━━━━━━━━━━━\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n❶ || Creator = Sahan / MASTER MIND_👨🏻‍💻\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n❷ || WhattsApp Channel = https://whatsapp.com/channel/0029VaWWZa1G3R3c4TPADo0M\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n❸ || Owner = https://wa.me/+94720797915\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n❺ || INSTAGRAM = https://www.instagram.com/sahanmaduwantha2006?igsh=YzljYTk1ODg3Zg==\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n❻ || FaceBook = https://www.facebook.com/profile.php?id=100089180711131\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬\nᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍʀ ꜱᴀʜᴀɴ ᴏꜰᴄ"
          }, {
            'quoted': _0x52b822
          });
          await delay(100);
          await _0x393125.ws.close();
          return await removeFile("./temp/" + _0x5cfa04);
        } else if (_0x23d5d7 === "close" && _0x1b6bd6 && _0x1b6bd6.error && _0x1b6bd6.error.output.statusCode != 401) {
          await delay(10000);
          _0x5b1b30();
        }
      });
    } catch (_0x255fc1) {
      console.log("service restated");
      await removeFile("./temp/" + _0x5cfa04);
      if (!_0x3fa642.headersSent) {
        await _0x3fa642.send({
          'code': "Service Unavailable"
        });
      }
    }
  }
  return await _0x5b1b30();
});
module.exports = router;
