import { Component, OnInit, ElementRef, Input } from "@angular/core";
import { fields } from "../data.sample";
import type { NebulaChart, NebulaRender } from "../types";

@Component({
  selector: "nebula",
  template: ``,
  styles: [],
})
export class NebulaComponent implements OnInit {
  @Input() nebula: NebulaChart;
  @Input() type: string;
  @Input() properties: object;

  private renderNebbie: NebulaRender;

  constructor(private elementRef: ElementRef) {}

  init = async () => {
    const { nebula, type, properties } = this;

    if (type === "selections") {
      (await nebula.selections()).mount(this.elementRef.nativeElement);
    } else {
      console.log({ nebula, type, properties, fields });
      this.renderNebbie = nebula.render({
        element: this.elementRef.nativeElement,
        type,
        fields,
        properties,
      });
    }
  };

  ngOnInit() {
    this.init();
  }
  ngOnDestroy() {
    this.renderNebbie.destroy();
  }
}
