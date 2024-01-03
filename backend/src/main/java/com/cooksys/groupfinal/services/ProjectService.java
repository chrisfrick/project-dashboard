package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.ProjectDto;

public interface ProjectService {


    ProjectDto updateProjectDescription(Long projectId, ProjectDto projectDto);

    ProjectDto addProject(ProjectDto projectDto);
}
