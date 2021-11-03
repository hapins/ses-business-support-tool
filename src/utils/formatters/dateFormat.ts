export interface DateFormatterInterface {
    /**
     * Date型を拡張表記(YYYY-MM-DD)に変換する
     * @param date
     */
    toExtendedFormat(date: Date): string;
}

export class DateFormatter implements DateFormatterInterface {
    toExtendedFormat(date: Date): string {
        const y = date.getFullYear();
        const m = ('00' + (date.getMonth() + 1)).slice(-2);
        const d = ('00' + date.getDate()).slice(-2);
        return y + '-' + m + '-' + d;
    }
}
