import axios from "axios";

const {ZENROWS_API_KEY} = process.env;

export const getTariffPlanDetails = async () => {
    try {
        const {data} = await axios({
            url: 'https://api.zenrows.com/v1/subscriptions/self/details',
            method: 'GET',
            headers: {
                'X-API-Key': ZENROWS_API_KEY,
            },
        });
        console.log(data);
        return data;
    }
    catch(error) {
        console.log(error.message);
        console.log(error.response.status);
    }
}


const scrapperInstance = axios.create({
    baseURL: `https://api.zenrows.com/v1/?apikey=${ZENROWS_API_KEY}`,
})

export const getPageWithProxy = async url => {
    try {
        const {data} = await scrapperInstance.get("", {
            params: {
                url,
            }
        })
        return data;
    }
    catch(error) {
        console.log(error.message);
        throw error;
    }
}

