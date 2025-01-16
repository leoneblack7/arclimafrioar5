const DATA_DIR = 'data';

export const readData = async (filename: string) => {
  try {
    const response = await fetch(`/${DATA_DIR}/${filename}`);
    if (!response.ok) {
      console.error(`Error reading file ${filename}:`, response.statusText);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error reading file ${filename}:`, error);
    return null;
  }
};

export const writeData = async (filename: string, data: any): Promise<boolean> => {
  try {
    const response = await fetch(`/api/save-data`, {
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error(`Error writing file ${filename}:`, error);
    return false;
  }
};