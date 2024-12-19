//package com.nocturn.noctrun_taskflow.security;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
//import javax.crypto.SecretKey;
//import java.util.Date;
//
//@Component
//public class JwtTokenProvider {
//
//    @Value("${jwt.secret}")
//    private String secretKey;
//
//    @Value("${jwt.expirationMs}")
//    private long expirationMs;
//
//    // Generate a SecretKey from the base64-encoded string
//    private SecretKey getSigningKey() {
//        return Keys.hmacShaKeyFor(secretKey.getBytes());
//    }
//
//    // Generate Token
//    public String generateToken(String username) {
//        return Jwts.builder()
//                .setSubject(username)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
//                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // Using HS256
//                .compact();
//    }
//
//    // Validate Token using parseSignedClaims()
//    public boolean validateToken(String token) {
//        try {
//            Jwts.parser()
//                    .setSigningKey(getSigningKey()) // Set the signing key
//                    .build() // Build the parser
//                    .parseSignedClaims(token); // Parse the signed JWT and validate it
//
//            return true; // If no exception occurs, the token is valid
//        } catch (Exception e) {
//            // Log the exception here if needed
//            return false; // If any error occurs, the token is invalid
//        }
//    }
//
//    // Get Username from Token using parseSignedClaims()
//    public String getUsernameFromToken(String token) {
//        try {
//            Claims claims = Jwts.parser() // Using parserBuilder() to build the parser
//                    .setSigningKey(getSigningKey()) // Set the signing key
//                    .build() // Build the parser
//                    .parseSignedClaims(token) // Parse the signed JWT
//                    .getBody(); // Extract the body of the JWT (claims)
//
//            return claims.getSubject(); // Extract username (subject) from the claims
//        } catch (Exception e) {
//            // Handle parsing error
//            return null; // Return null if token parsing fails
//        }
//    }
//}

package com.nocturn.noctrun_taskflow.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expirationMs}")
    private long expirationMs;

//    // Generate a SecretKey from the base64-encoded string
//    private SecretKey getSigningKey() {
//        return Keys.hmacShaKeyFor(secretKey.getBytes());
//    }
        private SecretKey getSigningKey() {
            byte[] decodedKey = Base64.getDecoder().decode(secretKey);
            return Keys.hmacShaKeyFor(decodedKey);
}


    // Generate Token from Authentication
    public String generateToken(Authentication authentication) {
        // Get the username and authorities from the authentication object
        String username = authentication.getName();
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        // Build and sign the JWT with additional claims (authorities)
        return Jwts.builder()
                .setSubject(username)
                .claim("roles", authorities)  // Add roles as custom claim
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Validate Token using parseSignedClaims()
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(getSigningKey()) // Set the signing key
                    .build() // Build the parser
                    .parseClaimsJws(token); // Parse and validate the JWT

            return true; // If no exception occurs, the token is valid
        } catch (Exception e) {
            // Log the exception if needed
            return false; // If any error occurs, the token is invalid
        }
    }

    // Get Username from Token using parseSignedClaims()
    public String getUsernameFromToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(getSigningKey()) // Set the signing key
                    .build() // Build the parser
                    .parseClaimsJws(token) // Parse the signed JWT
                    .getBody(); // Extract the body of the JWT (claims)

            return claims.getSubject(); // Return the username (subject) from the claims
        } catch (Exception e) {
            // Handle parsing error
            return null; // Return null if token parsing fails
        }
    }

    // Get roles from token (optional method for role-based access control)
    public String getRolesFromToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.get("roles", String.class); // Return roles stored as custom claim
        } catch (Exception e) {
            return null;
        }
    }
}
