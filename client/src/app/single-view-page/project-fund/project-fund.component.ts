import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {Project} from '../../../assets/models/project';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthenticationUserService} from '../../auth/authentication/authentication-user.service';
import {SingleViewService} from '../single-view.service';

@Component({
  selector: 'app-project-fund',
  templateUrl: './project-fund.component.html',
  styleUrls: ['./project-fund.component.css']
})
export class ProjectFundComponent implements OnInit {

  project: Project;
  donate = this.fb.group({
    donatorId: ['', Validators.required],
    project: ['', Validators.required], // project_Id
    donationamount: ['', Validators.required],
    visibility: [false]
  });
  inputChar: any;

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private authenticationUserService: AuthenticationUserService,
              private router: Router,
              private singleViewService: SingleViewService,
              private location: Location) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( (data: {fundProject: Project} | any) => {
      this.project = data.fundProject;
      console.log(this.project);
    });
    this.donate.patchValue({
      donatorId: this.authenticationUserService.getSessionStoragePassingData().id,
      project: this.project.identifier,
    });
  }
  onSubmit() {
    this.donate.get('visibility').setValue(this.changeVisibilityName(this.donate.get('visibility').value));
    console.log(this.donate.value);
    if (this.donate.valid) {
      this.singleViewService.donateMoney(JSON.stringify(this.donate.value))
        .subscribe( (data) => {
          console.log(data);
          if (data.enoughCredit === 'yes' || data.alreadyDonate === false) {
            document.getElementById('messageTransaction').innerHTML = 'Die Spende wurde erfolgreich durchgeführt';
            this.donate.patchValue({
              donationamount: '',
              visibility: false,
            });
            this.location.back();
          }else if (data.enoughCredit === 'no') {
            document.getElementById('messageTransaction').innerHTML = 'Nicht genug Geld im Konto';
          }else if (data.enoughCredit === 'maybe') {
            document.getElementById('messageTransaction').innerHTML = 'Aktualisieren Die Seite und versuchen Sie nochmal';
          }
        });
    }
  }
  changeVisibilityName(visibilityFromCheckbox: boolean) {
    if (visibilityFromCheckbox === true) {
      return 'privat';
    } else {
      return 'public';
    }
  }
  deleteDonate() {
    // this.router.navigate(['']);
    this.location.back();
    // history.back();
  }
  keyPress(event) {
    const pattern = /[0-9]/;
    this.inputChar = event.key || String.fromCharCode(event.which);
    if (event.keypress !== 8 && !pattern.test(this.inputChar)) {
      event.preventDefault();
    }
  }
}
