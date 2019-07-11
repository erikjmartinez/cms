import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentsService } from '../documents.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(
    private documentService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        let id = +params['id'];

        if (!id) {
          this.editMode = false;
          return;
        }

        this.originalDocument = this.documentService.getDocument(id);

        if (!this.originalDocument) {
          return;
        }

        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      });
  }

  onSubmit(form: NgForm) {
    let document = new Document(
      0,
      form.value.name,
      form.value.description,
      form.value.url, null);

    if (this.editMode === true) {
      this.documentService.updateDocument(this.originalDocument, document);
    } else {
      this.documentService.addDocument(document);
    }

    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }
}
