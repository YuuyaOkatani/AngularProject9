import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { writer } from '../writer';
import { WriterService } from '../service/writer.service';
import { TypesService } from '../service/types.service';
import { BooksService } from '../service/books.service';
import { FormatService } from '../service/format.service';
import { books } from '../book';
import { type } from '../type';
import { format } from '../format';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
  Forms: FormGroup; 

  writers: writer[] = [];
  books: books[] = [];
  types: type[] = [];
  formats: format[] = [];

  newName: any; 
  newType: any;
  newFormat: any;
  newWriter: any;
  newSigned: any;
  message:boolean = false



  selected: any ;
  holder: number = 0; 
  state = ''
 
  
  togglar = ''; 
  constructor(
    private formbuilder: FormBuilder, 
    private writerservice: WriterService,
    private typessevice: TypesService,
    private booksservice: BooksService,
    private formatservice: FormatService


  ){

    this.Forms = formbuilder.group({
      id: [],
      name:[''], 
      type: [''], 
      writer: [''],
      format:[''],
      signed: [false]
   

    })
  }

  ngOnInit(): void {
    this.loadWriters()
    this.loadBooks()
    this.loadTypes()
    this.loadFormats()
    
      
  }

  loadWriters(){
    this.writerservice.getWriters().subscribe(data => {
      this.writers = data;
      console.log(this.writers)
    })


  }

  loadBooks(){
    this.booksservice.getBooks().subscribe(data => {
      this.books = data;
      console.log(this.books)
    })
  }

  loadTypes(){
    this.typessevice.getTypes().subscribe(data => {
      this.types = data;
      console.log(this.types)
    })
  }

  loadFormats(){
    this.formatservice.getFormats().subscribe(data => {
      this.formats = data;
      console.log(this.formats)
    })
  }

  


  

  

  comparewith(type1: type, type2: type): boolean{
    return type1 && type2 ? type1.id === type2.id : type1 === type2;

  }

  comparewith2(book1: books, book2: books): boolean{
    return book1 && book2 ? book1.id === book2.id : book1 === book2;

  }

  Message(item: string){
  
    this.state = item;
    this.message = true
            setTimeout(() => {
            this.message = false
            this.state = ''; 
      
      
          }, 3000);

  }

  addBook(){
    this.booksservice.addBooks(this.Forms.value).subscribe({
      next: data => {
        this.books.push(data);
        this.Forms.reset();
      }
    })

  }

  check(){
    let array = [this.newName, this.newWriter, this.newFormat, this.newSigned, this.newType];
    array.forEach(element => {
      if(element == null || element == undefined || element == '') {
          this.Message('incomplete_form')
      }
    })
    if(this.state != 'incomplete_form'){
      
      this.books.forEach(book => {
        if(this.newName.toLowerCase().trim() === book.name.toLowerCase().trim()) {
          this.Message('book_exists')
          
          
      }
      
    
    })
    if(this.state != 'book_exists'){
      this.Message('added_book')
          this.addBook()
    }
    
    }
    
          //TODO create code blocks to check if all values from the form are valid and difrent from null or '' or undefined
  }

 

  Activate(response: string, item?: any){
    this.togglar = response
    console.log(response)
    switch(response){

      case 'togglar1':
        this.check()
        
      break; 
      case 'togglar2':
        
   
        

      break; 
      case 'togglar3':
        this.selected = item 
        this.newName = this.selected.name
        this.newWriter = this.selected.writer
        this.newType = this.selected.type
        this.newFormat = this.selected.format
        this.newSigned = this.selected.signed

        

        console.log(this.selected)
         
        

      break; 
      case 'togglar4':
        this.selected = item


      break; 
      case 'togglar5':

        

        

        
       
        this.holder = this.selected.id; 
        this.selected = this.Forms.value; 

        

        this.selected.id = this.holder
        this.booksservice.updateBooks(this.selected).subscribe({
          next: data => {
            this.loadBooks();
          
          
            this.Forms.reset();
          }
        })
        this.togglar = 'togglar2'
      break; 
      case 'togglar6':
        
        this.booksservice.deleteBooks(this.selected).subscribe({
          next: () => {
            const index = this.books.indexOf(this.selected);
            this.books.splice(index, 1);
            this.Forms.reset();
          }
        })
        this.togglar = 'togglar2'
      break;


      break; 
      case '':
    

      break;
    }
  }

}
