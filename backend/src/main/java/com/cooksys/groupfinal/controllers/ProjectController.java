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

	//**************
	//PATCH {projectId}
	// request { ProjectDto }
	// response ProjectDto
	// to modify project description only
	//***************

	@PatchMapping("{projectId}")
	public ProjectDto updateProjectDescription(@PathVariable ("projectId") Long projectId, @RequestBody ProjectDto projectDto) {
		return projectService.updateProjectDescription(projectId, projectDto);
	}

	//**********
	//DELETE
	//request { ProjectDto }
	//response ProjectDto
	// deactivate the project
	//************

	@DeleteMapping("{projectId}/{userId}")
	public ProjectDto deactivateProject(@PathVariable Long projectId,@PathVariable Long userId) {
		return projectService.deactivateProject(projectId, userId);
	}

	//*********
	// GET
	//request {projectId}
	//response ProjectDto
	//fetch project based on the provided id
	@GetMapping("{id}")
	public ProjectDto getProjectById(@PathVariable ("id") Long id) {
		return projectService.getProjectById(id);
	}

	//*********
	//PUT {projectId}
	//request {projectDto}
	//response{ProjectDto}
	//to modify project details of specific project
	@PutMapping("{projectId}")
	public ProjectDto updateProject(@PathVariable ("projectId") Long projectId, @RequestBody ProjectDto projectDto) {
		return projectService.updateProject(projectId, projectDto);
	}
}
