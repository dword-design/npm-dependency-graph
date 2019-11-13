import { Container } from 'inversify';
import { FileSystem } from '@theia/filesystem/lib/common';
import { StatusBar } from '@theia/core/lib/browser';
import { DiagramConfiguration } from 'sprotty-theia';
export declare class DepGraphDiagramConfiguration implements DiagramConfiguration {
    protected readonly fileSystem: FileSystem;
    protected readonly statusBar: StatusBar;
    readonly diagramType: string;
    createContainer(widgetId: string): Container;
}
//# sourceMappingURL=diagram-config.d.ts.map