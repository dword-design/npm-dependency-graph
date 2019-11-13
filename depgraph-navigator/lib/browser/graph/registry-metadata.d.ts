export interface PackageMetadata {
    name: string;
    description: string;
    'dist-tags': {
        [tag: string]: string;
    };
    versions: {
        [version: string]: VersionMetadata;
    };
}
export interface VersionMetadata {
    name: string;
    description: string;
    version: string;
    dependencies?: {
        [dep: string]: string;
    };
    optionalDependencies?: {
        [dep: string]: string;
    };
    devDependencies?: {
        [dep: string]: string;
    };
    peerDependencies?: {
        [dep: string]: string;
    };
}
//# sourceMappingURL=registry-metadata.d.ts.map