// database.js

// Replace with your Airtable base ID and table names
const AIRTABLE_BASE_ID = 'appy0T24qjDZrLUSD';
const ARTICLES_TABLE_NAME = 'Articles';
const COMMENTS_TABLE_NAME = 'Comments';

// Replace with your Airtable API token
const AIRTABLE_API_TOKEN = 'patmoDlfL20ENqMTQ.02434312a105bab843e2eeeab872a7bf73380bf61e8d21da9d912f4038c79e23';

const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`;

const axios = require('axios').create({
    baseURL: AIRTABLE_API_URL,
    headers: {
        Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
    },
});

// Function to fetch articles from Airtable
async function getArticles() {
    try {
        const response = await axios.get(`/${ARTICLES_TABLE_NAME}`);
        return response.data.records;
    } catch (error) {
        console.error('Error fetching articles from Airtable:', error);
        return [];
    }
}

// Function to fetch comments from Airtable
async function getComments(articleId) {
    try {
        const response = await axios.get(`/${COMMENTS_TABLE_NAME}`, {
            params: {
                filterByFormula: `AND(Article = '${articleId}')`, // Modify this filter as per your Airtable structure
            },
        });
        return response.data.records;
    } catch (error) {
        console.error('Error fetching comments from Airtable:', error);
        return [];
    }
}

export { getArticles, getComments };