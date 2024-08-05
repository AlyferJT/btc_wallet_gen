const BTC = true // Set True to use the main BTC network - Set False for testnet

const bip32 = require("bip32")
const bip39 = require("bip39")
const bitcoin = require("bitcoinjs-lib")

const network = BTC ? bitcoin.networks.bitcoin : bitcoin.networks.testnet

const path = BTC ? `m/49'/0'/0'/0` : `m/49'/1'/0'/0`

let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

let root = bip32.fromSeed(seed, network)

let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

const btcAccountInfo = {
    "Wallet_Type": BTC ? "Main BTC Network" : "Testnet",
    "Address": btcAddress,
    "Private_Key": node.toWIF(),
    "Seed": mnemonic
}

console.log('########################')
console.log(btcAccountInfo)
console.log('########################')
