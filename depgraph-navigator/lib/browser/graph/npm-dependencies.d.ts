import { SModelIndex, SModelElementSchema } from 'sprotty';
import { IGraphGenerator } from './graph-generator';
import { DependencyGraphNodeSchema, DependencyGraphEdgeSchema } from './graph-model';
import { PackageMetadata, VersionMetadata } from './registry-metadata';
export declare const REGISTRY_URL = "https://registry.npmjs.org";
export declare const API_URL = "https://api.npms.io/v2";
export declare const WEBSITE_URL = "https://www.npmjs.com";
export declare class NpmDependencyGraphGenerator implements IGraphGenerator {
    registryUrl: string;
    websiteUrl: string;
    readonly nodes: DependencyGraphNodeSchema[];
    readonly edges: DependencyGraphEdgeSchema[];
    readonly index: SModelIndex<SModelElementSchema>;
    generateNode(name: string, requiredVersion?: string): DependencyGraphNodeSchema;
    protected createNode(name: string): DependencyGraphNodeSchema;
    toggleResolveNode(node: DependencyGraphNodeSchema): Promise<DependencyGraphNodeSchema[]>;
    unresolveNode(node: DependencyGraphNodeSchema): void;
    resolveNode(node: DependencyGraphNodeSchema): Promise<DependencyGraphNodeSchema[]>;
    protected getMetadata(node: DependencyGraphNodeSchema): Promise<VersionMetadata>;
    protected request(url: string): Promise<any>;
    protected findVersion(node: DependencyGraphNodeSchema, data: PackageMetadata): VersionMetadata | undefined;
    addDependencies(node: DependencyGraphNodeSchema, dependencies: {
        [dep: string]: string;
    }, optional?: boolean): DependencyGraphNodeSchema[];
}
//# sourceMappingURL=npm-dependencies.d.ts.map