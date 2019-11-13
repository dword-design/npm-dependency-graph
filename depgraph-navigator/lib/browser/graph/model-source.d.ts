import { LocalModelSource, ActionHandlerRegistry, SelectAction, SelectAllAction, Action } from 'sprotty';
import { IGraphGenerator } from './graph-generator';
import { DependencyGraphNodeSchema } from './graph-model';
import { DependencyGraphFilter } from './graph-filter';
export declare class DepGraphModelSource extends LocalModelSource {
    loadIndicator: (loadStatus: boolean) => void;
    readonly graphGenerator: IGraphGenerator;
    protected readonly graphFilter: DependencyGraphFilter;
    protected postConstruct(): void;
    initialize(registry: ActionHandlerRegistry): void;
    select(elementIds: string[]): Promise<void>;
    center(elementIds: string[]): Promise<void>;
    filter(text: string): Promise<void>;
    createNode(name: string, version?: string): Promise<void>;
    resolveNodes(nodes: DependencyGraphNodeSchema[], toggle: boolean): Promise<void>;
    resolveGraph(): Promise<void>;
    clear(): Promise<void>;
    updateModel(): Promise<void>;
    handle(action: Action): void;
    protected handleSelect(action: SelectAction): void;
    protected handleSelectAll(action: SelectAllAction): void;
}
//# sourceMappingURL=model-source.d.ts.map