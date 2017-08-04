import { TransisticPage } from './app.po';

describe('transistic App', () => {
  let page: TransisticPage;

  beforeEach(() => {
    page = new TransisticPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
