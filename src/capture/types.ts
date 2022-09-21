import { DirectNavigationOptions } from "puppeteer";

export interface CaptureOptions {
    url?: string,
    capture?: 'element' | 'page' | 'viewport',
    selector?: string,
    puppeteer?: {
        navigation?: DirectNavigationOptions
        viewport?: Viewport,
        screenshot: {
            omitBackground: boolean,
            quality: unknown,
            type: 'png'
        }
    }
}

export interface Viewport {
    width: number
    height: number
}
