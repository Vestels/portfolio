jest.mock('nodemailer', () => ({
  createTransport: jest.fn(),
}));

const nodemailer = require('nodemailer');
const sendMailMock = jest.fn((mailOptions, callback) => {
  callback(null, { response: '250 Message accepted' });
});
nodemailer.createTransport.mockReturnValue({
  sendMail: sendMailMock,
});

const request = require('supertest');
const app = require('./server');

describe('Email küldés végpont - POST /send-email', () => {
  let consoleErrorSpy;
  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  beforeEach(() => {
    sendMailMock.mockClear();
  });

  it('Pozitív út: sikeresen elküldi az e-mailt helyes input esetén', async () => {
    const payload = {
      from: 'test@example.com',
      subject: 'Teszt tárgy',
      message: 'Teszt üzenet',
    };

    const response = await request(app)
      .post('/send-email')
      .send(payload)
      .expect(200);

    expect(response.text).toBe('E-mail sikeresen elküldve.');
    expect(sendMailMock).toHaveBeenCalledTimes(1);
    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'test@example.com',
        subject: 'Teszt tárgy',
        text: 'Teszt üzenet',
      }),
      expect.any(Function)
    );
    
  });

  it('Hibakezelés: megfelelően kezeli, ha a sendMail hibát dob', async () => {
    sendMailMock.mockImplementationOnce((mailOptions, callback) => {
      callback(new Error('Teszt hiba'), null);
    });

    const payload = {
      from: 'test@example.com',
      subject: 'Teszt tárgy',
      message: 'Teszt üzenet',
    };

    const response = await request(app)
      .post('/send-email')
      .send(payload)
      .expect(500);

    expect(response.text).toBe('Hiba történt az e-mail küldése közben.');
    expect(sendMailMock).toHaveBeenCalledTimes(1);
  });

  it('404-es válasz: GET metódus esetén a /send-email végpontra', async () => {
    await request(app).get('/send-email').expect(404);
  });

  it('Hiányzó mezők: ha a kliens nem ad meg minden várt értéket', async () => {
    const payload = { from: 'test@example.com' };

    const response = await request(app)
      .post('/send-email')
      .send(payload)
      .expect(200);

    expect(response.text).toBe('E-mail sikeresen elküldve.');
    expect(sendMailMock).toHaveBeenCalledTimes(1);
    expect(sendMailMock.mock.calls[0][0]).toMatchObject({
      from: payload.from,
      subject: undefined,
      text: undefined,
    });
  });

  it('Érvénytelen JSON: ha a kliens hibás JSON-t küld', async () => {
    await request(app)
      .post('/send-email')
      .set('Content-Type', 'application/json')
      .send('{"from": "test@example.com",')
      .expect(400);
  });
});