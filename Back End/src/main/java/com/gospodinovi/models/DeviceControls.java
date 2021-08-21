package com.gospodinovi.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Table;


public class DeviceControls {
    private String command;
    private String name;

    public DeviceControls(String command, String name) {
        this.command = command;
        this.name = name;
    }

    public DeviceControls(){

    }

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString(){
        return "Command: "+this.command;
    }
}
