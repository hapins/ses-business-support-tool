import {
    GoogleWorkspaceSpreadSheetClient, GoogleWorkspaceSpreadSheetClientInterface
} from '../../../data/googleWorkspace/spreadSheet/googleWorkspaceSpreadSheetClient';
import {
    SpreadSheetCompanyMasterType
} from '../../../data/googleWorkspace/spreadSheet/model/custom/companyMasterType';
import {
    ExecutionTarget, SpreadSheetDealColumnName, SpreadSheetDealType
} from '../../../data/googleWorkspace/spreadSheet/model/custom/dealType';
import { Env } from '../../../env';

export interface SpreadSheetUpdateValueServiceInterface {
    /**
     * 受発注一覧シートの実行対象行を更新する
     *  @param targetColumnName
     *  @param updateValue
     */
    updateExecutionTargetDeal(
        targetColumnName: keyof SpreadSheetDealType,
        updateValue: string,
    ): void;
    /**
     * 受発注一覧シートの指定行を更新する
     *  @param targetRowNumber
     *  @param targetColumnName
     *  @param updateValue
     */
    updateSpecifiedDeal(
        targetRowNumber: number,
        targetColumnName: keyof SpreadSheetDealType,
        updateValue: string,
    ): void;
    /**
     * 企業マスタのシートを更新する
     *  @param targetCompanyName
     *  @param targetColumnName
     *  @param updateValue
     */
    updateCompanyMaster(
        targetCompanyName: string,
        targetColumnName: keyof SpreadSheetCompanyMasterType,
        updateValue: string,
    ): void;
}
export class SpreadSheetUpdateValueService {
    private spreadSheetClient: GoogleWorkspaceSpreadSheetClientInterface;

    constructor() {
        this.spreadSheetClient = new GoogleWorkspaceSpreadSheetClient(
            Env.spreadSheet.url,
        );
    }

    updateExecutionTargetDeal(
        targetColumnName: keyof SpreadSheetDealType,
        updateValue: string,
    ): void {
        const targetSheetName = Env.spreadSheet.dealListSheetName;
        const target = this.getExecutionTargetDealRange(
            targetSheetName,
            targetColumnName,
        );
        target.setValue(updateValue);
    }

    updateSpecifiedDeal(
        targetRowNumber: number,
        targetColumnName: keyof SpreadSheetDealType,
        updateValue: string,
    ): void {
        const targetSheetName = Env.spreadSheet.dealListSheetName;
        const target = this.getSpecifiedDealRange(
            targetRowNumber,
            targetSheetName,
            targetColumnName,
        );
        target.setValue(updateValue);
    }

    updateCompanyMaster(
        targetCompanyName: string,
        targetColumnName: keyof SpreadSheetCompanyMasterType,
        updateValue: string,
    ): void {
        const targetSheetName = Env.spreadSheet.companyMasterSheetName;
        const target = this.getCompanyMasterTargetRange(
            targetSheetName,
            targetColumnName,
            targetCompanyName,
        );
        target.setValue(updateValue);
    }

    private getExecutionTargetDealRange(
        targetSheetName: string,
        targetColumnName: keyof SpreadSheetDealType,
    ): GoogleAppsScript.Spreadsheet.Range {
        const maxRow = 10000;
        const targetColumnAlphabet =
            this.spreadSheetClient.getTargetColumnAlphabetByColumnName(
                targetSheetName,
                SpreadSheetDealColumnName.ExecutionTarget,
            );

        const headerNum = Env.spreadSheet.dealListSheetHeaderNum;
        // FIXME: ここは一番ハードコードになっている部分のため修正が必要
        const rowQuery = `=MATCH("${ExecutionTarget.target}" ,'${targetSheetName}'!$${targetColumnAlphabet}$1:$${targetColumnAlphabet}$${maxRow},0)`;
        const columnQuery = `=MATCH("${targetColumnName}" ,'${targetSheetName}'!$A$${headerNum}:$ZZ$${headerNum},0)`;

        const target = this.spreadSheetClient.getTargetRangeByQuery(
            targetSheetName,
            rowQuery,
            columnQuery,
        );

        return target;
    }

    private getSpecifiedDealRange(
        targetRowNumber: number,
        targetSheetName: string,
        targetColumnName: keyof SpreadSheetDealType,
    ): GoogleAppsScript.Spreadsheet.Range {
        const headerNum = Env.spreadSheet.dealListSheetHeaderNum;
        // FIXME: ここは一番ハードコードになっている部分のため修正が必要
        const columnQuery = `=MATCH("${targetColumnName}" ,'${targetSheetName}'!$A$${headerNum}:$ZZ$${headerNum},0)`;

        const target = this.spreadSheetClient.getTargetRangeByColumnQuery(
            targetSheetName,
            headerNum + targetRowNumber,
            columnQuery,
        );

        return target;
    }

    private getCompanyMasterTargetRange(
        targetSheetName: string,
        targetColumnName: keyof SpreadSheetCompanyMasterType,
        targetCompanyName: string,
    ): GoogleAppsScript.Spreadsheet.Range {
        const maxRow = 10000;
        const targetColumnAlphabet =
            this.spreadSheetClient.getTargetColumnAlphabetByColumnName(
                targetSheetName,
                targetCompanyName,
            );

        const headerNum = Env.spreadSheet.companyMasterSheetHeaderNum;
        // FIXME: ここは一番ハードコードになっている部分のため修正が必要
        const rowQuery = `=MATCH("${targetCompanyName}" ,'${targetSheetName}'!$${targetColumnAlphabet}$1:$${targetColumnAlphabet}$${maxRow},0)`;
        const columnQuery = `=MATCH("${targetColumnName}" ,'${targetSheetName}'!$A$${headerNum}:$ZZ$${headerNum},0)`;

        const target = this.spreadSheetClient.getTargetRangeByQuery(
            targetSheetName,
            rowQuery,
            columnQuery,
        );

        return target;
    }
}
