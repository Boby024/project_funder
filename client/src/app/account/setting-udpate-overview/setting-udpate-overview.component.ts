import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {User} from '../../../assets/models/user';
import {AccountService} from '../account.service';
import {Profilimage} from '../../../assets/models/profilimage';

@Component({
  selector: 'app-setting-udpate-overview',
  templateUrl: './setting-udpate-overview.component.html',
  styleUrls: ['./setting-udpate-overview.component.css']
})
export class SettingUdpateOverviewComponent implements OnInit {

  @Input() userUpdate: User;
  @Input() userUpdateImage: Profilimage;
  @Output() hideViewSetting = new EventEmitter<boolean>();

  user: any;

  userImage = this.fb.group({
    id: [null],
    imageStringForm: ['', Validators.required],
    filesize: ['', Validators.required],
    lastmodified: ['', Validators.required],
    filetype: ['', Validators.required],
  });
  fileURL: any;
  constructor(private fb: FormBuilder,
              private accountService: AccountService) { }

  ngOnInit(): void {
    this.user = this.fb.group({
      id: [this.userUpdate.id, Validators.required],
      email: [this.userUpdate.email, [Validators.email, Validators.required]], // project_Id
      username: [this.userUpdate.username, Validators.required],
      surname: [this.userUpdate.surname, Validators.required],
      firstname: [this.userUpdate.firstname, Validators.required],
      pssword: [this.userUpdate.pssword, Validators.required],
      description: [this.userUpdate.description],
      idprofilimage: [this.userUpdate.idprofilimage],
    });

    if (this.userUpdateImage !== null) {
      this.userImage = this.fb.group({
        id: [this.userUpdateImage.id, Validators.required],
        imageStringForm: [this.userUpdateImage.image, Validators.required],
        filesize: [this.userUpdateImage.filesize, Validators.required],
        lastmodified: [this.userUpdateImage.lastmodified, Validators.required],
        filetype: [this.userUpdateImage.filetype, Validators.required],
      });
    }
  }

  uploadImage(event) {
    let file;
    const reader = new FileReader();
    file = event.target.files.item(0);
    console.log(file);

    reader.readAsDataURL(file);
    reader.onload = () => {
      this.userImage.patchValue({
        lastmodified: file.lastModified,
        filetype: file.type,
        filesize: file.size,
        imageStringForm: reader.result,
      });
      console.log(this.userImage.value);
      if (  this.userImage.get('id').value === null ) {
        this.accountService.uploadProfilImage(JSON.stringify(this.userImage.value))
          .subscribe( (data) => {
            console.log(data);
            if (data.id !== null ) {
              this.fileURL = data.image;

              this.userImage.patchValue({
                id: data.id,
              });
              this.user.get('idprofilimage').setValue(data.id);
            }
          });
      }else {
        this.accountService.updateUploadProfilImage(JSON.stringify(this.userImage.value))
          .subscribe( (data) => {
            console.log(data);
            if (data.id !== null ) {
              this.fileURL = data.image;

              this.userImage.patchValue({
                id: data.id,
              });
              this.user.get('idprofilimage').setValue(data.id);
            }
          });
      }
    };
  }

  onSubmit() {
    console.log(this.user.value);
    this.accountService.updateUserData( +(this.user.get('id').value), JSON.stringify(this.user.value))
      .subscribe( (data) => {
        console.log(data);
        if (data !== null) {
          location.reload();
        }else {
          document.getElementById('message').innerHTML = 'Aktualisieren Sie die Seiete und Checken Sie wieder Ihrer Eingabe';
        }
      });
  }
}
