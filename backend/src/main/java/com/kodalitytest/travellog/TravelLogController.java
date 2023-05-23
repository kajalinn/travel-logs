package com.kodalitytest.travellog;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import io.micronaut.validation.Validated;

import java.util.List;

@Validated
@Controller("/api/travellogs")
public class TravelLogController {

    private final TravelLogRepository travelLogRepository;

    public TravelLogController(TravelLogRepository travelLogRepository) {
        this.travelLogRepository = travelLogRepository;
    }

    //Method to retrieve all travel logs
    @Get("/getAllTravelLogs")
    public HttpResponse<List<TravelLog>> findAll() {
        List<TravelLog> travelLogs = travelLogRepository.getAllTravelLogs();
        return HttpResponse.ok(travelLogs);
    }

    //Method to create a new travel log
    @Post("/saveTravelLog")
    public HttpResponse<TravelLog> create(@Body TravelLog travelLog) {
        TravelLog createdTravelLog = travelLogRepository.saveTravelLog(travelLog);
        return HttpResponse.created(createdTravelLog);
    }

    //Method to delete a travel log by ID
    @Delete("/deleteTravelLogById/{id}")
    public HttpResponse<TravelLog> delete(@PathVariable Long id){
        travelLogRepository.deleteTravelLog(id);
        return HttpResponse.noContent();
    }

    //Method to update a travel log by ID
    @Put("/saveTravelLog/{id}")
    public HttpResponse<TravelLog> update(@PathVariable Long id, @Body TravelLog travelLog) {
        travelLog.setId(id);
        travelLogRepository.updateTravelLog(travelLog);
        return HttpResponse.ok(travelLog);
    }

    //Method to find a travel log by ID
    @Get("/getTravelLogById/{id}")
    public HttpResponse<TravelLog> findById(@PathVariable Long id) {
        TravelLog travelLog = travelLogRepository.getTravelLogById(id);
        if (travelLog != null) {
            return HttpResponse.ok(travelLog);
        } else {
            return HttpResponse.notFound();
        }
    }

    //Method to generate a report based on query parameters
    @Get("/generateReport")
    public HttpResponse<ReportResult> generateReport(
            @QueryValue(value = "startDate", defaultValue = "") String startDate,
            @QueryValue(value = "endDate", defaultValue = "") String endDate,
            @QueryValue(value = "vehicleRegistrationNumber", defaultValue = "") String vehicleRegistrationNumber,
            @QueryValue(value = "vehicleOwnerName", defaultValue = "") String vehicleOwnerName
    ) {

        //Filtered travel logs based on query parameters
        List<TravelLog> filteredTravelLogs = travelLogRepository.generateReport(startDate, endDate, vehicleRegistrationNumber, vehicleOwnerName);

        //Calculate total distance based on the filtered travel logs
        double totalDistance = calculateTotalDistance(filteredTravelLogs);

        // Create a report result object containing the filtered travel logs and total distance
        ReportResult reportResult = new ReportResult(filteredTravelLogs, totalDistance);
        return HttpResponse.ok(reportResult);
    }

    //Method to calculate the total distance from a list of travel logs
    private double calculateTotalDistance(List<TravelLog> travelLogs) {
        double totalDistance = 0;
        for (TravelLog travelLog : travelLogs) {
            totalDistance += travelLog.getOdometerAfter() - travelLog.getOdometerBefore();
        }
        return totalDistance;
    }

    // Inner class to represent the result of a report
    public static class ReportResult {
        private List<TravelLog> travelLogs;
        private double totalDistance;

        public ReportResult(List<TravelLog> travelLogs, double totalDistance) {
            this.travelLogs = travelLogs;
            this.totalDistance = totalDistance;
        }

        public List<TravelLog> getTravelLogs() {
            return travelLogs;
        }

        public void setTravelLogs(List<TravelLog> travelLogs) {
            this.travelLogs = travelLogs;
        }

        public double getTotalDistance() {
            return totalDistance;
        }

        public void setTotalDistance(double totalDistance) {
            this.totalDistance = totalDistance;
        }
    }

}
