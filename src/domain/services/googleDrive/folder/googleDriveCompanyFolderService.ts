import {
    GoogleWorkspaceDriveClient, GoogleWorkspaceDriveClientInterface
} from '../../../../data/googleWorkspace/drive/googleWorkspaceDriveClient';
import { CustomLogger, CustomLoggerInterface } from '../../../../utils/logger/logger';

export interface GoogleDriveCompanyFolderServiceInterface {
    /**
     * 対象企業のフォルダを取得する
     *  @param rootFolderId
     */
    get(
        rootFolderId: string,
        ecompanyName: string,
        companyId: string,
    ): GoogleAppsScript.Drive.Folder | null;
    /**
     * 対象企業のフォルダを作成する
     *  @param rootFolderId
     */
    create(
        rootFolderId: string,
        companyName: string,
        companyId: string,
    ): GoogleAppsScript.Drive.Folder;
}

export class GoogleDriveCompanyFolderService
    implements GoogleDriveCompanyFolderServiceInterface
{
    private googleDriveClient: GoogleWorkspaceDriveClientInterface;
    private logger: CustomLoggerInterface;

    constructor() {
        this.googleDriveClient = new GoogleWorkspaceDriveClient();
        this.logger = new CustomLogger(this.constructor.name);
    }

    get(
        rootFolderId: string,
        companyName: string,
        companyId: string,
    ): GoogleAppsScript.Drive.Folder | null {
        const folderName = companyName + '_' + companyId;
        this.logger.log({
            message: 'Traget company and folder.',
            rawLog: {
                name: companyName,
                folderName: folderName,
            },
        });

        const folder = this.googleDriveClient.getFirstFolderByNameInRootFolder(
            folderName,
            rootFolderId,
        );
        if (!folder) {
            return null;
        }
        return folder;
    }

    create(
        rootFolderId: string,
        companyName: string,
        companyId: string,
    ): GoogleAppsScript.Drive.Folder {
        const folderName = companyName + '_' + companyId;
        this.logger.log({
            message: 'Traget company and folder.',
            rawLog: {
                name: companyName,
                folderName: folderName,
            },
        });

        const newFolder = this.googleDriveClient.createFolder(
            rootFolderId,
            folderName,
        );
        return newFolder;
    }
}
