package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.*;

import java.util.List;

public interface UserService {

	FullUserDto login(CredentialsDto credentialsDto);

    FullUserDto getUserById(Long id);

    FullUserDto updateUserProfile(Long userId, UserRequestDto userRequestDto);

    List<FullUserDto> getAllUsers();

    FullUserDto createUser(Long id, CredentialsDto credentials, ProfileDto profile, boolean admin);

    void deleteUser(Long userIdToDelete);
}
