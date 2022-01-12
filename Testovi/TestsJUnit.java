import static org.junit.Assert.assertEquals;

import java.util.concurrent.TimeUnit;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class TestsJUnit {

	@Test()
	public void loginTestGoodCredentials() {
		System.setProperty("webdriver.chrome.driver", "C:\\Program Files\\chromedriver\\chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		// posjeti web stranicu
		driver.get("https://tectonichr.tk/");

		// otvori izbornik s gumbom za prijavu
		WebElement element = driver.findElement(By.id("menu-button-2"));
		element.click();

		// otvori stranicu za prijavu
		element = driver.findElement(By.id("menu-list-2"));
		element.click();

		// unesi email
		element = driver.findElement(By.name("email"));
		element.sendKeys("foo@bar.com");

		// unesi zaporku
		element = driver.findElement(By.name("password"));
		element.sendKeys("foobar123");

		// pritiskom na gumb pokusaj se prijaviti u sustav
		driver.findElement(By.cssSelector("button[type='submit']")).click();

		try {
			// pricekaj dok se provjeri prijava
			TimeUnit.MILLISECONDS.sleep(1000);
		} catch (Exception e) {
			System.out.println("Exception while waiting for login: " + e.getMessage());
		}

		// ako je doslo do preusmjerenja na pocetnu stranicu prijava je uspjesna
		String redirURL = driver.getCurrentUrl();
		boolean compRes = redirURL.equals("https://tectonichr.tk/");
		assertEquals(compRes, true);

		driver.quit();
	}

	@Test()
	public void loginTestBadCredentials() {
		System.setProperty("webdriver.chrome.driver", "C:\\Program Files\\chromedriver\\chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		// posjeti web stranicu
		driver.get("https://tectonichr.tk/");

		// otvori izbornik s gumbom za prijavu
		WebElement element = driver.findElement(By.id("menu-button-2"));
		element.click();

		// otvori stranicu za prijavu
		element = driver.findElement(By.id("menu-list-2"));
		element.click();

		// unesi email
		element = driver.findElement(By.name("email"));
		element.sendKeys("krivi@email.com");

		// unesi zaporku
		element = driver.findElement(By.name("password"));
		element.sendKeys("neispravnaSifra");

		// pritiskom na gumb pokusaj se prijaviti u sustav
		driver.findElement(By.cssSelector("button[type='submit']")).click();

		try {
			// pricekaj dok se provjeri prijava
			TimeUnit.MILLISECONDS.sleep(1000);
		} catch (Exception e) {
			System.out.println("Exception while waiting for login: " + e.getMessage());
		}

		// ako nije doslo do preusmjerenja uspjesno je prepoznata priajva s neispravnim
		// podacima
		String redirURL = driver.getCurrentUrl();
		boolean compRes = redirURL.equals("https://tectonichr.tk/auth/login");
		assertEquals(compRes, true);

		driver.quit();
	}

}
