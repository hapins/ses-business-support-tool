import { StringKeyObject } from '../types/objectType';

export interface SnaceCaseConverterInterface {
    /**
     * 対象のオブジェクトをsnake caseに変換する
     * @param inputObject
     */
    convertToSnakeObject(inputObject: StringKeyObject): StringKeyObject;
}

export class SnaceCaseConverter implements SnaceCaseConverterInterface {
    convertToSnakeObject(inputObject: StringKeyObject): StringKeyObject {
        const result: StringKeyObject = {};
        Object.keys(inputObject).forEach((key: string) => {
            result[this.convertToSnakeString(key)] = inputObject[key];
        });
        return result;
    }

    private convertToSnakeString(inputString: string): string {
        const result = inputString
            .split(/(?=[A-Z])/)
            .join('_')
            .toLowerCase();
        return result;
    }
}
