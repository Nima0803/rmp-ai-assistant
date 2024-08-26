"use client";

import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  Line,
} from 'recharts';
import Papa from 'papaparse';

export default function SentimentAnalysis() {
  const [data, setData] = useState([]);
  const [sentimentSummary, setSentimentSummary] = useState([]);
  const [topProfessors, setTopProfessors] = useState([]);
  const [bottomProfessors, setBottomProfessors] = useState([]);
  const [sentimentDistribution, setSentimentDistribution] = useState([]);
  const [overallMeanScore, setOverallMeanScore] = useState(0);

  useEffect(() => {
    fetch('/sentiment_analysis_results.csv')
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: function (results) {
            const parsedData = results.data.map((row) => ({
              name: row['name'],
              rating: parseFloat(row['rating']),
              sentiment: row['sentiment'],
              sentiment_score: parseFloat(row['sentiment_score']),
              subject: row['subject'],
            }));
            setData(parsedData);
            analyzeData(parsedData);
          },
        });
      });
  }, []);

  const analyzeData = (parsedData) => {
    const sentimentCount = { POSITIVE: 0, NEGATIVE: 0 };
    const sentimentDist = {};
    let totalSentimentScore = 0;

    parsedData.forEach((item) => {
      sentimentCount[item.sentiment] += 1;
      totalSentimentScore += item.sentiment_score;

      if (!sentimentDist[item.subject]) {
        sentimentDist[item.subject] = {
          subject: item.subject,
          POSITIVE: 0,
          NEGATIVE: 0,
        };
      }
      sentimentDist[item.subject][item.sentiment] += 1;
    });

    const overallMean = totalSentimentScore / parsedData.length;
    setOverallMeanScore(overallMean.toFixed(2));

    setSentimentSummary([
      { name: 'Positive', value: sentimentCount.POSITIVE },
      { name: 'Negative', value: sentimentCount.NEGATIVE },
    ]);

    const topSentiments = [...parsedData]
      .sort((a, b) => b.sentiment_score - a.sentiment_score)
      .slice(0, 5);
    const bottomSentiments = [...parsedData]
      .sort((a, b) => a.sentiment_score - b.sentiment_score)
      .slice(0, 5);
    setTopProfessors(topSentiments);
    setBottomProfessors(bottomSentiments);

    const sentimentDistArray = Object.values(sentimentDist);
    setSentimentDistribution(sentimentDistArray);
  };

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div
      style={{
        padding: '20px',
        background:
          'linear-gradient(135deg, rgba(61, 36, 87), rgba(67, 133, 254))',
        minHeight: '100vh',
        color: 'white',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          marginBottom: '40px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
        }}
      >
        Sentiment Analysis Results
      </h1>

      {/* Sentiment Summary */}
      <div
        style={{
          width: '100%',
          height: 340, // Adjusted height to ensure spacing
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '20px',
        }}
      >
        <h2 style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}>Sentiment Summary</h2>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={sentimentSummary}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
              animationDuration={1500}
            >
              {sentimentSummary.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Top 5 Professors by Sentiment */}
      <div
        style={{
          marginTop: '20px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          padding: '20px',
        }}
      >
        <h2 style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}>Top 5 Professors by Sentiment</h2>
        <ul>
          {topProfessors.map((professor) => (
            <li key={professor.name}>
              {`${professor.name} (${professor.subject}) - Sentiment Score: ${professor.sentiment_score}`}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom 5 Professors by Sentiment */}
      <div
        style={{
          marginTop: '20px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          padding: '20px',
        }}
      >
        <h2 style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}>Bottom 5 Professors by Sentiment</h2>
        <ul>
          {bottomProfessors.map((professor) => (
            <li key={professor.name}>
              {`${professor.name} (${professor.subject}) - Sentiment Score: ${professor.sentiment_score}`}
            </li>
          ))}
        </ul>
      </div>

      {/* Sentiment Distribution by Subject */}
      <div
        style={{
          width: '100%',
          height: 450, // Adjusted height to ensure spacing
          marginTop: '20px',
          background: 'rgba(255, 255, 255, 0.1)', // Removed gradient
          borderRadius: '10px',
          padding: '20px',
        }}
      >
        <h2 style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}>Sentiment Distribution by Subject</h2>
        <ResponsiveContainer>
          <BarChart data={sentimentDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" tick={{ fill: 'white', fontSize: 12 }} />
            <YAxis tick={{ fill: 'white', fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="POSITIVE"
              stackId="a"
              fill="#82ca9d" // Solid color instead of gradient
              animationDuration={1500}
            />
            <Bar
              dataKey="NEGATIVE"
              stackId="a"
              fill="#ff6666" // Solid color instead of gradient
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Mean vs Professor's Score */}
      <div
        style={{
          width: '100%',
          height: 450, // Adjusted height to ensure spacing
          marginTop: '20px',
          background: 'rgba(255, 255, 255, 0.1)', // Removed gradient
          borderRadius: '10px',
          padding: '20px',
        }}
      >
         <h2 style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}>Mean Sentiment Score vs Professors Sentiment Score</h2>
        <ResponsiveContainer>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" name="Professor" tick={{ fill: 'white', fontSize: 12 }} />
            <YAxis dataKey="professor_score" name="Professor Score" tick={{ fill: 'white', fontSize: 12 }} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Line
              type="monotone"
              dataKey="mean_score"
              stroke="#82ca9d"
              dot={false}
              activeDot={false}
            />
            <Scatter
              name="Professor's Score"
              data={data.map((d) => ({
                name: d.name,
                professor_score: d.sentiment_score,
              }))}
              fill="#FF6347"
              stroke="#FF6347"
              strokeWidth={2}
              shape="circle"
              radius={4}
              animationDuration={1500}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
