package com.gospodinovi.models.dto;

public class ControlsDto {

    private String name;
    private boolean autoModeEnabled;

    public ControlsDto(String name, boolean autoModeEnabled) {
        this.name = name;
        this.autoModeEnabled = autoModeEnabled;
    }

    public ControlsDto(){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isAutoModeEnabled() {
        return autoModeEnabled;
    }

    public void setAutoModeEnabled(boolean autoModeEnabled) {
        this.autoModeEnabled = autoModeEnabled;
    }
}
