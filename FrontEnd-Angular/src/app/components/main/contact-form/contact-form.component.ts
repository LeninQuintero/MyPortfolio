import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})

export class ContactFormComponent implements OnInit {
  public contactForm: FormGroup;
  public alertSubmit: boolean;
  private messageDate: string | undefined;
  private userId= 0;
  private newMessage;

  constructor(private fb: FormBuilder, private messageService: MessagesService, private userService: UserService) {

    const emailValidator = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      subject: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.pattern(emailValidator)]],
      message: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(500)]],
      date: ['',],
      read: [false,]
    });

    this.newMessage = this.contactForm.value;


    this.alertSubmit= false;

  }
  ngOnInit(): void {
    this.userService.getUser.subscribe( user => {
      this.userId = user.id;
    }
    );
  }

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
      this.newMessage = this.contactForm.value;   
      this.messageDate = new Date().toISOString();
      this.newMessage.date = this.messageDate;

      this.messageService.addMessage(this.newMessage, this.userId).subscribe( message => {    
        this.messageService.getNewMessage$.next(message);
      });
             
      this.alertSubmit = true;

      setTimeout(() => this.closeAlertSubmit(), 5 * 1000);

      this.contactForm.reset();
      
    } else {
      this.contactForm.markAllAsTouched();
    } 
  }
  
}