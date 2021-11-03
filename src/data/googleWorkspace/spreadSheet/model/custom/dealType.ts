// typescriptはenum非推奨だがGAS側でunion型のimportが対応されてなかったため一時的にenumを利用
export enum ExecutionTarget {
    target = '対象',
}

export enum ContractStatus {
    NotConcluded = '未締結',
    Draft = '作成中',
    InternalChecking = '内部確認中',
    OtherPAtryChecking = '先方確認中',
    Signed = '締結済',
}

// HACK: スプレッドシートに記述しているキー定義をどこかで行う必要があるため
//       暫定的にenumで定義している
export enum SpreadSheetDealColumnName {
    No = 'no',
    Id = 'id',
    EngineerName = 'engineerName',
    EngineerType = 'engineerType',
    SalesName = 'salesName',
    SalesMailAddress = 'salesMailAddress',
    ProjectName = 'projectName',
    ContractStartDate = 'contractStartDate',
    ContractEndDate = 'contractEndDate',
    SettlementMethod = 'settlementMethod',
    UptimeFrom = 'uptimeFrom',
    UptimeTo = 'uptimeTo',
    CalculationUnit = 'calculationUnit',
    WorkingTime = 'workingTime',
    Remarks = 'remarks',
    UpperCompanyName = 'upperCompanyName',
    UpperCompanyId = 'upperCompanyId',
    UpperCompanySalesName = 'upperCompanySalesName',
    UpperCompanySalesMailAddress = 'upperCompanySalesMailAddress',
    UpperCompanyPricePerUnit = 'upperCompanyPricePerUnit',
    UpperCompanyDeductionAmountPerHour = 'upperCompanyDeductionAmountPerHour',
    UpperCompanyExcessAmountPerHour = 'upperCompanyExcessAmountPerHour',
    UpperCompanyPaymentDate = 'upperCompanyPaymentDate',
    UpperCompanyTransferFee = 'upperCompanyTransferFee',
    LowerCompanyName = 'lowerCompanyName',
    LowerCompanyId = 'lowerCompanyId',
    LowerCompanySalesName = 'lowerCompanySalesName',
    LowerCompanySalesAddress = 'lowerCompanySalesAddress',
    LowerCompanyPricePerUnit = 'lowerCompanyPricePerUnit',
    LowerCompanyDeductionAmountPerHour = 'lowerCompanyDeductionAmountPerHour',
    LowerCompanyExcessAmountPerHour = 'lowerCompanyExcessAmountPerHour',
    LowerCompanyPaymentDate = 'lowerCompanyPaymentDate',
    LowerCompanyTransferFee = 'lowerCompanyTransferFee',
    UpperCompanyBasicContractStatus = 'upperCompanyBasicContractStatus',
    UpperCompanyNonDisclosureAgreementStatus = 'upperCompanyNonDisclosureAgreementStatus',
    UpperCompanyIndividualContractStatus = 'upperCompanyIndividualContractStatus',
    UpperCompanyWorkReportStatus = 'upperCompanyWorkReportStatus',
    UpperCompanyInvoiceStatus = 'upperCompanyInvoiceStatus',
    LowerCompanyBasicContractStatus = 'lowerCompanyBasicContractStatus',
    LowerCompanyNonDisclosureAgreementStatus = 'lowerCompanyNonDisclosureAgreementStatus',
    LowerCompanyIndividualContractStatus = 'lowerCompanyIndividualContractStatus',
    LowerCompanyWorkReportStatus = 'lowerCompanyWorkReportStatus',
    LowerCompanyInvoiceStatus = 'lowerCompanyInvoiceStatus',
    ExecutionTarget = 'executionTarget',
    PurchaseOrderGoogleDriveLink = 'purchaseOrderGoogleDriveLink',
    OrderConfirmationGoogleDriveLink = 'orderConfirmationGoogleDriveLink',
    CloudSignDocumentId = 'cloudSignDocumentId',
    CloudSignDocumentLink = 'cloudSignDocumentLink',
    CloudSignDocumentStatus = 'cloudSignDocumentStatus',
}

export type SpreadSheetDealType = {
    no: number;
    id: number;
    engineerName: string;
    engineerType: string;
    salesName: string;
    salesMailAddress: string;
    projectName: string;
    contractStartDate: Date;
    contractEndDate: Date;
    settlementMethod: '上下割' | '中間割' | '固定';
    uptimeFrom: number;
    uptimeTo: number;
    calculationUnit: number;
    workingTime: string;
    remarks: string;
    upperCompanyName: string;
    upperCompanyId: string;
    upperCompanySalesName: string;
    upperCompanySalesMailAddress: string;
    upperCompanyPricePerUnit: number;
    upperCompanyDeductionAmountPerHour: number;
    upperCompanyExcessAmountPerHour: number;
    upperCompanyPaymentDate: number;
    upperCompanyTransferFee: '上位負担' | '弊社負担';
    lowerCompanyName: string;
    lowerCompanyId: string;
    lowerCompanySalesName: string;
    lowerCompanySalesAddress: string;
    lowerCompanyPricePerUnit: number;
    lowerCompanyDeductionAmountPerHour: number;
    lowerCompanyExcessAmountPerHour: number;
    lowerCompanyPaymentDate: number;
    lowerCompanyTransferFee: '下位負担' | '弊社負担';
    upperCompanyBasicContractStatus: ContractStatus;
    upperCompanyNonDisclosureAgreementStatus: ContractStatus;
    upperCompanyIndividualContractStatus: ContractStatus;
    upperCompanyWorkReportStatus: string;
    upperCompanyInvoiceStatus: string;
    lowerCompanyBasicContractStatus: ContractStatus;
    lowerCompanyNonDisclosureAgreementStatus: ContractStatus;
    lowerCompanyIndividualContractStatus: ContractStatus;
    lowerCompanyWorkReportStatus: string;
    lowerCompanyInvoiceStatus: string;
    executionTarget: ExecutionTarget;
    purchaseOrderGoogleDriveLink: string;
    orderConfirmationGoogleDriveLink: string;
    cloudSignDocumentId: string;
    cloudSignDocumentLink: string;
    cloudSignDocumentStatus: ContractStatus;
};
