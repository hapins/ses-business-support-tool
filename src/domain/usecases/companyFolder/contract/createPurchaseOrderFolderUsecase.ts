import {
    SpreadSheetCompanyMasterColumnName, SpreadSheetCompanyMasterType
} from '../../../../data/googleWorkspace/spreadSheet/model/custom/companyMasterType';
import {
    GoogleDriveContractFolderService, GoogleDriveContractFolderServiceInterface
} from '../../../services/googleDrive/folder/googleDriveContractFolderService';
import {
    SpreadSheetUpdateValueService
} from '../../../services/spreadSheet/spreadSheetUpdateValueService';

export interface CreatePurchaseOrderFolderUsecaseInterface {
    create(
        companyName: string,
        companyFolder: GoogleAppsScript.Drive.Folder,
    ): void;
}

export class CreatePurchaseOrderFolderUsecase
    implements CreatePurchaseOrderFolderUsecaseInterface
{
    private contractFolderService: GoogleDriveContractFolderServiceInterface;
    private spreadSheetUpdateValueService: SpreadSheetUpdateValueService;

    constructor() {
        this.contractFolderService = new GoogleDriveContractFolderService();
        this.spreadSheetUpdateValueService =
            new SpreadSheetUpdateValueService();
    }

    create(
        companyName: string,
        companyFolder: GoogleAppsScript.Drive.Folder,
    ): void {
        const companyFolderId = companyFolder.getId();
        this.creategetPurchaseOrderFolder(
            companyFolderId,
            companyName,
            SpreadSheetCompanyMasterColumnName.CompanyPurchaseOrderDirectoryGoogleDriveLink,
        );
    }

    private creategetPurchaseOrderFolder(
        companyFolderId: string,
        companyName: string,
        targetColumnName: keyof SpreadSheetCompanyMasterType,
    ): void {
        const purchaseOrderFolder =
            this.contractFolderService.getPurchaseOrderFolder(companyFolderId);
        if (purchaseOrderFolder) {
            return;
        }

        const newPurchaseOrderFolder =
            this.contractFolderService.createPurchaseOrderFolder(
                companyFolderId,
            );
        this.spreadSheetUpdateValueService.updateCompanyMaster(
            companyName,
            targetColumnName,
            newPurchaseOrderFolder.getUrl(),
        );
    }
}
