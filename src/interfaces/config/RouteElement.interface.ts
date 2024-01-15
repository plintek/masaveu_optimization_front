import { AnyObject } from "@interfaces/basic/AnyObject.interface";

export interface RouteElement {
    name: string;
    title: string;
    path: string;
    component: React.FC;
    props?: AnyObject;
    private?: boolean;
    accessRole?: string[];
    showInDashboard?: boolean;
}
