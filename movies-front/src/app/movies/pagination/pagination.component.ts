import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mvs-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() page: number;
  @Input() pageSize: number;
  @Input() collectionSize: number;
  @Output() pageChange: EventEmitter<any> = new EventEmitter();
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;

  constructor() { }

  ngOnInit(): void {
    this.totalPages = Math.ceil(this.collectionSize / this.pageSize);
    if (this.totalPages == 1) {
      this.firstPage = true;
      this.lastPage = true;
    } else {
      this.firstPage = true;
      this.lastPage = false;
    }
  }

  updatePage(action: string) {
    if (action == "prev") {
      this.page--;
    } else if (action == "next") {
      this.page++;
    }

    if (this.page == 1) {
      this.firstPage = true;
    } else if (this.page == this.totalPages) {
      this.lastPage = true;
    } else {
      this.firstPage = false;
      this.lastPage = false;
    }

    this.pageChange.emit({
      page: this.page
    });
  }

}
