import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import {
  AbstractSecurityStorage,
  AuthModule,
  LogLevel,
} from 'angular-auth-oidc-client';
import { MyStorageService } from 'src/storage-service.module';

// const SCOPE = 'openid';
const SCOPE = 'openid profile email';

// const oidcHost = 'https://closest-rehab-employ-pda.trycloudflare.com';
// const redirectHost = 'https://pierre-wagner-advances-pendant.trycloudflare.com';
// const unidyClientID = 'o0FoMPAcHS5JiP8lQQ__0yeWCZqiEpRcBxiTHRLB5qo';

// ----------------------------------------------

// TESTING STAGE
// const oidcHost = 'https://btc-echo.staging.unidy.de';
// const redirectHost = 'https://btc-echo-api-dev-mcb.vercel.app';
// const unidyClientID = 'OXpanIyzqOu4po_UmUgRNtCrQnUkwjmIB9GDsu9bsqs';

// TESTING PROD
// const oidcHost = 'https://btc-echo.unidy.de';
// const oidcHost = 'https://account.btc-echo.de';
// const redirectHost =
//   'https://regardless-melissa-behalf-henderson.trycloudflare.com';
// const unidyClientID = 'Zqw5QDa_6xD9llHEIsrY9VmNJfEfhumRyAwOjTQ0zbk';

const oidcHost = 'https://btc-echo.staging.unidy.de';
const redirectHost = 'https://pierre-wagner-advances-pendant.trycloudflare.com';
const unidyClientID = 'OXpanIyzqOu4po_UmUgRNtCrQnUkwjmIB9GDsu9bsqs';

// const oidcHost = 'https://headset-tions-poultry-hp.trycloudflare.com';
// const redirectHost = 'https://setting-baths-cycle-hometown.trycloudflare.com';
// const unidyClientID = 'MWKJM2t3nkdkqqQXFYgsmWcNzmcF2OBhHUoHWxXNTyk';

export { oidcHost, redirectHost, unidyClientID };

/**
 * `angular-auth-oidc-client` is an Angular library for implementing OpenID Connect & OAuth2 in Angular
 * applications. It provides support for token refresh, all modern OIDC Identity Providers, and more.
 * The library is certified by the OpenID Foundation and implements OIDC validation as specified for required features.
 *
 * @see https://github.com/damienbod/angular-auth-oidc-client
 * @see https://angular-auth-oidc-client.com/docs/intro
 */

@NgModule({
  declarations: [],
  imports: [
    AuthModule.forRoot({
      config: {
        authority: oidcHost + '/oauth/authorize',
        redirectUrl: redirectHost + '/oauth/callback',
        postLogoutRedirectUri: redirectHost + '/oauth/callback',
        clientId: unidyClientID,
        scope: SCOPE,
        responseType: 'code',
        useRefreshToken: true,
        silentRenew: true,
        triggerRefreshWhenIdTokenExpired: true,
        allowUnsafeReuseRefreshToken: true,
        autoUserInfo: false,
        postLoginRoute: '/home',
        forbiddenRoute: '/home',
        unauthorizedRoute: '/home',
        logLevel: LogLevel.Debug,
        authWellknownEndpoints: {
          issuer: oidcHost,
          authorizationEndpoint: oidcHost + '/oauth/authorize',
          tokenEndpoint: oidcHost + '/oauth/token',
          revocationEndpoint: oidcHost + '/oauth/revoke',
          introspectionEndpoint: oidcHost + '/oauth/introspect',
          userInfoEndpoint: oidcHost + '/oauth/userinfo',
          jwksUri: oidcHost + '/oauth/discovery/keys',
          endSessionEndpoint: oidcHost + '/oauth/logout',
        },
        authWellknownEndpointUrl:
          oidcHost + '/.well-known/openid-configuration',
      },
    }),
    CommonModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [{ provide: AbstractSecurityStorage, useClass: MyStorageService }],
  exports: [AuthModule],
})
export class AuthConfigModule {}
