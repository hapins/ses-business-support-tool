import {
    LowerOrderContractController
} from '../interface/controllers/lower/lowerOrderContractController';

function createLowerOrderContract(useCloudSign: boolean, useFreee: boolean) {
    const controller = new LowerOrderContractController();
    controller.createFolder();
    controller.createDocument(useCloudSign);
}
