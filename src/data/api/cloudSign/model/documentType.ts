export type CloudSignDocument = {
    id: string;
    userId: string;
    title: string;
    note: string;
    message: string;
    status: CloudSignDocumentStatus;
    canTransfer: true;
    private: true;
    sentAt: string;
    lastProcessedAt: string;
    createdAt: string;
    updatedAt: string;
    participants: CloudSignParticipant[];
    files: CloudSignFile[];
    reportees: CloudSignReporter[];
};

export type CloudSignParticipant = {
    id: string;
    email: string;
    name: string;
    organization: string;
    order: number;
    status: number;
    accessCode: string;
    languageCode: string;
    processedAt: string;
    accessExpiresAt: string;
};

export type CloudSignFile = {
    id: string;
    name: string;
    order: number;
    totalPages: number;
    widgets: CloudSignWidgets[];
};

export type CloudSignWidgets = {
    id: string;
    widgetType: number;
    participantId: string;
    fileId: string;
    page: number;
    x: number;
    y: number;
    w: number;
    h: number;
    text: string;
    status: number;
    label: string;
    required: true;
};

export type CloudSignReporter = {
    id: string;
    email: string;
    name: string;
    organization: string;
};

export enum CloudSignDocumentStatus {
    Draft = 0,
    Checking = 1,
    Signed = 2,
    Canceled = 3,
    Template = 4,
}
