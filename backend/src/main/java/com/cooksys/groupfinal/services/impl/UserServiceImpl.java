package com.cooksys.groupfinal.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.cooksys.groupfinal.dtos.ProfileDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.embeddables.Profile;
import com.cooksys.groupfinal.mappers.ProfileMapper;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.embeddables.Credentials;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
  private final FullUserMapper fullUserMapper;
	private final CredentialsMapper credentialsMapper;
    private final ProfileMapper profileMapper;

	private User findUser(String username) {
        Optional<User> user = userRepository.findByCredentialsUsernameAndActiveTrue(username);
        if (user.isEmpty()) {
            throw new NotFoundException("The username provided does not belong to an active user.");
        }
        return user.get();
    }
	
	@Override
	public FullUserDto login(CredentialsDto credentialsDto) {
		if (credentialsDto == null || credentialsDto.getUsername() == null || credentialsDto.getPassword() == null) {
            throw new BadRequestException("A username and password are required.");
        }
        Credentials credentialsToValidate = credentialsMapper.dtoToEntity(credentialsDto);
        User userToValidate = findUser(credentialsDto.getUsername());
        if (!userToValidate.getCredentials().equals(credentialsToValidate)) {
            throw new NotAuthorizedException("The provided credentials are invalid.");
        }
        if (userToValidate.getStatus().equals("PENDING")) {
        	userToValidate.setStatus("JOINED");
        	userRepository.saveAndFlush(userToValidate);
        }
        return fullUserMapper.entityToFullUserDto(userToValidate);
	}

    @Override
    public FullUserDto getUserById(Long id) {
        User user = userRepository.findUserByIdAndDeletedIsFalse(id)
                .orElseThrow(() -> new NotFoundException("User not found."));
        return fullUserMapper.entityToFullUserDto(user);
    }

    @Override
    public FullUserDto updateUserProfile(Long userId, UserRequestDto userRequestDto) {
        if (userId == null || userRequestDto == null) {
            throw new BadRequestException("Username and request body must be supplied");
        }

        User existingUser = userRepository.findUserByIdAndDeletedIsFalse(userId)
                .orElseThrow(() -> new NotFoundException("No one exists with username: " + userId));

        if (existingUser.isDeleted()) {
            throw new NotFoundException("User with username " + userId + " is deleted");
        }

        Profile profileToUpdate = existingUser.getProfile();
        ProfileDto updatedProfileDto = userRequestDto.getProfile();

        if (updatedProfileDto != null) {
            if (updatedProfileDto.getFirstName() != null) {
                profileToUpdate.setFirstName(updatedProfileDto.getFirstName());
            }
            if (updatedProfileDto.getLastName() != null) {
                profileToUpdate.setLastName(updatedProfileDto.getLastName());
            }
            if (updatedProfileDto.getEmail() != null) {
                profileToUpdate.setEmail(updatedProfileDto.getEmail());
            }
            if (updatedProfileDto.getPhone() != null) {
                profileToUpdate.setPhone(updatedProfileDto.getPhone());
            }
        }

        return fullUserMapper.entityToFullUserDto(userRepository.saveAndFlush(existingUser));
    }

    @Override
    public List<FullUserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(fullUserMapper::entityToFullUserDto)
                .collect(Collectors.toList());
    }


    @Override
    public FullUserDto createUser(CredentialsDto credentials, ProfileDto profile) {

        if (credentials == null || profile == null) {
            throw new BadRequestException("Credentials and Profile are required.");
        }

        String desiredUsername = credentials.getUsername();
        String password = credentials.getPassword();
        String email = profile.getEmail();
        String phone = profile.getPhone();
        if (desiredUsername == null || password == null || email == null || phone == null) {
            throw new BadRequestException("Username, password, email and phone are required.");
        }
        Optional<User> possibleUser = userRepository.findByCredentialsUsernameAndActiveTrue(desiredUsername);
        if (possibleUser.isEmpty()) {
            User newUser = new User();
            newUser.setCredentials(credentialsMapper.dtoToEntity(credentials));
            newUser.setProfile(profileMapper.dtoToEntity(profile));
            User savedUser = userRepository.saveAndFlush(newUser);
            return fullUserMapper.entityToFullUserDto(savedUser);
        }

        if (possibleUser.get().isDeleted()) {
            possibleUser.get().setDeleted(false);
            User savedUser = userRepository.saveAndFlush(possibleUser.get());
            return fullUserMapper.entityToFullUserDto(savedUser);
        }
        //User exists and is not deleted.
        throw new BadRequestException("Username already taken.");
    }


    @Override
    public void deleteUser(Long userIdToDelete, CredentialsDto adminCredentials) {
        if (userIdToDelete == null || adminCredentials == null) {
            throw new BadRequestException("User ID to delete and admin credentials are required.");
        }
//
//        User adminUser = userRepository.findByCredentialsUsernameAndActiveTrue(adminCredentials.getUsername())
//                .orElseThrow(() -> new NotFoundException("Admin user not found."));
//
//        if (!adminUser.isAdmin()) {
//            throw new NotAuthorizedException("Invalid credentials or not authorized.");
//        }

        User userToDelete = userRepository.findById(userIdToDelete)
                .orElseThrow(() -> new NotFoundException("User to delete not found."));

        userToDelete.setActive(false);
        userToDelete.setDeleted(true);
        userRepository.saveAndFlush(userToDelete);
    }


}
