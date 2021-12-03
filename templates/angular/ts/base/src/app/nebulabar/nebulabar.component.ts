import { Component, Input, OnInit } from "@angular/core";
import type { NebulaChart } from "../types";

@Component({
  selector: "nebulabar",
  templateUrl: "./nebulabar.component.html",
  styleUrls: ["./nebulabar.component.css"],
})
export class NebulaBarComponent implements OnInit {
  @Input() nebula: NebulaChart;
  @Input() app: EngineAPI.IApp;

  constructor() {}

  viz = {
    type: "bar",
    properties: {
      title: "Nebula",
    },
    style: {
      width: "100%",
      height: "600px",
      display: "flex",
      marginTop: "30px",
    },
  };

  ngOnInit(): void {}
}
