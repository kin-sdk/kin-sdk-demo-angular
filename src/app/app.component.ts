// tslint:disable:no-non-null-assertion
import { Component } from '@angular/core'
import { createWallet, KinClient, KinTest, Wallet } from '@kin-sdk/client'

const client = new KinClient(KinTest)

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
      <pre>{{ result1 }}</pre>
      <button (click)="getBalances()">Get Balances</button>
      <pre>{{ result2 }}</pre>
      <button (click)="requestAirdrop()">Request Airdrop</button>
      <pre>{{ result3 }}</pre>
      <button (click)="submitPayment()">Submit Payment</button>
      <pre>{{ result4 }}</pre>
    </ng-container>
  `,
})
export class AppComponent {
  created = false
  wallet?: Wallet
  result1?: string
  result2?: string
  result3?: string
  result4?: string

  generateKeyPair(): void {
    this.wallet = createWallet('create')
  }

  async createAccount(): Promise<void> {
    this.result1 = 'createAccount'
    const [res, err] = await client.createAccount(this.wallet?.secret!)
    if (err) {
      this.result1 = JSON.stringify(err)
    } else {
      this.result1 = JSON.stringify(res)
      this.created = true
    }
  }

  async getBalances(): Promise<void> {
    this.result2 = 'getBalances'
    const [res, err] = await client.getBalances(this.wallet?.publicKey!)
    if (err) {
      this.result2 = JSON.stringify(err)
    } else {
      this.result2 = JSON.stringify(res)
    }
  }

  async requestAirdrop(): Promise<void> {
    this.result3 = 'requestAirdrop'
    const [res, err] = await client.requestAirdrop(this.wallet?.publicKey!, '1000')
    if (err) {
      this.result3 = JSON.stringify(err)
    } else {
      this.result3 = JSON.stringify(res)
      await this.getBalances()
    }
  }

  async submitPayment(): Promise<void> {
    this.result4 = 'submitPayment'
    const [res, err] = await client.submitPayment({
      secret: this.wallet?.secret!,
      tokenAccount: this.wallet?.publicKey!,
      amount: '1',
      destination: 'Don8L4DTVrUrRAcVTsFoCRqei5Mokde3CV3K9Ut4nAGZ',
    })
    if (err) {
      this.result4 = JSON.stringify(err)
    } else {
      this.result4 = JSON.stringify(res)
      await this.getBalances()
    }
  }
}
