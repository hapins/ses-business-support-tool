import {
    GoogleWorkspaceDriveClient, GoogleWorkspaceDriveClientInterface
} from '../../../../data/googleWorkspace/drive/googleWorkspaceDriveClient';

export interface GoogleDriveFileServiceInterface {
    /**
     * 対象のフォルダに受け取ったファイルを作成する
     *  @param folderId
     *  @param file
     */
    create(folderId: string, file: any): GoogleAppsScript.Drive.File;
    /**
     * 対象のファイルを指定したフォルダにをコピーする
     *  @param originFileId
     *  @param destinationFolderId
     *  @param newFilename
     */
    copy(
        originFileId: string,
        destinationFolderId: string,
        newFilename: string,
    ): GoogleAppsScript.Drive.File;
}

export class GoogleDriveFileService implements GoogleDriveFileServiceInterface {
    private googleDriveClient: GoogleWorkspaceDriveClientInterface;

    constructor() {
        this.googleDriveClient = new GoogleWorkspaceDriveClient();
    }

    create(folderId: string, file: any): GoogleAppsScript.Drive.File {
        const createdFile = this.googleDriveClient.createFile(folderId, file);
        return createdFile;
    }

    copy(
        originFileId: string,
        destinationFolderId: string,
        newFilename: string,
    ): GoogleAppsScript.Drive.File {
        const originFile = this.googleDriveClient.getFileById(originFileId);
        const destinationFolder =
            this.googleDriveClient.getFolderById(destinationFolderId);
        const newFile = originFile.makeCopy(newFilename, destinationFolder);

        return newFile;
    }
}
