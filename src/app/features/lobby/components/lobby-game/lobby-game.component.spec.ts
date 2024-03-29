import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyGameComponent } from './lobby-game.component';

describe('LobbyGameComponent', () => {
  let component: LobbyGameComponent;
  let fixture: ComponentFixture<LobbyGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LobbyGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LobbyGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
