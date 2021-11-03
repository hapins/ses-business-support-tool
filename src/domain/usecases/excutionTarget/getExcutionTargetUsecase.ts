import {
    SpreadSheetCompanyMasterType
} from '../../../data/googleWorkspace/spreadSheet/model/custom/companyMasterType';
import {
    SpreadSheetDealType
} from '../../../data/googleWorkspace/spreadSheet/model/custom/dealType';
import {
    SpreadSheetExecutionTargetService, SpreadSheetExecutionTargetServiceInterface
} from '../../services/spreadSheet/spreadSheetExecutionTargetService';

export interface GetExecutionTargetUsecaseInterface {
    getLowerCompany(): {
        targetDeal: SpreadSheetDealType;
        companyMaster: SpreadSheetCompanyMasterType;
    };
    getUpperCompany(): {
        targetDeal: SpreadSheetDealType;
        companyMaster: SpreadSheetCompanyMasterType;
    };
}

export class GetExecutionTargetUsecase
    implements GetExecutionTargetUsecaseInterface
{
    private service: SpreadSheetExecutionTargetServiceInterface;

    constructor() {
        this.service = new SpreadSheetExecutionTargetService();
    }

    getLowerCompany(): {
        targetDeal: SpreadSheetDealType;
        companyMaster: SpreadSheetCompanyMasterType;
    } {
        const targetDeal = this.service.getTargetDeal();
        const companyMaster = this.service.getTargetLowerCompany();
        return { targetDeal, companyMaster };
    }

    getUpperCompany(): {
        targetDeal: SpreadSheetDealType;
        companyMaster: SpreadSheetCompanyMasterType;
    } {
        const targetDeal = this.service.getTargetDeal();
        const companyMaster = this.service.getTargetUpperCompany();
        return { targetDeal, companyMaster };
    }
}
