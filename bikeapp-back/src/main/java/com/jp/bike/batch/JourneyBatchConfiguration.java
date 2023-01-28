package com.jp.bike.batch;

import javax.sql.DataSource;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.database.BeanPropertyItemSqlParameterSourceProvider;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.batch.item.database.builder.JdbcBatchItemWriterBuilder;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.LineMapper;
import org.springframework.batch.item.file.mapping.DefaultLineMapper;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.core.io.FileSystemResource;
import org.springframework.transaction.PlatformTransactionManager;

import com.jp.bike.model.Journey;

@Configuration
@EnableBatchProcessing
public class JourneyBatchConfiguration {

	@Bean
	@Scope(value = "step", proxyMode = ScopedProxyMode.TARGET_CLASS)
	public FlatFileItemReader<Journey> journeyReader(@Value("#{jobParameters[file]}") String file) {
		FlatFileItemReader<Journey> reader = new FlatFileItemReader<>();
		reader.setName("journeyItemReader");
		reader.setResource(new FileSystemResource(file));
		//reader.setRecordSeparatorPolicy(null);
		reader.setLinesToSkip(1);
		reader.setLineMapper(journeyLineMapper());
		return reader;
	}

	@Bean
	public LineMapper<Journey> journeyLineMapper() {
		DefaultLineMapper<Journey> lineMapper = new DefaultLineMapper<>();
		DelimitedLineTokenizer lineTokenizer = new DelimitedLineTokenizer();

		lineMapper.setFieldSetMapper(new BeanWrapperFieldSetMapperWithDataFormat<Journey>() {{
			setTargetType(Journey.class);
		}});
		lineTokenizer.setNames(new String[] {"departureDate", "returnDate", "departureStationId", "departureStationName", 
			"returnStationId", "returnStationName", "distanceCoveredInMeters", "durationInSeconds"});
		lineMapper.setLineTokenizer(lineTokenizer);
		
		return lineMapper;
	}

	@Bean
	public JourneyProcessor journeyProcessor() {
		return new JourneyProcessor();
	}

	@Bean
	public JdbcBatchItemWriter<Journey> journeyWriter(DataSource dataSource) {
		return new JdbcBatchItemWriterBuilder<Journey>()
			.itemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider<>())
			.sql("INSERT INTO bikeapp_journeys (" +
					"departure_date, " +
					"return_date, " +
					"departure_station_id, " +
					"departure_station_name, " +
					"return_station_id, " +
					"return_station_name, " +
					"distance_covered, " +
					"duration " +
				") VALUES (" +
					":departureDate, " +
					":returnDate, " +
					":departureStationId, " +
					":departureStationName, " +
					":returnStationId, " +
					":returnStationName, " +
					":distanceCoveredInMeters, " +
					":durationInSeconds " +
				")")
			.dataSource(dataSource)
			.build();
	}

	@Bean
	public Job importJourneyJob(JobRepository jobRepository, JobCompletionNotificationListener listener, Step journeyStep1) {
		return new JobBuilder("importJourneyJob", jobRepository)
			.incrementer(new RunIdIncrementer())
			.listener(listener)
			.flow(journeyStep1)
			.end()
			.build();
	}

	@Bean
	public Step journeyStep1(ItemReader<Journey> journeyReader, JobRepository jobRepository,
		PlatformTransactionManager transactionManager, JdbcBatchItemWriter<Journey> journeyWriter) {
		return new StepBuilder("journeyStep1", jobRepository)
			.<Journey, Journey> chunk(10, transactionManager)
			.reader(journeyReader)
			.processor(journeyProcessor())
			.writer(journeyWriter)
			.build();
	}
}