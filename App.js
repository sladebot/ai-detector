import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import axios from 'axios';

export default function App() {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      setCapturedImage(photo);
      detectAI(photo.base64);
    }
  };

  const detectAI = async (base64) => {
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post('http://your-api-endpoint.com/detect', {
        image: base64,
      });

      setResult(response.data?.result || 'No result returned');
    } catch (err) {
      console.error('Detection failed:', err.message);
      setResult('Error occurred while detecting.');
    }

    setLoading(false);
  };

  const reset = () => {
    setCapturedImage(null);
    setResult(null);
  };

  if (!permission) {
    return <View style={styles.center}><Text>Requesting camera permission...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>No access to camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.retryButton}>
          <Text style={styles.captureText}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!capturedImage ? (
        <CameraView style={styles.camera} ref={cameraRef}>
          <View style={styles.captureContainer}>
            <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
              <Text style={styles.captureText}>Capture</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View style={styles.resultScreen}>
          <Image source={{ uri: capturedImage.uri }} style={styles.preview} />
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <Text style={styles.resultText}>Result: {result}</Text>
              <TouchableOpacity onPress={reset} style={styles.retryButton}>
                <Text style={styles.captureText}>Retake</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: { flex: 1 },
  captureContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 30,
  },
  captureButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 50,
  },
  captureText: { fontSize: 16, fontWeight: 'bold' },
  resultScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
  },
  preview: {
    width: 300,
    height: 400,
    borderRadius: 10,
    marginBottom: 20,
  },
  resultText: { color: '#fff', fontSize: 18, marginBottom: 10 },
  retryButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
});
