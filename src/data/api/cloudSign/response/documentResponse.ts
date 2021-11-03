import { CloudSignDocument } from '../model/documentType';

export type CloudSignGetDocumentsResponse = {
    total: number;
    page: number;
    documents: CloudSignDocument[];
};

export type CloudSignGetDocumentResponse = CloudSignDocument;
