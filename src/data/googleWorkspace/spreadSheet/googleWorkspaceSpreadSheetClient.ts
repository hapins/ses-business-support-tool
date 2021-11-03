import { Env } from '../../../env';
import { StringKeyObject } from '../../../utils/types/objectType';
import { CreatePdfOptions } from './model/builtIn/pdfType';

export interface GoogleWorkspaceSpreadSheetClientInterface {
    /**
     * 対象のスプレッドシートファイルを取得
     */
    getSpreadSheet(): GoogleAppsScript.Spreadsheet.Spreadsheet;
    /**
     * 対象のシートを取得
     * @param targetSheetName シート名
     */
    getTargetSheet(targetSheetName: string): GoogleAppsScript.Spreadsheet.Sheet;
    /**
     * 対象のシートのPFDを作成する
     * @param targetSheetName 対象シートの名前
     * @param fileName 保存するファイル名
     * @param pdfRangeFrom 範囲指定する場合の開始位置
     * @param pdfRangeTo 範囲指定する場合の終了位置
     */
    createPdf(
        targetSheetName: string,
        fileName: string,
        pdfRangeFrom?: string,
        pdfRangeTo?: string
    ): GoogleAppsScript.Base.Blob;
    /**
     * 対象の範囲のデータをJSONとして取得する
     * @param targetSheetName 対象シートの名前
     * @param headerRow JSONのキーとして使う行番号
     * @param startColumn データの最初の列番号
     */
    getRangeDataAsJson(
        targetSheetName: string,
        headerRow: number,
        startColumn: number
    ): StringKeyObject[];
    /**
     * 対象のクエリにマッチするcellを取得する
     * @param targetSheetName 対象シートの名前
     * @param rowQuery 行検索用のクエリ
     * @param columnQuery 列検索用のクエリ
     */
    getTargetRangeByQuery(
        targetSheetName: string,
        rowQuery: string,
        columnQuery: string
    ): GoogleAppsScript.Spreadsheet.Range;
    /**
     * 対象の列クエリにマッチするcellを取得する
     * @param targetSheetName 対象シートの名前
     * @param rowNumber 対象行の行数
     * @param columnQuery 列検索用のクエリ
     */
    getTargetRangeByColumnQuery(
        targetSheetName: string,
        rowNumber: number,
        columnQuery: string
    ): GoogleAppsScript.Spreadsheet.Range;
    /**
     * 対象の文字列にマッチするカラムのアルファベット番号を取得する
     * @param targetSheetName 対象シートの名前
     * @param targetColumnName 対象のカラム名
     */
    getTargetColumnAlphabetByColumnName(
        targetSheetName: string,
        targetColumnName: string
    ): string;
}

export class GoogleWorkspaceSpreadSheetClient
    implements GoogleWorkspaceSpreadSheetClientInterface
{
    private sheetUrl: string;
    constructor(sheetUrl: string) {
        this.sheetUrl = sheetUrl;
    }

    getSpreadSheet(): GoogleAppsScript.Spreadsheet.Spreadsheet {
        const spreadSheet = SpreadsheetApp.openByUrl(this.sheetUrl);
        return spreadSheet;
    }

    getTargetSheet(
        targetSheetName: string
    ): GoogleAppsScript.Spreadsheet.Sheet {
        const targetSpreadSheet = this.getSpreadSheet();
        const targetSheet = targetSpreadSheet.getSheetByName(targetSheetName);
        if (!targetSheet) {
            throw Error(`${targetSheetName} is not found.`);
        }
        return targetSheet;
    }

    createPdf(
        targetSheetName: string,
        fileName: string,
        pdfRangeFrom?: string,
        pdfRangeTo?: string
    ): GoogleAppsScript.Base.Blob {
        const targetSpreadSheet = this.getSpreadSheet();
        const targetSheet = this.getTargetSheet(targetSheetName);
        targetSheet;
        const baseUrl =
            'https://docs.google.com/spreadsheets/d/' +
            targetSpreadSheet.getId() +
            '/export?gid=' +
            targetSheet.getSheetId();

        // TODO: オプショナルの時のハンドリングを追加
        const pdfRnage = pdfRangeFrom + '%3A' + pdfRangeTo;

        const pdfOptions: CreatePdfOptions = {
            exportFormat: 'pdf',
            format: 'pdf',
            size: 'A4',
            portrait: true,
            fitw: true,
            top_margin: 0.5,
            right_margin: 0.5,
            bottom_margin: 0.5,
            left_margin: 0.5,
            horizontal_alignment: 'CENTER',
            vertical_alignment: 'TOP',
            sheetnames: false,
            printtitle: false,
            pagenumbers: false,
            gridlines: false,
            fzr: false,
            fzc: false,
            range: pdfRnage,
        };

        const pdfOptionArray: string[] = [];
        (Object.keys(pdfOptions) as (keyof CreatePdfOptions)[]).map((key) => {
            pdfOptionArray.push(key + '=' + pdfOptions[key]);
        });
        const encodedPdfOptions = '&' + pdfOptionArray.join('&');

        const url = baseUrl + encodedPdfOptions;
        const token = ScriptApp.getOAuthToken();
        const options = {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };
        try {
            const blob = UrlFetchApp.fetch(url, options)
                .getBlob()
                .setName(fileName + '.pdf');
            return blob;
        } catch (error) {
            throw Error(error as string);
        }
    }

    getRangeDataAsJson(
        targetSheetName: string,
        headerRow: number,
        startColumn: number
    ): StringKeyObject[] {
        const targetSheet = this.getTargetSheet(targetSheetName);

        const keys = [];
        const convertedData = [];

        const maxRow = targetSheet.getLastRow();
        const maxColumn = targetSheet.getMaxColumns();

        const targetData = targetSheet
            .getRange(headerRow, startColumn, maxRow, maxColumn)
            .getValues();

        for (let x = startColumn; x <= maxColumn; x++) {
            keys.push(targetSheet.getRange(headerRow, x).getValue());
        }

        for (let y = headerRow + 1; y <= maxRow; y++) {
            const json: StringKeyObject = {};
            for (let x = startColumn; x <= maxColumn; x++) {
                json[keys[x - startColumn]] =
                    targetData[y - headerRow][x - startColumn];
            }
            convertedData.push(json);
        }

        return convertedData;
    }

    getTargetRangeByQuery(
        targetSheetName: string,
        rowQuery: string,
        columnQuery: string
    ): GoogleAppsScript.Spreadsheet.Range {
        const tmpSheet = this.getTargetSheet(
            Env.spreadSheet.tmpCaluculationSheetName
        );
        const tmpCell = tmpSheet.getRange(Env.spreadSheet.tmpCaluculationCell);

        tmpCell.setFormula(rowQuery);
        const rowResult = tmpCell.getValue();

        tmpCell.setFormula(columnQuery);
        const columnResult = tmpCell.getValue();

        const targetSheet = this.getTargetSheet(targetSheetName);
        const targetCell = targetSheet.getRange(rowResult, columnResult);

        return targetCell;
    }

    getTargetRangeByColumnQuery(
        targetSheetName: string,
        rowNumber: number,
        columnQuery: string
    ): GoogleAppsScript.Spreadsheet.Range {
        const tmpSheet = this.getTargetSheet(
            Env.spreadSheet.tmpCaluculationSheetName
        );
        const tmpCell = tmpSheet.getRange(Env.spreadSheet.tmpCaluculationCell);

        tmpCell.setFormula(columnQuery);
        const columnResult = tmpCell.getValue();

        const targetSheet = this.getTargetSheet(targetSheetName);
        const targetCell = targetSheet.getRange(rowNumber, columnResult);

        return targetCell;
    }

    getTargetColumnAlphabetByColumnName(
        targetSheetName: string,
        targetColumnName: string
    ): string {
        const targetSheet = this.getTargetSheet(targetSheetName);
        const result = targetSheet
            .createTextFinder(targetColumnName)
            .findNext();
        if (!result) {
            throw new Error(
                'target column is not found. column name: ' + targetColumnName
            );
        }
        return result.getA1Notation().replace(/[0-9]/g, '');
    }
}
