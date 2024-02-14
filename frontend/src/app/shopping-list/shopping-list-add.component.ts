import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-list-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './shopping-list-add.component.html',
  styleUrl: './shopping-list-add.component.css',
})
export class ShoppingListAddComponent implements OnInit, OnChanges {
  @Input() addItemSelected: Ingredient = {} as Ingredient;
  @Output() cleared: EventEmitter<boolean> = new EventEmitter<boolean>();
  addMode: boolean = true;
  
  constructor(private listService: ShoppingListService) {}

  hasItemSelected(): boolean {
    return typeof(this.addItemSelected.name) !== 'undefined'
  }
  onSubmit(form: NgForm){
    const { value: { itemName: name, itemAmount: amount } } = form;
    const updateItem = new Ingredient( name, amount );
    if( this.addMode ) {
      this.listService.addOne(updateItem);
    } else {
      this.listService.updateOne(this.addItemSelected, updateItem);
    }
    this.onReset(form);
  }
  onReset(form: NgForm){
    form.resetForm();
    this.addItemSelected = {} as Ingredient;
    this.addMode = true;
    this.cleared.emit(true);
  }
  onDelete(form: NgForm){
    if(this.hasItemSelected()){
      this.listService.deleteOne(this.addItemSelected);
      this.onReset(form);
    }
  }

  ngOnInit(): void {
    this.addItemSelected = {} as Ingredient;
    this.addMode = true;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(typeof(changes['addItemSelected'].currentValue.name) === 'undefined'){
      this.addItemSelected = {} as Ingredient;
      this.addMode = true;
    } else {
      this.addMode = false;
    }
  }
}
