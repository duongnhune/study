export default defineI18nConfig(() => {
    return {
        fallbackLocale: 'en',
        defaultLocale: 'en',
        datetimeFormats: {
            'en': {
                short: { year: 'numeric', month: 'short', day: 'numeric', },
                long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', }
            },
            'vi': {
                short: { year: 'numeric', month: '2-digit', day: '2-digit', },
                long: { year: 'numeric', month: 'long', day: '2-digit', weekday: 'long', }
            }
        },
        numberFormats: {
            'en': {
                currencyUSD: { style: 'currency', currency: 'USD', notation: 'standard', currencyDisplay: 'narrowSymbol' },
                currencyVND: { style: 'currency', currency: 'VND', notation: 'standard', currencyDisplay: 'narrowSymbol' },
                currencyPHP: { style: 'currency', currency: 'PHP', notation: 'standard', currencyDisplay: 'narrowSymbol' },
            },
            'vi': {
                currencyUSD: { style: 'currency', currency: 'USD', notation: 'standard', currencyDisplay: 'narrowSymbol' },
                currencyVND: { style: 'currency', currency: 'VND', notation: 'standard', currencyDisplay: 'narrowSymbol' },
                currencyPHP: { style: 'currency', currency: 'PHP', notation: 'standard', currencyDisplay: 'narrowSymbol' },
            }
        }
    }
})
