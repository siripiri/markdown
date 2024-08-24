import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Parser } from './Parser/Parser';

@Component({
  selector: 'app-siripiri-markdown',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './siripiri-markdown.component.html',
  styleUrl: './siripiri-markdown.component.css',
})
export class SiripiriMarkdownComponent implements OnChanges {
  @Input()
  public markdownValue: string | undefined;

  public tokenDisplay: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['markdownValue'])
      this.onMarkdownChange();
  }

  onMarkdownChange() {
    if (this.markdownValue === undefined)
      return;
    let parser = new Parser(this.markdownValue);
  }

  tokenizationBuilder() {
    
  }
}
