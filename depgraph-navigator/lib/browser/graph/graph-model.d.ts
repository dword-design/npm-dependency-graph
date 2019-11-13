import { RectangularNode, SEdge, SNodeSchema, SEdgeSchema, SModelElementSchema } from 'sprotty';
export interface DependencyGraphNodeSchema extends SNodeSchema {
    name: string;
    requiredVersions: string[];
    resolved?: boolean;
    hidden?: boolean;
    version?: string;
    description?: string;
    url?: string;
    error?: string;
}
export declare function isNode(element?: SModelElementSchema): element is DependencyGraphNodeSchema;
export declare class DependencyGraphNode extends RectangularNode {
    name: string;
    versions: string[];
    resolved: boolean;
    hidden: boolean;
    description?: string;
    url?: string;
    error?: string;
}
export interface DependencyGraphEdgeSchema extends SEdgeSchema {
    optional?: boolean;
}
export declare function isEdge(element?: SModelElementSchema): element is DependencyGraphEdgeSchema;
export declare class DependencyGraphEdge extends SEdge {
    optional: boolean;
    constructor();
}
//# sourceMappingURL=graph-model.d.ts.map