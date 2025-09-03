/* eslint-disable */
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ZodPipe implements PipeTransform {
  constructor(private readonly schema: any) {}

  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    console.log(metadata);
    console.log(this.schema);

    return this.schema.parse(value);
  }
}
