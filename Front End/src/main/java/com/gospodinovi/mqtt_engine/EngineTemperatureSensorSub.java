package com.gospodinovi.mqtt_engine;

import com.gospodinovi.models.DeviceControls;
import com.gospodinovi.models.TempSensor;
import com.gospodinovi.service.ControlsService;
import com.gospodinovi.service.TempSensorService;
import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.Arrays;
import java.util.concurrent.Callable;

public class EngineTemperatureSensorSub implements Callable<Void> {

    //TODO uncomment
   @Autowired
   private SensorClient sensorClient;
   @Autowired
   private TempSensorService tempSensorService;
   @Autowired
   private ControlsService controlsService;
   private static final String TOPIC = "room";
   private final DeviceControls LedControlsOn = new DeviceControls("on", "Led");
   private final DeviceControls LedControlsOff = new DeviceControls("off", "Led");
   private final DeviceControls fanControlsOn = new DeviceControls("on_fan", "Fan");
   private final DeviceControls fanControlsOff = new DeviceControls("off_fan", "Fan");
   private boolean autoLedFlag = false;
   private boolean autoFanFlag = false;


    @Override
    public Void call() {
        IMqttClient client = sensorClient.getSubscriber();
        if (!client.isConnected()) {
            return null;
        }
        subscribeToTempSensor(client);
        return null;
    }

    private void subscribeToTempSensor(IMqttClient client){
        try {
            client.subscribe(EngineTemperatureSensorSub.TOPIC, (topic, msg) -> {
                try {
                    double[] doubleValues = Arrays.stream(new String(msg.getPayload()).split(" "))
                            .mapToDouble(Double::parseDouble)
                            .toArray();
                    if(doubleValues.length != 6){
                        throw new RuntimeException();
                    }
                    saveSensorEntry(doubleValues);
                    autoLedDeviceControl(doubleValues);
                    autoFanDeviceControl(doubleValues);
                }catch (Exception e){
                    System.out.println("Invalid temperature information fetched from sensor device. Payload: " +
                        new String(msg.getPayload()));
                }

            });
        } catch (MqttException e) {
            throw new RuntimeException(e);
        }
    }

    private void autoFanDeviceControl(double[] doubleValues) {
        double gas = doubleValues[5];
        if(autoModeIsOn(fanControlsOn)){
            if(gas> 1050){
                controlsService.controlDevice(this.fanControlsOn);
            } else {
                controlsService.controlDevice(this.fanControlsOff);
            }
        }
    }

    private void autoLedDeviceControl(double[] doubleValues) {
        double light = doubleValues[4];
        if(autoModeIsOn(LedControlsOn)){
            if(light> 1000){
                controlsService.controlDevice(this.LedControlsOn);
            } else {
                controlsService.controlDevice(this.LedControlsOff);
            }
        }
    }

    private boolean autoModeIsOn(DeviceControls deviceControls) {
       return  controlsService.isDeviceAutoOn(deviceControls.getName());
    }


    private void saveSensorEntry(double[] payload) {
        TempSensor tempSensor = new TempSensor();
        tempSensor.setHumidity(payload[0]);
        tempSensor.setTemperature(payload[1]);
        tempSensor.setFahrenheit(payload[2]);
        tempSensor.setDirt(payload[3]);
        tempSensor.setLight(payload[4]);
        tempSensor.setGas(payload[5]);
        new SensorSave(tempSensor).start();
    }

    class SensorSave extends Thread{
        private TempSensor tempSensor;

        SensorSave(TempSensor tempSensor) {
            this.tempSensor = tempSensor;
        }

        public void run(){
              tempSensorService.addTempMeasure(tempSensor);
        }
    }

}
