import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { oidcHost, redirectHost, unidyClientID } from 'src/auth-config.module';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage implements OnInit {
  private oidcSecurityService = inject(OidcSecurityService);

  data = JSON.stringify({ oidcHost, redirectHost, unidyClientID }, null, 2);

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(async (loginResponse) => {
      console.log('so we subbed here', loginResponse);

      if (!loginResponse.isAuthenticated) {
        // const token = await lastValueFrom(
        //   this.oidcSecurityService.getRefreshToken(),
        // );
        // if (!token) {
        //   console.log('no token, so we login');
        //   return;
        // }

        await this.oidcSecurityService
          .forceRefreshSession()
          .forEach((x) => console.log('refetch thingy', x));
      }
    });

    lastValueFrom(this.oidcSecurityService.getAccessToken())
      .then((token) =>
        fetch(`${oidcHost}/oauth/userinfo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      )
      .then((res) => res.ok && res.json())
      .then((res) => {
        console.log('user info request to unidy', res);
      });
  }

  login() {
    // window.sessionStorage.clear();
    this.oidcSecurityService.authorize();
  }

  clear() {
    window.sessionStorage.clear();
  }

  async getData() {
    // await this.oidcSecurityService
    //   .forceRefreshSession()
    //   .forEach((x) => console.log('refetch thingy', x));

    // this.oidcSecurityService
    //   .getState()
    //   .subscribe((x) => console.log('state', x));

    this.oidcSecurityService
      .getAuthenticationResult()
      .subscribe((x) => console.log('auth result', x));

    // const res = await lastValueFrom(this.oidcSecurityService.getUserData());
    // console.log(res);
  }
}
