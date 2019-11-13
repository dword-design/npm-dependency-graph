import { SModelIndex, SModelElementSchema } from 'sprotty';
import { DependencyGraphNodeSchema, DependencyGraphEdgeSchema } from './graph-model';
import { IGraphGenerator } from './graph-generator';
export declare class DependencyGraphFilter {
    protected nameFilter: (name: string) => boolean;
    setFilter(text: string): void;
    refresh(generator: IGraphGenerator): void;
    protected createIncomingMap(edges: DependencyGraphEdgeSchema[], index: SModelIndex<SModelElementSchema>): Map<DependencyGraphNodeSchema, DependencyGraphEdgeSchema[]>;
    protected dfs(node: DependencyGraphNodeSchema, incoming: Map<DependencyGraphNodeSchema, DependencyGraphEdgeSchema[]>, mark: {
        [id: string]: boolean;
    }, index: SModelIndex<SModelElementSchema>): void;
}
//# sourceMappingURL=graph-filter.d.ts.map