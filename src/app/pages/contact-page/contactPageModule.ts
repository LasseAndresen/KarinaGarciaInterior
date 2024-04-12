import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ContactPageComponent} from "./contactPageComponent";
import {FormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";

const childRoutes: Routes = [
    {
        path: '',
        component: ContactPageComponent
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(childRoutes),
        FormsModule,
        NgIf,
        NgClass
    ],
    exports: [RouterModule],
    declarations: [ContactPageComponent],
    providers: [],
})
export class ContactPageModule {}
