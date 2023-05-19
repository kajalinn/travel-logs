package com.kodalitytest.travellog;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpHeaders;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.*;
import io.micronaut.http.server.cors.CrossOrigin;
import io.micronaut.validation.Validated;

import com.kodalitytest.travellog.TravelLog;
import com.kodalitytest.travellog.TravelLogRepository;
import javax.validation.Valid;
import java.util.List;

@Validated
@Controller("/api/travellogs")
public class TravelLogController {

    private final TravelLogRepository travelLogRepository;

    public TravelLogController(TravelLogRepository travelLogRepository) {
        this.travelLogRepository = travelLogRepository;
    }


    @Get("/getAllTravelLogs")
    public HttpResponse<List<TravelLog>> findAll() {
        List<TravelLog> travelLogs = travelLogRepository.getAllTravelLogs();
        return HttpResponse.ok(travelLogs);
    }

    @Post("saveTravelLog")
    public HttpResponse<TravelLog> create(@Body TravelLog travelLog) {
        TravelLog createdTravelLog = travelLogRepository.saveTravelLog(travelLog);
        return HttpResponse.created(createdTravelLog);
    }

    @Delete("deleteTravelLogById/{id}")
    public HttpResponse<TravelLog> delete(@PathVariable Long id){
        travelLogRepository.deleteTravelLog(id);
        return HttpResponse.noContent();
    }

    @Put("saveTravelLog/{id}")
    public HttpResponse<TravelLog> update(@PathVariable Long id, @Body TravelLog travelLog) {
        travelLog.setId(id);
        travelLogRepository.updateTravelLog(travelLog);
        return HttpResponse.ok(travelLog);
    }

    @Get("/getTravelLogById/{id}")
    public HttpResponse<TravelLog> findById(@PathVariable Long id) {
        TravelLog travelLog = travelLogRepository.getTravelLogById(id);
        if (travelLog != null) {
            return HttpResponse.ok(travelLog);
        } else {
            return HttpResponse.notFound();
        }
    }

}
