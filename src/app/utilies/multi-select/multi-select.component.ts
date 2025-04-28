import { Component, ElementRef, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { Chapter } from './../../interface/chapter';


@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})

export class MultiSelectComponent {

  @Input() items: Chapter[];
  @Output() selectionChange = new EventEmitter<Chapter[]>();

  private elementRef = inject(ElementRef)
  isDropdownVisible = false
  filteredItems: Chapter[] = []


  ngOnInit() {
    this.filteredItems = this.items
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownVisible = false
    }
  }

  findSelecteditems(seletecItems: any[]): any[] {
    return seletecItems.filter(si => si.Selected);
  }


  filterItems(event: Event) {
    const searchItem = (event.target as HTMLInputElement).value.toLocaleLowerCase();
    this.filteredItems = this.items.filter(item => item.name.toLowerCase().includes(searchItem))
  }

  toggleItem(item: Chapter, event: MouseEvent) {
    event.stopPropagation()
    item.Selected = !item.Selected
    this.selectionChange.emit(this.items.filter(i => i.Selected))
  }

  removeItem(item: Chapter, event: MouseEvent) {
    event.stopPropagation()
    item.Selected = false
    this.selectionChange.emit(this.items.filter(i => i.Selected))
  }

  showDropdown() {
    this.isDropdownVisible = true
  }
}