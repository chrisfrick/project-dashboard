package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.ProfileDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;

import java.util.List;

public interface UserService {

	FullUserDto login(CredentialsDto credentialsDto);


    FullUserDto getUserById(Long id);

    FullUserDto updateUserProfile(Long userId, UserRequestDto userRequestDto);

    List<FullUserDto> getAllUsers();

    FullUserDto createUser(CredentialsDto credentials, ProfileDto profile);

    void deleteUser(Long userIdToDelete, CredentialsDto adminCredentials);
}
