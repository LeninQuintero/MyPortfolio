package com.backendspringboot.portfolio.controller;import static com.backendspringboot.portfolio.commons.Constants.FRONTEND_URL;import com.backendspringboot.portfolio.security.enums.entity.UserCredentials;import com.backendspringboot.portfolio.security.service.UserCredentialsService;import java.util.List;import org.springframework.beans.factory.annotation.Autowired;import org.springframework.web.bind.annotation.CrossOrigin;import org.springframework.web.bind.annotation.DeleteMapping;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.PathVariable;import org.springframework.web.bind.annotation.PutMapping;import org.springframework.web.bind.annotation.RequestBody;import org.springframework.web.bind.annotation.RequestParam;import org.springframework.web.bind.annotation.ResponseBody;import org.springframework.web.bind.annotation.RestController;@CrossOrigin(FRONTEND_URL)@RestControllerpublic class UserCredentialsController {    @Autowired    private UserCredentialsService userCredentialsServ;    @GetMapping("/user-list")    @ResponseBody    public List<UserCredentials> userList() {        return userCredentialsServ.userCredentialList();    }    @GetMapping("/find-user/{id}")    @ResponseBody    public UserCredentials userFind(@PathVariable Long id) {        return userCredentialsServ.userCredentialFindId(id);    }        @GetMapping("/find-username")    @ResponseBody    public UserCredentials userFind(@RequestParam String username) {        return userCredentialsServ.findByUsername(username).orElse(null);    }     @DeleteMapping("/delete-user/{id}")    public void userDelete(@PathVariable Long id) {        userCredentialsServ.userCredentialDelete(id);    }        @PutMapping("/edit-user")    @ResponseBody    public UserCredentials userEdit(@RequestBody UserCredentials user) {        return userCredentialsServ.userCredentialEdit(user);    }}