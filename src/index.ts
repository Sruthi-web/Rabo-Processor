import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/components/app.module";

if (process.env.NODE_ENV === "production") {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
