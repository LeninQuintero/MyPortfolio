import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})

export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  alertSubmit: boolean;

  constructor(private fb: FormBuilder, private messageService: MessagesService) {

    const emailValidator = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.pattern(emailValidator)]],
      asunto: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      mensaje: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(500)]]
    });

    this.alertSubmit= false;

  }

  ngOnInit(): void { }

  isValidField(field: string) {
    const fieldName = this.contactForm.get(field);
    return fieldName?.valid && (fieldName?.touched || fieldName?.dirty);
  }

  isInvalidField(field: string) {
    const fieldName = this.contactForm.get(field);
    return fieldName?.invalid && (fieldName?.touched || fieldName?.dirty);
  }

  errorsFeedback(field: string, validator: string) {
    const fieldName = this.contactForm.get(field);
    return fieldName?.hasError(validator);
  }

  requiredType(field: string, validator: string, type: string) {
    const fieldName = this.contactForm.get(field);
    return fieldName?.errors?.[validator]?.[type];
  }

  closeAlertSubmit() {
    this.alertSubmit = false;
  }

  submit(event: Event) {

    if (this.contactForm.valid) {    
      const newMessage = this.contactForm.value;
      let list = this.messageService.messages;

      this.messageService.addMessage(newMessage).subscribe( message => {
       list.push(message);        
        this.messageService._messages$.next(list);    
      });
             
      this.alertSubmit = true;

      setTimeout(() => this.closeAlertSubmit(), 5 * 1000);


      this.contactForm.reset();
      
    } else {
      this.contactForm.markAllAsTouched();
    } 
  }
  
}