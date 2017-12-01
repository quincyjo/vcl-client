import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { ListEditorComponent, ListEditorButton } from './list-editor.component';

describe('ListEditorComponent', () => {
  let component: ListEditorComponent;
  let fixture: ComponentFixture<ListEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListEditorComponent
      ],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have a getter for form validity',  () => {
    expect(component.valid).toEqual(component.addForm.valid);
  });

  it('should be resetable', () => {
    component.reset();
    expect(component.addForm.get('add').value).toBeFalsy();
  });

  it('should emit on remove', () => {
    let spy = spyOn(component.removeItem, 'emit').and.stub();
    component.remove(undefined);
    expect(spy).toHaveBeenCalled();
  });

  it('should emit on click', () => {
    let spy = spyOn(component.itemClicked, 'emit').and.stub();
    component.click(undefined);
    expect(spy).toHaveBeenCalled();
  });

  it('should emit on button clicked', () => {
    let spy = spyOn(component.buttonClicked, 'emit').and.stub();
    component.onButtonClicked(undefined);
    expect(spy).toHaveBeenCalled();
  });

  it('should emit on add submit', () => {
    let spy = spyOn(component.addItem, 'emit').and.stub();
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });
});

describe('ListEditorButton', () => {
  let button: ListEditorButton;

  it('should be created with just a label', () => {
    button = new ListEditorButton('A Label');
    expect(button).toBeDefined();
    expect(button.label).toEqual('A Label');
    expect(button.event).toEqual('a_label');
  });

  it('should be created with a label and an event', () => {
    button = new ListEditorButton('A Label', 'event');
    expect(button).toBeDefined();
    expect(button.label).toEqual('A Label');
    expect(button.event).toEqual('event');
  });
});
