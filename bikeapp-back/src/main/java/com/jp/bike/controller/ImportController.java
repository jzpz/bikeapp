package com.jp.bike.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;
import java.util.HashMap;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

// Controller for csv file importing
@RestController
@RequestMapping("/import")
public class ImportController {

	@Autowired
	private JobLauncher jobLauncher;

	@Autowired 
    private Job importStationJob;

	@Autowired 
    private Job importJourneyJob;

	private String tempdir = System.getProperty("java.io.tmpdir");

	// Post controller for importing station files - returns import status
	@CrossOrigin
	@PostMapping("/stations")
	public ResponseEntity<HashMap<String, Object>> importStations(@RequestParam("file") MultipartFile multipartFile) throws IOException {

		// Save te file to system temp dir
		File fileToImport = new File(tempdir + multipartFile.getOriginalFilename());
		OutputStream outputStream = new FileOutputStream(fileToImport);
		IOUtils.copy(multipartFile.getInputStream(), outputStream);
		outputStream.flush();
		outputStream.close();

		HashMap<String, Object> status = new HashMap<String, Object>();

		try {
			if(fileToImport.getAbsolutePath() != null) {
				JobExecution jobExecution = jobLauncher.run(importStationJob, new JobParametersBuilder()
					.addString("file", fileToImport.getAbsolutePath())
					.addDate("date", new Date()) // date is used for differentiating executions to avoid errors
					.toJobParameters());

				StepExecution step = jobExecution.getStepExecutions().iterator().next();
				status.put("importStatus", step.getStatus()); // status message
				status.put("startTime", step.getStartTime());
				status.put("endTime", step.getEndTime());
				status.put("readCount", step.getReadCount()); // total items in file
				status.put("filterCount", step.getFilterCount()); // invalid items
				status.put("writeCount", step.getWriteCount()); // items imported to db
		
				return new ResponseEntity<HashMap<String, Object>>(status, new HttpHeaders(), HttpStatus.OK);

			} else {
				return new ResponseEntity<HashMap<String, Object>>(status, new HttpHeaders(), HttpStatus.NO_CONTENT);
			}
		} catch (JobExecutionAlreadyRunningException | JobRestartException 
		| JobInstanceAlreadyCompleteException | JobParametersInvalidException e) {
			e.printStackTrace();

			return new ResponseEntity<>(new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// Post controller for importing journey files - returns import status
	@CrossOrigin
	@PostMapping("/journeys")
	public ResponseEntity<HashMap<String, Object>> importJourneys(@RequestParam("file") MultipartFile multipartFile) throws IOException {

		// Save te file to system temp dir
		File fileToImport = new File(tempdir + multipartFile.getOriginalFilename());
		OutputStream outputStream = new FileOutputStream(fileToImport);
		IOUtils.copy(multipartFile.getInputStream(), outputStream);
		outputStream.flush();
		outputStream.close();

		HashMap<String, Object> status = new HashMap<String, Object>();

		try {
			String path = fileToImport.getAbsolutePath();
			
			if(fileToImport.getAbsolutePath() != null) {
				JobExecution jobExecution = jobLauncher.run(importJourneyJob, new JobParametersBuilder()
					.addString("file", path)
					.addDate("date", new Date()) // date is used to differentiate between executions, otherwise there will be an error
					.toJobParameters());

				// Return all 
				StepExecution step = jobExecution.getStepExecutions().iterator().next();
				status.put("importStatus", step.getStatus());
				status.put("startTime", step.getStartTime());
				status.put("endTime", step.getEndTime());
				status.put("readCount", step.getReadCount());
				status.put("filterCount", step.getFilterCount());
				status.put("writeCount", step.getWriteCount());

				return new ResponseEntity<HashMap<String, Object>>(status, new HttpHeaders(), HttpStatus.OK);
			
			} else {
				return new ResponseEntity<HashMap<String, Object>>(status, new HttpHeaders(), HttpStatus.NO_CONTENT);
			}
		} catch (JobExecutionAlreadyRunningException | JobRestartException 
		| JobInstanceAlreadyCompleteException | JobParametersInvalidException e) {
			e.printStackTrace();

			return new ResponseEntity<>(new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
