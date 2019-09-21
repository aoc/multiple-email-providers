import { htmlToText } from './service';

describe('Convert HTML -> Plain text', () => {
  it('should remove HTML tags', () => {
    const inputHTML = '<h1>Your Bill</h1><p>$10</p>';
    const plainText = htmlToText(inputHTML);

    expect(plainText).not.toMatch(/[<>]/);
  });

  it('should replace <br> by newline character', () => {
    const inputHTML = '<h1>Your Bill</h1><br/><p>$10</p>';
    const plainText = htmlToText(inputHTML);

    expect(plainText).toMatch(/[\n]/);
  });
});
