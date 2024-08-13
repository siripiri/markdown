import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HTMLBuilder, ParagraphBuilder } from './HTMLBuilder';

@Component({
  selector: 'app-siripiri-markdown',
  standalone: true,
  imports: [],
  templateUrl: './siripiri-markdown.component.html',
  styleUrl: './siripiri-markdown.component.css',
})
export class SiripiriMarkdownComponent implements OnChanges {
  @Input()
  public markdownValue : string | undefined;

  private NEW_LINE : string = '\n';
  private EMPTY_STRING: string = ' ';

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['markdownValue'])
        this.onMarkdownChange();
  }

  onMarkdownChange() {
    if(this.markdownValue === undefined)
      return;
    let lines: string[] = this.markdownValue?.split(this.NEW_LINE);
    let htmlBuilders: HTMLBuilder[] = [];
    this.appendToParent(htmlBuilders);
  }

  appendToParent(builders: HTMLBuilder[]): void {
    let parent = document.getElementById('output');
    if(parent != null) {
      parent.innerHTML = this.EMPTY_STRING;
      builders.forEach(builder => builder.appendTo(parent));
    }
  }
  
}
