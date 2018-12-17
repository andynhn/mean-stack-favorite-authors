import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private _http: HttpClient) { 

  }
  getAuthors(){
    return this._http.get('/Authors');
  }
  getAuthor(id){
    return this._http.get(`/Authors/${id}`);
  }
  createAuthor(newAuthor){
    return this._http.post('/Authors', newAuthor);
  }
  updateAuthor(id, selectedAuthor){
    return this._http.put(`/Authors/${id}`, selectedAuthor);
  }
  deleteAuthor(id){
    return this._http.delete(`/Authors/${id}`);
  }
}
