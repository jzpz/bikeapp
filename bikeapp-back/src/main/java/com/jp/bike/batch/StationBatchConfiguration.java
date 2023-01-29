package com.jp.bike.batch;

import javax.sql.DataSource;

import org.springframework.batch.core.ChunkListener;
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
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.batch.item.file.mapping.DefaultLineMapper;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.core.io.FileSystemResource;
import org.springframework.transaction.PlatformTransactionManager;

import com.jp.bike.batch.listener.ImportChunkListener;
import com.jp.bike.model.Station;

// This class handles the process for reading and importing station files
@Configuration
@EnableBatchProcessing
public class StationBatchConfiguration {

	@Bean
	@Scope(value = "step", proxyMode = ScopedProxyMode.TARGET_CLASS)
	public FlatFileItemReader<Station> stationReader(@Value("#{jobParameters[file]}") String file) {
		FlatFileItemReader<Station> reader = new FlatFileItemReader<>();
		reader.setName("stationItemReader");
		reader.setResource(new FileSystemResource(file));
		reader.setLinesToSkip(1); // skip first line with headings
		reader.setLineMapper(stationLineMapper());

		return reader;
	}

	@Bean
	public LineMapper<Station> stationLineMapper() {
		DefaultLineMapper<Station> lineMapper = new DefaultLineMapper<>();
		DelimitedLineTokenizer lineTokenizer = new DelimitedLineTokenizer();

		lineMapper.setFieldSetMapper(new BeanWrapperFieldSetMapper<Station>() {{
			setTargetType(Station.class);
		}});
		lineTokenizer.setNames(new String[] {"fid", "id", "nameLocaleFi", "nameLocaleSe", "nameLocaleEn", "addressLocaleFi",
			"addressLocaleSe", "cityLocaleFi", "cityLocaleSe", "operator", "capacity", "coordinateX", "coordinateY"});
		lineMapper.setLineTokenizer(lineTokenizer);
		
		return lineMapper;
	}

	// Processor for validation
	@Bean
	public StationProcessor stationProcessor() {
		return new StationProcessor();
	}

	@Bean
	public JdbcBatchItemWriter<Station> stationWriter(DataSource dataSource) {
		return new JdbcBatchItemWriterBuilder<Station>()
			.itemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider<>())
			.sql("INSERT INTO bikeapp_stations (" +
					"fid, " +
					"id, " +
					"name_locale_fi, " +
					"name_locale_se, " +
					"name_locale_en, " +
					"address_locale_fi, " +
					"address_locale_se, " +
					"city_locale_fi, " +
					"city_locale_se, " +
					"operator, " +
					"capacity, " +
					"coordinate_x, " +
					"coordinate_y" +
				") VALUES (" +
					":fid, " +
					":id, " +
					":nameLocaleFi, " +
					":nameLocaleSe, " +
					":nameLocaleEn, " +
					":addressLocaleFi, " +
					":addressLocaleSe, " +
					":cityLocaleFi, " +
					":cityLocaleSe, " +
					":operator, " +
					":capacity, " +
					":coordinateX, " +
					":coordinateY" +
				")")
			.dataSource(dataSource)
			.build();
	}

	// Job that will be called from rest controller
	@Bean
	public Job importStationJob(JobRepository jobRepository, Step stationStep1) {
		return new JobBuilder("importStationJob", jobRepository)
			.incrementer(new RunIdIncrementer())
			.flow(stationStep1)
			.end()
			.build();
	}

	@Bean
	public Step stationStep1(ItemReader<Station> stationReader, JobRepository jobRepository,
		PlatformTransactionManager transactionManager, JdbcBatchItemWriter<Station> stationWriter) {
		return new StepBuilder("stationStep1", jobRepository)
			.<Station, Station> chunk(100, transactionManager)
			.reader(stationReader)
			.processor(stationProcessor())
			.writer(stationWriter)
			.listener(new ImportChunkListener())
			.build();
	}
}