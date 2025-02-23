export const toFarsiNumber = (number: number | string): string => {
    return number.toString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};