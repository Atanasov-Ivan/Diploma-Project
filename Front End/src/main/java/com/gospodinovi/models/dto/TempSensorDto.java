package com.gospodinovi.models.dto;

public class TempSensorDto {
    private double humidity;
    private double temperature;
    private double fahrenheit;
    private double dirt;
    private double gas;

    public TempSensorDto(double humidity, double temperature, double fahrenheit) {
        this.humidity = humidity;
        this.temperature = temperature;
        this.fahrenheit = fahrenheit;
    }

    public TempSensorDto(){}

    public double getHumidity() {
        return humidity;
    }

    public void setHumidity(double humidity) {
        this.humidity = humidity;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public double getFahrenheit() {
        return fahrenheit;
    }

    public void setFahrenheit(double fahrenheit) {
        this.fahrenheit = fahrenheit;
    }

    public double getDirt() {
        return dirt;
    }

    public void setDirt(double dirt) {
        this.dirt = dirt;
    }

    public double getGas() {
        return gas;
    }

    public void setGas(double gas) {
        this.gas = gas;
    }
}
