import {
    SpreadSheetCompanyMasterColumnName, SpreadSheetCompanyMasterType
} from '../../../../data/googleWorkspace/spreadSheet/model/custom/companyMasterType';
import {
    GoogleDriveContractFolderService, GoogleDriveContractFolderServiceInterface
} from '../../../services/googleDrive/folder/googleDriveContractFolderService';
import {
    SpreadSheetUpdateValueService
} from '../../../services/spreadSheet/spreadSheetUpdateValueService';

export interface CreateNonDisclosureAgreementFolderUsecaseInterface {
    createForUpperCompany(
        companyName: string,
        companyFolder: GoogleAppsScript.Drive.Folder,
    ): void;

    createForLowerCompany(
        companyName: string,
        companyFolder: GoogleAppsScript.Drive.Folder,
    ): void;
}

export class CreateNonDisclosureAgreementFolderUsecase
    implements CreateNonDisclosureAgreementFolderUsecaseInterface
{
    private contractFolderService: GoogleDriveContractFolderServiceInterface;
    private spreadSheetUpdateValueService: SpreadSheetUpdateValueService;

    constructor() {
        this.contractFolderService = new GoogleDriveContractFolderService();
        this.spreadSheetUpdateValueService =
            new SpreadSheetUpdateValueService();
    }

    createForUpperCompany(
        companyName: string,
        companyFolder: GoogleAppsScript.Drive.Folder,
    ): void {
        const upperCompanyFolderId = companyFolder.getId();
        this.creategetNonDisclosureAgreementFolder(
            upperCompanyFolderId,
            companyName,
            SpreadSheetCompanyMasterColumnName.UpperCompanyNonDisclosureAgreementGoogleDriveFolderLink,
        );
    }

    createForLowerCompany(
        companyName: string,
        companyFolder: GoogleAppsScript.Drive.Folder,
    ): void {
        const lowerCompanyFolderId = companyFolder.getId();
        this.creategetNonDisclosureAgreementFolder(
            lowerCompanyFolderId,
            companyName,
            SpreadSheetCompanyMasterColumnName.LowerCompanyNonDisclosureAgreementGoogleDriveFolderLink,
        );
    }

    private creategetNonDisclosureAgreementFolder(
        companyFolderId: string,
        companyName: string,
        targetColumnName: keyof SpreadSheetCompanyMasterType,
    ): void {
        const nonDisclosureAgreementFolder =
            this.contractFolderService.getNonDisclosureAgreementFolder(
                companyFolderId,
            );
        if (nonDisclosureAgreementFolder) {
            return;
        }

        const newNonDisclosureAgreementFolder =
            this.contractFolderService.createNonDisclosureAgreementFolder(
                companyFolderId,
            );
        this.spreadSheetUpdateValueService.updateCompanyMaster(
            companyName,
            targetColumnName,
            newNonDisclosureAgreementFolder.getUrl(),
        );
    }
}
