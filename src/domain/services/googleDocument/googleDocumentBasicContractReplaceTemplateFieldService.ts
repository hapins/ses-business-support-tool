import {
    GoogleWorkspaceDocumentClient, GoogleWorkspaceDocumentClientInterface
} from '../../../data/googleWorkspace/document/googleWorkspaceDocumentClient';
import {
    BasicContractRepalaceTarget
} from '../../../data/googleWorkspace/document/model/custom/contractReplaceTarget';
import {
    SpreadSheetDealType
} from '../../../data/googleWorkspace/spreadSheet/model/custom/dealType';
import { Env } from '../../../env';

export interface GoogleDocumentBasicContractReplaceTemplateFieldServiceInterface {
    /**
     * テンプレートから作成した基本契約書のテンプレート項目を置換する
     *  @param rootFolderId
     *  @param targetDeal
     */
    replace(
        fileId: string,
        targetDeal: SpreadSheetDealType,
    ): GoogleAppsScript.Document.Document;
}

export class GoogleDocumentBasicContractReplaceTemplateFieldService
    implements GoogleDocumentBasicContractReplaceTemplateFieldServiceInterface
{
    private googleWorkspaceDocumentClient: GoogleWorkspaceDocumentClientInterface;

    constructor() {
        this.googleWorkspaceDocumentClient =
            new GoogleWorkspaceDocumentClient();
    }

    replace(
        fileId: string,
        targetDeal: SpreadSheetDealType,
    ): GoogleAppsScript.Document.Document {
        const orderingPartyName = Env.comanyInfo.name;
        const contractorName = targetDeal.lowerCompanyName;

        this.googleWorkspaceDocumentClient.replaceTarget(
            fileId,
            BasicContractRepalaceTarget.OrderingPartyName,
            orderingPartyName,
        );
        return this.googleWorkspaceDocumentClient.replaceTarget(
            fileId,
            BasicContractRepalaceTarget.ContractorName,
            contractorName,
        );
    }
}
