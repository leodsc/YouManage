import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenInterceptorService } from 'src/app/services/token-interceptor.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private cd: ChangeDetectorRef, private router: Router) {}

  menuOpen: boolean = false;
  resolution: number = environment.resolution;
  totalEmployees?: number;
  showModal: boolean = false;

  ngOnInit(): void {
    if (environment.token === '') {
      this.router.navigate(['/'], {
        queryParams: { error: 'authentication' },
      });
    }
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  receiveTotalEmployees($event: any) {
    this.totalEmployees = $event;
  }

  toggleSearch() {
    this.menuOpen = !this.menuOpen;
  }

  receiveModal(message: string) {
    // this.changeMessage(message);
    this.showModal = false;
  }

  modal() {
    this.showModal = true;
  }

  logout() {
    this.router.navigate(['/'], { queryParams: { info: 'logout' } });
  }
}
