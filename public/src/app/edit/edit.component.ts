import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  author = {};
  errors = {};

  constructor(
    private _authorService: AuthorService, 
    private _router: Router, 
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params)=>{
      this.getAuthor(params['id']);
    })
  }
  getAuthor(id){
    let observable = this._authorService.getAuthor(id);
    observable.subscribe(data => {
      this.author = data['author']
      console.log("getAuthor - Data from Author Service", data);
    })
  }
  updateAuthor(id){
    let observable = this._authorService.updateAuthor(id, this.author);
    observable.subscribe( data => {
      if (data['status']== 'not ok'){
        this.errors = data['errors']['errors'];
      }else{
        console.log("updateAuthor - Data from Author Service", data);
        this._router.navigate(['/']);
      }
    })
  }

}
