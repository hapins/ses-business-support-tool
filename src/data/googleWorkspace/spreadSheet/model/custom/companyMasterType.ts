export enum SpreadSheetCompanyMasterColumnName {
    No = 'no',
    CompanyName = 'companyName',
    CompanyId = 'companyId',
    CompanyType = 'companyType',
    Sales = 'sales',
    SalesMailAddress = 'salesMailAddress',
    ContractDate = 'contractDate',
    CompanyRootDirectoryGoogleDriveLink = 'companyRootDirectoryGoogleDriveLink',
    CompanyPurchaseOrderDirectoryGoogleDriveLink = 'companyPurchaseOrderDirectoryGoogleDriveLink',
    CompanyOrderComfirmationDirectoryGoogleDriveLink = 'companyOrderComfirmationDirectoryGoogleDriveLink',
    LowerCompanyBasicContractStatus = 'lowerCompanyBasicContractStatus',
    LowerCompanyBasicContractGoogleDriveFolderLink = 'lowerCompanyBasicContractGoogleDriveFolderLink',
    LowerCompanyBasicContractGoogleDriveFileLink = 'lowerCompanyBasicContractGoogleDriveFileLink',
    LowerCompanyBasicContractCloudSignLink = 'lowerCompanyBasicContractCloudSignLink',
    UpperCompanyBasicContractStatus = 'upperCompanyBasicContractStatus',
    UpperCompanyBasicContractGoogleDriveFolderLink = 'upperCompanyBasicContractGoogleDriveFolderLink',
    UpperCompanyBasicContractGoogleDriveFileLink = 'upperCompanyBasicContractGoogleDriveFileLink',
    UpperCompanyBasicContractCloudSignLink = 'upperCompanyBasicContractCloudSignLink',
    LowerCompanyNonDisclosureAgreementStatus = 'lowerCompanyNonDisclosureAgreementStatus',
    LowerCompanyNonDisclosureAgreementGoogleDriveFolderLink = 'lowerCompanyNonDisclosureAgreementGoogleDriveFolderLink',
    LowerCompanyNonDisclosureAgreementGoogleDriveFileLink = 'lowerCompanyNonDisclosureAgreementGoogleDriveFileLink',
    LowerCompanyNonDisclosureAgreementCloudSignLink = 'lowerCompanyNonDisclosureAgreementCloudSignLink',
    UpperCompanyNonDisclosureAgreementStatus = 'upperCompanyNonDisclosureAgreementStatus',
    UpperCompanyNonDisclosureAgreementGoogleDriveFolderLink = 'upperCompanyNonDisclosureAgreementGoogleDriveFolderLink',
    UpperCompanyNonDisclosureAgreementGoogleDriveFileLink = 'upperCompanyNonDisclosureAgreementGoogleDriveFileLink',
    UpperCompanyNonDisclosureAgreementCloudSignLink = 'upperCompanyNonDisclosureAgreementCloudSignLink',
    Remarks = 'remarks',
}

export type SpreadSheetCompanyMasterType = {
    no: number;
    companyName: string;
    companyId: string;
    companyType: string;
    sales: string;
    salesMailAddress: string;
    contractDate: Date;
    companyRootDirectoryGoogleDriveLink: string;
    companyPurchaseOrderDirectoryGoogleDriveLink: string;
    companyOrderComfirmationDirectoryGoogleDriveLink: string;
    lowerCompanyBasicContractStatus: string;
    lowerCompanyBasicContractGoogleDriveFolderLink: string;
    lowerCompanyBasicContractGoogleDriveFileLink: string;
    lowerCompanyBasicContractCloudSignLink: string;
    upperCompanyBasicContractStatus: string;
    upperCompanyBasicContractGoogleDriveFolderLink: string;
    upperCompanyBasicContractGoogleDriveFileLink: string;
    upperCompanyBasicContractCloudSignLink: string;
    lowerCompanyNonDisclosureAgreementStatus: string;
    lowerCompanyNonDisclosureAgreementGoogleDriveFolderLink: string;
    lowerCompanyNonDisclosureAgreementGoogleDriveFileLink: string;
    lowerCompanyNonDisclosureAgreementCloudSignLink: string;
    upperCompanyNonDisclosureAgreementStatus: string;
    upperCompanyNonDisclosureAgreementGoogleDriveFolderLink: string;
    upperCompanyNonDisclosureAgreementGoogleDriveFileLink: string;
    upperCompanyNonDisclosureAgreementCloudSignLink: string;
    remarks: string;
};
