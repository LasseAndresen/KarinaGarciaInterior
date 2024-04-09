import {NgModule} from "@angular/core";
import {HomePageComponent} from "./homePageComponent";
import {RouterModule, Routes} from "@angular/router";

const childRoutes: Routes = [
    {
        path: '',
        component: HomePageComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule],
    declarations: [HomePageComponent],
    providers: [],
})
export class HomePageModule {}
