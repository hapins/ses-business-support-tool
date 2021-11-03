import {
    SpreadSheetCompanyMasterColumnName, SpreadSheetCompanyMasterType
} from '../../../../data/googleWorkspace/spreadSheet/model/custom/companyMasterType';
import {
    GoogleDriveContractFolderService, GoogleDriveContractFolderServiceInterface
} from '../../../services/googleDrive/folder/googleDriveContractFolderService';
import {
    SpreadSheetUpdateValueService
} from '../../../services/spreadSheet/spreadSheetUpdateValueService';

export interface CreateOrderConfirmationFolderUsecaseInterface {
    create(
        companyName: string,
        companyFolder: GoogleAppsScript.Drive.Folder,
    ): void;
}

export class CreateOrderConfirmationFolderUsecase
    implements CreateOrderConfirmationFolderUsecaseInterface
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
        this.creategetOrderConfirmationFolder(
            companyFolderId,
            companyName,
            SpreadSheetCompanyMasterColumnName.CompanyOrderComfirmationDirectoryGoogleDriveLink,
        );
    }

    private creategetOrderConfirmationFolder(
        companyFolderId: string,
        companyName: string,
        targetColumnName: keyof SpreadSheetCompanyMasterType,
    ): void {
        const orderConfirmationFolder =
            this.contractFolderService.getOrderConfirmationFolder(
                companyFolderId,
            );
        if (orderConfirmationFolder) {
            return;
        }

        const newOrderConfirmationFolder =
            this.contractFolderService.createOrderConfirmationFolder(
                companyFolderId,
            );
        this.spreadSheetUpdateValueService.updateCompanyMaster(
            companyName,
            targetColumnName,
            newOrderConfirmationFolder.getUrl(),
        );
    }
}
