import {
    GoogleWorkspaceDriveClient, GoogleWorkspaceDriveClientInterface
} from '../../../../data/googleWorkspace/drive/googleWorkspaceDriveClient';
import { Env } from '../../../../env';

export interface GoogleDriveFolderServiceInterface {
    /**
     * envに指定したrootフォルダのidを元にフォルダを取得する
     */
    getRootFolder(): GoogleAppsScript.Drive.Folder;
    /**
     * URLを元にフォルダを取得する
     * @param folderUrl
     */
    getByUrl(folderUrl: string): GoogleAppsScript.Drive.Folder;
}

export class GoogleDriveFolderService
    implements GoogleDriveFolderServiceInterface
{
    private googleDriveClient: GoogleWorkspaceDriveClientInterface;

    constructor() {
        this.googleDriveClient = new GoogleWorkspaceDriveClient();
    }

    getRootFolder(): GoogleAppsScript.Drive.Folder {
        const rootFolder = this.googleDriveClient.getFolderById(
            Env.googleDrive.rootFolderId,
        );
        if (!rootFolder) {
            throw Error(
                'Root folder is not exist. folder id: ' +
                    Env.googleDrive.rootFolderId,
            );
        }
        return rootFolder;
    }

    getByUrl(folderUrl: string): GoogleAppsScript.Drive.Folder {
        const targetFolder = this.googleDriveClient.getFolderByUrl(folderUrl);
        if (!targetFolder) {
            throw Error('Target folder is not exist. folder url: ' + folderUrl);
        }
        return targetFolder;
    }
}
