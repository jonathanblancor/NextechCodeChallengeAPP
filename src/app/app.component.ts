import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Nextech-Code-Challenge';
  news: any[] = [];
  private subject: Subject<string> = new Subject();
  loadSpinner: boolean;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {

    this.loadSpinner = true;

    this.http.get<any[]>("https://localhost:44375/api/news").subscribe(response => {

      this.news = response;
      console.log(response);

      this.loadSpinner = false;

    }, error => {
      alert("Could not get data: " + error);
      console.error("Could not get data: " + error);
    });

    this.subject.pipe(
      debounceTime(300)
    ).subscribe(searchTextValue => {
      this.search(searchTextValue);
    });
  }

  /**
   * Helper method that controls user input
   * @param searchTerm Term to search in the news 'title'
   */
  searchNews(searchTerm: string){

    this.subject.next(searchTerm);
  }

  /**
   * Search news based on the search term
   * @param searchTerm Term to search in the news 'title'
   */
  search(searchTerm: string){

    this.loadSpinner = true;

    this.http.get<any[]>("https://localhost:44375/api/news/SearchNews?searchTerm=" + searchTerm).subscribe(response => {

      this.news = response;
      console.log(response);

      this.loadSpinner = false;

    }, error => {
      alert("Could not get data: " + error);
      console.error("Could not get data: " + error);
    });
  }
}
