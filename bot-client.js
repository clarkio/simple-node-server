(function() {
  let token = 'GNRkczAS4js.cwA.ro8.aiWbe3SFSBRLKN6W2fqv_I39DmFo2xqm51w1uiiym9s';
  var myTmi = {
    options: {
      debug: true
    },
    connection: {
      cluster: 'aws',
      reconnect: true
    },
    channels: ['clarkio']
  };

  var myClient = new tmi.client(myTmi);
  let conversationId;
  let conversationToken;
  let expiration;

  createNewBotConversation();

  myClient.connect();
  myClient.on('chat', function(channel, user, message, self) {
    let userName = user['display-name'] || user['username'];
    document.getElementById('textbox').innerHTML = userName + ': ' + message;
    console.log(`Here's the raw message ${message} from ${userName}`);

    if (message.startsWith('!bulb')) {
      let commandMessage = message.slice(5);
      if (commandMessage) {
        sendCommand(commandMessage, userName)
          .then(result => {
            console.log(result);
            console.log(`Successfully Sent a message from ${userName}`);
          })
          .catch(error => {
            console.log(error);
          });
      }
    } else if (userName.toLowerCase() === 'streamelements') {
      if (message.indexOf('following') > -1 || message.indexOf('subscribed')) {
        triggerFollowerEffect(userName);
      }
    }
  });

  function createNewBotConversation() {
    console.log(`Starting a new bot conversation at: ${new Date().getUTCDate()}`);
    startBotConversation().then(result => {
      console.log(`Successfully started a new conversation ${result.conversationId}`);
      conversationId = result.conversationId;
      conversationToken = result.token;
      expiration = new Date().getSeconds() + parseInt(result['expires_in']) - 30;
      createTimeout(expiration);
    });
  }

  function createTimeout(expirationTime) {
    console.log(`creating a new timeout for ${expirationTime}`);
    let timeInMilliseconds = expirationTime * 1000;
    setTimeout(createNewBotConversation, timeInMilliseconds);
  }

  function startBotConversation() {
    // HTTP request to initate conversation
    // v1.1 https://directline.botframework.com/api/conversations
    // let url = 'https://directline.botframework.com/v3/directline/tokens/generate';
    let url = 'https://directline.botframework.com/api/conversations';
    return fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => response.json());
  }

  function sendCommand(commandMessage, user) {
    // Send the HTTP request with the command
    // v3.0 https://directline.botframework.com/v3/directline/conversations/abc123/activities
    // v1.1 https://directline.botframework.com/api/conversations/{conversationId}/messages
    // let fullMessage = { type: 'message', from: { id: user }, text: commandMessage };
    let fullMessage = { text: commandMessage, from: user };
    // let url = `https://directline.botframework.com/v3/directline/conversations/${conversationId}/activities`;
    let url = `https://directline.botframework.com/api/conversations/${conversationId}/messages`;
    return fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${conversationToken}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(fullMessage),
      mode: 'cors'
    })
      .then(response => response.json())
      .catch(error => {
        console.log(error);
        return error;
      });
  }

  // const socketToken = ''; //Socket token from /socket/token end point

  // //Connect to socket
  // const streamlabs = io(`https://sockets.streamlabs.com?token=${socketToken}`);

  // //Perform Action on event
  // streamlabs.on('event', eventData => {
  //   if (!eventData.for && eventData.type === 'donation') {
  //     //code to handle donation events
  //     console.log(eventData.message);
  //   }
  //   // if (eventData.for === 'twitch_account') {
  //   switch (eventData.type) {
  //     case 'follow':
  //       //code to handle follow events
  //       console.log(eventData.message);
  //       triggerFollowerEffect();
  //       break;
  //     case 'subscription':
  //       //code to handle subscription events
  //       console.log(eventData.message);
  //       triggerFollowerEffect();
  //       break;
  //     default:
  //       //default case
  //       console.log(eventData.message);
  //   }
  //   // }
  // });

  function triggerFollowerEffect(userName) {
    sendCommand('trigger new follower', userName)
      .then(result => {
        console.log(result);
        console.log(`Successfully triggered new follower command from ${userName}`);
      })
      .catch(error => {
        console.log(error);
      });
  }
})();
