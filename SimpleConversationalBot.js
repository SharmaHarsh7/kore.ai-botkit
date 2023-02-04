var botId = "st-2b0559c4-0d06-5a73-8b15-16bbd5c5f822";
var botName = "testBot";
var sdk = require("./lib/sdk");

/*
 * This is the most basic example of BotKit.
 *
 * It showcases how the BotKit can intercept the message being sent to the bot or the user.
 *
 * We can either update the message, or chose to call one of 'sendBotMessage' or 'sendUserMessage'
 */
module.exports = {
    botId: botId,
    botName: botName,

    on_user_message: function (requestId, data, callback) {

        console.log(data?.channel?.handle?.channelData?.tenant?.id);

        if ((data?.channel?.handle?.channelData?.tenant?.id ?? '') === '35378cf9-dac0-45f0-84c7-1bfb98207b59') {
            if (!data.agent_transfer) {
                return sdk.sendBotMessage(data, callback);
            } else {
                data.message = "Agent Message";
                return sdk.sendUserMessage(data, callback);
            }
        }
        else {
            data.message = "You are not allowd to chat with us.";
            //Sends back 'Hello' to user.
            return sdk.sendUserMessage(data, callback);
        }
    },
    on_bot_message: function (requestId, data, callback) {
        if (data.message === 'hello') {
            data.message = 'The Bot says hello!';
        }
        //Sends back the message to user

        return sdk.sendUserMessage(data, callback);
    },
    on_agent_transfer: function (requestId, data, callback) {
        return callback(null, data);
    },
    on_event: function (requestId, data, callback) {
        console.log("on_event -->  Event : ", data.event);
        return callback(null, data);
    },
    on_alert: function (requestId, data, callback) {
        console.log("on_alert -->  : ", data, data.message);
        return sdk.sendAlertMessage(data, callback);
    }

};

