package com.skineditor.skindojo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class SkindojoApplicationTests {

	@Test
	public void greeterSaysBruh() {
		String word = "bruh";
		assertEquals("bruh", word);
	}

}
