import {Component, HostBinding} from "@angular/core";

@Component({
    selector: 'contact-page',
    templateUrl: 'contactPageComponent.html',
    styleUrls: ['contactPageComponent.scss'],
})
export class ContactPageComponent {
    protected form = {
        firstName: '',
        lastName: '',
        email: '',
        message: ''};
    protected submitted = false;

    @HostBinding() class = 'h-100 overflow-y-auto';


    protected onSubmit() {
        console.log('form submitted', this.form);
        this.submitted = true;
        this.form = {
            firstName: '',
            lastName: '',
            email: '',
            message: ''
        };
    }
}
