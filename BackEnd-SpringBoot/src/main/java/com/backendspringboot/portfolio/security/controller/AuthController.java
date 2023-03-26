package com.backendspringboot.portfolio.security.controller;

import static com.backendspringboot.portfolio.commons.Constants.FRONTEND_URL;
import com.backendspringboot.portfolio.model.UserProfile;
import com.backendspringboot.portfolio.security.dto.JwtDto;
import com.backendspringboot.portfolio.security.dto.LoginUser;
import com.backendspringboot.portfolio.security.dto.NewUser;
import com.backendspringboot.portfolio.security.enums.RoleName;
import com.backendspringboot.portfolio.security.enums.entity.Role;
import com.backendspringboot.portfolio.security.enums.entity.UserCredentials;
import com.backendspringboot.portfolio.security.jwt.JwtProvider;
import com.backendspringboot.portfolio.security.service.RoleService;
import com.backendspringboot.portfolio.security.service.UserCredentialsService;
import com.backendspringboot.portfolio.service.UserProfileService;
import java.util.HashSet;
import java.util.Set;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@CrossOrigin(FRONTEND_URL)
public class AuthController {

    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserCredentialsService userService;
    @Autowired
    RoleService roleService;
    @Autowired
    JwtProvider jwtProvider;
    @Autowired
    public UserProfileService userProfileServ;

    @PostMapping("/new-user")
    public UserProfile newUser(@Valid @RequestBody NewUser newUser, BindingResult bindingResult) {

        UserCredentials user = new UserCredentials(newUser.getUserName(), passwordEncoder.encode(newUser.getPassword()));

        Set<Role> roles = new HashSet<>();
        roles.add(roleService.getbyRoleName(RoleName.ROLE_USER).get());

        user.setRoles(roles);

        userService.save(user);
        
        if (user.getId() == 1) {
            roles.add(roleService.getbyRoleName(RoleName.ROLE_ADMIN).get());
            user.setRoles(roles);
        }

        UserProfile userProfile = new UserProfile(
                user.getId(),
                user.getUserName(),
                "Titulo del Portafolio",
                "https://firebasestorage.googleapis.com/v0/b/ap-deploy-frontend-angular.appspot.com/o/defaultFiles%2Ffoto-perfil.jpg?alt=media&token=6d315045-d26d-4610-9dd3-bef0a7ef5d60",
                "https://firebasestorage.googleapis.com/v0/b/ap-deploy-frontend-angular.appspot.com/o/defaultFiles%2Fbanner-mobile.jpg?alt=media&token=db5c877f-5b4b-4708-a1d6-d116304492e7",
                "https://firebasestorage.googleapis.com/v0/b/ap-deploy-frontend-angular.appspot.com/o/defaultFiles%2Fbanner-desktop.jpg?alt=media&token=49698c92-bd42-4eed-a77f-014850de2361",
                "Descripción del perfil del usuario",
                "https://github.com/#",
                "https://twitter.com/#",
                "https://www.linkedin.com/#",
                FRONTEND_URL + "/" + user.getUserName(),
                user);

        userProfileServ.profileCreate(userProfile);

        user.setUserProfile(userProfile);

        return userProfileServ.profileFind(userProfile.getId());

    }

    @PostMapping("/login")
    public ResponseEntity<JwtDto> login(@Valid @RequestBody LoginUser loginUsuario, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return new ResponseEntity(new ServerMessage("Campos mal puestos"), HttpStatus.BAD_REQUEST);
        }

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginUsuario.getUserName(), loginUsuario.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateToken(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        JwtDto jwtDto = new JwtDto(jwt, userDetails.getUsername(), userDetails.getAuthorities());

        return new ResponseEntity(jwtDto, HttpStatus.OK);
    }
}
