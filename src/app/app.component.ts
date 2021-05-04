// tslint:disable:no-non-null-assertion
import { Component } from '@angular/core'
import { KinClient, KinProd, Wallet } from '@kin-sdk/client'

const client = new KinClient(KinProd)

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="!wallet">
      <button (click)="generateKeyPair()">Generate Key Pair</button>
    </ng-container>
    <ng-container *ngIf="wallet">
      <div>
        <code>{{ wallet.publicKey }}</code>
      </div>

      <ng-container *ngIf="!created">
        <button (click)="createAccount()">Create Account</button>
      </ng-container>
      <pre>{{ result1 | json }}</pre>
      <ng-container *ngIf="created">
        <button (click)="resolveTokenAccounts()">Resolve Token Accounts</button>
        <pre>{{ result2 | json }}</pre>
        <button (click)="submitPayment()">Submit Payment</button>
        <pre>{{ result3 | json }}</pre>
      </ng-container>
    </ng-container>
  `,
})
export class AppComponent {
  created = false
  wallet?: Wallet
  result1?: string
  result2?: string
  result3?: string

  generateKeyPair(): void {
    this.wallet = KinClient.createWallet('create', {})
  }

  async createAccount(): Promise<void> {
    this.result1 = 'createAccount'
    const [res, err] = await client.createAccount(this.wallet?.secret!)
    if (err) {
      this.result1 = err
    } else {
      this.result1 = res
      this.created = true
    }
  }

  async resolveTokenAccounts(): Promise<void> {
    this.result2 = 'resolveTokenAccounts'
    const [res, err] = await client.resolveTokenAccounts(this.wallet?.publicKey!)
    if (err) {
      this.result2 = err
    } else {
      this.result2 = JSON.stringify(res)
    }
  }

  async submitPayment(): Promise<void> {
    this.result3 = 'submitPayment'
    const [res, err] = await client.submitPayment({
      secret: this.wallet?.secret!,
      tokenAccount: this.wallet?.publicKey!,
      amount: '1',
      destination: 'Don8L4DTVrUrRAcVTsFoCRqei5Mokde3CV3K9Ut4nAGZ',
    })
    if (err) {
      this.result3 = err
    } else {
      this.result3 = res
    }
  }
}
