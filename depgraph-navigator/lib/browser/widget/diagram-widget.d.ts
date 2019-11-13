import { Message } from '@phosphor/messaging/lib';
import { DiagramWidget, DiagramWidgetOptions, TheiaSprottyConnector } from 'sprotty-theia';
import { Deferred } from '@theia/core/lib/common/promise-util';
import { SearchBoxFactory, SearchBox } from '@theia/core/lib/browser/tree/search-box';
import { DepGraphModelSource } from '../graph/model-source';
import { Container } from 'inversify';
export declare class DepGraphWidget extends DiagramWidget {
    protected readonly searchBox: SearchBox;
    attached: Deferred<void>;
    readonly modelSource: DepGraphModelSource;
    readonly diagramType: string;
    constructor(options: DiagramWidgetOptions, searchBoxFactory: SearchBoxFactory, id: string, diContainer: Container, connector?: TheiaSprottyConnector);
    protected onAfterAttach(msg: Message): void;
    protected onBeforeDetach(msg: Message): void;
}
//# sourceMappingURL=diagram-widget.d.ts.map