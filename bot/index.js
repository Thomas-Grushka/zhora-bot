import { Telegraf } from "telegraf";
import { ToadScheduler, SimpleIntervalJob, AsyncTask } from "toad-scheduler";
import * as cheerio from 'cheerio';

import botMessages from "./botMessages.js";
import * as buttons from "./buttons.js";

import * as userServices from "../services/userServices.js";
import * as countryServices from "../services/countryServices.js";
import * as cityServices from "../services/cityServices.js";
import * as scopeServices from "../services/scopeServices.js";
import * as professionServices from "../services/professionServices.js";

import * as userVacancyServices from "../services/userVacancyServices.js";

import createVacanciesLink from "../utils/vacancies/createVacanciesLink.js";

import {getPageWithProxy} from "../utils/zenRows.js";
import parseVacancy from "../utils/vacancies/parseVacancy.js";
import createVacancyText from "../utils/vacancies/createVacancyText.js";

import scopes from "./scopes.js";

const { TELEGRAM_BOT_TOKEN: botToken } = process.env;

const user = {

};

export const startBot = () => {
    const bot = new Telegraf(botToken);

    const scheduler = new ToadScheduler();
    
    bot.start(async (ctx) => {
        const {id: telegramId, is_bot, ...userData} = ctx.from;
        
        const user = await userServices.findUser({telegramId});
        if(!user) {
            await userServices.addUser({...userData, telegramId});
        } else if(!user.username && userData.username) {
            const updateData = {username: userData.username};
            if(userData.language_code) {
                updateData.language_code = userData.language_code;
            }
            await userServices.updateUser({telegramId}, updateData);
        }

        ctx.reply(botMessages.welcomeMessage, buttons.getStartButton());
    });

    bot.action("start-select-country", async (ctx) => {
        const countries = await countryServices.getAllCountries();

        ctx.reply(botMessages.selectCountryMessage, buttons.getCountriesButtons(countries));
    })

    bot.action(/\bcountry-\b/, async (ctx) => {
        const {data} = ctx.update.callback_query;
        const [, id] = data.split("-");
        const countryId = Number(id);

        const {id: telegramId} = ctx.from;
        await userServices.updateUser({telegramId}, {country: countryId});

        const cities = await cityServices.getCitiesByCountry(countryId);

        await ctx.reply(botMessages.selectCityMessage, buttons.getCitiesButtons(cities));
    });

    bot.action(/\b^city-\b/, async (ctx) => {
        const {data} = ctx.update.callback_query;
        const [, id] = data.split("-");
        const cityId = Number(id);

        const {id: telegramId} = ctx.from;
        await userServices.updateUser({telegramId}, {city: cityId});

        const subCities = await cityServices.getSubCities(cityId);
        if(subCities?.length) {
            await ctx.reply(botMessages.afterSelectCityMessage, buttons.getAfterSelectCityButtons(cityId));
        }
        else {
            const scopes = await scopeServices.getAllScopes();
            await ctx.reply(botMessages.selectScopeMessage, buttons.getScopeButtons(scopes));
        }
    });

    bot.action(/\b^select-subcity-\b/, async (ctx) => {
        const {data} = ctx.update.callback_query;
        const [, , id] = data.split("-");
        const cityId = Number(id);

        const subCities = await cityServices.getSubCities(cityId);

        await ctx.reply(botMessages.selectSubCityMessage, buttons.getSubCitiesButtons(subCities));
    });

    bot.action(/\b^subcity-\b/, async (ctx) => {
        const {data} = ctx.update.callback_query;
        const [, id] = data.split("-");
        const cityId = Number(id);

        const {id: telegramId} = ctx.from;
        await userServices.updateUser({telegramId}, {city: cityId});

        // const scopes = await scopeServices.getAllScopes();
        const items = Object.keys(scopes).map(name => ({name, dataMarker: name}));
        await ctx.reply(botMessages.selectScopeMessage, buttons.getScopeButtons(items));
    });

    bot.action(/\b^select-scope$\b/, async (ctx) => {
        const scopes = await scopeServices.getAllScopes();
        // const items = Object.keys(scopes).map(({name, text}) => ({name: text, dataMarker: name}));
    //    console.log(Object.keys(scopes));
        // await ctx.reply(botMessages.selectScopeMessage, buttons.getScopeButtons(scopes));
        await ctx.reply(botMessages.selectScopeMessage, buttons.getScopeButtons(scopes));
    });

    bot.action(/\b^scope-\b/, async (ctx) => {
        const {data} = ctx.update.callback_query;
        const [, scopeDataMarker] = data.split("-");

        const {id: telegramId} = ctx.from;
        const {scope} = await userServices.findUser({telegramId});

        if(!scope.includes(scopeDataMarker)) {
            scope.push(scopeDataMarker);
            await userServices.updateUser({telegramId}, {scope});
        }
        const {id: scopeId} = await scopeServices.getScopeByDataMarker(scopeDataMarker);
        await ctx.reply(botMessages.afterSelectScopeMessage, buttons.getAfterSelectScopeButtons(scopeId));
        // await ctx.reply(botMessages.afterSelectScopeMessage, buttons.getAfterSelectScopeButtons(22));
    });
    
    bot.action(/\b^select-professions-\b/, async (ctx) => {
        const {data} = ctx.update.callback_query;
        const [, , scopeId] = data.split("-");
        const professions = await professionServices.getProffessionByScope(Number(scopeId));
        // const {items} = scopes.find(item => item.dataMarker === user.scopeDataMarker)
        // const professions = items.map(name => ({name, dataMarker: name.replaceAll(" ", "-")}));
        await ctx.reply(botMessages.selectProfessionMessage, buttons.getProfessionButtons(professions, scopeId));
        // await ctx.reply(botMessages.selectProfessionMessage, buttons.getProfessionButtons(professions, 22));
    });

    bot.action(/\b^profession-\b/, async (ctx) => {
        const {data} = ctx.update.callback_query;
        const [, professionDataMarker, scopeId] = data.split("-");

        const {id: telegramId} = ctx.from;
        const {profession} = await userServices.findUser({telegramId});

        if(!profession.includes(professionDataMarker)) {
            profession.push(professionDataMarker);
            await userServices.updateUser({telegramId}, {profession});
        }
        // await ctx.reply(botMessages.afterSelectProfessionMessage, buttons.getAfterSelectProfessionButtons());
    });

    bot.action(/\b^select-employment-type\b/, async (ctx) => {

        await ctx.reply(botMessages.selectEmploymentTypeMessage, buttons.getEmploymentTypesButtons());
    });

    bot.action(/\b^employment-type-\b/, async (ctx) => {

        await ctx.reply(botMessages.afterSelectEmploymentTypeMessage, buttons.geAfterEmploymentTypesButtons());
    });

    bot.action(/\b^select-operating-mode\b/, async (ctx) => {

        await ctx.reply(botMessages.selectWorkType, buttons.getOperationModeButtons());
    });

    bot.action(/\b^operation-mode-\b/, async (ctx) => {

        await ctx.reply(botMessages.afterSelectWorkTypeMessage, buttons.geAfterOperationTypeButtons());
    });

    bot.action(/\b^get-vacancies$\b/, async (ctx) => {
        // await ctx.reply(botMessages.afterGetVacancies);
        const {id: telegramId} = ctx.from;
        const user = await userServices.findUser({telegramId});
        const {scope, city: cityId, id: userId} = user;
        const {avito_name: cityName} = await cityServices.getCityById(cityId);

        const vaсancyFilterLink = await createVacanciesLink({scope, cityName});

        await userServices.updateUser({telegramId}, {vaсancyFilterLink});

        const vacancySendTask = new AsyncTask(
            "send vacancy",
            async () => {
                const allVacanciesPage = await getPageWithProxy(vaсancyFilterLink);
                console.log("get all vacancies");
                const allVacancies = await userVacancyServices.getVacanciesByUser(userId);
                const allVacanciesResourceIds = allVacancies.map(({resourceId}) => resourceId);

                const $ = cheerio.load(allVacanciesPage);

                const newVacancyItem = [...$("[data-marker=item]")].find(item => !allVacanciesResourceIds.includes($(item).attr("data-item-id")));

                if(newVacancyItem) {
                    const vacancyPath = $(newVacancyItem).find("[data-marker=item-title]").attr("href");
                    const vacancyUrl = `https://www.avito.ru${vacancyPath}`;
                    const vacancyPage = await getPageWithProxy(vacancyUrl);
                    console.log("get new vacancy");
                    const data = parseVacancy(vacancyPage, {resource: "avito", userId});
                    await userVacancyServices.addVacancy(data);
                    console.log("add");
                    const text = createVacancyText(data);
                    await ctx.reply(text[0], { parse_mode: 'HTML' });
                    if(text[1]) {
                        await ctx.reply(text[1], { parse_mode: 'HTML' });
                    }
                    console.log("send");
                }
            },
            (error) => {
                console.log(error.message);
            }
        );

        const vacancyJob = new SimpleIntervalJob({
            // minutes: 10,
            seconds: 30,
        }, vacancySendTask);

        scheduler.addSimpleIntervalJob(vacancyJob);
    });

    bot.launch();
}


