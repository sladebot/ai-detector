import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ResultDisplay = ({ result, text }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.resultText}>{result}</Text>
      <Text style={styles.label}>Extracted Text:</Text>
      <Text style={styles.extractedText}>{text}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 5,
  },
  extractedText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
});

export default ResultDisplay;