package com.jp.bike.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

	@CrossOrigin
	@PostMapping("/stations")
	public void importStations(@RequestParam("file") MultipartFile multipartFile) throws IOException {

		// Save te file to temp dir
		File fileToImport = new File(tempdir + multipartFile.getOriginalFilename());
		OutputStream outputStream = new FileOutputStream(fileToImport);
		IOUtils.copy(multipartFile.getInputStream(), outputStream);
		outputStream.flush();
		outputStream.close();

		try {
			JobExecution jobExecution = jobLauncher.run(importStationJob, new JobParametersBuilder()
				.addString("file", fileToImport.getAbsolutePath())
				.addDate("date", new Date()) // date is used for differentiating executions to avoid errors
				.toJobParameters());
		} catch (JobExecutionAlreadyRunningException | JobRestartException 
		| JobInstanceAlreadyCompleteException | JobParametersInvalidException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value="/journeys", method=RequestMethod.POST)
	public void importJourneys(@RequestParam("file") MultipartFile multipartFile) throws IOException {

		//Save multipartFile file in a temporary physical folder
		File fileToImport = new File(tempdir + multipartFile.getOriginalFilename());
		OutputStream outputStream = new FileOutputStream(fileToImport);
		IOUtils.copy(multipartFile.getInputStream(), outputStream);
		outputStream.flush();
		outputStream.close();

		try {
			JobExecution jobExecution = jobLauncher.run(importJourneyJob, new JobParametersBuilder()
				.addString("file", fileToImport.getAbsolutePath())
				.addDate("date", new Date()) // date is used to differentiate between executions, otherwise there will be an error
				.toJobParameters());
		} catch (JobExecutionAlreadyRunningException | JobRestartException 
		| JobInstanceAlreadyCompleteException | JobParametersInvalidException e) {
			e.printStackTrace();
		}
	}
}
