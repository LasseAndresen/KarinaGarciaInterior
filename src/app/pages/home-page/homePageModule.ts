import {NgModule} from "@angular/core";
import {HomePageComponent} from "./homePageComponent";
import {RouterModule, Routes} from "@angular/router";
import {CallToActionButton} from "../../components/call-to-action-button/callToActionButton";

const childRoutes: Routes = [
    {
        path: '',
        component: HomePageComponent
    }
];
@NgModule({
  imports: [RouterModule.forChild(childRoutes), CallToActionButton],
    exports: [RouterModule],
    declarations: [HomePageComponent],
    providers: [],
})
export class HomePageModule {}
