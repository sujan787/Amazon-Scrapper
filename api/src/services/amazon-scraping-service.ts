const StealthPlugin = require('puppeteer-extra-plugin-stealth')

import * as cheerio from 'cheerio';

import proxyList from '../data/proxy-list';

const puppeteer = require('puppeteer-extra')

puppeteer.use(StealthPlugin())

// import puppeteer from 'puppeteer';


type ItemType = {
    name: string,
    star: string,
    price: string,
    url: string,
    image: string
}

export const collectItems = async (searchInput: string)
    : Promise<Array<ItemType> | []> => {
    let data = await getItems(searchInput)
    return data;
}

const getItems = async (searchInput: string): Promise<Array<ItemType> | []> => {
    const randomProxy = proxyList[Math.floor(Math.random() * proxyList.length)];
    // args: ['--no-sandbox',`--proxy-server=${randomProxy}`]
    
    const browser = await puppeteer.launch({
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
        headless: true,
        args: ['--no-sandbox'],
    });  
    
    const page = await browser.newPage();
    let items = [] as Array<ItemType>;

    try {
        await page.goto(`https://www.amazon.in/s?k=${searchInput}`);

        const selector = `[data-component-type="s-search-results"]`

        await page.waitForSelector(selector);

        const elementHTML = await page.$eval(selector, (element:any) => element.innerHTML);

        const $ = cheerio.load(elementHTML);

        $(`[data-component-type="s-search-result"]`).each((index, element) => {

            const product: ItemType = {
                name: "",
                star: "",
                price: "",
                url: "",
                image: ""
            }

            try {
                let name = $(element).find('h2.a-size-mini.a-spacing-none.a-color-base.s-line-clamp-4').text();
                name = name.length ? name : $(element).find('h2.a-size-mini.a-spacing-none.a-color-base.s-line-clamp-2').text();
                product.name = name.trim();
            } catch (error) {
                console.log("no name")
            }

            try {
                let star = $(element).find('span.a-icon-alt').text() ?? "";
                product.star = star.trim();
            } catch (error) {
                console.log("no star")
            }

            try {
                let price = $(element).find('span.a-price-whole').text() ?? "";
                product.price = price.trim();
            } catch (error) {
                console.log("no price")
            }

            try {
                let url = $(element).find('a.a-link-normal.s-no-outline').attr()?.href ?? "";
                product.url = `https://www.amazon.in${url}`
            } catch (error) {
                console.log("no url")
            }

            try {
                let image = $(element).find('img.s-image').attr()?.src ?? "";
                product.image = image;
            } catch (error) {
                console.log("no image")
            }

            items.push(product);
        });


    } catch (error) {
        console.error('Error:', error);
    }
    await browser.close();
    return items;
}; 

