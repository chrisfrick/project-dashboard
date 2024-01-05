package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.services.AnnouncementService;
import com.cooksys.groupfinal.services.CompanyService;
import com.cooksys.groupfinal.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/company")
@RequiredArgsConstructor
public class CompanyController {
	
	private final CompanyService companyService;
	private final AnnouncementService announcementService;
	private final UserService userService;
	
	@GetMapping("/{id}/users")
    public Set<FullUserDto> getAllUsers(@PathVariable Long id) {
        return companyService.getAllUsers(id);
    }
//
//	@PostMapping("/{id}/users")
//    public FullUserDto createUser(@PathVariable Long id, @RequestBody UserRequestDto userRequestDto) {
//        return userService.createUser(id, userRequestDto.getCredentials(), userRequestDto.getProfile(), userRequestDto.isAdmin());
//    }
	
	@GetMapping("/{id}/announcements")
    public Set<AnnouncementDto> getAllAnnouncements(@PathVariable Long id) {
        return companyService.getAllAnnouncements(id);
    }
	
	@PostMapping("/{companyId}/announcements")
    public AnnouncementDto createAnnouncement(@PathVariable("companyId") Long id, @RequestBody AnnouncementDto announcementDto) {
        return announcementService.createAnnouncement(id, announcementDto);
    }
	
	@GetMapping("/{id}/teams")
    public Set<TeamDto> getAllTeams(@PathVariable Long id) {
        return companyService.getAllTeams(id);
    }
	
	@PostMapping("/{id}/teams")
	public void createNewTeamForCompany(@PathVariable Long id, @RequestBody TeamDto teamDto) {
		companyService.createNewTeamForCompany(id, teamDto);
	}
	
	@GetMapping("/{companyId}/teams/{teamId}/projects") 
	public Set<ProjectDto> getAllProjects(@PathVariable Long companyId, @PathVariable Long teamId) {
		return companyService.getAllProjects(companyId, teamId);
	}

    //POST  add a new project to the repository
    @PostMapping("/{companyId}/teams/{teamId}/projects/{userId}")
    public ProjectDto addProject(@PathVariable Long companyId,@PathVariable Long teamId, @PathVariable Long userId, @RequestBody ProjectDto projectDto) {
        return companyService.addProject(companyId, teamId, userId, projectDto);
    }

}
