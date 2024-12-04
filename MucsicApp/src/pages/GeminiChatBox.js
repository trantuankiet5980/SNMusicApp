import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, ScrollView, ActivityIndicator } from "react-native";
import * as GoogleGenerativeAI from "@google/generative-ai";

export default function MyLibrary() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");

  const API_KEY = "AIzaSyCwWYRq0PFojU0vsS2oJEGoiMo5f4lQg1k"; // Bảo mật API key

  useEffect(() => {
    // Khởi tạo GoogleGenerativeAI chỉ cần thực hiện một lần khi ứng dụng được khởi động.
    const initChat = async () => {
      try {
        const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Chào mừng mặc định từ bot
        setMessages([
          { text: "Hello! How can I assist you today?", user: false }
        ]);
      } catch (error) {
        console.error("Error initializing Google Generative AI:", error);
      }
    };

    initChat();
  }, []);

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const result = await model.generateContent(userInput);
      const responseText = result.response.text();

      setMessages([...messages, { text: userInput, user: true }, { text: responseText, user: false }]);
    } catch (error) {
      console.error("Error calling Google Generative AI API:", error);
      setMessages([...messages, { text: "There was an error processing your request.", user: false }]);
    }

    setLoading(false);
    setUserInput("");
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ScrollView style={{ flex: 1, marginBottom: 10 }}>
        {messages.map((msg, index) => (
          <View key={index} style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: msg.user ? "bold" : "normal" }}>
              {msg.user ? "You" : "Bot"}: {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginBottom: 5,
        }}
        placeholder="Type your message..."
        value={userInput}
        onChangeText={setUserInput}
      />
      <Button title="Send" onPress={sendMessage} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
}
