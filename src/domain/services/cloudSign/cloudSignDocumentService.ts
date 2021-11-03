import { CloudSignApiClient } from '../../../data/api/cloudSign/cloudSignApiClient';
import { CloudSignDocument } from '../../../data/api/cloudSign/model/documentType';
import {
    CloudSignCreateDocumentParticipantRequest, CloudSignCreateDocumentReporteeRequest,
    CloudSignCreateDocumentRequest, CloudSignUpdateDocumentAttributeRequest
} from '../../../data/api/cloudSign/request/documentRequest';
import { DateFormatter } from '../../../utils/formatters/dateFormat';

export interface CloudSignDocumentServiceInterface {
    /**
     * CloudSign上に契約ドキュメントを作成する
     *  @param title
     */
    create(title: string): CloudSignDocument;

    /**
     * CloudSign上の契約ドキュメントを更新する
     *  @param documentId
     *  @param counterparty
     *  @param validityStartAt
     *  @param validityEndAt
     */
    updateAttribute(
        documentId: string,
        counterparty: string,
        validityStartAt: Date,
        validityEndAt: Date,
    ): CloudSignDocument;

    /**
     * CloudSign上の契約ドキュメントにファイルを添付する
     *  @param documentId
     *  @param file
     */
    addFile(documentId: string, file: any, filename: string): CloudSignDocument;

    /**
     * CloudSign上の契約ドキュメントにフローに含める宛先を追加する
     *  @param documentId
     *  @param email
     *  @param name
     */
    addParticipant(
        documentId: string,
        email: string,
        name: string,
    ): CloudSignDocument;

    /**
     * CloudSign上の契約ドキュメントに共有先を追加する
     *  @param documentId
     *  @param email
     *  @param name
     */
    addReportee(
        documentId: string,
        email: string,
        name: string,
    ): CloudSignDocument;
}

export class CloudSignDocumentService
    implements CloudSignDocumentServiceInterface
{
    create(title: string): CloudSignDocument {
        const cloudSignClient = new CloudSignApiClient();
        const documentRequest: CloudSignCreateDocumentRequest = { title };
        return cloudSignClient.createDocument(documentRequest);
    }

    updateAttribute(
        documentId: string,
        counterparty: string,
        validityStartAt: Date,
        validityEndAt: Date,
    ): CloudSignDocument {
        const dateFormatter = new DateFormatter();
        const cloudSignClient = new CloudSignApiClient();

        const documentAttributeRequest: CloudSignUpdateDocumentAttributeRequest =
            {
                counterparty,
                validityStartAt:
                    dateFormatter.toExtendedFormat(validityStartAt),
                validityEndAt: dateFormatter.toExtendedFormat(validityEndAt),
            };

        return cloudSignClient.updateDocumentAttribute(
            documentId,
            documentAttributeRequest,
        );
    }

    addFile(
        documentId: string,
        file: any,
        filename: string,
    ): CloudSignDocument {
        const cloudSignClient = new CloudSignApiClient();
        return cloudSignClient.createDocumentFile(documentId, file, filename);
    }

    addParticipant(
        documentId: string,
        email: string,
        name: string,
    ): CloudSignDocument {
        const cloudSignClient = new CloudSignApiClient();
        const request: CloudSignCreateDocumentParticipantRequest = {
            email,
            name,
        };
        return cloudSignClient.createDocumentParticipant(documentId, request);
    }

    addReportee(
        documentId: string,
        email: string,
        name: string,
    ): CloudSignDocument {
        const cloudSignClient = new CloudSignApiClient();
        const request: CloudSignCreateDocumentReporteeRequest = {
            email,
            name,
        };
        return cloudSignClient.createDocumentReportee(documentId, request);
    }
}
