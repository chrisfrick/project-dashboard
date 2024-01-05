package com.cooksys.groupfinal.controllers;

import java.util.Set;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.services.AnnouncementService;
import com.cooksys.groupfinal.services.CompanyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/company")
@RequiredArgsConstructor
public class CompanyController {
	
	private final CompanyService companyService;
	private final AnnouncementService announcementService;
	
	@GetMapping("/{id}/users")
    public Set<FullUserDto> getAllUsers(@PathVariable Long id) {
        return companyService.getAllUsers(id);
    }
	
	@GetMapping("/{id}/announcements")
    public Set<AnnouncementDto> getAllAnnouncements(@PathVariable Long id) {
        return companyService.getAllAnnouncements(id);
    }
	
	@PostMapping("/{companyId}/announcements")
    public AnnouncementDto createAnnouncement(@PathVariable("id") Long id, @RequestBody AnnouncementDto announcementDto) {
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
