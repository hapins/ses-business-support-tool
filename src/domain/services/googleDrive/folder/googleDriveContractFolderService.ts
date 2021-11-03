import { SystemConst } from '../../../../constants';
import {
    GoogleWorkspaceDriveClient, GoogleWorkspaceDriveClientInterface
} from '../../../../data/googleWorkspace/drive/googleWorkspaceDriveClient';

export interface GoogleDriveContractFolderServiceInterface {
    /**
     * 基本契約書を格納するフォルダを取得する
     *  @param rootFolderId
     */
    getBasicContractFolder(
        rootFolderId: string,
    ): GoogleAppsScript.Drive.Folder | null;
    /**
     * 基本契約書を格納するフォルダを作成する
     *  @param rootFolderId
     */
    createBasicContractFolder(
        rootFolderId: string,
    ): GoogleAppsScript.Drive.Folder;
    /**
     * 秘密保持契約書を格納するフォルダを取得する
     *  @param rootFolderId
     */
    getNonDisclosureAgreementFolder(
        rootFolderId: string,
    ): GoogleAppsScript.Drive.Folder | null;
    /**
     * 秘密保持契約書を格納するフォルダを作成する
     *  @param rootFolderId
     */
    createNonDisclosureAgreementFolder(
        rootFolderId: string,
    ): GoogleAppsScript.Drive.Folder;
    /**
     * 注文書を格納するフォルダを取得する
     *  @param rootFolderId
     */
    getPurchaseOrderFolder(
        rootFolderId: string,
    ): GoogleAppsScript.Drive.Folder | null;
    /**
     * 注文書を格納するフォルダを作成する
     *  @param rootFolderId
     *  @param targetDate
     */
    createPurchaseOrderFolder(
        rootFolderId: string,
    ): GoogleAppsScript.Drive.Folder;
    /**
     * 注文請書を格納するフォルダを取得する
     *  @param rootFolderId
     */
    getOrderConfirmationFolder(
        rootFolderId: string,
    ): GoogleAppsScript.Drive.Folder | null;
    /**
     * 注文請書を格納するフォルダを作成する
     *  @param rootFolderId
     *  @param targetDate
     */
    createOrderConfirmationFolder(
        rootFolderId: string,
    ): GoogleAppsScript.Drive.Folder;
}

export class GoogleDriveContractFolderService
    implements GoogleDriveContractFolderServiceInterface
{
    private googleDriveClient: GoogleWorkspaceDriveClientInterface;

    constructor() {
        this.googleDriveClient = new GoogleWorkspaceDriveClient();
    }

    getBasicContractFolder(
        rootFolderId: string,
    ): GoogleAppsScript.Drive.Folder | null {
        const folderName = SystemConst.GOOGLE_DRIVE_BASIC_CONTRACT_FOLDER_NAME;
        const folder = this.googleDriveClient.getFirstFolderByNameInRootFolder(
            folderName,
            rootFolderId,
        );
        return folder;
    }

    createBasicContractFolder(
        rootFolderId: string,
    ): GoogleAppsScript.Drive.Folder {
        const folderName = SystemConst.GOOGLE_DRIVE_BASIC_CONTRACT_FOLDER_NAME;
        const newFolder = this.googleDriveClient.createFolder(
            rootFolderId,
            folderName,
        );
        return newFolder;
    }

    getNonDisclosureAgreementFolder(
        rootFolderId: string,
    ): GoogleAppsScript.Drive.Folder | null {
        const folderName =
            SystemConst.GOOGLE_DRIVE_NON_DISCLOSURE_AGREEMENT_FOLDER_NAME;
        const folder = this.googleDriveClient.getFirstFolderByNameInRootFolder(
            folderName,
            rootFolderId,
        );
        return folder;
    }

    createNonDisclosureAgreementFolder(
        rootFolderId: string,
    ): GoogleAppsScript.Drive.Folder {
        const folderName =
            SystemConst.GOOGLE_DRIVE_NON_DISCLOSURE_AGREEMENT_FOLDER_NAME;
        const newFolder = this.googleDriveClient.createFolder(
            rootFolderId,
            folderName,
        );
        return newFolder;
    }

    getPurchaseOrderFolder(
        rootFolderId: string,
    ): GoogleAppsScript.Drive.Folder | null {
        const folderName = SystemConst.GOOGLE_DRIVE_PURCHASE_ORDER_FOLDER_NAME;
        const folder = this.googleDriveClient.getFirstFolderByNameInRootFolder(
            folderName,
            rootFolderId,
        );
        return folder;
    }

    createPurchaseOrderFolder(
        rootFolderId: string,
    ): GoogleAppsScript.Drive.Folder {
        const folderName = SystemConst.GOOGLE_DRIVE_PURCHASE_ORDER_FOLDER_NAME;
        const newFolder = this.googleDriveClient.createFolder(
            rootFolderId,
            folderName,
        );
        return newFolder;
    }

    getOrderConfirmationFolder(
        rootFolderId: string,
    ): GoogleAppsScript.Drive.Folder | null {
        const folderName =
            SystemConst.GOOGLE_DRIVE_ORDER_CONFIRMATION_FOLDER_NAME;
        const folder = this.googleDriveClient.getFirstFolderByNameInRootFolder(
            folderName,
            rootFolderId,
        );
        return folder;
    }

    createOrderConfirmationFolder(
        rootFolderId: string,
    ): GoogleAppsScript.Drive.Folder {
        const folderName =
            SystemConst.GOOGLE_DRIVE_ORDER_CONFIRMATION_FOLDER_NAME;
        const newFolder = this.googleDriveClient.createFolder(
            rootFolderId,
            folderName,
        );
        return newFolder;
    }
}
