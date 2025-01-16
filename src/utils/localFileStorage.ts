export const readData = async (filename: string) => {
  try {
    const response = await fetch(`/api/data/${filename}`);
    if (!response.ok) {
      console.error(`Error reading ${filename}:`, response.statusText);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
};

export const writeData = async (filename: string, data: any): Promise<boolean> => {
  try {
    const response = await fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filename,
        data,
      }),
    });
    
    if (!response.ok) {
      console.error(`Error writing ${filename}:`, response.statusText);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
};