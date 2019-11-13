import { VNode } from 'snabbdom/vnode';
import { IView, RenderingContext, PolylineEdgeView, Point } from 'sprotty';
import { DependencyGraphNode, DependencyGraphEdge } from './graph-model';
export declare class DependencyNodeView implements IView {
    cornerRadius: number;
    render(node: Readonly<DependencyGraphNode>, context: RenderingContext): VNode;
}
export declare class DependencyEdgeView extends PolylineEdgeView {
    arrowLength: number;
    arrowWidth: number;
    render(edge: Readonly<DependencyGraphEdge>, context: RenderingContext): VNode;
    protected renderAdditionals(edge: DependencyGraphEdge, segments: Point[], context: RenderingContext): VNode[];
}
//# sourceMappingURL=graph-views.d.ts.map