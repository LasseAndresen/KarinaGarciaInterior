import {Component, HostBinding} from "@angular/core";
import {environment} from "../../../environment";

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

        fetch(environment.apiUrl + '/submitContactForm', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.form),
        })
            .then(() => {
                this.submitted = true;
                this.form = {
                    firstName: '',
                    lastName: '',
                    email: '',
                    message: ''
                };
            })
            .catch(err => console.error(err));
    }
}
