import { Injectable, EventEmitter, Inject } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  selectedDocumentEvent = new EventEmitter<Document[]>();
  changedDocumentEvent = new EventEmitter<Document[]>();

  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;


  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId = 0;

    for (let i = 0; i < this.documents.length; i++) {

      let currentId = +this.documents[i].documentId;

      if (currentId < maxId) {
        maxId = currentId
      }
    }
    return maxId
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

  addDocument(newDocument: Document) {
    if (newDocument === null) {
      return;
    }
    this.maxDocumentId++;
    newDocument.documentId = this.maxDocumentId;

    this.documents.push(newDocument);
    let documentsListClone = this.documents.slice()
    this.documentListChangedEvent.next(documentsListClone)
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument === null || originalDocument === undefined
      || newDocument === null || newDocument === undefined) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.documentId = originalDocument.documentId;
    this.documents[pos] = newDocument;
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  deleteDocument(document: Document) {
    if (document === null || document === undefined) {
      return;
    }
    const dd = this.documents.indexOf(document);
    if (dd < 0) {
      return;
    }
    this.documents.splice(dd, 1);
    // this.documentListChangedEvent.next(this.documents.slice());

    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }
}
