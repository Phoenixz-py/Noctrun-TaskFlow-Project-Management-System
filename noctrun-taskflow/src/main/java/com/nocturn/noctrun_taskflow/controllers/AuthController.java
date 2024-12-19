//package com.nocturn.noctrun_taskflow.controllers;
//
//import com.nocturn.noctrun_taskflow.models.LoginRequest;
//import com.nocturn.noctrun_taskflow.security.JwtTokenProvider;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class AuthController {
//
//    private final JwtTokenProvider tokenProvider;
//    private final AuthenticationManager authenticationManager;
//
//    @Autowired
//    public AuthController(JwtTokenProvider tokenProvider, AuthenticationManager authenticationManager) {
//        this.tokenProvider = tokenProvider;
//        this.authenticationManager = authenticationManager;
//    }
//
//    @PostMapping("/api/auth/login")
//    public ResponseEntity<String> authenticateUser(@RequestBody LoginRequest loginRequest) {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        loginRequest.getUsername(),
//                        loginRequest.getPassword()
//                )
//        );
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        String token = tokenProvider.generateToken(authentication.getName());
//
//        return ResponseEntity.ok(token);
//    }
//}

package com.nocturn.noctrun_taskflow.controllers;

import com.nocturn.noctrun_taskflow.models.JwtResponse;
import com.nocturn.noctrun_taskflow.models.LoginRequest;
import com.nocturn.noctrun_taskflow.security.JwtTokenProvider;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthController(JwtTokenProvider tokenProvider, AuthenticationManager authenticationManager) {
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
    }


    @PostMapping("/api/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Log incoming request
            System.out.println("Attempting login for: " + loginRequest.getUsername());

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            System.out.println("Authentication successful for: " + loginRequest.getUsername());

            String token = tokenProvider.generateToken(authentication);

            // Return token in structured response
            return ResponseEntity.ok(new JwtResponse("Bearer " + token));  // Returning JwtResponse object
        } catch (Exception e) {
            System.out.println("Login failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Login failed");
        }
    }


}

