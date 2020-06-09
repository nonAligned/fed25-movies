import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mvs-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {
  sort: string = "";
  sortDirection: string = "desc";
  @Output() sortChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  updateSort() {
    this.sortChange.emit({
      sort: this.sort
    });
  }

  updateSortDirection() {
    if (this.sortDirection == "desc") {
      this.sortDirection = "asc";
    } else if (this.sortDirection = "asc") {
      this.sortDirection = "desc";
    }

    this.sortChange.emit({
      sortDirection: this.sortDirection
    });
  }

}
