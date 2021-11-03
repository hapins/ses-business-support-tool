export class Env {
    static comanyInfo = {
        // 会社名を記載してください
        name: 'XXXX株式会社',
    };

    static salesInfo = {
        // 営業共通アドレスを記載してください
        sharedAddress: 'xxxx@xxxx.xxx',
        // 営業共通アカウント名を記載してください
        sharedName: '営業共通',
    };

    static googleDrive = {
        // 契約ファイルを管理するためのGoogleDrive ルートディレクトリのIDを記載してください
        rootFolderId: '',
    };

    static spreadSheet = {
        // コピーした受発注一覧管理のスプレッドシートURLを記載してください
        url: '',

        // デフォルト値
        // 受発注一覧のスプレッドシートを変更する際はこちらを修正してください
        dealListSheetName: '受発注一覧',
        dealListSheetHeaderNum: 3,
        dealListSheetFirstColumn: 1,
        companyMasterSheetName: '企業マスタ',
        companyMasterSheetHeaderNum: 2,
        companyMasterSheetFirstColumn: 1,
        purchaseOrderSheetName: '注文書',
        purchaseOrderPrintStart: 'A1',
        purchaseOrderPrintEnd: 'J40',
        orderConfirmationSheetName: '注文請書',
        orderConfirmationPrintStart: 'A1',
        orderConfirmationPrintEnd: 'J40',
        tmpCaluculationSheetName: 'tmpCalc',
        tmpCaluculationCell: 'A1',
    };

    static googleDocument = {
        basicContractTemplateFileId: '',
        nonDisclosureAgreementTemplateFileId: '',
    };

    static cloudSign = {
        baseUrl: 'https://api.cloudsign.jp',
        clientId:
            PropertiesService.getScriptProperties().getProperty(
                'cloudSignClientId',
            ),
        resourceBaseUrl: 'https://www.cloudsign.jp',
    };
}
