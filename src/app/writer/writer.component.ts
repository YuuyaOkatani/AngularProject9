import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { nationality } from '../nationality';
import { gender } from '../gender';
import { writer } from '../writer';
import { WriterService } from '../service/writer.service';

import { NationalityService } from '../service/nationality.service';

import { GenderService } from '../service/gender.service';


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
  selected: any ;
  newName: String = ''; 
  newNationality: nationality[] = [];
  newGender: gender[] = [];
  newPhone = '';
  newAge = '';
  
  togglar = ''; 
  constructor(
    private formbuilder: FormBuilder, 
    private nationalityservice: NationalityService,
    private genderservice: GenderService,
    private writerservice: WriterService,


  ){

    this.Forms = formbuilder.group({
      id: [''],
      name: [''],
      nationality: [''],
      gender: [],
      phone:[], 
      age: [''],
   

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

  get genders(): any{
    return this.Forms.get('gender');

  }

  Activate(response: string, item?: any){
    this.togglar = response
    console.log(response)
    switch(response){

      case 'togglar1':
        this.writerservice.addWriter(this.Forms.value).subscribe({
          next: data => {
            this.writer.push(data);
            this.Forms.reset();
          }
        })
        
      break; 
      case 'togglar2':
        
   
        

      break; 
      case 'togglar3':
        this.selected = item 

        console.log(this.selected)
         
        

      break; 
      case 'togglar4':


      break; 
      case 'togglar5':
        item.name = this.newName
        
        console.log(item)
        this.writerservice.updateWriter(this.selected).subscribe({
          next: () => {
            this.newName = ''
            this.newAge = ''
            this.newPhone = ''
            this.newNationality = []
            this.newGender = []
            this.loadWriters()

            
          }

        })
      break; 
      case '':
    

      break;
    }
  }

}
