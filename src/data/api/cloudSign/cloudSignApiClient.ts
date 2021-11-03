import { Env } from '../../../env';
import { BaseApiClient, ContentType } from '../base/baseApiClient';
import {
    CloudSignCreateDocumentParticipantRequest, CloudSignCreateDocumentReporteeRequest,
    CloudSignCreateDocumentRequest, CloudSignUpdateDocumentAttributeRequest
} from './request/documentRequest';
import { CloudSignGetTokenRequest } from './request/tokenRequest';
import {
    CloudSignGetDocumentResponse, CloudSignGetDocumentsResponse
} from './response/documentResponse';
import { CloudSignGetTokenResponse } from './response/tokenResponse';

export interface CloudSignApiClientInterface {
    /**
     * CloudSign API用のアクセストークンを取得する
     */
    getAccessToken(): string;
    /**
     * CloudSign上のドキュメント一覧を取得する
     */
    getDocuments(): CloudSignGetDocumentsResponse;
    /**
     * CloudSign上の対象ドキュメントを取得する
     * @param id
     */
    getDocument(id: string): CloudSignGetDocumentResponse;
    /**
     * ドキュメントを作成する
     * @param request
     */
    createDocument(
        request: CloudSignCreateDocumentRequest
    ): CloudSignGetDocumentResponse;
    /**
     * 作成したドキュメントの要素する
     * @param documentId
     * @param request
     */
    updateDocumentAttribute(
        documentId: string,
        request: CloudSignUpdateDocumentAttributeRequest
    ): CloudSignGetDocumentResponse;
    /**
     * 作成したドキュメントに添付するファイルを作成する
     * @param documentId
     * @param file
     */
    createDocumentFile(
        documentId: string,
        file: any,
        filename: string
    ): CloudSignGetDocumentResponse;
    /**
     * 作成したドキュメントのフローに承認者を追加する
     * @param documentId
     * @param request
     */
    createDocumentParticipant(
        documentId: string,
        request: CloudSignCreateDocumentParticipantRequest
    ): CloudSignGetDocumentResponse;
    /**
     * 作成したドキュメントを共有する人を追加する
     * @param documentId
     * @param request
     */
    createDocumentReportee(
        documentId: string,
        request: CloudSignCreateDocumentReporteeRequest
    ): CloudSignGetDocumentResponse;
}

export class CloudSignApiClient
    extends BaseApiClient
    implements CloudSignApiClientInterface
{
    constructor() {
        super(Env.cloudSign.baseUrl);
    }

    getAccessToken(): string {
        if (!Env.cloudSign.clientId) {
            throw Error('Could not get client id.');
        }
        const payload: CloudSignGetTokenRequest = {
            clientId: Env.cloudSign.clientId,
        };

        const result = this.post({
            requestPath: '/token',
            payload,
        }) as CloudSignGetTokenResponse;

        return result.accessToken;
    }

    getDocuments(): CloudSignGetDocumentsResponse {
        const accessToken = this.getAccessToken();
        const headers = {
            Authorization: 'Bearer ' + accessToken,
            Accept: 'application/json',
        };

        const result = this.get({
            requestPath: '/documents',
            headers,
        }) as CloudSignGetDocumentsResponse;

        return result;
    }

    getDocument(id: string): CloudSignGetDocumentResponse {
        const accessToken = this.getAccessToken();
        const headers = {
            Authorization: 'Bearer ' + accessToken,
            Accept: 'application/json',
        };

        const result = this.get({
            requestPath: '/documents/' + id,
            headers,
        }) as CloudSignGetDocumentResponse;

        return result;
    }

    createDocument(
        request: CloudSignCreateDocumentRequest
    ): CloudSignGetDocumentResponse {
        const accessToken = this.getAccessToken();
        const headers = {
            Authorization: 'Bearer ' + accessToken,
            Accept: 'application/json',
        };

        const result = this.post({
            requestPath: '/documents',
            payload: request,
            headers,
            contentType: ContentType.urlencoded,
        }) as CloudSignGetDocumentResponse;

        return result;
    }

    updateDocumentAttribute(
        documentId: string,
        request: CloudSignUpdateDocumentAttributeRequest
    ): CloudSignGetDocumentResponse {
        const accessToken = this.getAccessToken();
        const headers = {
            Authorization: 'Bearer ' + accessToken,
            Accept: 'application/json',
        };

        const result = this.put({
            requestPath: '/documents/' + documentId + '/attribute',
            payload: request,
            headers,
            contentType: ContentType.json,
        }) as CloudSignGetDocumentResponse;

        return result;
    }

    createDocumentFile(
        documentId: string,
        file: any,
        filename: string
    ): CloudSignGetDocumentResponse {
        const accessToken = this.getAccessToken();
        const headers = {
            Authorization: 'Bearer ' + accessToken,
            Accept: 'application/json',
        };

        const result = this.post({
            requestPath: '/documents/' + documentId + '/files',
            payload: { name: filename, uploadfile: file },
            headers,
        }) as CloudSignGetDocumentResponse;

        return result;
    }

    createDocumentParticipant(
        documentId: string,
        request: CloudSignCreateDocumentParticipantRequest
    ): CloudSignGetDocumentResponse {
        const accessToken = this.getAccessToken();
        const headers = {
            Authorization: 'Bearer ' + accessToken,
            Accept: 'application/json',
        };

        const result = this.post({
            requestPath: '/documents/' + documentId + '/participants',
            payload: request,
            headers,
            contentType: ContentType.urlencoded,
        }) as CloudSignGetDocumentResponse;

        return result;
    }

    createDocumentReportee(
        documentId: string,
        request: CloudSignCreateDocumentReporteeRequest
    ): CloudSignGetDocumentResponse {
        const accessToken = this.getAccessToken();
        const headers = {
            Authorization: 'Bearer ' + accessToken,
            Accept: 'application/json',
        };

        const result = this.post({
            requestPath: '/documents/' + documentId + '/reportees',
            payload: request,
            headers,
            contentType: ContentType.urlencoded,
        }) as CloudSignGetDocumentResponse;

        return result;
    }
}
