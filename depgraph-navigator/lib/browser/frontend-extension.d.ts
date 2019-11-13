import { ContainerModule } from 'inversify';
import { SearchBoxFactory } from '@theia/core/lib/browser/tree/search-box';
import 'sprotty/css/sprotty.css';
import 'sprotty-theia/css/theia-sprotty.css';
import '../../src/browser/style/depgraph.css';
declare const _default: ContainerModule;
export default _default;
export declare const createSearchBox: SearchBoxFactory;
//# sourceMappingURL=frontend-extension.d.ts.map