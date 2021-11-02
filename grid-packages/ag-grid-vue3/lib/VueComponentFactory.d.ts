import { AgGridVue } from './AgGridVue';
export declare class VueComponentFactory {
    private static getComponentDefinition;
    private static addParamsToProps;
    static createAndMountComponent(component: any, params: any, parent: AgGridVue): {
        componentInstance: any;
        element: any;
        destroy: () => void;
    } | undefined;
    static mount(component: any, props: any, parent: any): {
        vNode: any;
        destroy: () => void;
        el: any;
    };
    static searchForComponentInstance(parent: AgGridVue, component: any, maxDepth?: number, suppressError?: boolean): any;
}