import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { nationality } from '../nationality';
import { gender } from '../gender';
import { writer } from '../writer';
import { WriterService } from '../service/writer.service';

import { NationalityService } from '../service/nationality.service';

import { GenderService } from '../service/gender.service';
import { write } from 'node:fs';


@Component({
  selector: 'app-writer',
  templateUrl: './writer.component.html',
  styleUrl: './writer.component.css'
})
export class WriterComponent implements OnInit {
  Forms: FormGroup; 
  nationality: nationality[] = []; 
  gender: gender[] = []; 
  writer: writer[] = [];

  newName: any; 
  newNationality: any; 
  newGender: any; 
  newPhone: any;
  newAge: any;

  selected: any ;
  holder: number = 0; 
  message = false; 
  state = ''; 
 
  
  togglar = ''; 
  constructor(
    private formbuilder: FormBuilder, 
    private nationalityservice: NationalityService,
    private genderservice: GenderService,
    private writerservice: WriterService,


  ){

    this.Forms = formbuilder.group({
      id: [],
      name: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phone:['', [Validators.required]], 
      age: ['', [Validators.required]],
   

    })
  }

  ngOnInit(): void {
    this.loadWriters()
    this.loadGender()
    this.loadWriters()
    this.loadNationality()
      
  }

  loadWriters(){
    this.writerservice.getWriters().subscribe(data => {
      this.writer = data;
      console.log(this.writer)
    })


  }


  loadGender(){
    this.genderservice.getGenders().subscribe(
      data => {
        this.gender = data;
        console.log(this.gender)
      }
    )

  }

  loadNationality(){
    this.nationalityservice.getNationalities().subscribe(
      data => {
        this.nationality = data;
        console.log(this.nationality)
      }
    )
    
  }

  comparewith(nationality1: nationality, nationality2: nationality): boolean{
    return nationality1 && nationality2 ? nationality1.id === nationality2.id: nationality1 === nationality2;

  }

  comparewith2(gender1: gender, gender2: gender): boolean{
    return gender1 && gender2? gender1.id === gender2.id: gender1 === gender2;

  }

  Message(item: string){
  
    this.state = item;
    this.message = true
            setTimeout(() => {
            this.message = false
            this.state = ''; 
      
      
          }, 3000);

  }

  check(){
    let array = [this.newName, this.newNationality, this.newGender, this.newPhone, this.newAge];
    array.forEach(element => {
      if(element == null || element == undefined || element == '') {
          this.Message('incomplete_form')
      }
    })
    if(this.state != 'incomplete_form'){
      
      this.writer.forEach(writer => {
        if(this.newName.toLowerCase().trim() == writer.name.toLowerCase().trim()) {
          this.Message('writer_exists')
          
        }
      })

      if(this.state !== 'writer_exists'){
        this.Message('added_writer')
            this.addWriter()
      }
    }
    
    
          //TODO create code blocks to check if all values from the form are valid and difrent from null or '' or undefined
  }

  addWriter(){
    this.writerservice.addWriter(this.Forms.value).subscribe({
            next: data => {
              this.writer.push(data);
              this.Forms.reset();
              this.Message('added_writer')
            
            }
          })
  }

  get genders(): any{
    return this.Forms.get('gender');

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
        this.newAge = this.selected.age;
        this.newNationality = this.selected.nationality;
        this.newGender = this.selected.gender;
        this.newPhone = this.selected.phone;

        console.log(this.selected)
         
        

      break; 
      case 'togglar4':
        this.selected = item


      break; 
      case 'togglar5':

        

        

        
       
        this.holder = this.selected.id; 
        this.selected = this.Forms.value; 

        

        this.selected.id = this.holder
        
        this.writer.forEach(data => {
            if(data.name.trim().toLowerCase() === this.selected.name.trim().toLowerCase()){
              this.Message('writer_exists')
            
            

            }
            else{
             

            }
          })
          if(this.state !== 'writer_exists' ){
            this.writerservice.updateWriter(this.selected).subscribe({ // search writer using id and update
              next: () => {
               
                this.loadWriters()
                this.Forms.reset()
                this.Message('update_success')
             
    
                
              }
    
            })
          }
        this.togglar = 'togglar2'
      break; 

      case 'togglar6':
        
        this.writerservice.deleteWriter(this.selected).subscribe({
          next: () => {
            const index = this.writer.indexOf(this.selected);
            this.writer.splice(index, 1);
            this.Forms.reset();
            this.Message('delete_success')
        

            

          }
        })
        this.togglar = 'togglar2'
      break;


     
      case '':
    

      break;
    }
  }

}
