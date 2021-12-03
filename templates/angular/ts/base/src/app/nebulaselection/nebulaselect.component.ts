import { Component, Input, OnInit } from "@angular/core";
import type { NebulaChart } from "../types";

@Component({
  selector: "nebulaselection",
  templateUrl: "./nebulaselect.component.html",
  styleUrls: [],
})
export class NebulaSelectionComponent implements OnInit {
  @Input() nebula: NebulaChart;
  @Input() app: EngineAPI.IApp;

  constructor() {}

  viz = {
    type: "selections",
  };

  ngOnInit(): void {}
}
