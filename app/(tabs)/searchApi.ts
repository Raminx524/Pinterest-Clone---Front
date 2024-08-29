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

const searchAPI='https://api.escuelajs.co/api/v1/products?limit=10'
const searchData=[{
    "id":26,
    "title":"Sleek Mirror Finish Phone Case",
    "price":27,
    "description":"Enhance your smartphone's look with this ultra-sleek mirror finish phone case. Designed to offer style with protection,the case features a reflective surface that adds a touch of elegance while keeping your device safe from scratches and impacts. Perfect for those who love a minimalist and modern aesthetic.",
    "images":["https://i.imgur.com/yb9UQKL.jpeg","https://i.imgur.com/m2owtQG.jpeg","https://i.imgur.com/bNiORct.jpeg"],
    "creationAt":"2024-08-28T16:29:13.000Z",
    "updatedAt":"2024-08-28T16:29:13.000Z",
    "category":{
        "id":2,
        "name":"Electronics",
        "image":"https://i.imgur.com/ZANVnHE.jpeg",
        "creationAt":"2024-08-28T16:29:13.000Z",
        "updatedAt":"2024-08-28T16:29:13.000Z"
    }
}]
const searches = searchData.map(({ title, images, category }) => ({
    title,
    img: images[0],
    subtitle: category.name
}));