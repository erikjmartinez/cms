import { Component, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  // @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[];
  subscription: Subscription;

  constructor(private documentService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute) {
    this.documents = this.documentService.getDocuments();
  }

  ngOnInit() {
    this.subscription = this.documentService.documentListChangedEvent
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
