import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-oauth-callback',
  templateUrl: './oauth-callback.page.html',
  styleUrls: ['./oauth-callback.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class OauthCallbackPage implements OnInit {
  private oidcSecurityService = inject(OidcSecurityService);

  async ngOnInit() {
    // This will redirect back to home
    const request = this.oidcSecurityService.checkAuth();
    const response = await lastValueFrom(request);

    if (response.errorMessage) {
      console.error(response);
      alert(response.errorMessage);
    } else {
      console.log(response);
      alert('SUCCESS:\n' + JSON.stringify(response, null, 2));
    }
  }
}
