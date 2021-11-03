export interface GoogleWorkspaceDocumentClientInterface {
    /**
     * 対象のドキュメントを取得
     */
    getDocumentById(id: string): GoogleAppsScript.Document.Document;
    /**
     * 対象のドキュメントの指定箇所を置換
     */
    replaceTarget(
        id: string,
        searchPattern: string,
        replacementCharacter: string
    ): GoogleAppsScript.Document.Document;
    /**
     * 対象のドキュメントからPDFを作成する
     */
    createPdf(
        document: GoogleAppsScript.Document.Document
    ): GoogleAppsScript.Base.Blob;
}

export class GoogleWorkspaceDocumentClient
    implements GoogleWorkspaceDocumentClientInterface
{
    getDocumentById(id: string): GoogleAppsScript.Document.Document {
        return DocumentApp.openById(id);
    }

    replaceTarget(
        id: string,
        searchPattern: string,
        replacementCharacter: string
    ): GoogleAppsScript.Document.Document {
        const document = this.getDocumentById(id);
        const body = document.getBody();
        body.replaceText(searchPattern, replacementCharacter);
        document.saveAndClose();
        return document;
    }

    createPdf(
        document: GoogleAppsScript.Document.Document
    ): GoogleAppsScript.Base.Blob {
        return document.getAs('application/pdf');
    }
}
