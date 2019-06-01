import { Injectable, EventEmitter, Inject } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  selectedDocumentEvent = new EventEmitter<Document[]>();
  changedDocumentEvent = new EventEmitter<Document[]>();
  documents: Document[] = [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: number): Document {
    for (let i = 0; i < this.documents.length; i++) {
      if (this.documents[i].documentId === id) {
        return this.documents[i];
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if (document === null) {
      return;
    }
    const dd = this.documents.indexOf(document);
    if (dd < 0) {
      return;
    }
    this.documents.splice(dd, 1);
    this.changedDocumentEvent.emit(this.documents.slice());
  }
}
