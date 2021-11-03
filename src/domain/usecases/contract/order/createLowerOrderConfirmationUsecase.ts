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

export interface CreateLowerOrderConfirmationUsecaseInterface {
    createPdfFile(
        targetDeal: SpreadSheetDealType,
        companyMaster: SpreadSheetCompanyMasterType,
    ): GoogleAppsScript.Drive.File | null;
}

export class CreateLowerOrderConfirmationUsecase
    implements CreateLowerOrderConfirmationUsecaseInterface
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
        if (targetDeal.orderConfirmationGoogleDriveLink) {
            this.logger.log({
                message: '注文請書PDFはすでに存在しています',
                rawLog: {
                    log: 'order confirmation pdf is already exist.',
                    link: targetDeal.orderConfirmationGoogleDriveLink,
                },
            });
            return null;
        }

        const orderConfirmationFolder = this.googleDriveFolderService.getByUrl(
            companyMaster.companyOrderComfirmationDirectoryGoogleDriveLink,
        );
        const orderConfirmationPdf =
            this.spreadSheetPdfService.createOrderConfirmation(targetDeal);
        const file = this.googleDriveDocumentService.create(
            orderConfirmationFolder.getId(),
            orderConfirmationPdf,
        );
        this.spreadSheetUpdateValueService.updateExecutionTargetDeal(
            SpreadSheetDealColumnName.OrderConfirmationGoogleDriveLink,
            file.getUrl(),
        );
        return file;
    }
}
