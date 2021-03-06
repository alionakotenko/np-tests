let assert = require('chai').assert;
let webdriver = require('selenium-webdriver');
let chromdriver = require('chromedriver');
let By = require('selenium-webdriver').By;

const baseUrl = 'https://novaposhta.ua/';
const login = 'alionakotenko@gmail.com';
const password = 'Ks4C6M3VpqTWfsX'; 

describe('Login Form', function() {
    const driver = new webdriver.Builder().forBrowser('chrome').build();

    after(async () => driver.quit());

    beforeEach(async () => {
        await driver.get(baseUrl);
        await driver.findElement(By.className('logo_in')).click();
        await driver.findElement(By.xpath('//input[@value="Я приватна особа"]')).click();
    });

    it('Login with valid credentials', async () => {
        await driver.findElement(By.id('inputEmail_1')).sendKeys(login);
        await driver.findElement(By.id('inputPassword_1')).sendKeys(password);
        await driver.findElement(By.name('yt0')).click();
        await driver.getTitle().then(title => assert.equal(title, 'ТОВ "Нова Пошта" - Особистий кабінет - Orders'));
    });

    it('Presence of the form elements', async () => {
        assert.isTrue(await driver.findElement(By.id('inputEmail_1')).isDisplayed());
        assert.isTrue(await driver.findElement(By.id('inputPassword_1')).isDisplayed());
        assert.isTrue(await driver.findElement(By.id('remember_1')).isDisplayed());
        assert.isTrue(await driver.findElement(By.name('yt0')).isDisplayed());
    });
    
    it('Checkbox default status', async () => {  
        assert.isFalse(await driver.findElement(By.id('remember_1')).isSelected());
    });

    it('Checkbox availability', async () => { 
        await driver.findElement(By.id('remember_1')).click(); 
        assert.isTrue(await driver.findElement(By.id('remember_1')).isSelected());
        await driver.findElement(By.id('remember_1')).click(); 
        assert.isFalse(await driver.findElement(By.id('remember_1')).isSelected());
    });
});

describe('Waybill template', function() {
    const driver = new webdriver.Builder().forBrowser('chrome').build();

    after(async () => driver.quit());

    beforeEach(async () => {
        await driver.get(baseUrl);
        await driver.findElement(By.className('logo_in')).click();
        await driver.findElement(By.xpath('//input[@value="Я приватна особа"]')).click();
        await driver.findElement(By.id('inputEmail_1')).sendKeys(login);
        await driver.findElement(By.id('inputPassword_1')).sendKeys(password);
        await driver.findElement(By.name('yt0')).click();
        await driver.findElement(By.css('a[class="btn btn-small btns btna"]')).click();
    });

    it('Opening of the add sender form', async () => {
        await driver.findElement(By.id('SenderSelectButton')).click().then(async () => 
            assert.isTrue(await driver.findElement(By.id('selectCounterpartyModal')).isDisplayed())
        );
    });

    it('Opening of the add recipient form', async () => {
        await driver.findElement(By.id('RecipientSelectButton')).click().then(async () => 
            assert.isTrue(await driver.findElement(By.id('selectCounterpartyModal')).isDisplayed())
        );
    });

    it('Opening of the add recipient form', async () => {
        await driver.findElement(By.id('RecipientSelectButton')).click().then(async () => 
            assert.isTrue(await driver.findElement(By.id('selectCounterpartyModal')).isDisplayed())
        );
    });

    it('Drop-down list unfolding', async () => {
        await driver.findElement(By.id('cargoTypesSelectBoxItContainer')).click().then(async () => {
            assert.isTrue(await driver.findElement(By.id('cargoTypesSelectBoxItContainer')).getAttribute('aria-expanded') === 'true');
        });
    });
});