export const sendChatMessage = async (messages: Array<{role: string, content: string}>) => {
  console.log(messages)
  try {
    const response = await fetch('https://api.10dollarjob.com/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Chat API Error:', error);
    throw error;
  }
};
