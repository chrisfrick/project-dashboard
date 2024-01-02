package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.AnnouncementDto;

public interface AnnouncementService {

    void createAnnouncement(AnnouncementDto announcementDto);

    AnnouncementDto updateAnnouncement(
        Long id,
        AnnouncementDto announcementDto);

    AnnouncementDto deleteAnnouncement(Long id);

}
