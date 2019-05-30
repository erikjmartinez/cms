import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  // @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[];


  constructor(private documentService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.documentService.changedDocumentEvent
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      )
  }

  // onSelectedDocument(document: Document) {
  //   this.documentService.selectedDocumentEvent.emit(document);
  // }

}
