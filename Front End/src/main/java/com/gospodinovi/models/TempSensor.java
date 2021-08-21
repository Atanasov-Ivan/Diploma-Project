package com.gospodinovi.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;


@Entity
@AllArgsConstructor
@Getter
@Setter
@Table(name="temp_sensor")
@ToString
public class TempSensor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private double humidity;
    private double temperature;
    private double fahrenheit;
    private double dirt;
    private double light;
    private double gas;

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

    public double getLight() {
        return light;
    }

    public void setLight(double light) {
        this.light = light;
    }

    public double getGas() {
        return gas;
    }

    public void setGas(double gas) {
        this.gas = gas;
    }
    @Override
    public String toString() {
        return "TempSensor{" +
                "id=" + id +
                ", humidity=" + humidity +
                ", temperature=" + temperature +
                ", fahrenheit=" + fahrenheit +
                '}';
    }
}
