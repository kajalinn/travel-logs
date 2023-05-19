package com.kodalitytest.travellog;
import io.micronaut.data.annotation.GeneratedValue;
import io.micronaut.data.annotation.Id;
import java.time.LocalDate;

import io.micronaut.core.annotation.Introspected;



//TravelLog Model
@Introspected
public class TravelLog {
    @Id
    @GeneratedValue(GeneratedValue.Type.AUTO)
    private Long id;
    private LocalDate travelDate;
    private String vehicleRegistrationNumber;
    private String vehicleOwnerName;
    private int odometerBefore;
    private int odometerAfter;
    private String route;
    private String description;


    public TravelLog() {

    }

    //Parametrized constructor
    public TravelLog(LocalDate travelDate, String vehicleRegistrationNumber, String vehicleOwnerName,
                     int odometerBefore, int odometerAfter, String route, String description) {
        this.travelDate = travelDate;
        this.vehicleRegistrationNumber = vehicleRegistrationNumber;
        this.vehicleOwnerName = vehicleOwnerName;
        this.odometerBefore = odometerBefore;
        this.odometerAfter = odometerAfter;
        this.route = route;
        this.description = description;
    }

    //Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getTravelDate() {
        return travelDate;
    }

    public void setTravelDate(LocalDate travelDate) {
        this.travelDate = travelDate;
    }

    public String getVehicleRegistrationNumber() {
        return vehicleRegistrationNumber;
    }

    public void setVehicleRegistrationNumber(String vehicleRegistrationNumber) {
        this.vehicleRegistrationNumber = vehicleRegistrationNumber;
    }

    public String getVehicleOwnerName() {
        return vehicleOwnerName;
    }

    public void setVehicleOwnerName(String vehicleOwnerName) {
        this.vehicleOwnerName = vehicleOwnerName;
    }

    public int getOdometerBefore() {
        return odometerBefore;
    }

    public void setOdometerBefore(int odometerBefore) {
        this.odometerBefore = odometerBefore;
    }

    public int getOdometerAfter() {
        return odometerAfter;
    }

    public void setOdometerAfter(int odometerAfter) {
        this.odometerAfter = odometerAfter;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
