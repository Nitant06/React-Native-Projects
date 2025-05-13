import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig.extra?.newsApiKey;

if (!API_KEY) {
    console.error('News API Key is not set in app.config.js extra.newsApiKey');
}

const API_URL = 'https://newsapi.org/v2';

export const fetchTopHeadlines = async (country = 'us', category = '') => {
    let url = `${API_URL}/top-headlines?country=${country}&apiKey=${API_KEY}`;

    if (category && category !== 'General') {
        url += `&category=${category.toLowerCase()}`;
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const errorDetail = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, detail: ${errorDetail}`);
        }

        const data = await response.json();

        if (data.status !== 'ok') {
            throw new Error(`News API Error: ${data.code} - ${data.message}`);
        }

        return data.articles;

    } catch (error) {
        console.error("Error fetching news: ", error);
        throw error;
    }
}