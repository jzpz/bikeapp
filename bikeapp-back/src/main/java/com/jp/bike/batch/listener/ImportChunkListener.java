package com.jp.bike.batch.listener;

import org.springframework.batch.core.ChunkListener;
import org.springframework.batch.core.scope.context.ChunkContext;

// Print info after each batch chunk
public class ImportChunkListener implements ChunkListener {

	@Override
	public void afterChunk(ChunkContext ccontext) {
		System.out.println("Chunk complete - Added rows: " +
			ccontext.getStepContext()
				.getStepExecution()
				.getWriteCount() + ", " +
			"Skipped rows: " + 
			ccontext.getStepContext()
				.getStepExecution()
				.getFilterCount());
	}
	
}
