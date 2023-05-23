package com.kodalitytest.travellog;


import io.micronaut.data.annotation.Repository;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.List;
import java.time.LocalDate;

@Repository
public class TravelLogRepository {

    private final JdbcTemplate jdbcTemplate;


    public TravelLogRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    // Method to retrieve all travel logs
    //BeanPropertyRowMapper as an analogue
    public List <TravelLog> getAllTravelLogs(){

        String sql = "SELECT * FROM \"TravelLog\"";

        // Execute the SQL statement and map the results to TravelLog objects
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

    // Method to save a travel log in db
    public TravelLog saveTravelLog(TravelLog travelLog){

        // SQL statement for inserting a new travel log into the database
        String sql = "INSERT INTO \"TravelLog\" (travel_date, vehicle_registration_number, " +
                "vehicle_owner_name, odometer_before, odometer_after, route, description) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?)";

        // Execute the SQL statement with the travel log data
        jdbcTemplate.update(sql, travelLog.getTravelDate(), travelLog.getVehicleRegistrationNumber(), travelLog.getVehicleOwnerName(),
                travelLog.getOdometerBefore(), travelLog.getOdometerAfter(),
                travelLog.getRoute(), travelLog.getDescription());
        return travelLog;
    }

    // Method to update a travel log in db
    public void updateTravelLog(TravelLog travelLog) {

        String sql = "UPDATE \"TravelLog\" SET travel_date = ?, vehicle_registration_number = ?, vehicle_owner_name = ?, " +
                "odometer_before = ?, odometer_after = ?, route = ?, description = ? WHERE id = ?";

        jdbcTemplate.update(sql, travelLog.getTravelDate(), travelLog.getVehicleRegistrationNumber(), travelLog.getVehicleOwnerName(),
                travelLog.getOdometerBefore(), travelLog.getOdometerAfter(), travelLog.getRoute(),
                travelLog.getDescription(), travelLog.getId());
    }

    // Method to delete a travel log by ID from db
    public void deleteTravelLog(Long id) {

        String sql = "DELETE FROM \"TravelLog\" WHERE id = ?";

        jdbcTemplate.update(sql, id);
    }

    // Method to retrieve a travel log by ID
    public TravelLog getTravelLogById(Long id) {

        String sql = "SELECT * FROM \"TravelLog\" WHERE id = ?";

        // Execute the SQL statement with the ID of the travel log to be retrieved
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

    // Method to generate a report based on specified criteria
    public List<TravelLog> generateReport(String startDate, String endDate, String vehicleRegistrationNumber, String vehicleOwnerName) {
        LocalDate parsedStartDate = null;
        LocalDate parsedEndDate = null;

        // Parse the start date if provided
        if (startDate != null && !startDate.isEmpty()) {
            parsedStartDate = LocalDate.parse(startDate);
        }

        // Parse the end date if provided
        if (endDate != null && !endDate.isEmpty()) {
            parsedEndDate = LocalDate.parse(endDate);
        }

        // Build the SQL query dynamically based on the provided criteria
        StringBuilder sqlBuilder = new StringBuilder("SELECT * FROM \"TravelLog\" WHERE 1 = 1");
        List<Object> params = new ArrayList<>();

        // Add conditions for start date and end date if both are provided
        if (parsedStartDate != null && parsedEndDate != null) {
            sqlBuilder.append(" AND travel_date >= ? AND travel_date <= ?");
            params.add(parsedStartDate);
            params.add(parsedEndDate);
        }

        // Add condition for vehicle registration number if provided
        if (vehicleRegistrationNumber != null && !vehicleRegistrationNumber.isEmpty()) {
            sqlBuilder.append(" AND vehicle_registration_number = ?");
            params.add(vehicleRegistrationNumber);
        }

        // Add condition for vehicle owner name if provided
        if (vehicleOwnerName != null && !vehicleOwnerName.isEmpty()) {
            sqlBuilder.append(" AND vehicle_owner_name = ?");
            params.add(vehicleOwnerName);
        }

        // Construct the final SQL query
        String sql = sqlBuilder.toString();

        // Execute the SQL query with the specified parameters and map the results to TravelLog objects
        return jdbcTemplate.query(sql, params.toArray(), (rs, rowNum) -> {
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


}
