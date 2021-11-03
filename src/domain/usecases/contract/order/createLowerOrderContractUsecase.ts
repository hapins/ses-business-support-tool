import { CloudSignDocument } from '../../../../data/api/cloudSign/model/documentType';
import {
    ContractStatus, SpreadSheetDealColumnName, SpreadSheetDealType
} from '../../../../data/googleWorkspace/spreadSheet/model/custom/dealType';
import { Env } from '../../../../env';
import { CustomLogger, CustomLoggerInterface } from '../../../../utils/logger/logger';
import {
    CloudSignDocumentService, CloudSignDocumentServiceInterface
} from '../../../services/cloudSign/cloudSignDocumentService';
import {
    SpreadSheetUpdateValueService
} from '../../../services/spreadSheet/spreadSheetUpdateValueService';

export interface CreateLowerOrderContractUsecaseInterface {
    createCloudSignDocument(targetDeal: SpreadSheetDealType): CloudSignDocument;
    attachPdfFileToCloudSignDocument(
        cloudSignDocumentId: string,
        pdfFile: GoogleAppsScript.Drive.File,
    ): void;
}

export class CreateLowerOrderContractUsecase
    implements CreateLowerOrderContractUsecaseInterface
{
    private logger: CustomLoggerInterface;
    private spreadSheetUpdateValueService: SpreadSheetUpdateValueService;
    private cloudSignDocumentService: CloudSignDocumentServiceInterface;

    constructor() {
        this.logger = new CustomLogger(this.constructor.name);
        this.spreadSheetUpdateValueService =
            new SpreadSheetUpdateValueService();
        this.cloudSignDocumentService = new CloudSignDocumentService();
    }

    createCloudSignDocument(
        targetDeal: SpreadSheetDealType,
    ): CloudSignDocument {
        this.logger.log({
            message: 'CloudSignの契約下書きを作成しています',
            rawLog: {
                log: 'create clouod sign document.',
                projectName: targetDeal.projectName,
            },
        });
        const cloudSignDocument = this.cloudSignDocumentService.create(
            targetDeal.projectName,
        );
        this.spreadSheetUpdateValueService.updateExecutionTargetDeal(
            SpreadSheetDealColumnName.CloudSignDocumentId,
            cloudSignDocument.id,
        );
        this.spreadSheetUpdateValueService.updateExecutionTargetDeal(
            SpreadSheetDealColumnName.CloudSignDocumentLink,
            Env.cloudSign.resourceBaseUrl +
                '/document/' +
                cloudSignDocument.id +
                '/summary',
        );

        this.logger.log({
            message: 'CloudSignの契約情報を更新しています',
            rawLog: {
                log: 'Update clouod sign document attribute.',
                companyName: targetDeal.lowerCompanyName,
                startDate: targetDeal.contractStartDate,
                endDate: targetDeal.contractEndDate,
            },
        });
        this.cloudSignDocumentService.updateAttribute(
            cloudSignDocument.id,
            targetDeal.lowerCompanyName,
            targetDeal.contractStartDate,
            targetDeal.contractEndDate,
        );

        this.logger.log({
            message: '承認者に相手先の営業担当者を登録しています',
            rawLog: {
                log: 'add clouod sign document participant.',
                email: targetDeal.lowerCompanySalesAddress,
                salesName: targetDeal.lowerCompanySalesName,
            },
        });
        // TODO: lowerCompanySalesAddressがカンマ区切りで複数入るため、
        //       カンマで分割して送信するように対応しているが、
        //       本来スプレッドからデータ取得部分にロジックを寄せる必要がある
        const lowerCompanySalesAddresses =
            targetDeal.lowerCompanySalesAddress.split(',');
        lowerCompanySalesAddresses.forEach((email) => {
            this.cloudSignDocumentService.addParticipant(
                cloudSignDocument.id,
                email,
                targetDeal.lowerCompanySalesName,
            );
        });

        this.logger.log({
            message: '共有先に営業担当を登録しています',
            rawLog: {
                log: 'add clouod sign document reportee.',
                email: targetDeal.salesMailAddress,
                salesName: targetDeal.salesName,
            },
        });
        this.cloudSignDocumentService.addReportee(
            cloudSignDocument.id,
            targetDeal.salesMailAddress,
            targetDeal.salesName,
        );
        this.logger.log({
            message: '共有先に企業共通担当者を登録しています',
            rawLog: {
                log: 'add clouod sign document reportee.',
                email: targetDeal.salesMailAddress,
                salesName: targetDeal.salesName,
            },
        });
        this.cloudSignDocumentService.addReportee(
            cloudSignDocument.id,
            Env.salesInfo.sharedAddress,
            Env.salesInfo.sharedName,
        );
        this.spreadSheetUpdateValueService.updateExecutionTargetDeal(
            SpreadSheetDealColumnName.CloudSignDocumentStatus,
            ContractStatus.InternalChecking,
        );
        return cloudSignDocument;
    }

    attachPdfFileToCloudSignDocument(
        cloudSignDocumentId: string,
        pdfFile: GoogleAppsScript.Drive.File,
    ): void {
        this.cloudSignDocumentService.addFile(
            cloudSignDocumentId,
            pdfFile.getBlob(),
            pdfFile.getName(),
        );
    }
}
