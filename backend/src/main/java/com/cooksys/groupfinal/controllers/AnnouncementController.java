package com.cooksys.groupfinal.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/announcements")
@RequiredArgsConstructor
public class AnnouncementController {
	
	private final AnnouncementService announcementService;

	//Path may need to change (include admin somewhere?)
	@PostMapping("/{companyId}/announcements")
	public void createAnnouncement(@PathVariable("id") Long id, @RequestBody AnnouncementDto announcementDto) {
	    announcementService.createAnnouncement(id, announcementDto);
	}
	
	@PutMapping("/admin/announcements/{announcementId}")
	public AnnouncementDto updateAnnouncement(@PathVariable("id") Long id, @RequestBody AnnouncementDto announcementDto) {
	    return announcementService.updateAnnouncement(id, announcementDto);
	}
	
	@DeleteMapping("/admin/announcements/{announcementId}")
	public AnnouncementDto deleteAnnouncement(@PathVariable("id") Long id) {
	    return announcementService.deleteAnnouncement(id);
	}
}
