/// <reference types="elkjs" />
import { LayoutOptions } from 'elkjs/lib/elk-api';
import { SGraphSchema, SModelIndex, SModelElementSchema } from 'sprotty';
import { DefaultLayoutConfigurator } from 'sprotty-elk';
export declare class DepGraphLayoutConfigurator extends DefaultLayoutConfigurator {
    protected graphOptions(sgraph: SGraphSchema, index: SModelIndex<SModelElementSchema>): LayoutOptions;
}
//# sourceMappingURL=graph-layout.d.ts.map