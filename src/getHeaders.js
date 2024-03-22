import puppeteer from "puppeteer";

export const _getHeaders = async (url, el) => {
    console.log("1 - Start Function\nURL: " + url);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log("2 - Start Browser");
    
    page.setDefaultNavigationTimeout(0);
    page.setDefaultTimeout(0);
    await page.goto(url);
    console.log("3 - Go to website");

    await page.waitForSelector(el);
    console.log("4 - Wait for element: " + el);

    const closeBrowser = async () => {
        await browser.close()
    };
    await page.exposeFunction("closeBrowser", closeBrowser);
    console.log("5 - Declared close Browser function and exposed that function");

    try {
        console.log("6 - Started try");
        const evaluation = await page.evaluate(async (el) => {
            const newsInstances = document.querySelectorAll(el);
    
            const newsList = [];
    
            newsInstances.forEach(s => {
                newsList.push({
                    content: s.textContent,
                    element: el,
                    title: s.title,
                    class: s.className,
                    id: s.id,
                    href: s.href
                })
            })

            closeBrowser();

            console.log("Ready\n< --------------------------------- >");
            console.log(newsList);
            console.log("< --------------------------------- >");
        
            return newsList;
        }, el);
        console.log("Finished with evaluation\n< --------------------------------- >");

        return evaluation;
    }
    catch (err) {
        console.log(err);
    }

    console.log("Finalized with error\n< --------------------------------- >");
    
    try {
        closeBrowser();
    }
    catch (err) {
        console.log(err);
    }

    return false;
}