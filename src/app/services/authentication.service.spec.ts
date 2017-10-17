import { TestBed, inject, async } from '@angular/core/testing';
import { User, USERS } from './USERS';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService]
    });
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));

  it('should authenticate', async(inject([AuthenticationService], (service: AuthenticationService) => {
    let robby = {
      username: 'robby',
      password: 'asdf'
    }
    service.authenticate(robby)
    .then((result) => {
      expect(result).toBeTruthy();
    });
  })));

  it('should reject invalid credentials by password', async(inject([AuthenticationService], (service: AuthenticationService) => {
    let robby = {
      username: 'robby',
      password: 'jkl;'
    }
    service.authenticate(robby)
    .then((result) => {
      expect(result).toBeFalsy();
    })
  })));

  it('should reject invalid credentials by username', async(inject([AuthenticationService], (service: AuthenticationService) => {
    let robby = {
      username: 'ybbor',
      password: 'asdf;'
    }
    service.authenticate(robby)
    .then((result) => {
      expect(result).toBeFalsy();
    });
  })));

  it('should reject with if user is invalid', async(inject([AuthenticationService], (service: AuthenticationService) => {
    let noUsername = {
      username: undefined,
      password: 'asdf;'
    },
    noPassword = {
      username: 'robby',
      password: undefined
    },
    noNothing = {
      username: undefined,
      password: undefined
    };
    service.authenticate(noUsername)
    .then((result) => {
      expect(result).toBeFalsy();
    })
    service.authenticate(noPassword)
    .then((result) => {
      expect(result).toBeFalsy();
    })
    service.authenticate(noNothing)
    .then((result) => {
      expect(result).toBeFalsy();
    })
  })));

  it('should get the current username or \'Not Logged In\'', async(inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service.username).toEqual('Not Logged In');
    let user = USERS[0];
    service.authenticate(user)
      .then(() => {
        expect(service.username).toEqual('robby');
      });
  })));

  it('should logout', async(inject([AuthenticationService], (service: AuthenticationService) => {
    let user = USERS[0];
    service.authenticate(user)
      .then(() => {
        service.logout()
          .then((result) => {
            expect(service['_activeUser']).toBeUndefined();
            expect(service['_token']).toBeUndefined();
          })
          .catch((error) => {
            fail(error);
          });
      });
  })));
});
