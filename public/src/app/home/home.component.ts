import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authors = [];

  constructor(private _authorService: AuthorService) { }

  ngOnInit() {
    this.getAuthors();
  }
  getAuthors(){
    let observable = this._authorService.getAuthors();
    observable.subscribe(data => {
      console.log("getAuthors - Data from Author Service", data);
      this.authors = data['authors'];
    })
  }
  deleteAuthor(id){
    let observable = this._authorService.deleteAuthor(id);
    observable.subscribe( data => {
      console.log("Deleted Author")
      this.getAuthors();
    })
  }

}
