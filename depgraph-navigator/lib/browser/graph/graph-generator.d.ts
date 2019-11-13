import { SModelIndex, SModelElementSchema } from 'sprotty';
import { DependencyGraphNodeSchema, DependencyGraphEdgeSchema } from './graph-model';
export interface IGraphGenerator {
    readonly nodes: DependencyGraphNodeSchema[];
    readonly edges: DependencyGraphEdgeSchema[];
    readonly index: SModelIndex<SModelElementSchema>;
    generateNode(name: string, version?: string): DependencyGraphNodeSchema;
    resolveNode(node: DependencyGraphNodeSchema): Promise<DependencyGraphNodeSchema[]>;
    unresolveNode(node: DependencyGraphNodeSchema): void;
    toggleResolveNode(node: DependencyGraphNodeSchema): Promise<DependencyGraphNodeSchema[]>;
    addDependencies(node: DependencyGraphNodeSchema, dependencies: {
        [dep: string]: string;
    }, optional?: boolean): DependencyGraphNodeSchema[];
}
export declare const IGraphGenerator: unique symbol;
//# sourceMappingURL=graph-generator.d.ts.map