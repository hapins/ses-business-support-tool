import { CamelCaseConverter } from '../../../utils/converters/camelCaseConverter';
import { SnaceCaseConverter } from '../../../utils/converters/snakeCaseConverter';
import { CustomLogger, CustomLoggerInterface } from '../../../utils/logger/logger';
import { StringKeyObject } from '../../../utils/types/objectType';

export enum ContentType {
    json = 'application/json',
    urlencoded = 'application/x-www-form-urlencoded',
    formData = 'multipart/form-data',
}

const HttpMethod = {
    Get: 'get',
    Put: 'put',
    Post: 'post',
} as const;
type HttpMethod = typeof HttpMethod[keyof typeof HttpMethod];

export abstract class BaseApiClient {
    private logger: CustomLoggerInterface;

    constructor(private baseUrl: string) {
        this.logger = new CustomLogger(this.constructor.name);
    }

    protected get({
        requestPath,
        headers,
    }: {
        requestPath?: string;
        headers?: StringKeyObject;
    }): StringKeyObject {
        this.logger.log({
            message: 'API request is started.',
            rawLog: 'request url: ' + this.baseUrl + requestPath,
        });

        const options = {
            method: HttpMethod.Get,
            headers: headers,
        };
        try {
            const response = UrlFetchApp.fetch(
                this.baseUrl + requestPath,
                options
            ).getContentText();
            const jsonResponse = JSON.parse(response);
            const convertedResponse =
                new CamelCaseConverter().convertToCamelObject(jsonResponse);
            this.logger.log({
                message: 'API response',
                rawLog: convertedResponse,
            });
            return convertedResponse;
        } catch (error) {
            this.logger.error({ message: 'Error', rawLog: error });
            throw Error(error as string);
        }
    }

    protected post({
        requestPath,
        payload,
        headers,
        contentType,
    }: {
        requestPath?: string;
        payload: StringKeyObject;
        headers?: StringKeyObject;
        contentType?: ContentType;
    }): StringKeyObject {
        this.logger.log({
            message: 'API request is started.',
            rawLog: 'request url: ' + this.baseUrl + requestPath,
        });
        const convertedPayload = new SnaceCaseConverter().convertToSnakeObject(
            payload
        );
        this.logger.log({
            message: 'API request body',
            rawLog: { requestBody: convertedPayload },
        });

        const options = {
            method: HttpMethod.Post,
            contentType: contentType,
            payload:
                contentType == ContentType.json
                    ? JSON.stringify(convertedPayload)
                    : convertedPayload,
            headers: headers,
        };

        try {
            const response = UrlFetchApp.fetch(
                this.baseUrl + requestPath,
                options
            ).getContentText();
            const jsonResponse = JSON.parse(response);
            const convertedResponse =
                new CamelCaseConverter().convertToCamelObject(jsonResponse);
            this.logger.log({
                message: 'API response',
                rawLog: convertedResponse,
            });
            return convertedResponse;
        } catch (error) {
            this.logger.error({ message: 'Error', rawLog: error });
            throw Error(error as string);
        }
    }

    protected put({
        requestPath,
        payload,
        headers,
        contentType,
    }: {
        requestPath?: string;
        payload: StringKeyObject;
        headers?: StringKeyObject;
        contentType?: ContentType;
    }): StringKeyObject {
        this.logger.log({
            message: 'API request is started.',
            rawLog: 'request url: ' + this.baseUrl + requestPath,
        });
        const convertedPayload = new SnaceCaseConverter().convertToSnakeObject(
            payload
        );
        this.logger.log({
            message: 'API request body',
            rawLog: { requestBody: convertedPayload },
        });

        const options = {
            method: HttpMethod.Put,
            contentType: contentType,
            payload:
                contentType == ContentType.json
                    ? JSON.stringify(convertedPayload)
                    : convertedPayload,
            headers: headers,
        };

        try {
            const response = UrlFetchApp.fetch(
                this.baseUrl + requestPath,
                options
            ).getContentText();
            const jsonResponse = JSON.parse(response);
            const convertedResponse =
                new CamelCaseConverter().convertToCamelObject(jsonResponse);
            this.logger.log({
                message: 'API response',
                rawLog: convertedResponse,
            });
            return convertedResponse;
        } catch (error) {
            this.logger.error({ message: 'Error', rawLog: error });
            throw Error(error as string);
        }
    }
}
