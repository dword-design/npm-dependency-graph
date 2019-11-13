import URI from '@theia/core/lib/common/uri';
import { WidgetOpenerOptions } from '@theia/core/lib/browser';
import { FileSystem } from '@theia/filesystem/lib/common';
import { DiagramManager, DiagramWidget } from 'sprotty-theia';
import { DepGraphWidget } from './diagram-widget';
export declare class DepGraphDiagramManager extends DiagramManager {
    protected readonly fileSystem: FileSystem;
    readonly diagramType: string;
    iconClass: string;
    label: string;
    canHandle(uri: URI, options?: WidgetOpenerOptions | undefined): number;
    createWidget(options?: any): Promise<DiagramWidget>;
    protected createModel(uri: URI, diagramWidget: DepGraphWidget): Promise<void>;
}
//# sourceMappingURL=diagram-manager.d.ts.map