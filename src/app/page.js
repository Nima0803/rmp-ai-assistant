"use client";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I am the Rate My Professor support assistant. How can I help you today?",
    },
  ]);

  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return; // Prevent sending empty messages

    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    setMessage("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      const data = await response.json();

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = {
          role: "assistant",
          content: data.content,
        };
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // For uploading reviews.json to the pinecone index
  async function uploadReviews() {
    try {
      const response = await fetch("/api/uploadreview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error uploading reviews: ${response.status} ${errorText}`
        );
      }

      const result = await response.json();
      console.log("Reviews uploaded successfully:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="relative"
      overflow="hidden" // Ensure no overflow
    >
      {/* Video Background */}
      <Box
        component="video"
        src="https://cdn.dribbble.com/userupload/13391587/file/large-574985d7eb2f23cbc09c18752c8b2057.mp4"
        autoPlay
        loop
        muted
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />

      {/* Chat Interface */}
      <Stack
        direction="column"
        width="500px"
        height="700px"
        border="1px solid #333"
        borderRadius="12px"
        p={2}
        spacing={3}
        bgcolor="rgba(30, 30, 30, 0.8)" // Adding some transparency
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
        zIndex={1} // Ensure this is above the video
      >
        <Typography
          variant="h6"
          color="#E0E0E0"
          textAlign="center"
          fontWeight="bold"
        >
          Rate My Professor Assistant
        </Typography>
        <Button
          variant="contained"
          onClick={uploadReviews}
          sx={{
            backgroundColor: "#FF8A65",
            "&:hover": { backgroundColor: "#FF7043" },
            color: "#FFF",
            borderRadius: "8px",
          }}
        >
          Upload Review
        </Button>
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
          paddingRight="5px"
          sx={{
            scrollbarWidth: "thin",
            scrollbarColor: "#FF8A65 #1E1E1E",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#1E1E1E",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#FF8A65",
              borderRadius: "8px",
            },
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === "assistant" ? "flex-start" : "flex-end"
              }
            >
              <Box
                bgcolor={
                  message.role === "assistant" ? "#2196F3" : "#FF4081"
                }
                color="white"
                borderRadius={2}
                p={2}
                maxWidth="70%"
                boxShadow="0 2px 6px rgba(0, 0, 0, 0.2)"
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Type your message..."
            fullWidth
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            sx={{
              backgroundColor: "#2C2C2C",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                color: "#E0E0E0",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FF8A65",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FF7043",
              },
            }}
            InputLabelProps={{
              style: { color: "#BDBDBD" },
            }}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            sx={{
              backgroundColor: "#4CAF50",
              "&:hover": { backgroundColor: "#43A047" },
              color: "#FFF",
              borderRadius: "8px",
              paddingX: 3,
            }}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
