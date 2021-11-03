export type CloudSignCreateDocumentRequest = {
    title?: string;
    note?: string;
    message?: string;
    templateId?: string;
    canTransfer?: boolean;
    private?: boolean;
};

export type CloudSignUpdateDocumentAttributeRequest = {
    title?: string;
    counterparty?: string; // 契約相手の名称 (形式: YYYY-MM-DD)
    contractAt?: string; // 契約締結日 nullを許容する (形式: YYYY-MM-DD)
    validityStartAt?: string; // 契約開始日 nullを許容する (形式: YYYY-MM-DD)
    validityEndAt?: string; // 契約終了日 nullを許容する (形式: YYYY-MM-DD)
    validityEndNoticeAt?: string; // 解約通知期限 nullを許容する (形式: YYYY-MM-DD)
    autoUpdate?: CloudSignAutoUpdate; // 自動更新の有無
    localId?: string; // 管理番号
    amount?: number; // 取引金額
    options?: [
        {
            order: number; // ユーザ定義の項目の番号
            content: string; // ユーザ定義の項目の値
        }
    ];
};

export type CloudSignCreateDocumentParticipantRequest = {
    email: string;
    name: string;
    organization?: string;
    accessCode?: string;
    languageCode?: string;
};

export type CloudSignCreateDocumentReporteeRequest = {
    email: string;
    name: string;
    organization?: string;
};

export enum CloudSignAutoUpdate {
    none = 0,
    enable = 1,
    disable = 2,
}
