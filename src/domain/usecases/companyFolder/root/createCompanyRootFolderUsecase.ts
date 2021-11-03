import {
    SpreadSheetCompanyMasterColumnName
} from '../../../../data/googleWorkspace/spreadSheet/model/custom/companyMasterType';
import {
    SpreadSheetDealType
} from '../../../../data/googleWorkspace/spreadSheet/model/custom/dealType';
import { CustomLogger, CustomLoggerInterface } from '../../../../utils/logger/logger';
import {
    GoogleDriveCompanyFolderService, GoogleDriveCompanyFolderServiceInterface
} from '../../../services/googleDrive/folder/googleDriveCompanyFolderService';
import {
    GoogleDriveFolderService, GoogleDriveFolderServiceInterface
} from '../../../services/googleDrive/folder/googleDriveFolderService';
import {
    SpreadSheetUpdateValueService
} from '../../../services/spreadSheet/spreadSheetUpdateValueService';

export interface CreateRootCompanyFolderUsecaseInterface {
    createForUpperCompany(
        targetDeal: SpreadSheetDealType,
    ): GoogleAppsScript.Drive.Folder;

    createForLowerCompany(
        targetDeal: SpreadSheetDealType,
    ): GoogleAppsScript.Drive.Folder;
}

export class CreateRootCompanyFolderUsecase
    implements CreateRootCompanyFolderUsecaseInterface
{
    private folderService: GoogleDriveFolderServiceInterface;
    private companyFolderService: GoogleDriveCompanyFolderServiceInterface;
    private spreadSheetUpdateValueService: SpreadSheetUpdateValueService;
    private logger: CustomLoggerInterface;

    constructor() {
        this.folderService = new GoogleDriveFolderService();
        this.companyFolderService = new GoogleDriveCompanyFolderService();
        this.spreadSheetUpdateValueService =
            new SpreadSheetUpdateValueService();
        this.logger = new CustomLogger(this.constructor.name);
    }

    createForUpperCompany(
        targetDeal: SpreadSheetDealType,
    ): GoogleAppsScript.Drive.Folder {
        const rootFolder = this.folderService.getRootFolder();
        const rootFolderID = rootFolder.getId();

        this.logger.log({
            message: 'Get target company folder.',
            rawLog: {
                companyName: targetDeal.upperCompanyName,
            },
        });
        const upperCompanyFolder = this.companyFolderService.get(
            rootFolderID,
            targetDeal.upperCompanyName,
            targetDeal.upperCompanyId,
        );
        if (upperCompanyFolder) {
            return upperCompanyFolder;
        }

        this.logger.log({
            message: 'Create target company folder.',
            rawLog: {
                companyName: targetDeal.upperCompanyName,
            },
        });
        const newFolder = this.companyFolderService.create(
            rootFolderID,
            targetDeal.upperCompanyName,
            targetDeal.upperCompanyId,
        );

        this.spreadSheetUpdateValueService.updateCompanyMaster(
            targetDeal.upperCompanyName,
            SpreadSheetCompanyMasterColumnName.CompanyRootDirectoryGoogleDriveLink,
            newFolder.getUrl(),
        );

        return newFolder;
    }

    createForLowerCompany(
        targetDeal: SpreadSheetDealType,
    ): GoogleAppsScript.Drive.Folder {
        const rootFolder = this.folderService.getRootFolder();
        const rootFolderID = rootFolder.getId();

        this.logger.log({
            message: 'Get target company folder.',
            rawLog: {
                companyName: targetDeal.lowerCompanyName,
            },
        });
        const lowerCompanyFolder = this.companyFolderService.get(
            rootFolderID,
            targetDeal.lowerCompanyName,
            targetDeal.lowerCompanyId,
        );
        if (lowerCompanyFolder) {
            return lowerCompanyFolder;
        }

        this.logger.log({
            message: 'Create target company folder.',
            rawLog: {
                companyName: targetDeal.lowerCompanyName,
            },
        });
        const newFolder = this.companyFolderService.create(
            rootFolderID,
            targetDeal.lowerCompanyName,
            targetDeal.lowerCompanyId,
        );

        this.spreadSheetUpdateValueService.updateCompanyMaster(
            targetDeal.lowerCompanyName,
            SpreadSheetCompanyMasterColumnName.CompanyRootDirectoryGoogleDriveLink,
            newFolder.getUrl(),
        );

        return newFolder;
    }
}
