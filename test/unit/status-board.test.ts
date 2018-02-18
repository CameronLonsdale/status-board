import * as express from 'express';
import * as socket from 'socket.io';
import { noop } from '../../src/helpers';
import { logger } from '../../src/logger';

import { IServer, Server } from '../helpers/socket';

import { init } from '../../src/job-initialiser';

import statusBoard from '../../src/status-board';

jest.mock('../../src/job-initialiser.ts', () => {
  return {
    init: jest.fn(),
  };
});
jest.mock('express');
jest.mock('../../src/webapp/server', () => {
  return { default: jest.fn() };
});

describe('Status Board', () => {
  beforeAll(() => {
    jest.spyOn(logger, 'error').mockImplementation(noop);
    jest.spyOn(logger, 'log').mockImplementation(noop);
  });

  afterAll(() => {
    logger.error.mockRestore();
    logger.log.mockRestore();
  });

  describe('Install Dependencies', () => {
    beforeEach(() => {
      jest.unmock('../../src/package-dependency-manager');
    });

    test('Should return error', () => {
      const pdm = require.requireActual('../../src/package-dependency-manager');
      pdm.installDependencies = jest.fn((path, cb) => {
        return cb(Error('ERROR'));
      });
      const options = { port: '0000', install: true };

      function callback(error) {
        expect(error).toEqual(Error('ERROR'));
      }

      statusBoard(options, callback);

      expect(pdm.installDependencies).toHaveBeenCalled();
      expect(pdm.installDependencies).toHaveBeenCalledWith(
        [expect.stringMatching('packages')], expect.anything());
      expect(init).toHaveBeenCalled();
    });

    test('Should print message', () => {
      const pdm = require.requireActual('../../src/package-dependency-manager');
      pdm.installDependencies = jest.fn((path, cb) => {
        cb(null);
      });

      function callback(error) {
        expect(error).toBeUndefined();
      }

      const options = { port: '0000', install: true };

      statusBoard(options, callback);

      expect(pdm.installDependencies).toHaveBeenCalled();
      expect(pdm.installDependencies).toHaveBeenCalledWith(
        [expect.stringMatching('packages')], expect.anything());
      expect(init).toHaveBeenCalled();
    });

    test('Should not install dependencies', () => {
      const pdm = require.requireActual('../../src/package-dependency-manager');
      pdm.installDependencies = jest.fn((path, cb) => {
        cb(null);
      });

      function callback(error) {
        expect(error).toBeUndefined();
      }

      const options = { port: '0000', install: false };

      statusBoard(options, callback);

      expect(pdm.installDependencies).not.toHaveBeenCalled();
      expect(init).toHaveBeenCalled();
    });

    test('Should assign empty options when no options provided', () => {
      const pdm = require.requireActual('../../src/package-dependency-manager');
      pdm.installDependencies = jest.fn();

      // tslint:disable-next-line:no-empty
      statusBoard(undefined, () => { });

      expect(pdm.installDependencies).not.toHaveBeenCalled();
      expect(init).toHaveBeenCalled();
    });
  });

  describe('Initiate Jobs', () => {
    beforeEach(() => {
      jest.unmock('socket.io');
    });

    test('Should emit server information', () => {
      const socketIO = require.requireActual('socket.io');
      const socketListernerMock = jest.fn();
      const onMock = jest.fn();

      function callback(error) {
        expect(error).toBeUndefined();
      }

      socketIO.listen = jest.fn(() => {
        return {
          on: onMock,
        };
      });
      const options = { port: '0000', install: true };

      statusBoard(options, callback);

      expect(socketIO.listen).toHaveBeenCalled();
      expect(onMock).toHaveBeenCalled();
      expect(onMock).toHaveBeenCalledWith('connection', expect.anything());
      expect(init).toHaveBeenCalled();
    });
  });

  describe('Socket.IO', () => {
    let server: IServer;
    let ioServer: SocketIO.Server;

    beforeAll(() => {
      server = new Server();
      ioServer = server.getIoServer();
      jest.spyOn(socket, 'listen').mockImplementation(() => ioServer);
      jest.spyOn(ioServer, 'on').mockImplementation((event: string, cb: any) => cb(ioServer));
      jest.spyOn(ioServer, 'emit').mockImplementation(noop);
    });

    afterAll(() => {
      socket.listen.mockRestore();
      ioServer.on.mockRestore();
      ioServer.emit.mockRestore();
      server.stopServer();
    });

    test('Should test setting socket.io correctly', () => {
      const options = { port: '1234', install: false };

      statusBoard(options, noop);

      expect(socket.listen).toBeCalled();
      expect(ioServer.on).toBeCalled();
      expect(ioServer.on).toBeCalledWith('connection', expect.anything());
      expect(ioServer.emit).toBeCalled();
      expect(ioServer.emit).toBeCalledWith('serverinfo', expect.anything());
    });
  });
});
