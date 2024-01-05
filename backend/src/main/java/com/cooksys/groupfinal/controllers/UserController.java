package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.UserRequestDto;
import org.springframework.web.bind.annotation.*;
import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.services.UserService;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    @CrossOrigin(origins = "*")
    public FullUserDto login(@RequestBody CredentialsDto credentialsDto) {
        return userService.login(credentialsDto);
    }

    @GetMapping("/{id}")
    public FullUserDto getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PatchMapping("/{userId}")
    public FullUserDto updateUserProfile(@PathVariable Long userId, @RequestBody UserRequestDto userRequestDto) {
        return userService.updateUserProfile(userId, userRequestDto);
    }

    @GetMapping("/users")
    public List<FullUserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    //Potentially move to CompanyController
    @PostMapping()
    public FullUserDto createUser(@RequestBody UserRequestDto userRequestDto) {
        return userService.createUser(userRequestDto.getCredentials(), userRequestDto.getProfile(), userRequestDto.isAdmin());
    }

    @DeleteMapping("/users/delete/{userId}")
    public void deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
    }
}
