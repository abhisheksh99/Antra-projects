// import { HighlightDirective } from './highlight.directive';
// import { ElementRef,Renderer2 } from '@angular/core';

// describe('HighlightDirective', () => {
//   it('should create an instance', () => {
//     const directive = new HighlightDirective();
//     expect(directive).toBeTruthy();
//   });
// });
import { HighlightDirective } from './highlight.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('HighlightDirective', () => {
  let mockElementRef: ElementRef;
  let mockRenderer: Renderer2;

  beforeEach(() => {
    mockElementRef = new ElementRef(document.createElement('div'));
    mockRenderer = jasmine.createSpyObj('Renderer2', ['setStyle', 'removeStyle']);
  });

  it('should create an instance', () => {
    const directive = new HighlightDirective(mockElementRef, mockRenderer);
    expect(directive).toBeTruthy();
  });
});
