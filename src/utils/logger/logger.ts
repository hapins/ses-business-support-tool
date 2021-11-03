export type CustomLogFormat = {
    message: string;
    rawLog: any;
};
export interface CustomLoggerInterface {
    log(log: CustomLogFormat): void;
    warn(log: CustomLogFormat): void;
    error(log: CustomLogFormat): void;
}

export class CustomLogger implements CustomLoggerInterface {
    constructor(private name: string) {}

    log(log: CustomLogFormat): void {
        console.log({
            className: this.name,
            message: log.message,
            rawLog: log.rawLog,
        });
    }

    warn(log: CustomLogFormat): void {
        console.warn({
            className: this.name,
            message: log.message,
            rawLog: log.rawLog,
        });
    }

    error(log: CustomLogFormat): void {
        console.error({
            className: this.name,
            message: log.message,
            rawLog: log.rawLog,
        });
    }
}
