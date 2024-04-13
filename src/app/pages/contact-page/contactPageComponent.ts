import {Component, HostBinding, ViewChild} from "@angular/core";
import {environment} from "../../../environment";
import {ContactForm} from "../../models/contactForm";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'contact-page',
    templateUrl: 'contactPageComponent.html',
    styleUrls: ['contactPageComponent.scss'],
})
export class ContactPageComponent {
    protected form = new ContactForm();
    protected submitted = false;

    @ViewChild('contactForm', {static: true})
    private _contactForm: NgForm | undefined;

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
                this.form = new ContactForm();
                this._contactForm?.reset();
            })
            .catch(err => console.error(err));
    }
}
