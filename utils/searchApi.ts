import axios from 'axios';

const apiUrl = 'http://192.168.1.217:3000/api/user/66cefdd702a436ac965d2378/search-history';

export const fetchSearchHistory = async (): Promise<string[]> => {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        return [];
    }
};

export const addToHistory = async (search: string): Promise<void> => {
    try {
        await axios.put(apiUrl, { search }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error adding to search history:', error);
    }
};


export const deleteFromHistory = async (search: string): Promise<void> => {
    try {
        await axios.delete(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: { search },
        });
    } catch (error) {
        console.error('Error deleting from search history:', error);
    }
};
