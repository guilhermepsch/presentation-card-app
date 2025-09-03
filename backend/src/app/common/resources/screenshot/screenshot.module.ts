import { Module } from '@nestjs/common';
import { IScreenshotServiceToken } from './domain/screenshot.service.interface';
import { DigilizaScreenshotService } from './data/digiliza/digiliza.screenshot.service';

@Module({
  providers: [
    {
      provide: IScreenshotServiceToken,
      useClass: DigilizaScreenshotService,
    },
  ],
  imports: [],
  exports: [IScreenshotServiceToken],
})
export class ScreenshotModule {}
