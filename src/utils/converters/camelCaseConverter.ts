import { StringKeyObject } from '../types/objectType';

export interface CamelCaseConverterInterface {
    /**
     * 対象のオブジェクトをcamel caseに変換する
     * @param inputObject
     */
    convertToCamelObject(inputObject: StringKeyObject): StringKeyObject;
}

export class CamelCaseConverter implements CamelCaseConverterInterface {
    convertToCamelObject(inputObject: StringKeyObject): StringKeyObject {
        const result: StringKeyObject = {};

        Object.keys(inputObject).forEach((key: string) => {
            result[this.convertToCamelString(key)] = inputObject[key];
        });
        return result;
    }

    private convertToCamelString(inputString: string): string {
        const result = inputString
            .split('_')
            .map((word: string, index: number) => {
                if (index === 0) {
                    return word.toLowerCase();
                }
                return (
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                );
            })
            .join('');
        return result;
    }
}
