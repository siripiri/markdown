import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HTMLBuilder } from './HTMLBuilder';
import { HeaderBuilderStrategy, HTMLBuilderStrategy } from './HTMLBuilderStrategy';

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
    let htmlBuilders: HTMLBuilder[] = this.buildHtml(lines);
    this.appendToParent(htmlBuilders);
  }

  buildHtml(lines: string[]): HTMLBuilder[] {
    let htmlBuilders: HTMLBuilder[] = [];
    const strategies: HTMLBuilderStrategy[] = [
      new HeaderBuilderStrategy()
    ];

    let i = 0;
    while(i < lines.length) {
      let lineProcessed = 1;

      for(const strategy of strategies) {
        if(strategy.match(lines, i)) {
          lineProcessed = strategy.build(lines, i, htmlBuilders);
          break;
        }
      }

      i += lineProcessed;
    }

    return htmlBuilders;
  }

  appendToParent(builders: HTMLBuilder[]): void {
    let parent = document.getElementById('output');
    if(parent != null) {
      parent.innerHTML = this.EMPTY_STRING;
      builders.forEach(builder => builder.appendTo(parent));
    }
  }
}
