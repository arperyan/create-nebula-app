import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { NebulaBarComponent } from "./nebulabar/nebulabar.component";
import { NebulaComponent } from "./nebula/nebula.component";
import { NebulaSelectionComponent } from "./nebulaselection/nebulaselect.component";
import { Spinner } from "./spinnner/spinner.component";
import { APP_BASE_HREF } from "@angular/common";

@NgModule({
    declarations: [AppComponent, NebulaBarComponent, NebulaSelectionComponent, NebulaComponent, Spinner],
    imports: [BrowserModule],
    providers: [
        {
            provide: APP_BASE_HREF,
            useValue: "/{{VP}}",
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
