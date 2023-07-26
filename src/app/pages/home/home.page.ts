import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { oidcHost, redirectHost, unidyClientID } from 'src/auth-config.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage {
  private oidcSecurityService = inject(OidcSecurityService);

  data = JSON.stringify({ oidcHost, redirectHost, unidyClientID }, null, 2);

  ngOnInit() {
    // window.sessionStorage.clear();
  }

  login() {
    this.oidcSecurityService.authorize();
  }
}
