export type CreatePdfOptions = {
    exportFormat: 'pdf' | 'csv' | 'xls' | 'xlsx'; // ファイル形式の指定
    format: 'pdf' | 'csv' | 'xls' | 'xlsx'; // ファイル形式の指定
    size: string; // 用紙サイズの指定 legal / letter / A4
    portrait: boolean; // true → 縦向き、false → 横向き
    fitw: boolean; // 幅を用紙に合わせるか
    top_margin: number; //上の余白
    right_margin: number; //右の余白
    bottom_margin: number; //下の余白
    left_margin: number; //左の余白
    horizontal_alignment: string; //水平方向の位置
    vertical_alignment: string; //垂直方向の位置
    sheetnames: boolean; // シート名をPDF上部に表示するか
    printtitle: boolean; // スプレッドシート名をPDF上部に表示するか
    pagenumbers: boolean; // ページ番号の有無
    gridlines: boolean; // グリッドラインの表示有無
    fzr: boolean; // 固定行の表示有無
    fzc: boolean; //固定列の表示有無
    range: string; // 表示する範囲
};
