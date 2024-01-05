package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.*;

import java.util.List;

public interface UserService {

	FullUserDto login(CredentialsDto credentialsDto);

    FullUserDto getUserById(Long id);

    FullUserDto updateUserProfile(Long userId, UserRequestDto userRequestDto);

    List<FullUserDto> getAllUsers();

    FullUserDto createUser(CredentialsDto credentials, ProfileDto profile, boolean admin, CompanyDto company);

    void deleteUser(Long userIdToDelete);
}
