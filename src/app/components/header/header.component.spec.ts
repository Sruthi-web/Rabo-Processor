import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { HeaderComponent } from "./header.component";
import { CommonModule } from '@angular/common';

describe("Component: HomeComponent", () => {
    let fixture: ComponentFixture<HeaderComponent>;
    let component: HeaderComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [HeaderComponent],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(HeaderComponent);
            component = fixture.componentInstance;
        });
    }));
    it("should be defined ", async(() => {
        expect(component).toBeTruthy();
    }))
    it("should have title as 'Rabobank Customer Statement Processor'",async(() => {
        expect(component.title).toEqual('Rabobank Customer Statement Processor');
    }));
});