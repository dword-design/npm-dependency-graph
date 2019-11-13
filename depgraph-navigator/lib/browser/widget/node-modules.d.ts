import URI from '@theia/core/lib/common/uri';
import { FileSystem } from '@theia/filesystem/lib/common';
import { DependencyGraphNodeSchema } from '../graph/graph-model';
import { VersionMetadata } from '../graph/registry-metadata';
import { NpmDependencyGraphGenerator } from '../graph/npm-dependencies';
export declare class NodeModulesGraphGenerator extends NpmDependencyGraphGenerator {
    fileSystem?: FileSystem;
    startUri?: URI;
    protected getMetadata(node: DependencyGraphNodeSchema): Promise<VersionMetadata>;
}
//# sourceMappingURL=node-modules.d.ts.map