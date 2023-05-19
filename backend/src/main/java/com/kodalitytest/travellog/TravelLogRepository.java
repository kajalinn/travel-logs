package com.kodalitytest.travellog;


import io.micronaut.data.annotation.Repository;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.PreparedStatement;
import java.util.List;

@Repository
public class TravelLogRepository {

    private final JdbcTemplate jdbcTemplate;


    public TravelLogRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public TravelLog saveTravelLog(TravelLog travelLog){
        String sql = "INSERT INTO \"TravelLog\" (travel_date, vehicle_registration_number, " +
                "vehicle_owner_name, odometer_before, odometer_after, route, description) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, travelLog.getTravelDate(), travelLog.getVehicleRegistrationNumber(), travelLog.getVehicleOwnerName(),
                travelLog.getOdometerBefore(), travelLog.getOdometerAfter(),
                travelLog.getRoute(), travelLog.getDescription());
        return travelLog;
    }

    public void updateTravelLog(TravelLog travelLog) {
        String sql = "UPDATE \"TravelLog\" SET travel_date = ?, vehicle_registration_number = ?, vehicle_owner_name = ?, " +
                "odometer_before = ?, odometer_after = ?, route = ?, description = ? WHERE id = ?";

        jdbcTemplate.update(sql, travelLog.getTravelDate(), travelLog.getVehicleRegistrationNumber(), travelLog.getVehicleOwnerName(),
                travelLog.getOdometerBefore(), travelLog.getOdometerAfter(), travelLog.getRoute(),
                travelLog.getDescription(), travelLog.getId());
    }

    public void deleteTravelLog(Long id) {
        String sql = "DELETE FROM \"TravelLog\" WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }


    //BeanPropertyRowMapper as an analogue
    public List <TravelLog> getAllTravelLogs(){
        String sql = "SELECT * FROM \"TravelLog\"";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            TravelLog travelLog = new TravelLog();
            travelLog.setId(rs.getLong("id"));
            travelLog.setTravelDate(rs.getDate("travel_date").toLocalDate());
            travelLog.setVehicleRegistrationNumber(rs.getString("vehicle_registration_number"));
            travelLog.setVehicleOwnerName(rs.getString("vehicle_owner_name"));
            travelLog.setOdometerBefore(rs.getInt("odometer_before"));
            travelLog.setOdometerAfter(rs.getInt("odometer_after"));
            travelLog.setRoute(rs.getString("route"));
            travelLog.setDescription(rs.getString("description"));
            return travelLog;
        });
    }

    public TravelLog getTravelLogById(Long id) {
        String sql = "SELECT * FROM \"TravelLog\" WHERE id = ?";
        return jdbcTemplate.query(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setLong(1, id);
            return statement;
        }, rs -> {
            if (rs.next()) {
                TravelLog travelLog = new TravelLog();
                travelLog.setId(rs.getLong("id"));
                travelLog.setTravelDate(rs.getDate("travel_date").toLocalDate());
                travelLog.setVehicleRegistrationNumber(rs.getString("vehicle_registration_number"));
                travelLog.setVehicleOwnerName(rs.getString("vehicle_owner_name"));
                travelLog.setOdometerBefore(rs.getInt("odometer_before"));
                travelLog.setOdometerAfter(rs.getInt("odometer_after"));
                travelLog.setRoute(rs.getString("route"));
                travelLog.setDescription(rs.getString("description"));
                return travelLog;
            } else {
                return null;
            }
        });
    }

}
