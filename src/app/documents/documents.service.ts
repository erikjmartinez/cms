import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DocumentsService {
  private documents: Document[] = [];
  private maxDocumentId: number;
  selectedDocumentEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {
    this.maxDocumentId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let i = 0; i < this.documents.length; i++) {
      let currentId = +this.documents[i].documentId;
      if (currentId > maxId) {
        maxId = currentId
      }
    }
    return maxId;
  }

  sortAndSend() {
    this.documents.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  getDocuments(): Document[] {
    this.http.get<{ message: string, documents: Document[] }>('http://localhost:3000/documents')
      .subscribe(
        (documentData) => {
          this.documents = documentData.documents;
          this.maxDocumentId = this.getMaxId();
          this.sortAndSend();
          this.documentListChangedEvent.next(this.documents.slice())
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
    if (!newDocument) {
      return;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    newDocument.documentId = 0;
    const strDocument = JSON.stringify(newDocument);

    this.http.post<{ message: String, document: Document }>('http://localhost:3000/documents'
      , strDocument
      , { headers: headers })
      .subscribe(
        (responseData) => {
          this.documents.push(responseData.document);
          this.sortAndSend();
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
  }


  // WORKS
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    newDocument.documentId = originalDocument.documentId;
    //const strDocument = JSON.stringify(newDocument);

    this.http.put('http://localhost:3000/documents/' + originalDocument.documentId
      , newDocument
      , { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.documentListChangedEvent.next(this.documents.slice());
        });
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.documentId === document.documentId);

    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/documents/' + document.documentId)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }
}
