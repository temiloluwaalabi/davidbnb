import { type CountryCode } from "libphonenumber-js/min";

export type CountryWithCode = {
  name_en: string;
  continent_en: string;
  capital_en: string;
  dial_code: string;
  code_2: CountryCode;
  tld: string;
  emoji: string;
  placeholder: string;
};

export const countriesWithCodes: [CountryWithCode, ...CountryWithCode[]] = [
  {
    name_en: "United States",
    continent_en: "North America",
    capital_en: "Washington, D.C.",
    dial_code: "+1",
    code_2: "US",
    tld: ".us",
    emoji: "🇺🇸",
    placeholder: "(555) 123-4567",
  },
  {
    name_en: "Colombia",
    continent_en: "South America",
    capital_en: "Bogota",
    dial_code: "+57",
    code_2: "CO",
    tld: ".co",
    emoji: "🇨🇴",
    placeholder: "300 123 4567",
  },
  {
    name_en: "Mexico",
    continent_en: "North America",
    capital_en: "Mexico City",
    dial_code: "+52",
    code_2: "MX",
    tld: ".mx",
    emoji: "🇲🇽",
    placeholder: "55 1234 5678",
  },
  {
    name_en: "Canada",
    continent_en: "North America",
    capital_en: "Ottawa",
    dial_code: "+1",
    code_2: "CA",
    tld: ".ca",
    emoji: "🇨🇦",
    placeholder: "(555) 123-4567",
  },
  {
    name_en: "Brazil",
    continent_en: "South America",
    capital_en: "Brasília",
    dial_code: "+55",
    code_2: "BR",
    tld: ".br",
    emoji: "🇧🇷",
    placeholder: "(11) 1234-5678",
  },
  {
    name_en: "Argentina",
    continent_en: "South America",
    capital_en: "Buenos Aires",
    dial_code: "+54",
    code_2: "AR",
    tld: ".ar",
    emoji: "🇦🇷",
    placeholder: "11 1234-5678",
  },
  {
    name_en: "United Kingdom",
    continent_en: "Europe",
    capital_en: "London",
    dial_code: "+44",
    code_2: "GB",
    tld: ".uk",
    emoji: "🇬🇧",
    placeholder: "07123 456789",
  },
  {
    name_en: "France",
    continent_en: "Europe",
    capital_en: "Paris",
    dial_code: "+33",
    code_2: "FR",
    tld: ".fr",
    emoji: "🇫🇷",
    placeholder: "06 12 34 56 78",
  },
  {
    name_en: "Germany",
    continent_en: "Europe",
    capital_en: "Berlin",
    dial_code: "+49",
    code_2: "DE",
    tld: ".de",
    emoji: "🇩🇪",
    placeholder: "01512 345678",
  },
  {
    name_en: "Italy",
    continent_en: "Europe",
    capital_en: "Rome",
    dial_code: "+39",
    code_2: "IT",
    tld: ".it",
    emoji: "🇮🇹",
    placeholder: "312 3456789",
  },
  {
    name_en: "Spain",
    continent_en: "Europe",
    capital_en: "Madrid",
    dial_code: "+34",
    code_2: "ES",
    tld: ".es",
    emoji: "🇪🇸",
    placeholder: "612 34 56 78",
  },
  {
    name_en: "China",
    continent_en: "Asia",
    capital_en: "Beijing",
    dial_code: "+86",
    code_2: "CN",
    tld: ".cn",
    emoji: "🇨🇳",
    placeholder: "131 2345 6789",
  },
  {
    name_en: "Australia",
    continent_en: "Oceania",
    capital_en: "Canberra",
    dial_code: "+61",
    code_2: "AU",
    tld: ".au",
    emoji: "🇦🇺",
    placeholder: "04 1234 5678",
  },
  {
    name_en: "New Zealand",
    continent_en: "Oceania",
    capital_en: "Wellington",
    dial_code: "+64",
    code_2: "NZ",
    tld: ".nz",
    emoji: "🇳🇿",
    placeholder: "021 123 4567",
  },
  {
    name_en: "South Africa",
    continent_en: "Africa",
    capital_en: "Pretoria",
    dial_code: "+27",
    code_2: "ZA",
    tld: ".za",
    emoji: "🇿🇦",
    placeholder: "071 123 4567",
  },
  {
    name_en: "Nigeria",
    continent_en: "Africa",
    capital_en: "Abuja",
    dial_code: "+234",
    code_2: "NG",
    tld: ".ng",
    emoji: "🇳🇬",
    placeholder: "0801 234 5678",
  },
  {
    name_en: "Kenya",
    continent_en: "Africa",
    capital_en: "Nairobi",
    dial_code: "+254",
    code_2: "KE",
    tld: ".ke",
    emoji: "🇰🇪",
    placeholder: "0712 345 678",
  },
  {
    name_en: "Russia",
    continent_en: "Europe/Asia",
    capital_en: "Moscow",
    dial_code: "+7",
    code_2: "RU",
    tld: ".ru",
    emoji: "🇷🇺",
    placeholder: "912 345 67 89",
  },
  {
    name_en: "Turkey",
    continent_en: "Asia/Europe",
    capital_en: "Ankara",
    dial_code: "+90",
    code_2: "TR",
    tld: ".tr",
    emoji: "🇹🇷",
    placeholder: "0501 234 5678",
  },
  {
    name_en: "Egypt",
    continent_en: "Africa",
    capital_en: "Cairo",
    dial_code: "+20",
    code_2: "EG",
    tld: ".eg",
    emoji: "🇪🇬",
    placeholder: "0100 123 4567",
  },
  {
    name_en: "Saudi Arabia",
    continent_en: "Asia",
    capital_en: "Riyadh",
    dial_code: "+966",
    code_2: "SA",
    tld: ".sa",
    emoji: "🇸🇦",
    placeholder: "050 123 4567",
  },
  {
    name_en: "United Arab Emirates",
    continent_en: "Asia",
    capital_en: "Abu Dhabi",
    dial_code: "+971",
    code_2: "AE",
    tld: ".ae",
    emoji: "🇦🇪",
    placeholder: "050 123 4567",
  },
  {
    name_en: "Japan",
    continent_en: "Asia",
    capital_en: "Tokyo",
    dial_code: "+81",
    code_2: "JP",
    tld: ".jp",
    emoji: "🇯🇵",
    placeholder: "090-1234-5678",
  },
  {
    name_en: "Chile",
    continent_en: "South America",
    capital_en: "Santiago",
    dial_code: "+56",
    code_2: "CL",
    tld: ".cl",
    emoji: "🇨🇱",
    placeholder: "9 1234 5678",
  },
  {
    name_en: "Peru",
    continent_en: "South America",
    capital_en: "Lima",
    dial_code: "+51",
    code_2: "PE",
    tld: ".pe",
    emoji: "🇵🇪",
    placeholder: "912 345 678",
  },
  {
    name_en: "Ecuador",
    continent_en: "South America",
    capital_en: "Quito",
    dial_code: "+593",
    code_2: "EC",
    tld: ".ec",
    emoji: "🇪🇨",
    placeholder: "099 123 4567",
  },
  {
    name_en: "Pakistan",
    continent_en: "Asia",
    capital_en: "Islamabad",
    dial_code: "+92",
    code_2: "PK",
    tld: ".pk",
    emoji: "🇵🇰",
    placeholder: "300 1234567",
  },
  {
    name_en: "India",
    continent_en: "Asia",
    capital_en: "New Delhi",
    dial_code: "+91",
    code_2: "IN",
    tld: ".in",
    emoji: "🇮🇳",
    placeholder: "81234 56789",
  },
  {
    name_en: "Bangladesh",
    continent_en: "Asia",
    capital_en: "Dhaka",
    dial_code: "+880",
    code_2: "BD",
    tld: ".bd",
    emoji: "🇧🇩",
    placeholder: "01812-345678",
  },
  {
    name_en: "Sri Lanka",
    continent_en: "Asia",
    capital_en: "Sri Jayawardenepura Kotte",
    dial_code: "+94",
    code_2: "LK",
    tld: ".lk",
    emoji: "🇱🇰",
    placeholder: "071 123 4567",
  },
  {
    name_en: "Nepal",
    continent_en: "Asia",
    capital_en: "Kathmandu",
    dial_code: "+977",
    code_2: "NP",
    tld: ".np",
    emoji: "🇳🇵",
    placeholder: "984-1234567",
  },
  {
    name_en: "Bhutan",
    continent_en: "Asia",
    capital_en: "Thimphu",
    dial_code: "+975",
    code_2: "BT",
    tld: ".bt",
    emoji: "🇧🇹",
    placeholder: "1712 3456",
  },
  {
    name_en: "Maldives",
    continent_en: "Asia",
    capital_en: "Malé",
    dial_code: "+960",
    code_2: "MV",
    tld: ".mv",
    emoji: "🇲🇻",
    placeholder: "771 2345",
  },
];
