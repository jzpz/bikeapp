package com.jp.bike.batch;

import java.beans.PropertyEditorSupport;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.validation.DataBinder;

import io.micrometer.common.util.StringUtils;

// Fieldsetmapper with localdatetime conversion
public class BeanWrapperFieldSetMapperWithDataFormat<T> extends BeanWrapperFieldSetMapper<T> {

	@Override
	protected void initBinder(DataBinder binder) {
		DateTimeFormatter dateTimeFormat = DateTimeFormatter.ISO_DATE_TIME;

		// Handling dates
		binder.registerCustomEditor(LocalDateTime.class, new PropertyEditorSupport() {
			@Override
			public void setAsText(String dateStr) throws IllegalArgumentException {
				if(StringUtils.isNotEmpty(dateStr)) {
					try {
						setValue(LocalDateTime.parse(dateStr, dateTimeFormat));
					} catch(Exception e) {  
						// Set invalid dates to null so they will be removed in processor
						setValue(null);
					}
				} else {
					setValue(null);
				}
			}
		});

		// Handling integers
		binder.registerCustomEditor(Integer.class, new PropertyEditorSupport() {
			@Override
			public void setAsText(String intStr) throws IllegalArgumentException {
				if(StringUtils.isNotEmpty(intStr)) {
					try {
						setValue(Integer.parseInt(intStr));
					} catch(Exception e) {  
						setValue(null);
					}
				} else {
					setValue(null);
				}
			}
		});
	}

	
}