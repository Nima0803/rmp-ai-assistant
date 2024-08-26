"use client";
import { Box, Typography, Button, Stack, Grid } from "@mui/material";
import React from "react";

export default function Home() {
  return (
    <Box
      width="100vw"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: "linear-gradient(135deg, #f0f0f5, #e0c3fc)",
        color: "#333333",
        padding: "4rem 2rem",
      }}
    >
      {/* Header Section */}
      <Box textAlign="center" sx={{ marginBottom: "4rem" }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: "3rem",
            fontWeight: "bold",
          }}
        >
          Discover and Rate Your Professors
        </Typography>
        <Typography
          variant="h5"
          sx={{
            marginTop: "1rem",
            fontSize: "1.5rem",
            color: "#555555",
          }}
        >
          Get insights, share experiences, and find the best professors at your university.
        </Typography>
        <Box sx={{ marginTop: "2rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "none",
            }}
            onClick={() => {
              window.location.href = "http://localhost:3000";
            }}
          >
            Rate a Professor
          </Button>
          <Button
            variant="outlined"
            sx={{
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "none",
              color: "#333333",
              borderColor: "#333333",
            }}
            onClick={() => {
              window.location.href = "http://localhost:3000/sentiment-analysis";
            }}
          >
            View Top Rated Professors
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          width: "100%",
          padding: "4rem 2rem",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "12px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "2rem",
            color: "#333333",
          }}
        >
          Why Use Rate My Professor Assistant?
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ fontSize: "2rem", color: "#673ab7" }}>🌟</Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333333" }}>
                  Honest Reviews
                </Typography>
                <Typography variant="body1" sx={{ color: "#555555" }}>
                  Read and write authentic reviews about professors to help students make informed decisions.
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ fontSize: "2rem", color: "#673ab7" }}>📊</Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333333" }}>
                  Data-Driven Insights
                </Typography>
                <Typography variant="body1" sx={{ color: "#555555" }}>
                  Explore detailed statistics on professors’ performance, ratings, and trends over time.
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ fontSize: "2rem", color: "#673ab7" }}>🔍</Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333333" }}>
                  Find the Best Professors
                </Typography>
                <Typography variant="body1" sx={{ color: "#555555" }}>
                  Quickly identify the top-rated professors in your department or across the university.
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ fontSize: "2rem", color: "#673ab7" }}>📈</Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333333" }}>
                  Track Improvement
                </Typography>
                <Typography variant="body1" sx={{ color: "#555555" }}>
                  See how professors are improving over time with continuous feedback and ratings.
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
