import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  //@Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[];
  // = [
  //new Document(1, 'Exam', 'Exam answers', 'www.google.com', 'No relation'),
  //new Document(2, 'Test', 'Test answers', 'www.google.com', 'No relation'),
  //new Document(3, 'Quiz', 'Quiz answers', 'www.google.com', 'No relation')
  //]
  constructor(private documentService: DocumentsService) {
    this.documents = this.documentService.getDocuments();
  }

  ngOnInit() {
  }

  onSelectedDocument(document: Document) {
    this.documentService.selectedDocumentEvent.emit(document);
  }

}
