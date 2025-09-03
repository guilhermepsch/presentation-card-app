export const IScreenshotServiceToken = Symbol('IScreenshotService');

export interface IScreenshotService {
  generateScreenshot(url: string): Promise<Buffer>;
}