export const checkIfTextIsAIGenerated = async (text) => {
    if (!text || text.trim().length < 10) return 0;
  
    // Mock logic — replace with real API later
    const isAI = text.includes('artificial') || text.length > 100;
    return isAI ? 85 : 20;
  };