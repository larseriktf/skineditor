package com.skineditor.skindojo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SkindojoApplicationTests {

	@Test
	public void greeterSaysBruh() {
		String word = "bruh";
		org.junit.jupiter.api.Assertions.assertEquals("bruh", word);
	}

}
