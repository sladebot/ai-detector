import axios from 'axios';

export const extractTextFromImage = async (base64) => {
  const formData = new FormData();
  formData.append('base64Image', `data:image/jpeg;base64,${base64}`);
  formData.append('language', 'eng');
  formData.append('apikey', 'K81284587988957');
  formData.append('isOverlayRequired', false);
  formData.append('detectOrientation', true);
  formData.append('scale', true);
  formData.append('OCREngine', 2); // higher accuracy

  try {
    const response = await axios.post(
      'https://api.ocr.space/parse/image',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    console.log('Full OCR response:', response.data);
    return response.data.ParsedResults?.[0]?.ParsedText || '';
  } catch (err) {
    console.error('OCR failed:', err.response?.data || err.message);
    return '';
  }
};
