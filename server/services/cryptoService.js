const crypto = require('crypto');

let publicKey = null;
let privateKey = null;

function generateKeyPair() {

  const keys = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,

    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },

    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });

  publicKey = keys.publicKey;
  privateKey = keys.privateKey;

  console.log('RSA keypair generated');
}

function encrypt(paymentInstruction) {

  const payload = JSON.stringify(paymentInstruction);

  const aesKey = crypto.randomBytes(32);

  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv(
    'aes-256-gcm',
    aesKey,
    iv
  );

  const encrypted = Buffer.concat([
    cipher.update(payload, 'utf8'),
    cipher.final()
  ]);

  const authTag = cipher.getAuthTag();

  const encryptedAesKey = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
    },
    aesKey
  );

  const combined = Buffer.concat([
    encryptedAesKey,
    iv,
    authTag,
    encrypted
  ]);

  return combined.toString('base64');
}

function decrypt(ciphertextBase64) {

  const combined = Buffer.from(
    ciphertextBase64,
    'base64'
  );

  const encryptedAesKey = combined.slice(0, 256);

  const iv = combined.slice(256, 268);

  const authTag = combined.slice(268, 284);

  const ciphertext = combined.slice(284);

  const aesKey = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
    },
    encryptedAesKey
  );

  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    aesKey,
    iv
  );

  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final()
  ]);

  return JSON.parse(
    decrypted.toString('utf8')
  );
}

module.exports = {
  generateKeyPair,
  encrypt,
  decrypt
};