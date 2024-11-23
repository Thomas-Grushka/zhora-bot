import axios from "axios";

const {SCRAPER_URL: baseURL} = process.env;

const scraperInstance = axios.create({
    baseURL,
});


const createVacanciesLink = async(payload)=> {
    const {data} = await scraperInstance.post("/scraping/avito", payload);

    return data.link;
}

export default createVacanciesLink;