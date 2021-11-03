export interface GoogleWorkspaceDriveClientInterface {
    /**
     * 対象のIDに一致するフォルダを取得する
     * @param folderId
     */
    getFolderById(folderId: string): GoogleAppsScript.Drive.Folder;
    /**
     * 対象のURLに一致するフォルダを取得する
     * @param folderUrl
     */
    getFolderByUrl(folderUrl: string): GoogleAppsScript.Drive.Folder;
    /**
     * 対象の名前に一致するフォルダ一覧を取得する
     * @param folderName
     */
    getFoldersByName(folderName: string): GoogleAppsScript.Drive.FolderIterator;
    /**
     * ルートディレクトリ内の対象の名前に一致するフォルダ一覧を取得する
     * @param folderName
     * @param rootFolderId
     */
    getFoldersByNameInRootFolder(
        folderName: string,
        rootFolderId: string
    ): GoogleAppsScript.Drive.FolderIterator;
    /**
     * 対象の名前に一致する最初のフォルダを取得する
     * @param folderName
     */
    getFirstFolderByName(
        folderName: string
    ): GoogleAppsScript.Drive.Folder | null;
    /**
     * ルートディレクトリ内の対象の名前に一致する最初のフォルダを取得する
     * @param folderName
     * @param rootFolderId
     */
    getFirstFolderByNameInRootFolder(
        folderName: string,
        rootFolderId: string
    ): GoogleAppsScript.Drive.Folder | null;
    /**
     * 対象のIDに一致するファイル取得する
     * @param fileId
     */
    getFileById(fileId: string): GoogleAppsScript.Drive.File;
    /**
     * 対象のURLに一致するファイル取得する
     * @param fileUrl
     */
    getFileByUrl(fileUrl: string): GoogleAppsScript.Drive.File;
    /**
     * 対象の名前に一致するファイルを取得する
     * @param fileName
     */
    getFilesByName(fileName: string): GoogleAppsScript.Drive.FileIterator;
    /**
     * 対象の名前に一致する最初のファイルを取得する
     * @param fileName
     */
    getFirstFileByName(fileName: string): GoogleAppsScript.Drive.File | null;
    /**
     * 新しいフォルダを作成する
     * @param folderId
     * @param newFolderName
     */
    createFolder(
        folderId: string,
        newFolderName: string
    ): GoogleAppsScript.Drive.Folder;
    /**
     * 新しいファイルを作成する
     * @param folderId
     * @param blob
     */
    createFile(folderId: string, blob: any): GoogleAppsScript.Drive.File;
    /**
     * 対象のファイルをコピーする
     * @param folderId
     * @param fileId
     * @param newFileName
     */
    copyFile(
        folderId: string,
        fileId: string,
        newFileName: string
    ): GoogleAppsScript.Drive.File;
}

export class GoogleWorkspaceDriveClient
    implements GoogleWorkspaceDriveClientInterface
{
    getFolderById(folderId: string): GoogleAppsScript.Drive.Folder {
        const folder = DriveApp.getFolderById(folderId);
        return folder;
    }

    getFolderByUrl(folderUrl: string): GoogleAppsScript.Drive.Folder {
        const basePath = 'https://drive.google.com/drive/folders/';
        const folderId = folderUrl.replace(basePath, '');
        const folder = DriveApp.getFolderById(folderId);
        return folder;
    }

    getFoldersByName(
        folderName: string
    ): GoogleAppsScript.Drive.FolderIterator {
        const folders = DriveApp.getFoldersByName(folderName);
        return folders;
    }

    getFoldersByNameInRootFolder(
        folderName: string,
        rootFolderId: string
    ): GoogleAppsScript.Drive.FolderIterator {
        const rootFolder = this.getFolderById(rootFolderId);
        const folders = rootFolder.getFoldersByName(folderName);
        return folders;
    }

    getFirstFolderByName(
        folderName: string
    ): GoogleAppsScript.Drive.Folder | null {
        const folders = DriveApp.getFoldersByName(folderName);
        if (!folders.hasNext()) {
            return null;
        }
        return folders.next();
    }

    getFirstFolderByNameInRootFolder(
        folderName: string,
        rootFolderId: string
    ): GoogleAppsScript.Drive.Folder | null {
        const rootFolder = this.getFolderById(rootFolderId);
        const folders = rootFolder.getFoldersByName(folderName);
        if (!folders.hasNext()) {
            return null;
        }
        return folders.next();
    }

    getFileById(fileId: string): GoogleAppsScript.Drive.File {
        const file = DriveApp.getFileById(fileId);
        return file;
    }

    getFileByUrl(fileUrl: string): GoogleAppsScript.Drive.File {
        const basePath = 'https://drive.google.com/file/d/';
        const suffix = '/view?usp=drivesdk';
        const fileId = fileUrl.replace(basePath, '').replace(suffix, '');
        const file = DriveApp.getFileById(fileId);
        return file;
    }

    getFilesByName(fileName: string): GoogleAppsScript.Drive.FileIterator {
        const files = DriveApp.getFilesByName(fileName);
        return files;
    }

    getFirstFileByName(fileName: string): GoogleAppsScript.Drive.File | null {
        const files = DriveApp.getFilesByName(fileName);
        if (!files.hasNext()) {
            return null;
        }
        return files.next();
    }

    createFolder(
        folderId: string,
        newFolderName: string
    ): GoogleAppsScript.Drive.Folder {
        const targetFolder = this.getFolderById(folderId);
        const newFolder = targetFolder.createFolder(newFolderName);
        return newFolder;
    }

    createFile(folderId: string, blob: any): GoogleAppsScript.Drive.File {
        const targetFolder = this.getFolderById(folderId);
        const file = targetFolder.createFile(blob);
        return file;
    }

    copyFile(
        folderId: string,
        fileId: string,
        newFileName: string
    ): GoogleAppsScript.Drive.File {
        const targetFolder = this.getFolderById(folderId);
        const targetFile = this.getFileById(fileId);
        const newFile = targetFile.makeCopy(newFileName, targetFolder);
        return newFile;
    }
}
