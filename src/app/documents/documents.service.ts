import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documents: Document[] = [];
  maxDocumentId: number;
  selectedDocumentEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {
    //this.documents = MOCKDOCUMENTS;
    //this.getDocuments();
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
  
  sortAndSend() {
    this.documents.sort((a, b) => a.documentId > b.documentId ? 1 : b.documentId > a.documentId ? -1 : 0);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  storeDocuments(documents: Document[]) {
    let json = JSON.stringify(documents);
    let header = new HttpHeaders({ 'Content-Type': 'application/json'});
    //header.set('Content-Type', 'application/json');
    this.http.put('https://cmsapp-b29f9.firebaseio.com/documents.json', json, {headers: header})
      .subscribe((response: Response)=>{
      this.documentListChangedEvent.next(documents.slice());
    });
  }

  getDocuments(): Document[] {
    this.http.get<Document[]>('https://cmsapp-b29f9.firebaseio.com/documents.json')
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          //this.sortAndSend();
          this.documents.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
          this.documentListChangedEvent.next(this.documents.slice()
          )
        },
        (error: any) => {
          console.log(error);
        }
      );
    return this.documents.slice();
  }

  getDocument(id: number): Document {
    for (let document of this.documents) {
      if (document.documentId === id) {
        return document;
      }
    }
    return null;
  }

  addDocument(newDocument: Document) {
    if (newDocument === null || newDocument === undefined) {
      return;
    }
    this.maxDocumentId++;
    newDocument.documentId = this.maxDocumentId;
    this.documents.push(newDocument);
    let documentsListClone = this.documents.slice()
    this.storeDocuments(documentsListClone);
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
    this.storeDocuments(documentsListClone);
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

    let documentsListClone = this.documents.slice();
    this.storeDocuments(documentsListClone);
  }
}
