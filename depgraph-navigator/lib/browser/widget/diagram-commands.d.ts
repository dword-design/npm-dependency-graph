import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry } from '@theia/core/lib/common';
import { KeybindingContribution, KeybindingRegistry, ApplicationShell, KeybindingContext, Keybinding } from '@theia/core/lib/browser';
export declare const RESOLVE_GRAPH = "diagram.resolveGraph";
export declare class DepgraphKeybindingContext implements KeybindingContext {
    protected readonly shell: ApplicationShell;
    id: string;
    isEnabled(arg?: Keybinding): boolean;
}
export declare class DiagramCommandContribution implements CommandContribution, KeybindingContribution, MenuContribution {
    protected readonly shell: ApplicationShell;
    protected readonly keybindingContext: DepgraphKeybindingContext;
    registerCommands(registry: CommandRegistry): void;
    registerKeybindings(registry: KeybindingRegistry): void;
    registerMenus(registry: MenuModelRegistry): void;
}
//# sourceMappingURL=diagram-commands.d.ts.map