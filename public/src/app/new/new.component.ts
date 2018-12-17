import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  author = {
    "name": ''
  }
  errors = {};

  constructor(
    private _authorService: AuthorService, 
    private _router: Router
  ) { }

  ngOnInit() {
  }
  createAuthor(){
    let observable = this._authorService.createAuthor(this.author);
    observable.subscribe(data => {
      console.log("createAuthor - Data from Author Service", data);
      if(data['status'] == "not ok"){
        this.errors = data['errors']['errors'];
      } else {
        this._router.navigate(['/']);
      }
    });
  }

}
