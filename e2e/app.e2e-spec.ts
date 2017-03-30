import { LyraProjectPage } from './app.po';

describe('lyra-project App', () => {
  let page: LyraProjectPage;

  beforeEach(() => {
    page = new LyraProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
