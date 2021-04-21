// ==UserScript==
// @name         Popcat no-click bot
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Ban-proof popcat.click bot
// @author       Wojciech Berdowski
// @updateURL    https://github.com/wberdowski/PopcatNoClickBot/raw/main/bot.user.js
// @downloadURL  https://github.com/wberdowski/PopcatNoClickBot/raw/main/bot.user.js
// @match        https://popcat.click/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    console.clear()

    var event = new KeyboardEvent('keydown', {
        key: 'g',
        ctrlKey: true
    });

    // Start sendStats interval
    document.dispatchEvent(event);
    // Total pops
    var total = 0;

    var iv = setInterval(() => {
        // Get VUE
        var vue = document.getElementById('app').__vue__;
        // Check if user is marked as bot (just for safety measures, very unlikely to happen)
        if (vue.bot) {
            console.log("%c You've been barked as a bot. Please clear your cookies.", "background: #a00; color: #fff");
            clearInterval(iv);
            return;
        }
        // Prevent ban
        vue.sequential_max_pops = 0;
        // Detect sendStats function run
        if (vue.accumulator == 0) {
            total += 800;
            console.log(`[${new Date().toLocaleTimeString()}] %c800 pops sent (Total: ${total})`, "color: #0f0");
            // Open and close cat's mount
            vue.open = true;
            setTimeout(() => {
                vue.open = false;
            }, 1000);
        }
        // Set 800 pops
        vue.accumulator = 800;
    }, 1000);

    console.log("%c Bot started. Waiting for the first request being sent. ", "background: #050; color: #0f0");
})();