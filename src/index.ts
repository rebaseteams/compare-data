/* eslint-disable @typescript-eslint/no-explicit-any */
import { CompareData as cd} from './components/compare'
import { section } from './types/section'

export class CompareData{
    private functionMapper: any;
    
    constructor(functionMapper: any){
        this.functionMapper = functionMapper
    }
    compare(metaData: Array<section>, data: any){
        return cd({
            functionMapper:this.functionMapper,
            metaData:metaData,
            data:data
        })
    }
}
