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

	@Test()
	public void addSeismologistValidEmail() {
		System.setProperty("webdriver.chrome.driver", "C:\\Program Files (x86)\\Chrome Driver\\chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

		// posjeti početnu stranicu
		driver.get("https://tectonichr.tk/");

		// otvori izbornik
		WebElement element = driver.findElement(By.id("menu-button-2"));
		element.click();

		// pritisni gumb i otvori stranicu za prijavu
		element = driver.findElement(By.id("menu-list-2"));
		element.click();

		// unesi email adresu
		element = driver.findElement(By.name("email"));
		element.sendKeys("foo@bar.com");

		// unesi zaporku
		element = driver.findElement(By.name("password"));
		element.sendKeys("foobar123");

		// pošalji podatke i provjeri
		driver.findElement(By.cssSelector("button[type='submit']")).click();
		
		try {
			// pričekaj promjenu stranice
			TimeUnit.MILLISECONDS.sleep(1000);
		} catch (Exception e) {
			System.out.println("Exception while waiting for login: " + e.getMessage());
		}
		// otvori izbornik
		element = driver.findElement(By.id("menu-button-2"));
		element.click();

		// otvori stranicu seizmologa
		element = driver.findElement(By.id("menu-list-2-menuitem-4"));
		element.click();

		// pritisni gumb za dodavanje novog seizmologa
		element = driver.findElement(By.className("css-415j94"));
		element.click();

		// generiraj random email
		Random randomGenerator = new Random();  
		int randomInt = randomGenerator.nextInt(1000);  
		String email="username"+ randomInt +"@gmail.com";

		// unesi email
		element = driver.findElement(By.name("email"));
		element.sendKeys(email);

		// unesi zaporku
		element = driver.findElement(By.name("password"));
		element.sendKeys("123456");
		
		// pošalji podatke i provjeri
		driver.findElement(By.cssSelector("button[type='submit']")).click();
		
		try {
			// pričekaj promjenu stranice
			TimeUnit.MILLISECONDS.sleep(1000);
		} catch (Exception e) {
			System.out.println("Exception while waiting for login: " + e.getMessage());
		}
		// dohvati promjenjenu stranicu
		String redirURL = driver.getCurrentUrl();

		// ako je došlo do preusmjerenja, uspješno je dodan novi seizmolog
		boolean compRes = redirURL.equals("https://tectonichr.tk/admin/users");
		assertEquals(compRes, true);
		
		driver.quit();
	}
	
	@Test()
	public void addSeismologistExistingEmail() {
		System.setProperty("webdriver.chrome.driver", "C:\\Program Files (x86)\\Chrome Driver\\chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

		// posjeti početnu stranicu
		driver.get("https://tectonichr.tk/");

		// otvori izbornik
		WebElement element = driver.findElement(By.id("menu-button-2"));
		element.click();

		// pritisni gumb i otvori stranicu za prijavu
		element = driver.findElement(By.id("menu-list-2"));
		element.click();

		// unesi email
		element = driver.findElement(By.name("email"));
		element.sendKeys("foo@bar.com");

		// unesi zaporku
		element = driver.findElement(By.name("password"));
		element.sendKeys("foobar123");

		// pošalji podatke i provjeri
		driver.findElement(By.cssSelector("button[type='submit']")).click();
		
		try {
			// pričekaj promjenu stranice
			TimeUnit.MILLISECONDS.sleep(1000);
		} catch (Exception e) {
			System.out.println("Exception while waiting for login: " + e.getMessage());
		}
		// otvori izbornik
		element = driver.findElement(By.id("menu-button-2"));
		element.click();

		// otvori stranicu seizmologa
		element = driver.findElement(By.id("menu-list-2-menuitem-4"));
		element.click();

		// pritisni gumb za dodavanje novog seizmologa
		element = driver.findElement(By.className("css-415j94"));
		element.click();

		// unesi postojeći email 
		element = driver.findElement(By.name("email"));
		element.sendKeys("existing@email.com");

		// unesi zaporku
		element = driver.findElement(By.name("password"));
		element.sendKeys("123456");
		
		// pošalji podatke i provjeri
		driver.findElement(By.cssSelector("button[type='submit']")).click();
		
		try {
			// pričekaj promjenu stranice
			TimeUnit.MILLISECONDS.sleep(1000);
		} catch (Exception e) {
			System.out.println("Exception while waiting for login: " + e.getMessage());
		}
		
		String redirURL = driver.getCurrentUrl();

		// ako stranica nije promjenjena, email već postoji
		boolean compRes = redirURL.equals("https://tectonichr.tk/admin/users/new");
		assertEquals(compRes, true);
		
		driver.quit();	
	}

}
