import puppeteer from "puppeteer";

export const _opdCharName = async (url) => {
    console.log("1 - Start Function\nURL: " + url);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log("2 - Start Browser");
    
    await page.goto(url);
    console.log("3 - Go to website");

    await page.waitForSelector(".Week-news");
    console.log("4 - Wait for element");

    const news = await page.evaluate(() => {
        const newsInstances = document.querySelectorAll(".Week-news > div > p");

        const newsList = [];

        newsInstances.forEach(s => {
            newsList.push({
                message: s.textContent
            })
        })

        return newsList;
    });
    await browser.close();
    console.log("Ready\n-----------------------");
    console.log(news);
    console.log("---------------------");

    return news;
}