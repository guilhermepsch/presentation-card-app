import { IScreenshotService } from '../../domain/screenshot.service.interface';
import axios from 'axios';

export class DigilizaScreenshotService implements IScreenshotService {
  async generateScreenshot(url: string): Promise<Buffer> {
    const screenshotApiUrl = `http://screenshot-service:3000/screenshot?url=${encodeURIComponent(url)}`;

    const response = await axios.get(screenshotApiUrl, {
      responseType: 'arraybuffer',
    });

    return Buffer.from(response.data);
  }
}
