package com.nocturn.noctrun_taskflow.security.jwt;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Base64;

public class SecretKeyGenerator {
    public static void main(String[] args) {
        String secretKey = Base64.getEncoder().encodeToString(Keys.secretKeyFor(SignatureAlgorithm.HS256).getEncoded());
        System.out.println("Generated Secret Key: " + secretKey);
        String hashedPassword = new BCryptPasswordEncoder().encode("securePassword123");
        System.out.println(hashedPassword);
    }
}
