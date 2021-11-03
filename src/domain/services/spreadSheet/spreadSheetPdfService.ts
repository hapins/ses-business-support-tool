import {
    GoogleWorkspaceSpreadSheetClient, GoogleWorkspaceSpreadSheetClientInterface
} from '../../../data/googleWorkspace/spreadSheet/googleWorkspaceSpreadSheetClient';
import {
    SpreadSheetDealType
} from '../../../data/googleWorkspace/spreadSheet/model/custom/dealType';
import { Env } from '../../../env';

export interface SpreadSheetPdfServiceInterface {
    /**
     * 注文書のPDFを作成する
     *  @param targetDeal
     */
    createPurchaseOrder(
        targetDeal: SpreadSheetDealType,
    ): GoogleAppsScript.Base.Blob;

    /**
     * 注文請書のPDFを作成する
     *  @param targetDeal
     */
    createOrderConfirmation(
        targetDeal: SpreadSheetDealType,
    ): GoogleAppsScript.Base.Blob;
}

// TODO: 上位の会社に対して何か作成する場合はパターンを追加もしくは引数で変更できるように修正
export class SpreadSheetPdfService implements SpreadSheetPdfServiceInterface {
    private spreadSheetClient: GoogleWorkspaceSpreadSheetClientInterface;

    constructor() {
        this.spreadSheetClient = new GoogleWorkspaceSpreadSheetClient(
            Env.spreadSheet.url,
        );
    }

    createPurchaseOrder(
        targetDeal: SpreadSheetDealType,
    ): GoogleAppsScript.Base.Blob {
        const contractEndDate = targetDeal.contractEndDate;
        const fileName =
            targetDeal.lowerCompanyName +
            '_' +
            targetDeal.engineerName +
            '_' +
            contractEndDate.getFullYear() +
            '年_' +
            contractEndDate.getMonth() +
            '月';

        const purchaseOrderPdf = this.spreadSheetClient.createPdf(
            Env.spreadSheet.purchaseOrderSheetName,
            fileName,
            Env.spreadSheet.purchaseOrderPrintStart,
            Env.spreadSheet.purchaseOrderPrintEnd,
        );
        return purchaseOrderPdf;
    }

    createOrderConfirmation(
        targetDeal: SpreadSheetDealType,
    ): GoogleAppsScript.Base.Blob {
        const contractEndDate = targetDeal.contractEndDate;
        const fileName =
            targetDeal.lowerCompanyName +
            '_' +
            targetDeal.engineerName +
            '_' +
            contractEndDate.getFullYear() +
            '年_' +
            contractEndDate.getMonth() +
            '月';

        const orderConfirmationPdf = this.spreadSheetClient.createPdf(
            Env.spreadSheet.orderConfirmationSheetName,
            fileName,
            Env.spreadSheet.orderConfirmationPrintStart,
            Env.spreadSheet.orderConfirmationPrintEnd,
        );
        return orderConfirmationPdf;
    }
}
