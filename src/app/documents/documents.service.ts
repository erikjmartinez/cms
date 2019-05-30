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

  sortAndSend() {
    this.documents.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
    this.selectedDocumentEvent.next(this.documents.slice());
  }
  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: number): Document {
    for (let i = 0; i < Document.length; i++) {
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
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.changedDocumentEvent.emit(this.documents.slice());
  }
}
