// Define emojis for each emotion
const emojis = {
  sad: "🤗",      // Hug emoji for sad emotion
  happy: "😊",    // Smiley emoji for happy emotion
  joke: "😂",     // Laughter emoji for joke
  song: "🎶"      // Musical note emoji for song
};

// Get references to the necessary elements
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const typingIndicator = document.getElementById("typing-indicator");

// Bot responses based on emotion
const emotionResponses = {
  happy: [
    "I’m glad to hear that! 😊 What’s making you feel this way?",
    "That’s wonderful! Is there anything in particular that brought you joy today?",
    "Haha, that was really funny!",
    "It's very nice to hear, glad to know your day was awesome."
  ],
  sad: [
    "I’m really sorry to hear that. If you need someone to talk to, I’m here for you.",
    "It sounds like you're going through a tough time. I'm here to listen.",
    "It's okay to feel this way. We all have those moments. I'm here for you."
  ],
  joke: [
    "Why don’t skeletons fight each other? They don’t have the guts.",
    "Why was the math book sad? Because it had too many problems."
  ],
  song: [
    "Cause the players gonna play, play, play, play, play / And the haters gonna hate, hate, hate, hate, hate...",
    "When I find myself in times of trouble / Mother Mary comes to me / Speaking words of wisdom / Let it be...",
    "Don't stop believin' / Hold on to that feelin' / Streetlight, people..."
  ],
  neutral: [
    "I’m here to listen. Tell me more about what’s going on.",
    "Thanks for sharing. I’m here for you. What else is on your mind?",
    "I’m here to offer support. Let me know if there’s anything else you want to share.",
    "Feel free to talk about whatever's on your mind. I’m here to listen."
  ]
};

// Emotion keywords
const emotionKeywords = {
  happy: ["happy", "joyful", "excited", "content", "good", "great", "fun"],
  sad: ["sad", "unhappy", "depressed", "down", "blue", "cry"],
  joke: ["joke", "funny"],
  song: ["song", "sing", "play a song"]
};

// Phrases to stop the conversation
const stopPhrases = ["I don’t want to talk", "Goodbye", "I’m done", "Stop", "Exit"];

// Function to show the emoji pop-up on the screen
function showEmotionEmoji(emotion) {
  const emoji = emojis[emotion];
  if (!emoji) return;  // If no matching emoji, skip
  
  const emojiElement = document.createElement("div");
  emojiElement.className = "emotion-emoji";
  emojiElement.innerText = emoji;
  document.body.appendChild(emojiElement);
  
  // Set a timeout to remove the emoji after a few seconds
  setTimeout(() => {
      emojiElement.classList.add("fade-out");
      setTimeout(() => emojiElement.remove(), 1000); // Removes after fade-out
  }, 2000); // Duration emoji is visible
}

// Function to analyze the message and detect the emotion
function analyzeEmotion(message) {
  if (emotionKeywords.sad.some(keyword => message.includes(keyword))) {
      showEmotionEmoji("sad");
      return "sad";
  } else if (emotionKeywords.happy.some(keyword => message.includes(keyword))) {
      showEmotionEmoji("happy");
      return "happy";
  } else if (emotionKeywords.joke.some(keyword => message.includes(keyword))) {
      showEmotionEmoji("joke");
      return "joke";
  } else if (emotionKeywords.song.some(keyword => message.includes(keyword))) {
      showEmotionEmoji("song");
      return "song";
  }
  return "neutral"; // Default to neutral if no emotion is detected
}

// Function to send the message and trigger emotion analysis
function sendMessage() {
  const message = userInput.value.trim();
  if (message) {
    addMessageToChat(message, "user-message");
    userInput.value = "";

    // Check if the user wants to end the conversation
    if (stopPhrases.some(phrase => message.toLowerCase().includes(phrase.toLowerCase()))) {
      addMessageToChat("Alright, I'm here whenever you're ready to chat. Take care!", "bot-message", "neutral");
      return;
    }

    // Show typing indicator before bot replies
    typingIndicator.style.display = "block";
    setTimeout(() => {
      typingIndicator.style.display = "none";
      getBotResponse(message);
    }, 1000);
  }
}

// Function to get a bot response based on detected emotion
function getBotResponse(userMessage) {
  const detectedEmotion = analyzeEmotion(userMessage);
  const responses = emotionResponses[detectedEmotion];
  const response = responses[Math.floor(Math.random() * responses.length)];
  addMessageToChat(response, "bot-message", detectedEmotion);
}

// Function to add a message to the chat box
function addMessageToChat(text, className, emotion = "neutral") {
  const messageElement = document.createElement("div");
  messageElement.classList.add(className);
  messageElement.textContent = text;

  if (className === "bot-message") {
    messageElement.setAttribute("data-emotion", emotion);
  }

  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Listen for the Enter key to send the message
userInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});
