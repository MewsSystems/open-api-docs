# Webhook security

Each webhook request includes an `X-Signature` header, which contains an HMAC SHA-256 signature to verify the authenticity of the webhook.

## **How to verify the signature**

### **Basic verification**

1. Retrieve the `X-Signature` header from the request.
2. Compute an HMAC SHA-256 hash using your secret key and the raw request body.
3. Encode the result in Base64.
4. Compare your computed signature with the received `X-Signature`. If they match, the request is valid.

Example verification in **Ruby**:

```ruby
require 'openssl'
require 'base64'

def verify_signature(secret, payload, received_signature)
  computed_signature = OpenSSL::HMAC.digest('sha256', secret, payload)
  computed_signature_base64 = Base64.strict_encode64(computed_signature)
  
  return computed_signature_base64 == received_signature
end
```

### **Secure byte-by-byte comparison**

A more secure way to verify the signature is by using a constant-time comparison to prevent timing attacks.

Example in **Ruby**:

```ruby
require 'openssl'
require 'base64'

def secure_verify_signature(secret, payload, received_signature)
  computed_signature = OpenSSL::HMAC.digest('sha256', secret, payload)
  
  # Securely compare the signatures byte by byte
  Rack::Utils.secure_compare(Base64.strict_encode64(computed_signature), received_signature)
end
```

> **Why is this method more secure?**
> - `secure_compare` ensures that the comparison takes constant time, mitigating timing attacks.
> - It prevents potential vulnerabilities, where an attacker could infer the secret key by measuring response times.

Clients may choose either verification method, but the byte-by-byte comparison is recommended for higher security.
