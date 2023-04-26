import { CurrencyCode } from "types/currency-code";
import { Locales } from "types/locale";

export const currencyFormatter = (value: number, locale: Locales = "tr-TR", currency: CurrencyCode = "TRY") => {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency
    }).format(value);
};


