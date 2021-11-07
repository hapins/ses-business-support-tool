# ses-business-support-tool
このツールは中小規模のSES企業をサポートするツールです。  
主な機能は以下です。
- スプレッドシートで管理する受発注一覧から、契約書のPDFファイルを自動作成
  - 注文書
  - 注文請書
  - 請求書 (実装予定)
- 作成したPDFファイルをGoogleドライブに保存
- [オプション] CloudSignと自動連携してドキュメントを作成
- [オプション] freeeと自動連携して取引を作成 (実装予定)

# 設定
## 実行環境
- Node.js v12.0 以上
- npm v7.19 以上
## 設定手順
1. レポジトリのクローン
2. パッケージインストール  
```
npm ci
```

# 利用方法
## 環境設定 & スクリプトのアップロード
1. google apps scriptプロジェクトを作成
2. google apps scriptのプロジェクトIDを取得  
```
https://script.google.com/home/projects/<ProjectId>
```
3. .clasp.json > scriptId に取得したIDを記載
4. Googleドライブに作業用のルートフォルダを作成 (作成した契約書のPDFはこのフォルダ配下に保存されていきます)
5. GoogleドライブのIDをURLから取得.  
```
https://drive.google.com/drive/folders/<FolderId>
```
6. src/env.ts > googleDrive.rootFolderId に取得したIDを記載
7. src/env.ts, src/constants.ts ファイルを実行環境に応じて編集 (デフォルト値が入っているものはそのまま使えます)
8. 以下コマンドで、Googleアカウントにログイン  
```
npx clasp login
```
9. 以下コマンドで、google apps projectにスクリプトをアップロード  
```
npx clasp push
```

## スクリプトの公開
1. 以下手順でアップロードしたスクリプトを公開  
```
デプロイ > 新しいデプロイ > 種類を選択 > ライブラリ > 説明を記述(任意) > デプロイ
```
2. ライブラリのIDを発行したURLから取得  
```
https://script.google.com/macros/library/d/<LibraryId>
```

## スプレッドシートからの利用
1. テンプレートスプレッドシートから自身の環境にコピーを作成
2. スクリプトエディタを開く
3. ライブラリを追加
4. ライブラリ情報を入力  
```
ScriptId : スクリプトの公開で取得したID
Version  : 公開したスクリプトの最新バージョン (初期値=1)
ID       : BusinessSupportTools
```

## [オプション] CloudSignのAPIキーを追加
1. CloudSignのAPIキーを取得 (CloudSignのドキュメント参照)
2. ライブラリ側のスクリプトエディタを開く
3. 旧エディタに変更
4. 以下手順でプロジェクト設定を開く  
```
ファイル  > Project properties > Script properties
```
5. プロパティを追加  
```
name : cloudSignClientId
value: 手順1で取得したAPIキー
```
6. 以下手順でライブラリの再公開  
```
デプロイ > デプロイの管理 > 編集 > バージョン(新しいバージョンを選択) > デプロイ
```
7. スプレッドシートに紐づくスクリプトのエディタを開く
8. 以下手順でライブラリのバージョンを更新  
```
ライブラリ > BusinessSupportTools > バージョン (手順6で発行したバージョン) > 保存
```

# お願い
- 無料でツールを使っていただく代わりに以下にご協力ください
  - 利用しにくい点や動作が不安定な点をご連絡ください  
  - エンジニアの方は当レポジトリをforkして改善PRをお願いします
- 連絡先: xxx@hapins.net

# ライセンス
MIT License.
