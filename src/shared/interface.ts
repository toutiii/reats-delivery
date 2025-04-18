import { CountryCode } from 'libphonenumber-js';

export interface ICountry {
   calling_codes: number[];
   emoji: string;
   value: string;
   key: CountryCode;
}
