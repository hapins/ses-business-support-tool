import {
    SpreadSheetCompanyMasterType
} from '../../../../data/googleWorkspace/spreadSheet/model/custom/companyMasterType';
import {
    SpreadSheetDealColumnName, SpreadSheetDealType
} from '../../../../data/googleWorkspace/spreadSheet/model/custom/dealType';
import { CustomLogger, CustomLoggerInterface } from '../../../../utils/logger/logger';
import {
    GoogleDriveFileService, GoogleDriveFileServiceInterface
} from '../../../services/googleDrive/file/googleDriveFileService';
import {
    GoogleDriveFolderService, GoogleDriveFolderServiceInterface
} from '../../../services/googleDrive/folder/googleDriveFolderService';
import {
    SpreadSheetPdfService, SpreadSheetPdfServiceInterface
} from '../../../services/spreadSheet/spreadSheetPdfService';
import {
    SpreadSheetUpdateValueService
} from '../../../services/spreadSheet/spreadSheetUpdateValueService';

export interface CreateLowerPurchaseOrderUsecaseInterface {
    createPdfFile(
        targetDeal: SpreadSheetDealType,
        companyMaster: SpreadSheetCompanyMasterType,
    ): GoogleAppsScript.Drive.File | null;
}

export class CreateLowerPurchaseOrderUsecase
    implements CreateLowerPurchaseOrderUsecaseInterface
{
    private logger: CustomLoggerInterface;
    private spreadSheetPdfService: SpreadSheetPdfServiceInterface;
    private spreadSheetUpdateValueService: SpreadSheetUpdateValueService;
    private googleDriveDocumentService: GoogleDriveFileServiceInterface;
    private googleDriveFolderService: GoogleDriveFolderServiceInterface;

    constructor() {
        this.logger = new CustomLogger(this.constructor.name);
        this.spreadSheetPdfService = new SpreadSheetPdfService();
        this.spreadSheetUpdateValueService =
            new SpreadSheetUpdateValueService();
        this.googleDriveDocumentService = new GoogleDriveFileService();
        this.googleDriveFolderService = new GoogleDriveFolderService();
    }

    createPdfFile(
        targetDeal: SpreadSheetDealType,
        companyMaster: SpreadSheetCompanyMasterType,
    ): GoogleAppsScript.Drive.File | null {
        if (targetDeal.purchaseOrderGoogleDriveLink) {
            this.logger.log({
                message: '注文書PDFはすでに存在しています',
                rawLog: {
                    log: 'purchase order pdf is already exist.',
                    link: targetDeal.purchaseOrderGoogleDriveLink,
                },
            });
            return null;
        }
        const purchaseOrderFolder = this.googleDriveFolderService.getByUrl(
            companyMaster.companyPurchaseOrderDirectoryGoogleDriveLink,
        );
        const purchaseOrderPdf =
            this.spreadSheetPdfService.createPurchaseOrder(targetDeal);
        const file = this.googleDriveDocumentService.create(
            purchaseOrderFolder.getId(),
            purchaseOrderPdf,
        );
        this.spreadSheetUpdateValueService.updateExecutionTargetDeal(
            SpreadSheetDealColumnName.PurchaseOrderGoogleDriveLink,
            file.getUrl(),
        );
        return file;
    }
}
