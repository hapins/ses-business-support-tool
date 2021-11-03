import {
    SpreadSheetCompanyMasterType
} from '../../../data/googleWorkspace/spreadSheet/model/custom/companyMasterType';
import {
    SpreadSheetDealType
} from '../../../data/googleWorkspace/spreadSheet/model/custom/dealType';
import {
    CreateOrderConfirmationFolderUsecase, CreateOrderConfirmationFolderUsecaseInterface
} from '../../../domain/usecases/companyFolder/contract/createOrderConfirmationFolderUsecase';
import {
    CreatePurchaseOrderFolderUsecase, CreatePurchaseOrderFolderUsecaseInterface
} from '../../../domain/usecases/companyFolder/contract/createPurchaseOrderFolderUsecase';
import {
    CreateRootCompanyFolderUsecase, CreateRootCompanyFolderUsecaseInterface
} from '../../../domain/usecases/companyFolder/root/createCompanyRootFolderUsecase';
import {
    CreateLowerOrderConfirmationUsecase, CreateLowerOrderConfirmationUsecaseInterface
} from '../../../domain/usecases/contract/order/createLowerOrderConfirmationUsecase';
import {
    CreateLowerOrderContractUsecase, CreateLowerOrderContractUsecaseInterface
} from '../../../domain/usecases/contract/order/createLowerOrderContractUsecase';
import {
    CreateLowerPurchaseOrderUsecase, CreateLowerPurchaseOrderUsecaseInterface
} from '../../../domain/usecases/contract/order/createLowerPurchaseOrderUsecase';
import {
    GetExecutionTargetUsecase, GetExecutionTargetUsecaseInterface
} from '../../../domain/usecases/excutionTarget/getExcutionTargetUsecase';

export class LowerOrderContractController {
    private getExecutionTargetUsecase: GetExecutionTargetUsecaseInterface;
    private createRootCompanyFolderUsecase: CreateRootCompanyFolderUsecaseInterface;
    private createPurchaseOrderFolderUsecase: CreatePurchaseOrderFolderUsecaseInterface;
    private createOrderComfirmationFolderUsecase: CreateOrderConfirmationFolderUsecaseInterface;
    private createLowerContractUsecase: CreateLowerOrderContractUsecaseInterface;
    private createLowerPurchaseOrderUsecase: CreateLowerPurchaseOrderUsecaseInterface;
    private createLowerOrderConfirmationUsecase: CreateLowerOrderConfirmationUsecaseInterface;

    private targetDeal: SpreadSheetDealType;
    private companyMaster: SpreadSheetCompanyMasterType;

    constructor() {
        this.getExecutionTargetUsecase = new GetExecutionTargetUsecase();
        this.createRootCompanyFolderUsecase =
            new CreateRootCompanyFolderUsecase();
        this.createPurchaseOrderFolderUsecase =
            new CreatePurchaseOrderFolderUsecase();
        this.createOrderComfirmationFolderUsecase =
            new CreateOrderConfirmationFolderUsecase();
        this.createLowerContractUsecase = new CreateLowerOrderContractUsecase();
        this.createLowerPurchaseOrderUsecase =
            new CreateLowerPurchaseOrderUsecase();
        this.createLowerOrderConfirmationUsecase =
            new CreateLowerOrderConfirmationUsecase();
        this.targetDeal =
            this.getExecutionTargetUsecase.getLowerCompany().targetDeal;
        this.companyMaster =
            this.getExecutionTargetUsecase.getLowerCompany().companyMaster;
    }

    createFolder(): void {
        const lowerCompanyFolder =
            this.createRootCompanyFolderUsecase.createForLowerCompany(
                this.targetDeal,
            );
        this.createPurchaseOrderFolderUsecase.create(
            this.targetDeal.lowerCompanyName,
            lowerCompanyFolder,
        );
        this.createOrderComfirmationFolderUsecase.create(
            this.targetDeal.lowerCompanyName,
            lowerCompanyFolder,
        );
    }

    createDocument(useCloudSign: boolean): void {
        const puchaseOrderPdf =
            this.createLowerPurchaseOrderUsecase.createPdfFile(
                this.targetDeal,
                this.companyMaster,
            );
        const orderConfirmationPdf =
            this.createLowerOrderConfirmationUsecase.createPdfFile(
                this.targetDeal,
                this.companyMaster,
            );
        if (!puchaseOrderPdf || !orderConfirmationPdf) {
            return;
        }

        if (!useCloudSign) {
            return;
        }
        const cloudSignDocument =
            this.createLowerContractUsecase.createCloudSignDocument(
                this.targetDeal,
            );
        this.createLowerContractUsecase.attachPdfFileToCloudSignDocument(
            cloudSignDocument.id,
            puchaseOrderPdf,
        );
        this.createLowerContractUsecase.attachPdfFileToCloudSignDocument(
            cloudSignDocument.id,
            orderConfirmationPdf,
        );
    }
}
