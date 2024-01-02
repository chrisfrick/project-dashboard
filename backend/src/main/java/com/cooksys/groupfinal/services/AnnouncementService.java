package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.AnnouncementDto;

public interface AnnouncementService {

    void createAnnouncement(Long id, AnnouncementDto announcementDto);

    AnnouncementDto updateAnnouncement(
        Long id,
        AnnouncementDto announcementDto);

    AnnouncementDto deleteAnnouncement(Long id);

}
