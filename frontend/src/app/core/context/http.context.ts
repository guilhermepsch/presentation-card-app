import { HttpContextToken } from '@angular/common/http';

export const IS_PRIVATE = new HttpContextToken<boolean>(() => false);
