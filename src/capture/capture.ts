import chromeLambda from "@sparticuz/chrome-aws-lambda";
import MrPuppetshot from "mrpuppetshot";
import { CaptureOptions } from "./types";

const TIMEOUT = Number(process.env.TIMEOUT) || 30 * 1000;
const VIEWPORT_WIDTH = Number(process.env.VIEWPORT_WIDTH) || 1920;
const VIEWPORT_HEIGHT = Number(process.env.VIEWPORT_HEIGHT) || 1200;
const DEVICE_SCALE_FACTOR = Number(process.env.DEVICE_SCALE_FACTOR) || 1;
const IS_MOBILE = process.env.IS_MOBILE === "true";
const IS_LANDSCAPE = process.env.IS_LANDSCAPE === "true";

const defaultViewport = {
    width: VIEWPORT_WIDTH,
    height: VIEWPORT_HEIGHT,
    deviceScaleFactor: DEVICE_SCALE_FACTOR,
    isMobile: IS_MOBILE,
    isLandscape: IS_LANDSCAPE
};

export const capture = async (options: CaptureOptions) => {
    const puppetshot = chromeLambda.executablePath.then(executablePath =>
        new MrPuppetshot(
        {
            executablePath,
            args: [...chromeLambda.args],
            headless: true,
            defaultViewport,
            ignoreHTTPSErrors: false,
            timeout: TIMEOUT
        },
        chromeLambda.puppeteer
        )
    );
    
    if (!options.url) throw Error('No URL specified');
    new URL(options.url); // validate URL as URL
    
    const browser = await puppetshot;
    
    await browser.navigate(options.url, options.puppeteer?.navigation);
    
    options.puppeteer?.viewport &&
        (await browser.resizeViewport(options.puppeteer.viewport));
    
    const imageType = options.puppeteer?.screenshot?.type || "png";
    const capture = options.capture || "viewport";
    
    let buffer: any = null;
    
    switch (capture) {
        case "element":
            buffer = await browser.elementScreenshot(
            options.selector,
            options.puppeteer?.screenshot
            );
            break;
        case "page":
            buffer = await browser.pageScreenshot(options.puppeteer?.screenshot);
            break;
        case "viewport":
        default:
            buffer = await browser.viewportScreenshot(
            options.puppeteer?.screenshot
            );
    }
    
    const response = buffer
    
    return response;
}
