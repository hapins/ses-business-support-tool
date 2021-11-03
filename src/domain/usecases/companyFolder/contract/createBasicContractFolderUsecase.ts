import {
    SpreadSheetCompanyMasterColumnName, SpreadSheetCompanyMasterType
} from '../../../../data/googleWorkspace/spreadSheet/model/custom/companyMasterType';
import {
    GoogleDriveContractFolderService, GoogleDriveContractFolderServiceInterface
} from '../../../services/googleDrive/folder/googleDriveContractFolderService';
import {
    SpreadSheetUpdateValueService
} from '../../../services/spreadSheet/spreadSheetUpdateValueService';

export interface CreateBasicContractFolderUsecaseInterface {
    createForUpperCompany(
        companyName: string,
        companyFolder: GoogleAppsScript.Drive.Folder,
    ): void;

    createForLowerCompany(
        companyName: string,
        companyFolder: GoogleAppsScript.Drive.Folder,
    ): void;
}

export class CreateBasicContractFolderUsecase
    implements CreateBasicContractFolderUsecaseInterface
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
        this.createBaiceContractFolder(
            upperCompanyFolderId,
            companyName,
            SpreadSheetCompanyMasterColumnName.UpperCompanyBasicContractGoogleDriveFolderLink,
        );
    }

    createForLowerCompany(
        companyName: string,
        companyFolder: GoogleAppsScript.Drive.Folder,
    ): void {
        const lowerCompanyFolderId = companyFolder.getId();
        this.createBaiceContractFolder(
            lowerCompanyFolderId,
            companyName,
            SpreadSheetCompanyMasterColumnName.LowerCompanyBasicContractGoogleDriveFolderLink,
        );
    }

    private createBaiceContractFolder(
        companyFolderId: string,
        companyName: string,
        targetColumnName: keyof SpreadSheetCompanyMasterType,
    ): void {
        const basicContractFolder =
            this.contractFolderService.getBasicContractFolder(companyFolderId);
        if (basicContractFolder) {
            return;
        }

        const newBasicContractFolder =
            this.contractFolderService.createBasicContractFolder(
                companyFolderId,
            );
        this.spreadSheetUpdateValueService.updateCompanyMaster(
            companyName,
            targetColumnName,
            newBasicContractFolder.getUrl(),
        );
    }
}
