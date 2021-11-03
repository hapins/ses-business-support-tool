import {
    GoogleWorkspaceSpreadSheetClient, GoogleWorkspaceSpreadSheetClientInterface
} from '../../../data/googleWorkspace/spreadSheet/googleWorkspaceSpreadSheetClient';
import {
    SpreadSheetCompanyMasterType
} from '../../../data/googleWorkspace/spreadSheet/model/custom/companyMasterType';
import {
    ExecutionTarget, SpreadSheetDealType
} from '../../../data/googleWorkspace/spreadSheet/model/custom/dealType';
import { Env } from '../../../env';

export interface SpreadSheetExecutionTargetServiceInterface {
    /**
     * 実行対象の行データをオブジェクトとして取得する
     */
    getTargetDeal(): SpreadSheetDealType;
    /**
     * 実行対象の行データにマッチする上位企業データをオブジェクトとして取得する
     */
    getTargetUpperCompany(): SpreadSheetCompanyMasterType;
    /**
     * 実行対象の行データにマッチする下位企業データをオブジェクトとして取得する
     */
    getTargetLowerCompany(): SpreadSheetCompanyMasterType;
}

export class SpreadSheetExecutionTargetService
    implements SpreadSheetExecutionTargetServiceInterface
{
    private spreadSheetClient: GoogleWorkspaceSpreadSheetClientInterface;

    constructor() {
        this.spreadSheetClient = new GoogleWorkspaceSpreadSheetClient(
            Env.spreadSheet.url,
        );
    }

    getTargetDeal(): SpreadSheetDealType {
        const dealLists = this.spreadSheetClient.getRangeDataAsJson(
            Env.spreadSheet.dealListSheetName,
            Env.spreadSheet.dealListSheetHeaderNum,
            Env.spreadSheet.dealListSheetFirstColumn,
        ) as SpreadSheetDealType[];

        const target = dealLists.filter(
            (target) => target.executionTarget == ExecutionTarget.target,
        )[0];
        if (!target) {
            throw new Error('対象を選択してください');
        }

        return target;
    }

    getTargetUpperCompany(): SpreadSheetCompanyMasterType {
        const target = this.getTargetDeal();

        const companyMaster = this.spreadSheetClient.getRangeDataAsJson(
            Env.spreadSheet.companyMasterSheetName,
            Env.spreadSheet.companyMasterSheetHeaderNum,
            Env.spreadSheet.companyMasterSheetFirstColumn,
        ) as SpreadSheetCompanyMasterType[];

        const targetCompany = companyMaster.filter(
            (company) => company.companyId == target.upperCompanyId,
        )[0];
        if (!target) {
            throw new Error('対象の企業が見つかりません');
        }

        return targetCompany;
    }

    getTargetLowerCompany(): SpreadSheetCompanyMasterType {
        const target = this.getTargetDeal();

        const companyMaster = this.spreadSheetClient.getRangeDataAsJson(
            Env.spreadSheet.companyMasterSheetName,
            Env.spreadSheet.companyMasterSheetHeaderNum,
            Env.spreadSheet.companyMasterSheetFirstColumn,
        ) as SpreadSheetCompanyMasterType[];

        const targetCompany = companyMaster.filter(
            (company) => company.companyId == target.lowerCompanyId,
        )[0];
        if (!target) {
            throw new Error('対象の企業が見つかりません');
        }

        return targetCompany;
    }
}
