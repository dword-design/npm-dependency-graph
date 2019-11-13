import * as express from 'express';
import { BackendApplicationContribution } from "@theia/core/lib/node";
export declare class RegistryProxy implements BackendApplicationContribution {
    registryPath: string;
    /**
     * Set up a proxy to the npm registry to avoid CORS.
     */
    configure(app: express.Application): void;
    protected getPath(request: express.Request): string;
}
//# sourceMappingURL=proxy.d.ts.map