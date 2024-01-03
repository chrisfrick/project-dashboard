package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.ProjectDto;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.ProjectService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

	private final ProjectService projectService;

	//PATCH projects/{teamId}/team/{projectId}/project
	// Request {
	// description  or project
	//	}

	//response  updated project
	@PatchMapping("{projectId}")
	public ProjectDto updateProjectDescription(@PathVariable ("projectId") Long projectId, @RequestBody ProjectDto projectDto) {
		return projectService.updateProjectDescription(projectId, projectDto);
	}

	@PostMapping
	public ProjectDto addProject(@RequestBody ProjectDto projectDto) {
		return projectService.addProject(projectDto);
	}



}
