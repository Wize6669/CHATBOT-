const sendMessageChatWood = async (msg = "", message_type = "") => {
    const url = "https://app.chatwoot.com/app/accounts/90650/conversations/1/messages";
    let myHeaders = new Headers();
    console.log(process.env.CHATWOOT_TOKEN);
    myHeaders.append("api_access_token", process.env.CHATWOOT_TOKEN);
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        content: msg,
        message_type: message_type, // "incoming",
        private:true,
        content_attributes: {},
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    const dataRaw = await fetch(url, requestOptions);
    const data =  dataRaw.json();
    return data;
};

module.exports = { sendMessageChatWood };