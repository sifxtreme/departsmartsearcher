describe('home page rendering', function() {
  it('should visit the home page and find the search button', function() {
    browser.get('/');
    expect(element(by.css('.search-button')).getInnerHtml()).toMatch(/Search/i);
  });

  it('should visit the home page and find the right amount of cities', function() {
    browser.get('/');
    element(by.model('location')).sendKeys('new');
    expect(element.all(by.css('.cities-typeahead')).count()).toBe(4);
  });
});

describe('home page submission', function() {
  it('should submit on the home page', function() {
    browser.get('/');
    element(by.model('location')).sendKeys('los');
    element(by.css('.cities-typeahead')).click();
    element(by.css('.search-button')).click();
    expect(element.all(by.css('.singleResult')).count()).toBe(24);
    browser.getLocationAbsUrl().then(function(url) {
      expect(url).toMatch(/#\/search/);
    });
  });
});