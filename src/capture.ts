import * as playwright from 'playwright-aws-lambda';

/* const args: string[] = [
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu-sandbox',
    // "--single-process",
    'window-size=1920x1080'
] */

export const capture = async (url: string, isAws: boolean = false): Promise<string> => {
    console.log('launching browser')
    const browser = await playwright.launchChromium({
        // ...(isAws && {
        //     executablePath: '/usr/bin/google-chrome-stable'
        // }),
        // args,
        // dumpio: true,
        // userDataDir: '/tmp' // needed otherwise .newPage will crash
    });

    console.log('opening new page')
    const page = await browser.newPage();

    console.log('going to url', url)
    await page.goto(url, {
        timeout: 0
    });

    console.log('taking screenshot')
    const screenshotBuffer = await page.screenshot({});

    console.log('taken screenshot', screenshotBuffer)

    const screenshot = screenshotBuffer.toString('base64')

    await browser.close();

    return screenshot;
}
