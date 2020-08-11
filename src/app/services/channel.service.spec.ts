import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChannelService } from './channel.service';
import { HttpClient} from '@angular/common/http';

describe('ChannelService', () => {
  let service: ChannelService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ChannelService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can service.pollNews', () => {
    const testData = 'channel';
    service.pollNews('/')
      .subscribe(data =>
        expect(data).toEqual(testData)
      );
    const req = httpMock.expectOne('/');

    expect(req.request.method).toEqual('GET');
    req.flush(testData);

    httpMock.verify();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
