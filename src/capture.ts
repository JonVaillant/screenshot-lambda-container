import * as playwright from 'playwright-aws-lambda';

export const capture = async (url: string, isAws: boolean = false): Promise<string> => {
    console.log('launching browser')
    const browser = await playwright.launchChromium({
        // ...(isAws && {
        //     executablePath: '/usr/bin/google-chrome-stable'
        // }),
    });

    console.log('opening new page')
    const page = await browser.newPage();

    console.log('going to url', url)
    await page.goto(url, {
        timeout: 0
    });

    console.log('taking screenshot')
    const screenshotBuffer = await page.screenshot({ type: 'png' });

    console.log('taken screenshot', screenshotBuffer)

    const base64DataUrl = `data:image/png;base64,${screenshotBuffer.toString('base64')}`

    await browser.close();

    return base64DataUrl;
}
