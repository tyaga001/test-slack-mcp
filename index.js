// index.js

// Sample data structure for channels
let channels = [
  {
    id: 1,
    name: "general",
    messages: [
      {
        id: 101,
        user: "Alice",
        text: "Hey everyone!",
        timestamp: new Date().toISOString(),
        replies: [
          { id: 201, user: "Bob", text: "Hey Alice!", timestamp: new Date().toISOString() }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "random",
    messages: [
      {
        id: 102,
        user: "Charlie",
        text: "What's your favorite meme today?",
        timestamp: new Date().toISOString(),
        replies: []
      }
    ]
  }
];

// ---------- Utility Functions ----------

// Add a new channel
function addChannel(name) {
  const newChannel = {
    id: Date.now(),
    name,
    messages: []
  };
  channels.push(newChannel);
  console.log(`✅ Channel "${name}" added!`);
  return newChannel;
}

// Delete a channel by ID
function deleteChannel(channelId) {
  const index = channels.findIndex(ch => ch.id === channelId);
  if (index !== -1) {
    const removed = channels.splice(index, 1);
    console.log(`🗑️ Channel "${removed[0].name}" deleted!`);
  } else {
    console.log(`❌ Channel not found!`);
  }
}

// Add a message to a channel
function addMessage(channelId, user, text) {
  const channel = channels.find(ch => ch.id === channelId);
  if (!channel) return console.log("❌ Channel not found!");

  const message = {
    id: Date.now(),
    user,
    text,
    timestamp: new Date().toISOString(),
    replies: []
  };

  channel.messages.push(message);
  console.log(`💬 Message added to "${channel.name}"`);
  return message;
}

// Delete a message from a channel
function deleteMessage(channelId, messageId) {
  const channel = channels.find(ch => ch.id === channelId);
  if (!channel) return console.log("❌ Channel not found!");

  const index = channel.messages.findIndex(msg => msg.id === messageId);
  if (index !== -1) {
    channel.messages.splice(index, 1);
    console.log(`🗑️ Message deleted from "${channel.name}"`);
  } else {
    console.log("❌ Message not found!");
  }
}

// Add a reply to a message
function addReply(channelId, messageId, user, text) {
  const channel = channels.find(ch => ch.id === channelId);
  if (!channel) return console.log("❌ Channel not found!");

  const message = channel.messages.find(msg => msg.id === messageId);
  if (!message) return console.log("❌ Message not found!");

  const reply = {
    id: Date.now(),
    user,
    text,
    timestamp: new Date().toISOString()
  };

  message.replies.push(reply);
  console.log(`↩️ Reply added to message by "${message.user}"`);
  return reply;
}

// Delete a reply
function deleteReply(channelId, messageId, replyId) {
  const channel = channels.find(ch => ch.id === channelId);
  if (!channel) return console.log("❌ Channel not found!");

  const message = channel.messages.find(msg => msg.id === messageId);
  if (!message) return console.log("❌ Message not found!");

  const index = message.replies.findIndex(rep => rep.id === replyId);
  if (index !== -1) {
    message.replies.splice(index, 1);
    console.log(`🗑️ Reply deleted!`);
  } else {
    console.log("❌ Reply not found!");
  }
}

